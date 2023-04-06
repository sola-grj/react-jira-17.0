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
import { useProjectsSearchParams } from "./util";

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);
  // 基本类型，可以放到依赖里面，组件状态，可以放到依赖里面，非组件状态，绝对不能放在依赖里面
  // const [param, setParam] = useProjectsSearchParams();
  // const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  // const denounceParam = useDebounce(param, 200);
  const [param, setParam] = useProjectsSearchParams();
  const {
    isLoading,
    error,
    data: list,
    retry,
  } = useProject(useDebounce(param, 200));
  const { data: users } = useUsers();

  return (
    <Container>
      <h1>项目列表</h1>
      {/* 方案一 react-helmet */}
      {/* <Helmet>
        <title>项目列表</title>
      </Helmet> */}
      <SearchPannel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}
      <List
        refresh={retry}
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
