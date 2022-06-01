function Empty(props: any) {
  switch (props.type) {
    case "todo":
      return (
        <div key={props.type}>
          <h3>已经高效完成所有任务，喝杯咖啡歇歇吧，继续保持哦～</h3>
        </div>
      );
    case "doing":
      return (
        <div key={props.type}>
          <h3>暂无正在做的任务，赶快行动起来吧！</h3>
        </div>
      );
    case "done":
      return (
        <div key={props.type}>
          <h3>还没有做完的任务哦，要努力啊～</h3>
        </div>
      );
    default:
      return (
        <div>
          <h3>暂无相关任务</h3>
        </div>
      );
  }
}
export default Empty;
