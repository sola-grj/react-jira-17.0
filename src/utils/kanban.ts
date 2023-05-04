import { useQuery } from "react-query";
import { Kanban } from "types/kanban";
import { Project } from "types/Project";
import { useHttp } from "./http";

export const useKanbans = (param?: Partial<Kanban>) => {
  const client = useHttp();
  return useQuery<Kanban[]>(["kanbans", param], () =>
    client("kanbans", { data: param })
  );
};
