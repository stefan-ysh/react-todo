import moment from "moment";
import "./index.css";
import { Tooltip } from "antd";
import { useEffect, useState } from "react";
const taskSum = JSON.parse(localStorage.getItem("todoItems") || "[]");
// eslint-disable-next-line
const squares = [
  {
    bgcolor: "#282d34",
  },
  {
    bgcolor: "#103c25",
  },
  {
    bgcolor: "#01622c",
  },
  {
    bgcolor: "#229d39",
  },
  {
    bgcolor: "#32cd49",
  },
];
const groupDate: any = [];
// 计算贡献次数
// eslint-disable-next-line

// eslint-disable-next-line
const dealDate = function (splitDate: any) {
  // window.console.log(splitDate);
  //截取的开始时间
  var startTime = new Date(splitDate.split("-")[0].trim());
  console.log(startTime);
  //截取的结束时间
  var endTime = new Date(splitDate.split("-")[1].trim());
  console.log(endTime);
  //利用setTime获取两个日期之间差值,差值毫秒换算成天1000*60*60*24
  // window.console.log(startTime.getTime());
  let week = 0;
  var distanceDayLength =
    (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60 * 24);
  var startDay = startTime.getTime();
  for (let i = 0; i <= distanceDayLength; i++) {
    let key = i % 7;
    let temp = {};
    temp = moment(
      new Date(startTime.setTime(startDay + 24 * 60 * 60 * 1000 * i))
    ).format("YYYY-MM-DD");
    if (groupDate[week]) {
      groupDate[week].push(temp);
    } else {
      groupDate[week] = [];
      groupDate[week].push(temp);
    }
    if (key === 0) {
      week += 1;
    }
  }
};
dealDate("2022/01/01 - 2022/12/31");

function Wall(props: any) {
  const [taskTimes, setTaskTimes] = useState<string[]>([]);
  const [taskType, setTaskType] = useState<string>("");
  const computeContributies = function (d: any) {
    let s = taskTimes.filter((v) => {
      return d === v;
    });
    return s.length;
  };
  const convertFill = (d: any) => {
    const s = computeContributies(d);
    if (s === 0) {
      return "#282d34";
    } else if (s <= 10) {
      return "#103c25";
    } else if (s <= 20) {
      return "#01622c";
    } else if (s <= 30) {
      return "#229d39";
    } else if (s > 30) {
      return "#32cd49";
    }
  };
  const convertText = (d: any) => {
    const s = computeContributies(d);
    if (s === 1) {
      return `${s} ${taskType} task on ${d}`;
    }
    return `${s} ${taskType} tasks on ${d}`;
  };
  const changeViewTaskType = (type: string) => {
    taskTimes.length = 0;
    let arr: string[] = [];
    switch (type) {
      case "Todo":
        taskSum.forEach((task: any) => {
          if (!task.startTime) {
            arr.push(task.planStartTime);
          }
        });
        break;
      case "Doing":
        // taskTimes = taskSum.folter((task: any) => {
        //   return task.startTime && !task.endTime;
        // });

        break;
      case "Done":
        taskSum.forEach((task: any) => {
          if (task.endTime) {
            arr.push(task.endTime);
          }
        });
        break;

      default:
        break;
    }
    setTaskTimes(arr);
  };

  useEffect(() => {
    setTaskType(props.taskType);
    changeViewTaskType(props.taskType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.taskType]);
  var items = [];
  for (var i = 0; i < 53; i++) {
    items.push(i); //这里父组件Examines，嵌套了子组件<OnTask/>
  }
  return (
    <div className="wall-wrap">
      {items.map((d, i) => {
        return (
          <div key={i}>
            {groupDate[i].map((d: any, _i: number) => {
              return (
                <Tooltip
                  key={`tooltip${_i}`}
                  placement="top"
                  title={convertText(d)}
                >
                  <div
                    title={convertText(d)}
                    key={_i}
                    className="day"
                    style={{
                      width: 15,
                      height: 15,
                      background: `${convertFill(d)}`,
                      outline: "1px solid rgba(255, 255, 255, 0.05)",
                      outlineOffset: "-1px",
                    }}
                  ></div>
                </Tooltip>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
export default Wall;
