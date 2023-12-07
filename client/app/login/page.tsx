import React from "react";
import LoginForm from "@/components/Forms/LoginForm";

export enum Roles {
  BIKER = "bikers",
  Sender = "senders",
}

const Login = async () => {
  return <LoginForm />;
};

export default Login;
