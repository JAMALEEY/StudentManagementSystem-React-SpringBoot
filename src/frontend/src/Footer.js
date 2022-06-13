import React from "react";
import Container from "./Container";
import { Avatar, Button } from "antd";
import './Footer.css';

const Footer = (props) => (
    <div className="footer">
        <Container>
            {props.numberOfStudents ? <Avatar style={{backgroundColor: 'rgb(245, 106, 0)', marginRight:'19px'}} size='large'>{props.numberOfStudents}</Avatar> : null}
            <Button type="primary">
                Add new student +
            </Button>
        </Container>
    </div>
);
export default Footer;