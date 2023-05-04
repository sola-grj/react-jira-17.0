/** @jsxRuntime classic */
/**  @jsx jsx */
import { jsx } from "@emotion/react";
import { Form, Input, Select } from "antd";
import { UserSelect } from "component/user-select";
import React from "react";
import { useEffect, useState } from "react";
import { Project } from "../../types/Project";
import { User } from "../../types/User";

interface SearchPannelProps {
  users: User[];
  param: Partial<Pick<Project, "name" | "personId">>;
  // param: {
  //   name: string;
  //   personId: string;
  // };
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
        <UserSelect
          defaultOptionName="负责人"
          value={param.personId}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value,
            })
          }
        />
        {/* <Select
          value={param.personId}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value,
            })
          }
        >
          <Select.Option value="">负责人</Select.Option>
          {users.map((user) => (
            <Select.Option key={user.id} value={String(user.id)}>
              {user.name}
            </Select.Option>
          ))}
        </Select> */}
      </Form.Item>
    </Form>
  );
};
