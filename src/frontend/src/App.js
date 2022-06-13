import React, { Component } from "react";
import "./App.css";
import { getAllStudents } from "./client";
import {
  Table,
  Avatar,
  Spin
} from 'antd';
import Footer from "./Footer";
import { LoadingOutlined } from '@ant-design/icons';
import Container from "./Container";
const getIndicatorIcon = () =><LoadingOutlined style={{ fontSize: 144, color: 'gray' }} /> 
const color = '#f56a00';
const gap = 4;



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
            <Avatar style={{ backgroundColor: color, verticalAlign: 'middle' }} size="large" gap={gap}>
                {`${student.firstName[0]}${student.lastName[0]}`}
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
          title: 'Last Name',
          dataIndex: 'lastName',
          key: 'lastName'
        },
        {
          title: 'E-mail',
          dataIndex: 'email',
          key: 'email'
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
          <Footer numberOfStudents={students.length}></Footer>
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
