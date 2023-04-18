import { Button, Drawer, Form, Input, Spin } from "antd";
import { useForm } from "antd/es/form/Form";
import { ErrorBox } from "component/lib";
import { UserSelect } from "component/user-select";
import React, { useEffect } from "react";
import { useAddProject, useEditProject } from "utils/project";
import { useProjectModal } from "./util";

export const ProjectModal = () => {
  const { projectModalOpen, close, editingProject, isLoading } =
    useProjectModal();
  console.log("---------", editingProject);
  const [form] = useForm();
  const title = editingProject ? "编辑项目" : "创建项目";
  if (!editingProject) {
    form.resetFields();
  }
  const useMutateProject = editingProject ? useEditProject : useAddProject;
  const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject();

  const onFinish = (values: any) => {
    mutateAsync({ ...editingProject, ...values }).then(() => {
      debugger;
      form.resetFields();
      close(editingProject);
    });
  };

  useEffect(() => {
    form.setFieldsValue(editingProject);
  }, [editingProject, form]);
  return (
    <Drawer
      forceRender
      onClose={() => close(editingProject)}
      open={projectModalOpen}
      width={"100%"}
    >
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <>
          <h1>{title}</h1>
          <ErrorBox error={error} />
          <Form
            form={form}
            layout="vertical"
            style={{ width: "40rem" }}
            onFinish={onFinish}
          >
            <Form.Item
              label="名称"
              name="name"
              rules={[
                {
                  required: true,
                  message: "请输入项目名称",
                },
              ]}
            >
              <Input placeholder="请输入项目名称" />
            </Form.Item>
            <Form.Item
              label="部门"
              name="organization"
              rules={[
                {
                  required: true,
                  message: "请输入部门名称",
                },
              ]}
            >
              <Input placeholder="请输入部门名称" />
            </Form.Item>
            <Form.Item label="负责人" name="personId">
              <UserSelect defaultOptionName="负责人" />
            </Form.Item>
            <Form.Item>
              <Button loading={mutateLoading} type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
      {/* <h1>project modal</h1>
      <Button onClick={close}>close</Button> */}
    </Drawer>
  );
};
