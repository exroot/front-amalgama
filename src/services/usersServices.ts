import useHttpClient from "src/utils/client";
import { ENDPOINTS } from "src/utils/endpoints";
import axios from "axios";

const getUsers = async (url: string) => {
  const httpClient = useHttpClient() || axios.create();
  try {
    const { data } = await httpClient.get(url);
    return data;
  } catch (err) {
    console.error("Error at getUsers: ", err);
    throw err;
  }
};

const getUser = async (userId: number) => {
  const httpClient = useHttpClient() || axios.create();
  try {
    const { data } = await httpClient.get(`${ENDPOINTS.users}/${userId}/`);
    return data;
  } catch (err) {
    console.error("Error at getUser: ", err);
    throw err;
  }
};

const saveUser = async (userData: any) => {
  const httpClient = useHttpClient() || axios.create();
  try {
    const { data } = await httpClient.post(`${ENDPOINTS.users}`, userData);
    return data;
  } catch (err) {
    console.error("Error at saveUser: ", err);
    throw err;
  }
};

const updateUser = async (userId: number, userData: any) => {
  const httpClient = useHttpClient() || axios.create();
  try {
    const { data } = await httpClient.put(`${ENDPOINTS.users}/${userId}`);
    return data;
  } catch (err) {
    console.error("Error at updateUser: ", err);
    throw err;
  }
};

const deleteUser = async (userId: number) => {
  const httpClient = useHttpClient() || axios.create();
  try {
    const { data } = await httpClient.delete(`${ENDPOINTS.users}/${userId}`);
    return data;
  } catch (err) {
    console.error("Error at deleteUser: ", err);
    throw err;
  }
};

export { getUsers, getUser, saveUser, updateUser, deleteUser };
