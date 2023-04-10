import { Button, Drawer } from "antd";
import React from "react";

export const ProjectModal = (props: {
  projectModalOpen: boolean | undefined;
  onClose: () => void;
}) => {
  return (
    <Drawer
      onClose={props.onClose}
      open={props.projectModalOpen}
      width={"100%"}
    >
      <h1>project modal</h1>
      <Button onClick={props.onClose}>close</Button>
    </Drawer>
  );
};
