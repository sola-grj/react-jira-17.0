import styled from "@emotion/styled";
import { ButtonNoPadding, Row } from "component/lib";
import { useAuth } from "context/auth-context";
import React, { useState } from "react";
import { ProjectListScreen } from "screens/project-list";
import { ReactComponent as SoftWareLogo } from "assets/software-logo.svg";
import { Dropdown, Menu, Button } from "antd";
import { BrowserRouter as Router } from "react-router-dom";
import { Navigate, Route, Routes } from "react-router";
import { ProjectScreen } from "screens/project";
import { resetRoute } from "utils";
import { ProjectModal } from "screens/project-list/project-modal";
import { ProjectPopover } from "screens/project-list/project-popover";

/*
 grid和flex各自应用场景
  1.要考虑是一维布局还是二维部剧
  一般来说，一维布局用flex，二维布局用grid
  2.是从内容出发还是从布局出发
  从内容出发：你先有一组内容（数量一般不固定），然后希望他们均匀的分布在容器中，由内容自己的大小决定占据的空间
  从布局出发：先规划网格（数量固定），然后再把元素往里填充
  从内容出发用flex
  从布局出发用gird
 */

export const AuthenticatedApp = () => {
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  return (
    <Container>
      <PageHeader setProjectModalOpen={setProjectModalOpen} />
      <Main>
        <Router>
          <Routes>
            <Route
              path="/projects"
              element={
                <ProjectListScreen setProjectModalOpen={setProjectModalOpen} />
              }
            />
            <Route path="/projects/:projectId/*" element={<ProjectScreen />} />
            <Route
              path="*"
              element={<Navigate to="/projects" replace={true} />}
            />
          </Routes>
        </Router>
      </Main>
      <ProjectModal
        projectModalOpen={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
      />
    </Container>
  );
};
const PageHeader = (props: {
  setProjectModalOpen: (isOpen: boolean) => void;
}) => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <ButtonNoPadding
          style={{ padding: 0 }}
          type="link"
          onClick={resetRoute}
        >
          <SoftWareLogo width={"18rem"} color={"rgb(38,132,255)"} />
        </ButtonNoPadding>
        <ProjectPopover setProjectModalOpen={props.setProjectModalOpen} />
        <span>用户</span>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  );
};
const HeaderItem = styled.h2;

const User = () => {
  const { logout, user } = useAuth();
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={"logout"}>
            <Button onClick={logout} type={"link"}>
              登出
            </Button>
          </Menu.Item>
        </Menu>
      }
    >
      <Button type={"link"}>Hi,{user?.name}</Button>
    </Dropdown>
  );
};
// 暂时性死区
const Container = styled.div`
  display: grid;
  /* 左 20rem 中 自适应 右 20rem */
  /* grid-template-columns: 20rem 1fr 20rem; */
  /* 上 6rem 中 自适应 下 6rem */
  grid-template-rows: 6rem 1fr 6rem;
  /* gird布局排列样式 */
  /* grid-template-areas:
    "header header header"
    "nav main aside"
    "footer footer footer"; */
  height: 100vh;
  /* gird之间的间距 */
  /* grid-gap: 10rem; */
`;
const Header = styled(Row)`
  /* grid-area: header; */
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.main`
  /* grid-area: main; */
`;
