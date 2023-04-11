import { useAuth } from "context/auth-context";
import React, { FormEvent } from "react";
import { Button, Form, Input } from "antd";
import { LongButton } from "unauthencated-app";
import { useAsync } from "utils/use-async";
import { useDispatch } from "react-redux";

const apiUrl = process.env.REACT_APP_API_URL;

// 鸭子类型 ，面向接口编程 ，而不是面向对象编程
export const LoginScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { login, user } = useAuth();
  // XMLHttpRequest 发送post请求可以拿到请求对象
  const requestFunc = () => {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3001/login");
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify({ username: "sola", password: "123" }));
    xhr.addEventListener("load", function () {
      console.log(this.response);
    });
  };
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });
  const dispatch = useDispatch();
  //   const login = (param: { username: string; password: string }) => {
  //     // requestFunc()
  //     fetch(`${apiUrl}/login`, {
  //       method: "post",
  //       body: JSON.stringify(param),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }).then(async (response) => {
  //       if (response.ok) {
  //       }
  //     });
  //   };
  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      await run(login(values));
    } catch (e) {
      onError(e as Error);
    }
  };
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder="用户名" type="text" id="username" />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder="密码" type="password" id="password" />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType="submit" type="primary">
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};
