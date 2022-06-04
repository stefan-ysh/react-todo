import "./index.css";
import React from "react";
// function Empty(props: any) {
//   let srcTodo = require("@/assets/images/todo.png"),
//     srcDoing = require("@/assets/images/doing.png"),
//     srcDone = require("@/assets/images/done.png");
//   switch (props.type) {
//     case "todo":
//       return (
//         <div className="empty-tip-wrap" key={props.type}>
//           <img className="tip-img" src={srcTodo} alt="" />
//           <h4 className="tip-text">
//             已经高效完成所有任务，喝杯咖啡歇歇吧，继续保持哦～
//           </h4>
//         </div>
//       );
//     case "doing":
//       return (
//         <div className="empty-tip-wrap" key={props.type}>
//           <img className="tip-img" src={srcDoing} alt="" />
//           <h4 className="tip-text">暂无正在做的任务，赶快行动起来吧！</h4>
//         </div>
//       );
//     case "done":
//       return (
//         <div className="empty-tip-wrap" key={props.type}>
//           <img className="tip-img" src={srcDone} alt="" />
//           <h4 className="tip-text">还没有做完的任务哦，要努力啊～</h4>
//         </div>
//       );
//     default:
//       return (
//         <div className="empty-tip-wrap">
//           <h4 className="tip-text">暂无相关任务</h4>
//         </div>
//       );
//   }
// }

class Empty extends React.Component<any> {
  render() {
    let srcTodo = require("@/assets/images/todo.png"),
      srcDoing = require("@/assets/images/doing.png"),
      srcDone = require("@/assets/images/done.png");
    switch (this.props.type) {
      case "todo":
        return (
          <div className="empty-tip-wrap" key={this.props.type}>
            <img className="tip-img" src={srcTodo} alt="" />
            <h4 className="tip-text">
              已经高效完成所有任务，喝杯咖啡歇歇吧，继续保持哦～
            </h4>
          </div>
        );
      case "doing":
        return (
          <div className="empty-tip-wrap" key={this.props.type}>
            <img className="tip-img" src={srcDoing} alt="" />
            <h4 className="tip-text">暂无正在做的任务，赶快行动起来吧！</h4>
          </div>
        );
      case "done":
        return (
          <div className="empty-tip-wrap" key={this.props.type}>
            <img className="tip-img" src={srcDone} alt="" />
            <h4 className="tip-text">还没有做完的任务哦，要努力啊～</h4>
          </div>
        );
      default:
        return (
          <div className="empty-tip-wrap">
            <h4 className="tip-text">暂无相关任务</h4>
          </div>
        );
    }
  }
}
export default Empty;
