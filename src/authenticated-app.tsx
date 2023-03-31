import styled from "@emotion/styled";
import { Row } from "component/lib";
import { useAuth } from "context/auth-context";
import React from "react";
import { ProjectListScreen } from "screens/project-list";
import { ReactComponent as SoftWareLogo } from "assets/software-logo.svg";
import { Dropdown, Menu, Button } from "antd";

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
  const { logout, user } = useAuth();
  const value: any = undefined;
  return (
    <Container>
      {/* {value.notExist} */}
      <Header between={true}>
        <HeaderLeft gap={true}>
          <SoftWareLogo width={"18rem"} color={"rgb(38,132,255)"} />
          <h2>项目</h2>
          <h2>用户</h2>
        </HeaderLeft>
        <HeaderRight>
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
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  );
};

const HeaderItem = styled.h2;

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
