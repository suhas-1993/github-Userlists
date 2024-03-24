import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Users from "./Components/userList";
import UserDetails from "./Components/userDetails";
import UserList from "./Components/userList";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" Component={UserList} />
          <Route path="/user/:username" Component={UserDetails} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
