import useHttpClient from "src/utils/client";
import { ENDPOINTS } from "src/utils/endpoints";
import axios from "axios";

const getRegistries = async (url: string) => {
  const httpClient = useHttpClient() || axios.create();
  try {
    const { data } = await httpClient.get(url);
    return data;
  } catch (err) {
    console.error("Error at getRegistries: ", err);
    throw err;
  }
};

const getRegistry = async (registryId: number) => {
  const httpClient = useHttpClient() || axios.create();
  try {
    const { data } = await httpClient.get(
      `${ENDPOINTS.registries}/${registryId}/`
    );
    return data;
  } catch (err) {
    console.error("Error at getRegistry: ", err);
    throw err;
  }
};

const saveRegistry = async (registryData: any) => {
  const httpClient = useHttpClient() || axios.create();
  try {
    const { data } = await httpClient.post(
      `${ENDPOINTS.registries}`,
      registryData
    );
    return data;
  } catch (err) {
    console.error("Error at saveRegistry: ", err);
    throw err;
  }
};

export { getRegistries, getRegistry, saveRegistry };
