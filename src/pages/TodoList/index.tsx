/**eslint-disable */
import { useState } from "react";
import "./index.css";
import { TaskItem, TaskCategory } from "./types/todo";
import EmptyTip from "./components/empty";
import {
  ClockCircleOutlined,
  CheckCircleOutlined,
  FieldTimeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import AddModal from "./components/modal/addTadk";
import { Badge, message, Button } from "antd";

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

const list: Array<TaskItem> = [
  {
    title: "laundry",
    startTime: "2022-05-05",
    description: "",
    status: "todo",
  },
  {
    title: "coding",
    startTime: "2022-05-15",
    description: "",
    status: "doing",
  },
  {
    title: "sleeping",
    startTime: "2022-05-16",
    description: "",
    status: "todo",
  },
  {
    title: "reading",
    startTime: "2022-05-15",
    description: "",
    status: "todo",
  },
  {
    title: "cooking",
    startTime: "2022-05-15",
    description: "",
    status: "doing",
  },
];

function TodoList() {
  const [curItem, setCurItem] = useState(undefined);
  const [todoItems, setTodoItems] = useState(list);
  const [visible, setVisible] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
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
  const changeTaskStatus = (t: any, type: string) => {
    message.destroy();
    let res = list.find((l) => {
      return l.title === t.title;
    });
    res!.status = type;
    setTodoItems([...list]);
    switch (type) {
      case "todo":
        message.success("Set up a TODO successfully, do it now!");
        break;
      case "doing":
        message.success("Start doing, come on!");
        break;
      case "done":
        message.success("Finish a task, congratulations!");
        break;

      default:
        break;
    }
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
  const handleCreateTask = () => {
    message.destroy();
    if (!newTaskTitle) {
      return message.warning("You should input the task title first");
    }
    const newTask: TaskItem = {
      title: newTaskTitle,
      startTime: "2022-05-15",
      description: "",
      status: "todo",
    };
    list.push(newTask);
    setTodoItems([...list]);
    changeTaskStatus(newTask, "todo");
    setVisible(false);
    setNewTaskTitle("");
  };

  // update the newTaskTitle when inputing the value
  const inputNewTaskTitle = (e: any) => {
    setNewTaskTitle(e.target.value);
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
                    <div
                      style={{
                        display: _t.status === t.type ? "flex" : "none",
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
                      <div className="item-title">{_t.title}</div>
                      {/* <div className="item">start time:{_t.startTime}</div> */}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        }
      })}
      {/* add task button */}
      <Button
        icon={
          <PlusOutlined
            style={{
              fontSize: "20px",
            }}
          />
        }
        className="add-task-btn"
        type="primary"
        onClick={showAddTaskModal}
      ></Button>
      {visible && (
        <AddModal
          inputNewTaskTitle={inputNewTaskTitle}
          handleCreateTask={handleCreateTask}
          setVisible={setVisible}
        />
      )}
    </div>
  );
}

export default TodoList;
