import React from "react";
import LoginForm from "@/components/LoginForm/LoginForm";

export enum Roles {
  BIKER = "bikers",
  Sender = "senders",
}

const Login = async () => {
  return <LoginForm />;
};

export default Login;
