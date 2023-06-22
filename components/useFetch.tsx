import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import useStore from "../store/useStore";

const BASE_URL = "/api";
export const makeApiRequest = async (
  method: string,
  endPoint: string,
  data?: Record<string, unknown>,
  config?: AxiosRequestConfig
): Promise<AxiosResponse> => {
  const URL = `${BASE_URL}${endPoint}`;
  console.log(URL);

  try {
    const response = await axios.request({
      method,
      url: URL,
      data,
      ...config,
    });
    return response;
  } catch (error: any) {
    console.log("error From Hook:", error);
    throw error;
  }
};

export const useApiRequest = (): [
  boolean,
  (
    method: string,
    endPoint: string,
    data?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse>
] => {
  const { setApiMessage, resetApiMessage } = useStore();
  const [loading, setLoading] = useState(false);
  const config = {
    credentials: "include",
  };
  const handleApiRequest = async (
    method: string,
    endPoint: string,
    data?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse> => {
    try {
      setLoading(true);
      const response = await makeApiRequest(method, endPoint, data, config);
      console.log("Use Fetch:", response);
      setApiMessage(response.data.message);
      return response;
    } catch (error: any) {
      setApiMessage(error?.response?.data.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    resetApiMessage();
    // Reset the API message when navigating to this page
  }, []);

  return [loading, handleApiRequest];
};
