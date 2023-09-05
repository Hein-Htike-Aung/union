import { privateApi } from "./api";

export function getUsers({
  page = 1,
  pageSize = 10,
  search = "",
}: {
  page: number;
  pageSize: number;
  search?: string;
}) {
  return privateApi
    .get(`/v1/users?page=${page}&pageSize=${pageSize}&search=${search}`)
    .then((res) => res.data);
}

export function getPatients({
  page = 1,
  pageSize = 10,
  search = "",
}: {
  page: number;
  pageSize: number;
  search?: string;
}) {
  return privateApi
    .get(`/v1/patients?page=${page}&pageSize=${pageSize}&search=${search}`)
    .then((res) => res.data);
}
