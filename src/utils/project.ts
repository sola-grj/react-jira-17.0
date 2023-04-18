import { useAsync } from "./use-async";
import { Project } from "screens/project-list/list";
import { useCallback, useEffect } from "react";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useProject = (param?: Partial<Project>) => {
  const client = useHttp();
  return useQuery<Project[]>(["projects", param], () =>
    client("projects", { data: param })
  );
};

export const useEditProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};

export const useAddProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        data: params,
        method: "POST",
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};

export const useProjectDetail = (id?: number) => {
  const client = useHttp();
  return useQuery<Project>(
    ["project", { id }],
    () => client(`projects/${id}`),
    {
      enabled: !!id, // Boolean(id)
    }
  );
};
