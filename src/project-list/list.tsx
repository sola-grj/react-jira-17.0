import React from "react";
import { User } from "./search-pannel";
interface Project {
  id:String;
  name:String;
  personId:String;
  pin:String;
  organization:String;
}
interface ListProps {
  list:Project[],
  users:User[]
}
export const List = ({ list, users }:ListProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {list.map((project:any) => (
          <tr key={project.id}>
            <td>{project.name}</td>
            <td>
              {users.find((user: { id: String; }) => user.id === project.personId)?.name ||
                "未知"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
