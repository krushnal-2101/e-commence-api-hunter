import React from "react";

const Error = ({ message }) => {
  return <p className="d-flex flex-column justify-content-center align-items-center vh-100 text-danger bg-dark fs-5"  >{message}</p>;
};

export default Error;