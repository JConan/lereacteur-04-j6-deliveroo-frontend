import axios from "axios";
import { useEffect, useState } from "react";

export type ApiResponse = {
  restaurant: {
    name: string;
    description: string;
    picture: string;
  };
  categories: Array<{
    name: string;
    meals: Array<{
      id: string;
      title: string;
      description: string;
      price: string;
      picture?: string;
      popular?: boolean;
    }>;
  }>;
};

export const getRestaurantMenu = async () => {
  return (await (
    await axios.get<ApiResponse>(process.env.REACT_APP_BACKEND_API_URL)
  ).data) as ApiResponse;
};

export const useBackendApi = () => {
  const [response, setResponse] = useState<ApiResponse | undefined>(undefined);

  useEffect(() => {
    axios
      .get<ApiResponse>(process.env.REACT_APP_BACKEND_API_URL)
      .then((response) => setResponse(response.data));
  }, []);

  return response;
};
