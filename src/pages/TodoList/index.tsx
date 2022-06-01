/**eslint-disable */
import { useState } from "react";
import "./index.css";
import { TaskItem, TaskCategory } from "./types/todo";
import EmptyTip from "./components/empty";
import {
  ClockCircleOutlined,
  CheckCircleOutlined,
  FieldTimeOutlined,
} from "@ant-design/icons";
import { Badge } from "antd";

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
    status: "done",
  },
  {
    title: "cooking",
    startTime: "2022-05-15",
    description: "",
    status: "doing",
  },
];

function TodoList() {
  const [curItem, setCurItem] = useState({
    title: "",
    startTime: "",
    description: "",
    status: "",
  });
  const [todoItems, setTodoItems] = useState(list);

  // start moving
  const handleStart = (t: any) => {
    setCurItem(t);
  };

  // compute task num
  const computeNum = (type: string) => {
    let res = list.filter((l) => {
      return l.status === type;
    });

    return res.length || 0;
  };

  // drop item
  const handleDrop = (t: any) => {
    curItem.status = t.type;
    setTodoItems([...list]);
  };

  // change the status of the current item to done
  const checkRadio = (t: any) => {
    let res = list.find((l) => {
      return l.title === t.title;
    });
    res!.status = "done";
    setTodoItems([...list]);
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
  return (
    <div className="todo-list">
      {todoList.map((t: any, k: number) => {
        if (isEmpty(t.type)) {
          return (
            <div
              key={k}
              className="todo-wrap-item"
              onDrop={() => {
                handleDrop(t);
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
              onDrop={() => {
                handleDrop(t);
              }}
              onDragOver={(e) => {
                e.preventDefault();
              }}
            >
              <div className="title-wrap">
                {t.type === "todo" && (
                  <Badge count={computeNum(t.type)}>
                    <ClockCircleOutlined
                      style={{
                        fontSize: "20px",
                        color: "#fff",
                        marginRight: "10px",
                      }}
                    />
                    <span className="category-title">
                      {t.type.toUpperCase()}
                    </span>
                  </Badge>
                )}
                {t.type === "done" && (
                  <Badge count={computeNum(t.type)}>
                    <CheckCircleOutlined
                      style={{
                        fontSize: "20px",
                        color: "#fff",
                        marginRight: "10px",
                      }}
                    />
                    <span className="category-title">
                      {t.type.toUpperCase()}
                    </span>
                  </Badge>
                )}
                {t.type === "doing" && (
                  <Badge count={computeNum(t.type)}>
                    <FieldTimeOutlined
                      style={{
                        fontSize: "20px",
                        color: "#fff",
                        marginRight: "10px",
                      }}
                    />
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
                    draggable="true"
                    onDragStart={() => {
                      handleStart(_t);
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
                        // style={{
                        //   display: t.type === "done" ? "block" : "none",
                        // }}
                        type="checkbox"
                        name="task"
                        checked={t.type === "done" ? true : false}
                        disabled={t.type === "done"}
                        onChange={() => checkRadio(_t)}
                      ></input>
                      <div className="item">{_t.title}</div>
                      {/* <div className="item">start time:{_t.startTime}</div> */}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        }
      })}
    </div>
  );
}

export default TodoList;
