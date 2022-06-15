import React, { Component } from "react";
import { getAllStudents } from "./client";
import AddStudentForm from "./forms/AddStudentForm";
import { Table, Avatar, Spin, Modal, Empty, Button,PageHeader,} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Container from "./Container";
import { errorNotification } from "./Notification";
import Footer from "./Footer";
import EditStudentForm from "./forms/EditStudentForm";


const getIndicatorIcon = () => (
  <LoadingOutlined style={{ fontSize: 144, color: "gray" }} />
);
const color = "#f56a00";
const gap = 4;

class Data extends Component {
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
      .then( res => res.json()
      .then(students => {
          this.setState({
            students,
            isFetching: false,
          });
        }))
        // IF WE CANT FETCH STUDENT FROM BACKEND OR NO STUDENTS HAVE BEEN FOUND :
      .catch( error => {
        console.log(error.error);
        const message = error.message;
        const description = error.message;
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
        <Modal
          title="Add new student"
          visible={isAddStudentModalVisible}
          onOk={this.closeAddStudentModal}
          onCancel={this.closeAddStudentModal}
          width={1000}
        >
          <AddStudentForm
            onSuccess={() => {
              this.closeAddStudentModal();
              this.fetchStudents();
            }}
            onFailure={(error) => {
              const message = error.error.message;
              const description = error.error.httpStatus;
              errorNotification(message, description);
            }}
          />
        </Modal>

        <Modal
          title="Edit"
          visible={this.state.isEditStudentModalVisible}
          onOk={this.closeEditStudentModal}
          onCancel={this.closeEditStudentModal}
          width={1000}
        >
          {/* <PageHeader title={`${this.state.selectedStudent.studentId}`} /> */}

          <EditStudentForm
            initialValues={this.state.selectedStudent}
            submitter={this.updateStudentFormSubmitter}
          />
        </Modal>

        <Footer handleAddStudentClickEvent={this.openAddStudentModel}> </Footer>

      </div>
    );


    if (isFetching) {
      return (
        <Container>
          <Spin indicator={getIndicatorIcon()} />
        </Container>
      );
    }
    if (students && students.length) {
      // const precolumns = [
      //   {
      //     title: "total",
      //     key: "total",
      //     render: () => (
      //       <div>toto</div>

      //       { ? (
      //         <Avatar
      //           style={{ backgroundColor: "ffffff", marginRight: "19px" }}
      //           size="large"
      //         >
      //           {props.numberOfStudents}
      //         </Avatar>
      //       ) : null}
      //     ),
      //   },

      // ];
      // if(props.numberOfStudents !== undefined) {

      console.log(students.length);
      const columns = [
        {
          render: () => (
            <Avatar style={{ backgroundColor: "ffffff" }} size="large">
              {students.length}
            </Avatar>
          ),
          // title: "Other",
          title: (
            <Button type="dashed" shape="round">
              {" "}
              Total students : {students.length}{" "}
            </Button>
          ),

          children: [
            {
              title: "Icon",
              align: "center",
              key: "avatar",
              render: (text, student) => (
                <Avatar
                  style={{ backgroundColor: color, verticalAlign: "middle" }}
                  size="large"
                  gap={gap}
                >
                  {`${student.firstName[0]}${student.lastName[0]}`}
                </Avatar>
              ),
            },
            {
              title: "Student Id",
              dataIndex: "studentId",
              key: "studentId",
              align: "center",
            },
            {
              title: "First Name",
              dataIndex: "firstName",
              key: "firstName",
              align: "center",
            },
            {
              title: "Last Name",
              dataIndex: "lastName",
              key: "lastName",
              align: "center",
            },
            {
              title: "E-mail",
              dataIndex: "email",
              key: "email",
              align: "center",
            },

            {
              title: "Gender",
              dataIndex: "gender",
              key: "gender",
              align: "center",
            },

            {
              title: "Action",
              align: "center",
              key: "action",

              render: (text, student) => (
                <>
                  <Button
                    shape="round"
                    type="primary"
                    style={{ backgroundColor: "#40c78a" }}
                  >
                    {/* {`${student.firstName[0]}${student.lastName[0]}`} */}
                    Edit
                  </Button>

                  <Button shape="round" danger style={{ marginLeft: "20px" }}>
                    {/* {`${student.firstName[0]}${student.lastName[0]}`} */}
                    Delete
                  </Button>
                </>
              ),
            },
          ],
        },
      ];

      return (
        <Container>
          <Table
            style={{ paddingLeft: "0px" }}
            dataSource={students}
            columns={columns}
            pagination={false}
            rowKey="studentId"
          />

          {/* the add student component from the method helper called commonElements() */}
          {commonElements()}
        </Container>
      );
    }
    return (
      <Container>
        <Empty description={<h1>Oops ... No Students found</h1>} />
        {commonElements()}

      </Container>
    );
  }
}
export default Data;
