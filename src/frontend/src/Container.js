import React from "react";
export const Container = props => (
    <div style = {{width: '1334px', margin:'0 auto', textAlign:'center' }}>
        {props.children}
    </div>
);
export default Container;