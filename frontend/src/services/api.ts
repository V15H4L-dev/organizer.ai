import { UUID } from "../types/user";
import api from "./axios";
import { endpoints } from "./enpoints";

export const doLogin = async (body: doLoginRequest) => {
  const response = await api.post(endpoints.LOGIN, { ...body });
  return response;
};
export const doSignUp = async (body: doSignUpRequest) => {
  const response = await api.post(endpoints.SIGNUP, { ...body });
  return response;
};

export const getAllTodos = async (body: filterTodosRequest) => {
  const response = await api.post(endpoints.FILTERTODOS, { ...body });
  return response;
};

export const createTodo = async (body: createTodosRequest) => {
  const response = await api.post(endpoints.TODO, { ...body });
  return response;
};

export const updateTodo = async (body: createTodosRequest, id: UUID) => {
  const response = await api.put(`${endpoints.TODO}/${id}`, { ...body });
  return response;
};

export const markAsDone = async (body: { ids: UUID[] }) => {
  const response = await api.post(endpoints.MARKASDONE, { ...body });
  return response;
};
export const deleteTodo = async (id: UUID) => {
  const response = await api.delete(`${endpoints.TODO}/${id}`);
  return response;
};
