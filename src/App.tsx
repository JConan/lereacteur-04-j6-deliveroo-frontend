import axios from "axios";
import { useEffect, useState } from "react";
import "./App.scss";
import Header, { HeaderProps } from "./components/Header";
import MenuCategory, { MenuCategoryProps } from "./components/MenuCategory";

type ApiResponse = {
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

function App() {
  const [header, setHeader] = useState<HeaderProps | undefined>(undefined);
  const [menuCategories, setMenuCategories] = useState<
    Array<MenuCategoryProps> | undefined
  >(undefined);

  useEffect(() => {
    (async () => {
      const response = await axios.get<ApiResponse>(
        process.env.REACT_APP_BACKEND_API_URL
      );

      setHeader({
        title: response.data.restaurant.name,
        content: response.data.restaurant.description,
        image: {
          src: response.data.restaurant.picture,
          alt: `restaurant : ${response.data.restaurant.name}`,
        },
      });

      setMenuCategories(
        response.data.categories.map((category) => ({
          name: category.name,
          items: category.meals.map((meal) => ({
            id: meal.id,
            name: meal.title,
            description: meal.description,
            price: parseFloat(meal.price),
            isPopular: meal.popular,
            pictureUrl: meal.picture,
          })),
        }))
      );
    })();
  }, []);

  return (
    <div className="App">
      {header && <Header {...header} />}
      <div className="content">
        <div className="menu">
          {menuCategories?.map((menuCategory, index) => (
            <MenuCategory key={index} {...menuCategory} />
          ))}
        </div>
        <div className="cart"></div>
      </div>
    </div>
  );
}

export default App;
