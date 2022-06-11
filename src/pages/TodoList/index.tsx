/**eslint-disable */
import { useState, useEffect } from "react";
import "./index.css";
import { TaskItem, TaskCategory } from "./types/todo";
import EmptyTip from "./components/empty";
import TaskProgress from "./components/progress";
import moment from "moment";

import {
  ClockCircleOutlined,
  CheckCircleOutlined,
  FieldTimeOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import AddModal from "./components/modal/addTadk";
import { Badge, message, Button, Popconfirm } from "antd";

const todoList: Array<TaskCategory> = [
  {
    type: "todo",
  },
  {
    type: "doing",
  },
  {
    type: "done",
  },
];

const list: Array<TaskItem> = JSON.parse(
  localStorage.getItem("todoItems") || "[]"
);

function TodoList() {
  const [curItem, setCurItem] = useState(undefined);
  const [todoItems, setTodoItems] = useState(list);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    localStorage.setItem("todoItems", JSON.stringify(todoItems));
  }, [todoItems]);

  // start moving
  const handleStart = (e: any, t: any) => {
    // transfer the status of current drag area
    e.dataTransfer.setData("status", e.target.dataset.status);
    setCurItem(t);
  };
  const showAddTaskModal = () => {
    setVisible(true);
  };
  // compute task num
  const computeNum = (type: string) => {
    let res = list.filter((l) => {
      return l.status === type;
    });

    return res.length || 0;
  };

  // drop item
  const handleDrop = (e: any, t: { type: string }) => {
    setCurItem(undefined);
    message.destroy();
    // get the status of current drag area
    let fromStatus = e.dataTransfer.getData("status");
    // fromStatus is a string beacuse transfer-type
    if (fromStatus === "undefined") {
      return;
    }
    const { type: targetStatus } = t;
    // do nothing if the status is the same
    // todo maybe need to change the order of current list item
    if (fromStatus === targetStatus) {
      return;
    }
    // can not change the status of the one once it has been completed
    if (fromStatus === "done") {
      return message.info(
        "This task has been completed , you can not change its status anymore."
      );
    }
    // it is not allowed to change the status from done to todo
    if (fromStatus === "doing" && targetStatus === "todo") {
      message.info(
        "You can not move a task from doing to todo if once it has been started"
      );
      return;
    }
    changeTaskStatus(curItem, targetStatus);
  };

  // change the status of the current item
  const changeTaskStatus = (t: any, toStatus: string) => {
    const fromStatus = t.status;
    message.destroy();
    let res = list.find((l) => {
      return l.id === t.id;
    });
    switch (toStatus) {
      // In theory it won't go here
      case "todo":
        message.success("Set up a TODO successfully, do it now!");
        break;
      case "doing":
        res!.startTime = moment().format("YYYY-MM-DD");
        message.success("Start doing, come on!");
        break;
      case "done":
        // set the start time is current time if the task is dragged from todo to done
        if (fromStatus === "todo") {
          res!.startTime = moment().format("YYYY-MM-DD");
        }
        res!.endTime = moment().format("YYYY-MM-DD");
        message.success("Finish a task, congratulations! 🎉");
        break;

      default:
        break;
    }
    res!.status = toStatus;
    setTodoItems([...list]);
    setCurItem(undefined);
  };
  const isEmpty = (type: string) => {
    let res = list.find((l) => {
      return l.status === type;
    });
    if (res) {
      return false;
    }
    return true;
  };

  // handle create task
  const handleCreateTask = (newTask: TaskItem) => {
    message.destroy();
    list.push(newTask);
    setTodoItems([...list]);
    setVisible(false);
  };

  // delete the current task
  const handleDeleteTask = (task: TaskItem) => {
    let i = list.findIndex((l, index) => {
      return l.id === task.id;
    });
    list.splice(i, 1);
    setTodoItems([...list]);
    message.success("Delete task successfully!");
  };

  return (
    <div className="todo-list">
      {todoList.map((t: any, k: number) => {
        if (isEmpty(t.type)) {
          return (
            <div
              key={k}
              className="todo-wrap-item"
              onDrop={(e) => {
                handleDrop(e, t);
              }}
              onDragOver={(e) => {
                e.preventDefault();
              }}
            >
              <EmptyTip type={t.type}></EmptyTip>
            </div>
          );
        } else {
          return (
            <div
              key={k}
              className="todo-wrap-item"
              onDrop={(e) => {
                handleDrop(e, t);
              }}
              onDragOver={(e) => {
                e.preventDefault();
              }}
            >
              <div className="category-wrap">
                {t.type === "todo" && (
                  <Badge count={computeNum(t.type)}>
                    <ClockCircleOutlined className="category-icon" />
                    <span className="category-title">
                      {t.type.toUpperCase()}
                    </span>
                  </Badge>
                )}
                {t.type === "done" && (
                  <Badge count={computeNum(t.type)}>
                    <CheckCircleOutlined className="category-icon" />
                    <span className="category-title">
                      {t.type.toUpperCase()}
                    </span>
                  </Badge>
                )}
                {t.type === "doing" && (
                  <Badge count={computeNum(t.type)}>
                    <FieldTimeOutlined className="category-icon" />
                    <span className="category-title">
                      {t.type.toUpperCase()}
                    </span>
                  </Badge>
                )}
              </div>
              <div className="items-wrap">
                {todoItems.map((_t: any, _k: number) => {
                  return (
                    <div
                      key={_k}
                      data-status={_t.status}
                      draggable="true"
                      onDragStart={(e) => {
                        handleStart(e, _t);
                      }}
                    >
                      {_t.status === t.type && (
                        <div
                          style={{
                            justifyContent: "space-between",
                            padding: "0 10px",
                          }}
                          className={t.type === "done" ? "done" : "todo-item"}
                          key={_k}
                        >
                          <input
                            className="radio_type"
                            type="checkbox"
                            name="task"
                            checked={t.type === "done" ? true : false}
                            disabled={t.type === "done"}
                            onChange={() => changeTaskStatus(_t, "done")}
                          ></input>
                          <div className="item-title" title={_t.title}>
                            {_t.title}
                          </div>
                          <div style={{ display: "flex" }}>
                            {_t.status === "doing" && <TaskProgress task={_t} />}
                          </div>
                          <Popconfirm
                            title="Are you sure to delete this task?"
                            onConfirm={() => handleDeleteTask(_t)}
                            okText="Confirm"
                            cancelText="Cancel"
                          >
                            <DeleteOutlined
                              title="删除任务"
                              className="del-task-btn"
                            />
                          </Popconfirm>

                          {/* <div className="item">start time:{_t.startTime}</div> */}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }
      })}
      {/* add task button */}
      <Button
        icon={<PlusOutlined className="add-task-plus-icon" />}
        className="add-task-btn"
        type="primary"
        onClick={showAddTaskModal}
      ></Button>
      {visible && (
        <AddModal handleCreateTask={handleCreateTask} setVisible={setVisible} />
      )}
    </div>
  );
}

export default TodoList;
