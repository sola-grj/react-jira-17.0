import styled from "@emotion/styled";
import { Button, Divider, List, Popover, Typography } from "antd";
import { ButtonNoPadding } from "component/lib";
import React from "react";
import { useProjectModal } from "screens/project-list/util";
import { useProject } from "utils/project";
import { useUsers } from "utils/user";

export const UserPopover = () => {
  const { data: users, refetch } = useUsers();
  const content = (
    <ContentContainer>
      <Typography.Text type={"secondary"}>组员列表</Typography.Text>
      <List>
        {users?.map((user) => (
          <List.Item key={user.id}>
            <List.Item.Meta title={user.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
    </ContentContainer>
  );
  return (
    <Popover
      onOpenChange={() => refetch()}
      placement={"bottom"}
      content={content}
    >
      <span>组员</span>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;
