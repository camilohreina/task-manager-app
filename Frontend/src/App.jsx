import "./App.css";
import { Route } from "wouter";
import { Login } from "./pages/Login";
import { Tasks } from "./pages/Tasks";

const App = () => (
  <div>
    <Route path="/" component={Login} />
    <Route path="/tasks" component={Tasks} />
  </div>
);

export default App;
