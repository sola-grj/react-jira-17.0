import { Dropdown, Menu, Modal, Table, TableProps } from "antd";
import { ButtonNoPadding } from "component/lib";
import { Pin } from "component/pin";
import dayjs from "dayjs";
import { title } from "process";
import React from "react";
import { Link } from "react-router-dom";
import { useDeleteProject, useEditProject } from "utils/project";
import { Project } from "../../types/Project";
import { User } from "../../types/User";
import { useProjectModal, useProjectsQueryKey } from "./util";
interface ListProps extends TableProps<Project> {
  // list: Project[];
  users: User[];
  projectButton: JSX.Element;
}
export const List = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject(useProjectsQueryKey());
  // 函数式编程之 柯里化 优先知道了id，后续传入才知道的pin参数
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin });

  // const items = [
  //   {
  //     label: <ButtonNoPadding type="link">编辑</ButtonNoPadding>,
  //     key: "edit",
  //   },
  //   {
  //     label: (
  //       <ButtonNoPadding type="link" onClick={open}>
  //         删除
  //       </ButtonNoPadding>
  //     ),
  //     key: "delete",
  //   }, // 菜单项务必填写 key
  // ];

  return (
    <Table
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={pinProject(project.id)}
              />
            );
          },
        },
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
        {
          render(value, project) {
            return <More project={project} />;
          },
        },
      ]}
      {...props}
    />
  );
};

const More = ({ project }: { project: Project }) => {
  const { startEdit } = useProjectModal();
  const editProject = (id: number) => () => startEdit(id);
  const { mutate: deleteProject } = useDeleteProject(useProjectsQueryKey());
  const confirmDeleteProject = (id: number) => {
    Modal.confirm({
      title: "确定删除这个项目吗？",
      content: "点击确定删除",
      okText: "确定",
      onOk() {
        deleteProject({ id });
      },
    });
  };
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item onClick={editProject(project.id)} key={"edit"}>
            编辑
          </Menu.Item>
          <Menu.Item
            onClick={() => confirmDeleteProject(project.id)}
            key={"delete"}
          >
            删除
          </Menu.Item>
        </Menu>
      }
    >
      <ButtonNoPadding type="link">...</ButtonNoPadding>
    </Dropdown>
  );
};
