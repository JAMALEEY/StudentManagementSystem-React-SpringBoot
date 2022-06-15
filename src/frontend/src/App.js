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
  // adding the state
  // state = {
  //   students: [],
  //   isFetching: false,
  //   isAddStudentModalVisible: false,
  // };

  // componentDidMount() {
  //   this.fetchStudents();
  // }

  // openAddStudentModel = () =>
  //   this.setState({
  //     isAddStudentModalVisible: true,
  //   });

  // closeAddStudentModel = () =>
  //   this.setState({
  //     isAddStudentModalVisible: false,
  //   });

  // fetchStudents = () => {
  //   this.setState({
  //     isFetching: true,
  //   });
  //   getAllStudents()
  //     .then((res) =>
  //       res.json().then((students) => {
  //         this.setState({
  //           students,
  //           isFetching: false,
  //         });
  //       })
  //     )
  //     .catch((error) => {
  //       const message = error.message;
  //       const description = error.error.message;

  //       errorNotification(message, description);
  //       this.setState({
  //         isFetching: false,
  //       });
  //     });
  // };

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
