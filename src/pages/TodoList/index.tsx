/**eslint-disable */
import { useState } from "react";
import "./index.css";
import { TaskItem, TaskCategory } from "./types/todo";
import EmptyTip from "./components/empty";
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
              <EmptyTip type={t.type}>12</EmptyTip>
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
              <h1>
                {t.type}
                {computeNum(t.type)}
              </h1>
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
                        display: _t.status === t.type ? "block" : "none",
                      }}
                      className={t.type === "done" ? "done" : "todo-item"}
                      key={_k}
                    >
                      <input
                        style={{
                          display: t.type === "done" ? "block" : "none",
                        }}
                        type="checkbox"
                        name="reading"
                        checked
                        disabled
                        onChange={() => {
                          return false;
                        }}
                      ></input>
                      <div className="item">title:{_t.title}</div>
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
