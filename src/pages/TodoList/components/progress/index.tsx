import "./index.css";

function Progress(props: any) {
  const val = 10;
  console.log(props.task.startTime);

  return (
    <div className="progress-wrap">
      <progress className="progress" max={100} value={val} />
    </div>
  );
}
export default Progress;
