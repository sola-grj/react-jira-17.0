import React from "react";
import { SearchPannel } from "./search-pannel";
import { List } from "./list";
import { useEffect, useState } from "react";
import { cleanObject, useDebounce, useMount } from "utils";
import * as qs from "qs";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);

  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debounceParam = useDebounce(param, 200);
  const [list, setList] = useState([]);
  const client = useHttp();

  useEffect(() => {
    client("projects", {
      data: cleanObject(debounceParam),
    }).then(setList);
    // fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`).then(
    //   async (response) => {
    //     if (response.ok) {
    //       setList(await response.json());
    //     }
    //   }
    // );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceParam]);
  useMount(() => {
    client("users").then(setUsers);
    // fetch(`${apiUrl}/users`).then(async (response) => {
    //   if (response.ok) {
    //     setUsers(await response.json());
    //   }
    // });
  });
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPannel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
