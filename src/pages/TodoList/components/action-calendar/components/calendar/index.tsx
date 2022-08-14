import "./index.css";
import { Radio } from "antd";
import type { RadioChangeEvent } from "antd";
import { useState } from "react";
import Wall from "./wall";
const taskOptions = [
  { label: "Todo", value: "Todo" },
  // { label: "Doing", value: "Doing" },
  { label: "Done", value: "Done" },
];

function Calendar(params: any) {
  const [taskType, setValue] = useState("Todo");

  const onChangeTaskType = ({ target: { value } }: RadioChangeEvent) => {
    // console.log("current task type", value);
    setValue(value);
  };
  return (
    <div className="calendar-wall">
      <div className="filter-condition">
        <Radio.Group
          options={taskOptions}
          onChange={onChangeTaskType}
          value={taskType}
          optionType="button"
          buttonStyle="solid"
        />
      </div>
      <div className="display-area">
        <Wall taskType={taskType} />
      </div>
    </div>
  );
}
export default Calendar;
