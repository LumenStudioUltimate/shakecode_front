import { Problem, UpdateProblem } from "@/app/psadder/type";
import axiosClient from "@/lib/api/axiosClient";

export const create = async (problem: Problem) => {
  return await axiosClient.post("/problem", problem);
};

export const update = async (problem: UpdateProblem) => {
  return await axiosClient.post("/problem/update", problem);
};

export const get = async (id: string) => {
  return (await axiosClient.get(`/problem?id=${id}`)).data;
};

export const getFull = async (id: string) => {
  return (await axiosClient.get(`/problem/full?id=${id}&hidden=false`)).data;
};

export const getList = async (all?: boolean) => {
  return (await axiosClient.get(`/problem/list?all=${!!all}`)).data;
};

export const deleteProblem = async (id: string) => {
  return (await axiosClient.delete(`/problem/?id=${id}`)).data;
};
