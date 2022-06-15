import React, {Component} from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  LoadingOutlined
} from '@ant-design/icons';
import { Layout, Menu, Modal, PageHeader, notification} from 'antd';
import Data from './Data';
import AddStudentForm from './forms/AddStudentForm';
import EditStudentForm from './forms/EditStudentForm';
import { errorNotification } from './Notification';
import Footer from './Footer';
import './Sidebar.css';
import Container from './Container';



const { Header, Sider, Content } = Layout;
//  THE LOADING FROM ANTD INSTANTIATION
const getIndicatorIcon = () =><LoadingOutlined style={{ fontSize: 144, color: 'gray' }} /> 

class Sidebar extends Component {

 
    state = {
      collapsed: false
    };

  


  render() {
    const { collapsed } = this.state;



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
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => {
              this.setState({
                collapsed: !collapsed
              });
            }, 
          })}
        </Header>

          <Content className="site-layout-background">
            <Data>

            </Data>

          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Sidebar;
