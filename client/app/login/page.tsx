import React from "react";
import { redirect, useRouter } from "next/navigation";
import LoginForm from "@/components/LoginForm/Form";
import isAuthorized from "../utils/isAuthorized";

export enum Roles {
  BIKER = "bikers",
  Sender = "senders",
}

const Login = async () => {
  // const isLogged = await isAuthorized();
  // if (isLogged) redirect("/main");
  return <LoginForm />;
};

export default Login;
