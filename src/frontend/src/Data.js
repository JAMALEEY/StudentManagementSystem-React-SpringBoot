import React, { Component, Fragment } from "react";
import Container from "./Container";
import { Empty, Icon, Popconfirm, notification, Spin, Avatar, Button, Modal, PageHeader, Table } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import {
  getAllStudents,
  updateStudent,
  deleteStudent
} from './client';
import { errorNotification } from './Notification';
import AddStudentForm from './forms/AddStudentForm';
import EditStudentForm from './forms/EditStudentForm';
import Footer from "./Footer";





//  THE LOADING FROM ANTD INSTANTIATION
const getIndicatorIcon = () =><LoadingOutlined style={{ fontSize: 144, color: 'gray' }} /> 
const color = "#f56a00";
const gap = 4;

class Data extends Component {

state = {
  students: [],
  isFetching: false,
  selectedStudent: {},
  isAddStudentModalVisisble: false,
  isEditStudentModalVisible: false,
};

  // The method to trigger the modal in footer to add new student
  openAddStudentModal = () => this.setState({isAddStudentModalVisisble: true})
  //  METHODS THAT RESIDES INSIDE THE MODAL :
  closeAddStudentModal = () => this.setState({isAddStudentModalVisisble: false})
  openEditStudentModal = () => this.setState({ isEditStudentModalVisible: true })
  closeEditStudentModal = () => this.setState({ isEditStudentModalVisible: false })
  openNotificationWithIcon = (type, message, description) => notification[type]({message, description});


  
    // on init (on rendering the HTML I order the fetchStudents method to be invoked !)
    componentDidMount () {
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
        this.setState({
          students,
          isFetching: false,
        });
      })
    )
    .catch((error) => {
      console.log({error});
      const message = error.message;
      const description = "The server couldn't load your Data";
      errorNotification(message, description);
      this.setState({
        isFetching: false,
      });
    });
};
// editUser = selectedStudent => {
//   console.log(selectedStudent.studentId);
//   this.setState({ selectedStudent });
  // this.setState({ isEditStudentModalVisible: true});
// }
  render() {

    const { students, isFetching, isAddStudentModalVisisble, isEditStudentModalVisible } = this.state;


    
    const updateModal = () => (

      <div> 
      <Modal
      
          title='Edit'
          visible={isEditStudentModalVisible}
          onOk={this.closeEditStudentModal}
          onCancel={this.closeEditStudentModal}
          width={1000} 
          
          >
          
            <PageHeader title={`${this.state.selectedStudent.studentId}`}/>
      
            <EditStudentForm 
              initialValues={this.state.selectedStudent} 
              submitter={this.updateStudentFormSubmitter}
            /> 


      
    </Modal>


    </div>
    )

    const commonElements = () => (
      <div>
        <Modal
          title='Add new student'
          visible={isAddStudentModalVisisble}
          onOk={this.closeAddStudentModal}
          onCancel={this.closeAddStudentModal}
          width={1000}>
            {/* I call the AddstudentForm component */}
          <AddStudentForm 
            onSuccess={() => {
              this.closeAddStudentModal(); 
              this.fetchStudents();
            }}
            onFailure={(error) => {
              console.log({error});
              const message = error.message;
              const description = "Vous avez comis des erreur ... réessayer svp";
              errorNotification(message, description);
            }}
          />
        </Modal>



        <Footer
          handleAddStudentClickEvent={this.openAddStudentModal}
        />  
      </div>
    )



    if (isFetching) {
      return (
        <Container>
          <Spin indicator={getIndicatorIcon()} />
        </Container>
      );
    }

    if (students && students.length) {
      console.log(students.length);
      const columns = [
        {
          render: () => (
            <Avatar
          style={{ backgroundColor: "ffffff"}}
          size="large"
        >
          {students.length}
        </Avatar>
          ),
          // title: "Other",
          title:  <Button type="dashed" shape="round" > Total students  :  {students.length} </Button> ,
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
              align:"center"
            },
            {
              title: "First Name",
              dataIndex: "firstName",
              key: "firstName",
              align:"center"
            },
            {
              title: "Last Name",
              dataIndex: "lastName",
              key: "lastName",
              align:"center"
            },
            {
              title: "E-mail",
              dataIndex: "email",
              key: "email",
              align:"center"
            },
            {
              title: "Gender",
              dataIndex: "gender",
              key: "gender",
              align:"center"
            },
            {
              title: "Action",
              align:"center",
              key: "action",
              
              render: (text, student) => (
                <>
                  <Button
                    shape="round"
                    type="primary"
                    style={{ backgroundColor: "#40c78a" }}  
                    onClick={() => this.updateModal()}                 >
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
          style={{ paddingLeft: "0px", marginBottom: "100px" }}
          dataSource={students}
          columns={columns}
          pagination={false}
          rowKey="studentId"
        />
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
    )
  }
}

export default Data;
