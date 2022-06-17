import React, { Component, Fragment } from "react";
import Container from "./Container";
import {
  Empty,
  Icon,
  Popconfirm,
  notification,
  Spin,
  Avatar,
  Button,
  Modal,
  PageHeader,
  Table,
} from "antd";
import { LoadingOutlined, DeleteOutlined, EditOutlined, FolderViewOutlined } from "@ant-design/icons";
import {
  getAllStudents,
  updateStudent,
  deleteStudent,
  getStudentCourse,
} from "./client";
import { errorNotification, succesNotification } from "./Notification";
import {AddStudentForm} from "./forms/AddStudentForm";
import EditStudentForm from "./forms/EditStudentForm";
import Footer from "./Footer";

//  THE LOADING FROM ANTD INSTANTIATION
const getIndicatorIcon = () => (
  <LoadingOutlined style={{ fontSize: 144, color: "gray" }} />
);
const color = "#f56a00";
const gap = 4;

const openNotification = () => {
  notification.open({
    message: 'Notification Title',
    description:
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
};


class Data extends Component {
  state = {
    students: [],
    studentCourses: [],
    isFetching: false,
    selectedStudent: {},
    viewedStudent: {},
    isAddStudentModalVisisble: false,
    isEditStudentModalVisible: false,
    isViewStudentModalVisible: false,
  };

  // The method to trigger the modal in footer to add new student
  openAddStudentModal = () =>
    this.setState({ isAddStudentModalVisisble: true });
  //  METHODS THAT RESIDES INSIDE THE MODAL :
  closeAddStudentModal = () =>
    this.setState({ isAddStudentModalVisisble: false });
  openEditStudentModal = (selectedStudent) => {
    this.setState({ selectedStudent });
    this.setState({ isEditStudentModalVisible: true });
  };
  closeEditStudentModal = () =>
    this.setState({ isEditStudentModalVisible: false });
  openViewStudentModal = (viewedStudent) => {
    this.setState({ viewedStudent });
    this.setState({ isViewStudentModalVisible: true });
    this.fetchStudentCourses(viewedStudent);
  };
  closeViewStudentModal = () =>
    this.setState({ isViewStudentModalVisible: false });

  openNotificationWithIcon = (type, message, description) =>
    notification[type]({ message, description });

  lkod = () => {
    this.closeEditStudentModal();
    this.setState({ selectedStudent: {} });
    window.location.reload();
  };

  closeView = () => {
    this.closeViewStudentModal();
    this.setState({ viewedStudent: {} });
    window.location.reload();
  };

  // on init (on rendering the HTML I order the fetchStudents method to be invoked !)
  componentDidMount() {
    this.fetchStudents();
  }

  // WHEN HANDLING RESPONSE PROMISE ERRORS I WORK WITH NOTIFICATION FROM ANTD
  openNotificationWithIcon = (type, message, description) =>
    notification[type]({ message, description });

  fetchStudents = () => {
    this.setState({
      isFetching: true,
    });
    getAllStudents()
      .then((res) =>
        res.json().then((students) => {
          console.log(res);
          // console.log(students);
          this.setState({
            students,
            isFetching: false,
          });
        })
      )
      .catch((error) => {
        console.log({ error });
        const message = error.message;
        const description = "The server couldn't load your Data";
        errorNotification(message, description);
        this.setState({
          isFetching: false,
        });
      });
  };

  fetchStudentCourses = (student) => {
    const myId = student.studentId;
    getStudentCourse(myId)
      .then((res) =>
        res.json().then((studentCourses) => {
          console.log("here");
          console.log(res);
          this.setState({
            studentCourses,
          });
          console.log("salam");
          console.log(studentCourses);
        })
      )
      .catch((error) => {
        console.log({ error });
        const message = error.message;
        const description = "The server couldn't load your Data";
        errorNotification(message, description);
        this.setState({
          isFetching: false,
        });
      });
  };

  updateStudentFormSubmitter = (student) => {
    console.log(student);
    updateStudent(student.studentId, student)
      .then(() => {
        this.openNotificationWithIcon(
          "success",
          "Student updated",
          `${student.firstName} was updated successfully !`
        );
        this.closeEditStudentModal();
        this.fetchStudents();
      })
      .catch((err) => {
        console.error(err.error);
        this.openNotificationWithIcon(
          "error",
          "error",
          `(${err.error.status}) ${err.error.error}`
        );
      });
  };

  deleteStudent = (student) => {
    deleteStudent(student.studentId)
      .then(() => {
        this.openNotificationWithIcon(
          "success",
          "Student deleted",
          `${student.firstName} was deleted successfully !`
        );
        this.fetchStudents();
      })
      .catch((err) => {
        this.openNotificationWithIcon(
          "error",
          "error",
          `(${err.error.status}) ${err.error.error}`
        );
      });
  };

  

  render() {
    const {
      students,
      studentCourses,
      isFetching,
      isAddStudentModalVisisble,
      isEditStudentModalVisible,
      isViewStudentModalVisible,
    } = this.state;

    const updateModal = () => (
      <div>
        <Modal
          title="Edit"
          visible={isEditStudentModalVisible}
          onOk={this.closeEditStudentModal}
          onCancel={this.lkod}
          width={1000}
        >
          <h1>You're editing the student with following id: </h1>
          <PageHeader title={`${this.state.selectedStudent.studentId}`} />

          <EditStudentForm
            initialValues={this.state.selectedStudent}
            submitter={this.updateStudentFormSubmitter}
          />
        </Modal>
      </div>
    );

    const viewedColumns = [
      {
        title: "Student id",
        dataIndex: "studentId",
        key: "studentId",
      },
      {
        title: "Course name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Teacher assined",
        dataIndex: "department",
        key: "department",
      },
      {
        title: "Category",
        dataIndex: "teacherName",
        key: "teacherName",
      },
      {
        title: "Course started at",
        dataIndex: "startDate",
        key: "startDate",
      },
      { title: "Course end at", dataIndex: "endDate", key: "endDate" },
      { title: "Student grade", dataIndex: "grade", key: "grade" },

    ];

    const viewModal = () => (
      <div>
        <Modal
          title="View"
          visible={isViewStudentModalVisible}
          onOk={this.closeViewStudentModal}
          onCancel={this.closeView}
          width={1000}
        >
          <h1> </h1>
          <PageHeader title={ "You're viewing Information of the student :" + ` ${this.state.viewedStudent.firstName} ` + `${this.state.viewedStudent.lastName}` } />
          {/* <PageHeader title={`${JSON.stringify(this.state.studentCourses)}`} /> */}
            <Table
              style={{ paddingLeft: "0px", marginBottom: "100px" }}
              dataSource={studentCourses}
              columns={viewedColumns}
              pagination={false}
              rowKey="studentId"
            />
        </Modal>
      </div>
    );

    const commonElements = () => (
      <div>
        <Modal
          title="Add new student"
          visible={isAddStudentModalVisisble}
          onOk={this.closeAddStudentModal}
          onCancel={this.closeAddStudentModal}
          width={1000}
        >
          {/* I call the AddstudentForm component */}
          <AddStudentForm
            onSuccess={(student) => {
              // console.log('salam ' + JSON.stringify(student));
              this.closeAddStudentModal();
              this.fetchStudents();
              // this.openNotification();
              const message = "Bravo ! ";
              const description = "You created " + `${student.firstName}` + " successfully!";
              succesNotification(message, description);
            }}
            
            onFailure={(error) => {
              console.log({error});
              const message = error.message;
              const description = "Vous avez comis des erreur ... réessayer svp";
              errorNotification(message, description);
            }}
          />

        </Modal>
        <Footer handleAddStudentClickEvent={this.openAddStudentModal} />
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
      // console.log(students.length);
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
                    onClick={() => this.openEditStudentModal(student)}
                  >
                    <EditOutlined />
                    Edit
                  </Button>

                  <Fragment>
                    <Popconfirm
                      placement="topRight"
                      title={`Are you sure to delete ${student.studentId}`}
                      onConfirm={() => this.deleteStudent(student)}
                      okText="Yes"
                      cancelText="No"
                      onCancel={(e) => e.stopPropagation()}
                    >
                      <Button
                        shape="round"
                        danger
                        style={{ marginLeft: "20px" }}
                      >
                        <DeleteOutlined />
                        Delete
                      </Button>
                    </Popconfirm>
                  </Fragment>

                  <Button
                    shape="round"
                    primary
                    style={{ marginLeft: "20px" }}
                    onClick={() => this.openViewStudentModal(student)}
                  >
                    <FolderViewOutlined />
                    View
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
            style={{ paddingLeft: "0px", marginBottom: "100px" }}
            dataSource={students}
            columns={columns}
            pagination={false}
            rowKey="studentId"
          />
          {viewModal()}
          {commonElements()}
          {updateModal()}
        </Container>
      );

      // end if (students && students.length)
    }
    return (
      <Container>
        <Empty description={<h1>No Students found</h1>} />
        {commonElements()}
      </Container>
    );
  }
}

export default Data;
