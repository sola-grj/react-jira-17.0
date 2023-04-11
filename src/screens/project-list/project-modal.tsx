import { Button, Drawer } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  ProjectListActions,
  selectProjectModalOpen,
} from "./project-list-slice";

export const ProjectModal = () => {
  const dispatch = useDispatch();
  const projectModalOpen = useSelector(selectProjectModalOpen);
  return (
    <Drawer
      onClose={() => dispatch(ProjectListActions.closeProjectModal())}
      open={projectModalOpen}
      width={"100%"}
    >
      <h1>project modal</h1>
      <Button onClick={() => dispatch(ProjectListActions.closeProjectModal())}>
        close
      </Button>
    </Drawer>
  );
};
