import React, { Component } from "react";
import "./App.css";
import { getAllStudents } from "./client";
import AddStudentForm from "./forms/AddStudentForm";
import { Table, Avatar, Spin, Modal, Empty, Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Container from "./Container";
import { errorNotification } from "./Notification";
import Sidebar from "./Sidebar";


class App extends Component {
 
  render() {
    return (
      <div>
        <Sidebar>

        </Sidebar>
        
      </div>
    );
  }
}

export default App;
