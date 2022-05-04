import useHttpClient from "src/utils/client";
import { ENDPOINTS } from "src/utils/endpoints";
import axios from "axios";

const getCategories = async (url: any) => {
  console.log("url: ", url);
  const httpClient = useHttpClient() || axios.create();
  try {
    const { data } = await httpClient.get(url);
    console.log("data: ", data);
    return data;
  } catch (err) {
    console.error("Error at getCategories: ", err);
    throw err;
  }
};

const getCategory = async (categoryId: number) => {
  const httpClient = useHttpClient() || axios.create();
  try {
    const { data } = await httpClient.get(
      `${ENDPOINTS.categories}/${categoryId}/`
    );
    return data;
  } catch (err) {
    console.error("Error at getCategory: ", err);
    throw err;
  }
};

const saveCategory = async (categoryData: any) => {
  const httpClient = useHttpClient() || axios.create();
  try {
    const { data } = await httpClient.post(
      `${ENDPOINTS.categories}`,
      categoryData
    );
    return data;
  } catch (err) {
    console.error("Error at saveCategory: ", err);
    throw err;
  }
};

const updateCategory = async (categoryId: number, categoryData: any) => {
  const httpClient = useHttpClient() || axios.create();
  try {
    const { data } = await httpClient.put(
      `${ENDPOINTS.categories}/${categoryId}`
    );
    return data;
  } catch (err) {
    console.error("Error at updateCategory: ", err);
    throw err;
  }
};

const deleteCategory = async (categoryId: number) => {
  const httpClient = useHttpClient() || axios.create();
  try {
    const { data } = await httpClient.delete(
      `${ENDPOINTS.categories}/${categoryId}`
    );
    return data;
  } catch (err) {
    console.error("Error at deleteCategory: ", err);
    throw err;
  }
};

export {
  getCategories,
  getCategory,
  saveCategory,
  updateCategory,
  deleteCategory,
};
