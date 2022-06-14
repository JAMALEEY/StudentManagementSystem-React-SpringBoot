import React from "react";
import Container from "./Container";
import { Avatar, Button } from "antd";
import "./Footer.css";


const Footer = (props) => (
  <div className="footer">
    <Container>
      {/* {props.numberOfStudents !== undefined ? (
        <Avatar
          style={{ backgroundColor: "ffffff", marginRight: "19px" }}
          size="large"
        >
          {props.numberOfStudents}
        </Avatar>
      ) : null} */}
      <Button style={{ backgroundColor: "#2979ff" }} type="primary" shape="round" onClick={() => props.handleAddStudentClickEvent()}   >
        Add new student +
      </Button>
    </Container>
  </div>
);
export default Footer;
