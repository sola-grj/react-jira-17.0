/** @jsxRuntime classic */
/**  @jsx jsx */
import { jsx } from "@emotion/react";
import { Form, Input, Select } from "antd";
import React from "react";
import { useEffect, useState } from "react";

export interface User {
  [x: string]: any;
  id: string;
  name: string;
  email: string;
  title: string;
  orgnization: string;
  token: string;
}

interface SearchPannelProps {
  users: User[];
  param: {
    name: string;
    personId: string;
  };
  setParam: (param: SearchPannelProps["param"]) => void;
}

export const SearchPannel = ({ users, param, setParam }: SearchPannelProps) => {
  return (
    <Form style={{ marginBottom: "2rem" }} layout="inline">
      {/* setParam(Object.assign({},param,{name:evt.target.value})) */}
      <Form.Item>
        <Input
          placeholder="项目名"
          type="text"
          value={param.name}
          onChange={(evt) =>
            setParam({
              ...param,
              name: evt.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <Select
          value={param.name}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value,
            })
          }
        >
          <Select.Option value="">负责人</Select.Option>
          {users.map((user) => (
            <Select.Option key={user.id} value={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};
