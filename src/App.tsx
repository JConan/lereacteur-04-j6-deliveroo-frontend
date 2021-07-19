import axios from "axios";
import { useEffect, useState } from "react";
import "./App.scss";
import Cart, { CartProps } from "./components/Cart";
import Header, { HeaderProps } from "./components/Header";
import MenuCategory, {
  MenuCategoryProps,
  MenuItem,
} from "./components/MenuCategory";

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
  const [menuSelectedItems, setMenuSelectedItems] = useState<Array<string>>([]);

  const [header, setHeader] = useState<HeaderProps | undefined>(undefined);
  const [menuCategories, setMenuCategories] = useState<
    Array<MenuCategoryProps> | undefined
  >(undefined);

  const [cart, setCart] = useState<CartProps>({
    menuItems: [],
    balance: {
      subTotal: 0,
      fee: 2.5,
      total: 2.5,
    },
  });
  useEffect(() => {
    const menuCatalogue =
      menuCategories
        ?.map((menuCategory) => menuCategory.items)
        .flatMap((items) => items) || [];

    const cartState: CartProps = menuSelectedItems
      .map((menuId) => menuCatalogue.find((menuItem) => menuItem.id === menuId))
      .filter((item) => item !== undefined)
      .map((item) => item as MenuItem)
      .reduce<CartProps>(
        (store, currentMenuItem) => {
          const currentItem = store.menuItems.find(
            (menuItem) => menuItem.id === currentMenuItem.id
          );

          if (currentItem) {
            currentItem.quantity++;
          } else {
            store.menuItems.push({
              id: currentMenuItem.id,
              name: currentMenuItem.name,
              price: currentMenuItem.price,
              quantity: 1,
            });
          }

          return {
            menuItems: store.menuItems,
            balance: {
              ...store.balance,
              subTotal: store.balance.subTotal + (currentMenuItem?.price || 0),
              total: store.balance.total + (currentMenuItem?.price || 0),
            },
          };
        },
        {
          menuItems: [],
          balance: { subTotal: 0, total: 2.5, fee: 2.5 },
        } as CartProps
      );

    setCart(cartState);
  }, [menuSelectedItems, menuCategories]);

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

      setCart({
        menuItems: [
          { id: "a", name: "Granola parfait bio", price: 6.6, quantity: 2 },
          {
            id: "b",
            name: "Crunola parfait bio (100% végétalien)",
            price: 6.6,
            quantity: 3,
          },
        ],
        balance: { subTotal: 13.2, fee: 2.5, total: 15.7 },
      });
    })();
  }, []);

  const addMenuItem = (id: string) => {
    if (menuSelectedItems.indexOf(id) >= 0) {
      menuSelectedItems.splice(menuSelectedItems.indexOf(id), 0, id);
      setMenuSelectedItems([...menuSelectedItems]);
    } else {
      setMenuSelectedItems([...menuSelectedItems, id]);
    }
  };

  return (
    <div className="App">
      {header && <Header {...header} />}
      <div className="content">
        <div className="menu">
          {menuCategories?.map((menuCategory, index) => (
            <MenuCategory
              key={index}
              {...menuCategory}
              onItemClick={addMenuItem}
            />
          ))}
        </div>
        <Cart
          {...cart}
          onAddMenuItem={addMenuItem}
          onRemoveMenuItem={(id: string) => {
            const index = menuSelectedItems.indexOf(id);
            menuSelectedItems.splice(index, 1);
            setMenuSelectedItems([...menuSelectedItems]);
          }}
        />
      </div>
    </div>
  );
}

export default App;
