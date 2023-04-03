import React from "react";
import { SearchPannel } from "./search-pannel";
import { List } from "./list";
import { useEffect, useState } from "react";
import { cleanObject, useDebounce, useDocumentTitle, useMount } from "utils";
import * as qs from "qs";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useAsync } from "utils/use-async";
import { Project } from "screens/project-list/list";
import { useProject } from "utils/project";
import { useUsers } from "utils/user";
import { Helmet } from "react-helmet";
import { useUrlQueryParam } from "utils/url";

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  const [keys] = useState<("name" | "personId")[]>(["name", "personId"]);
  const [param, setParam] = useUrlQueryParam(keys);
  const debounceParam = useDebounce(param, 200);
  // const [list, setList] = useState([]);
  const { isLoading, error, data: list } = useProject(debounceParam);
  const { data: users } = useUsers();
  useDocumentTitle("项目列表", false);

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
      <List users={users || []} loading={isLoading} dataSource={list || []} />
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = false;

const Container = styled.div`
  padding: 3.2rem;
`;
