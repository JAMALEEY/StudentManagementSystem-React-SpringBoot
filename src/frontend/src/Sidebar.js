import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Menu,
  Table,
  Avatar,
  Spin,
  Icon,
  Modal,
  Empty,
  PageHeader,
  Button,
  notification,
  Popconfirm,
} from "antd";
import React, { Component, useState } from "react";
import AddStudentForm from "./forms/AddStudentForm";
import EditStudentForm from "./forms/EditStudentForm";
import { errorNotification } from "./Notification";

import "./Sidebar.css";
import Footer from "./Footer";
import Data from "./Data";
import Container from "./Container";
import { getAllStudents, updateStudent, deleteStudent } from "./client";

const { Header, Sider, Content } = Layout;
// const [collapsed, setCollapsed] = useState(false);

class Sidebar extends Component {
  state = {
    students: [],
    isFetching: false,
    selectedStudent: {},
    isAddStudentModalVisisble: false,
    isEditStudentModalVisible: false,
    collapsed: false,
    setCollapsed: false,
  };

  openAddStudentModel = () =>
  this.setState({
    isAddStudentModalVisible: true,
  });

  render() {
    const {
      students,
      isFetching,
      isAddStudentModalVisisble,
      collapsed,
      setCollapsed,
    } = this.state;
    
    const commonElements = () => (
      <div>
        <Modal
          title="Add new student"
          visible={isAddStudentModalVisisble}
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
          <PageHeader title={`${this.state.selectedStudent.studentId}`} />

          <EditStudentForm
            initialValues={this.state.selectedStudent}
            submitter={this.updateStudentFormSubmitter}
          />
        </Modal>

        <Footer handleAddStudentClickEvent={this.openAddStudentModel}> </Footer>

      </div>
    );

    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <UserOutlined />,
                label: "nav 1",
              },
              {
                key: "2",
                icon: <VideoCameraOutlined />,
                label: "nav 2",
              },
              {
                key: "3",
                icon: <UploadOutlined />,
                label: "nav 3",
              },
            ]}
          />
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
          </Header>

          <Content
            className="site-layout-background"
            // style={{
            //   margin: '24px 16px',
            //   padding: 24,
            //   minHeight: 280,
            // }}
          >
            <Data></Data>
            {/* ENSURE THE MODAL LOGIC */}
            {commonElements()}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Sidebar;
