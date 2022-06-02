import "./index.css";
import Index from "../../pages/Index";
import TodoList from "../../pages/TodoList";
// import { Switch, Route } from "react-router-dom";
const { Route, Switch } = require("react-router-dom");

function Content() {
  return (
    <div className="content">
      <Switch>
        <Route exact path={"/index"} component={Index}></Route>
        {/* <Route exact path={"/todo-list"} component={TodoList}></Route> */}
        <Route exact path={"/"} component={TodoList}></Route>
      </Switch>
    </div>
  );
}
export default Content;
