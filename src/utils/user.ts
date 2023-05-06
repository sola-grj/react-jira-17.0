import { useEffect } from "react";
import { useQuery } from "react-query";
import { Project } from "types/Project";
import { User } from "types/User";
import { cleanObject } from "utils";
import { useHttp } from "./http";

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();
  return useQuery<User[]>(["users", param], () =>
    client("users", { data: param })
  );
};
