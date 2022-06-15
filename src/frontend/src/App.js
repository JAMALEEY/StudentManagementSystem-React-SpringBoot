import React, { Component } from "react";
import "./App.css";
import { getAllStudents } from "./client";
import AddStudentForm from "./forms/AddStudentForm";
import { Table, Avatar, Spin, Modal, Empty, Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Container from "./Container";
import { errorNotification } from "./Notification";
import Sidebar from "./Sidebar";

const getIndicatorIcon = () => (
  <LoadingOutlined style={{ fontSize: 144, color: "gray" }} />
);
const color = "#f56a00";
const gap = 4;

class App extends Component {
  // adding the state
  state = {
    students: [],
    isFetching: false,
    isAddStudentModalVisible: false,
  };

  componentDidMount() {
    this.fetchStudents();
  }

  openAddStudentModel = () =>
    this.setState({
      isAddStudentModalVisible: true,
    });

  closeAddStudentModel = () =>
    this.setState({
      isAddStudentModalVisible: false,
    });

  fetchStudents = () => {
    this.setState({
      isFetching: true,
    });
    getAllStudents()
      .then((res) =>
        res.json().then((students) => {
          this.setState({
            students,
            isFetching: false,
          });
        })
      )
      .catch((error) => {
        const message = error.message;
        const description = error.error.message;

        errorNotification(message, description);
        this.setState({
          isFetching: false,
        });
      });
  };

  render() {
    const { students, isFetching, isAddStudentModalVisible } = this.state;
    const commonElements = () => (
      <div>
        <Sidebar>
        <Modal
          title="Add new student"
          visible={isAddStudentModalVisible}
          onOk={this.closeAddStudentModel}
          onCancel={this.closeAddStudentModel}
          width={1000}
        >
          <AddStudentForm
            onSuccess={() => {
              this.closeAddStudentModel();
              this.fetchStudents();
            }}
            onFailure={(error) => {
              const message = error.error.message;
              const description = error.error.httpStatus;
              errorNotification(message, description);
              // this.closeAddStudentModel();
              // this.fetchStudents();
            }}
          />
        </Modal>
        </Sidebar>
      </div>
    );

      // return students.map(
      //   (student, index) => {
      // return (
      // while working with map in react each key should be unique on the component !
      //     <div key = { index }>
      //       <h2>{ student.studentId }</h2>
      //       <p> { student.firstName} </p>
      //       <p> { student.lastName} </p>
      //       <p> { student.gender} </p>
      //       <p> { student.email} </p>

      //     </div>
      // )
      // }
    
    // using empty from antd
    return (
      <div>
      <Empty description={<h1>No Student found</h1>} />
      {commonElements()}
      </div>
    );
}
}

export default App;
