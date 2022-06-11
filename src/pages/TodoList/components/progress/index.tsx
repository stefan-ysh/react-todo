import "./index.css";
import { Progress } from "antd";
import moment from "moment";
function TaskProgress(props: any) {
  const { startTime, planStartTime, planEndTime } = props.task;
  let max = moment(planEndTime).valueOf() - moment(planStartTime).valueOf();
  const val = moment().valueOf() - moment(startTime).valueOf();
  let percent = Number((val / max).toFixed(2)) * 100;
  return (
    <div className="progress-wrap">
      <Progress
        className="progress"
        percent={percent}
        size="small"
        status={val >= max ? "exception" : "normal"}
        format={(percent) => `${percent}%`}
        steps={20}
      />
    </div>
  );
}
export default TaskProgress;
