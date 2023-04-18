import React from "react";
import { SearchPannel } from "./search-pannel";
import { List } from "./list";
import { useEffect, useState } from "react";
import { cleanObject, useDebounce, useDocumentTitle, useMount } from "utils";
import * as qs from "qs";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";
import { Button, Typography } from "antd";
import { useAsync } from "utils/use-async";
import { Project } from "screens/project-list/list";
import { useProject } from "utils/project";
import { useUsers } from "utils/user";
import { Helmet } from "react-helmet";
import { useUrlQueryParam } from "utils/url";
import { useProjectModal, useProjectsSearchParams } from "./util";
import { ButtonNoPadding, ErrorBox, Row } from "component/lib";

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  const { open } = useProjectModal();
  useDocumentTitle("项目列表", false);
  // 基本类型，可以放到依赖里面，组件状态，可以放到依赖里面，非组件状态，绝对不能放在依赖里面
  // const [param, setParam] = useProjectsSearchParams();
  // const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  // const denounceParam = useDebounce(param, 200);
  const [param, setParam] = useProjectsSearchParams();
  const { isLoading, error, data: list } = useProject(useDebounce(param, 200));
  const { data: users } = useUsers();

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding type="link" onClick={open}>
          创建项目1
        </ButtonNoPadding>
      </Row>

      {/* 方案一 react-helmet */}
      {/* <Helmet>
        <title>项目列表</title>
      </Helmet> */}
      <SearchPannel users={users || []} param={param} setParam={setParam} />
      <ErrorBox error={error} />
      <List
        projectButton={
          <ButtonNoPadding type="link" onClick={open}>
            创建项目
          </ButtonNoPadding>
        }
        users={users || []}
        loading={isLoading}
        dataSource={list || []}
      />
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = true;

const Container = styled.div`
  padding: 3.2rem;
`;
