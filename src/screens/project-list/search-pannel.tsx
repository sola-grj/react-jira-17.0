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
    <form action="">
      {/* setParam(Object.assign({},param,{name:evt.target.value})) */}
      <div>
        <input
          type="text"
          value={param.name}
          onChange={(evt) =>
            setParam({
              ...param,
              name: evt.target.value,
            })
          }
        />
      </div>
      <select
        value={param.name}
        onChange={(evt) =>
          setParam({
            ...param,
            personId: evt.target.value,
          })
        }
      >
        <option value="">负责人</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </form>
  );
};
