import axios from "axios";

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
