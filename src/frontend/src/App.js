import React, { Component } from "react";
import "./App.css";
import { getAllStudents } from "./client";
import {
  Table,
  Avatar,
  Spin
} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Container from "./Container";
const getIndicatorIcon = () =><LoadingOutlined style={{ fontSize: 144, color: 'gray' }} /> 


class App extends Component {

  // adding the state
  state = {
    students: [],
    isFetching: false
  };

  componentDidMount () {
    this.fetchStudents();
  }

  fetchStudents = () => {
    this.setState(
      {
        isFetching: true
      }
    );
    getAllStudents().then((res) =>
      res.json().then((students) => {
        console.log(students);
        this.setState({
          students,
          isFetching: false
        });
      })
    );
  }

  render() {
    const { students, isFetching } = this.state;
    if(isFetching) {
      return (
        <Container>
          <Spin indicator={getIndicatorIcon()} />
        </Container>
      );
    }
    if(students && students.length) {
      const columns = [
        {
          title: '',
          key: 'avatar',
          render: (text, student) => (
            <Avatar size='large'>
                {`${student.firstName.charAt(0).toUpperCase} ${student.lastName.charAt(0).toUpperCase}`}
            </Avatar>
        )
      },
        {
          title: 'Student Id',
          dataIndex: 'studentId',
          key: 'studentId'
        },
        {
          title: 'First Name',
          dataIndex: 'firstName',
          key: 'firstName'
        },
        {
          title: 'Gender',
          dataIndex: 'gender',
          key: 'gender'
        }
        ];

        return (
        <Container>
          <Table 
          dataSource={ students } 
          columns = { columns }
          pagination = {false}
          rowKey = 'studentId' />
        </Container>
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
        }
    return <h1> NO STUDENTS HAS BEEN FOUND</h1>
  }
}

export default App;
