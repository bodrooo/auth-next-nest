"use client";

import { Card, CardBody, CardHeader } from "@heroui/react";
import { LoginForm } from "./login-form";

export function Login() {
  return (
    <Card className="min-w-96 rounded-2xl bg-auto ">
      <CardHeader className="flex flex-col items-start">
        <h1 className="text-2xl font-bold">Login Page</h1>
        <p className="font-bold">Login Page v1</p>
      </CardHeader>
      <CardBody>
        <LoginForm />
      </CardBody>
    </Card>
  );
}
