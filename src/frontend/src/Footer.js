import React from "react";
import Container from "./Container";
import { Button } from "antd";
import "./Footer.css";


const Footer = (props) => (
  <div className="footer">
    <Container>
      <Button 
      style={{ backgroundColor: "#2979ff" }} 
      type="primary" 
      shape="round" 
      onClick={() => props.handleAddStudentClickEvent()}
      >
        Add new student +
      </Button>
    </Container>
  </div>
);
export default Footer;
