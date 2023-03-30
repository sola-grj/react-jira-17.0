import { Table, TableProps } from "antd";
import dayjs from "dayjs";
import { title } from "process";
import React from "react";
import { User } from "./search-pannel";
export interface Project {
  id: String;
  name: String;
  personId: String;
  pin: String;
  organization: String;
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
        },
        {
          title: "部门",
          dataIndex: "organization",
          sorter: (a, b) => a.name.localeCompare(b.name as string),
        },
        {
          title: "负责人",
          render(value, project) {
            return (
              <span>
                {users.find(
                  (user: { id: String }) => user.id === project.personId
                )?.name || "未知"}
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
