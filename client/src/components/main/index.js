import React from "react";
import NavBar from "../navbar";

const Main = (props) => {
  return (
    <>
      <NavBar />
      <div>{props.children}</div>
    </>
  );
};

export default Main;
