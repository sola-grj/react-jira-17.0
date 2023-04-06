import { Table, TableProps } from "antd";
import dayjs from "dayjs";
import { title } from "process";
import React from "react";
import { Link } from "react-router-dom";
import { User } from "./search-pannel";
export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: string;
  organization: string;
  created: number;
}
interface ListProps extends TableProps<Project> {
  // list: Project[];
  users: User[];
}
export const List = ({ users, ...props }: ListProps) => {
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: "名称",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name as string),
          render(value, project) {
            return (
              <Link to={`/projects/${String(project.id)}`}>{project.name}</Link>
            );
          },
        },
        {
          title: "部门",
          dataIndex: "organization",
        },
        {
          title: "负责人",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === Number(project.personId))
                  ?.name || "未知"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
        },
      ]}
      {...props}
    />
  );
};
