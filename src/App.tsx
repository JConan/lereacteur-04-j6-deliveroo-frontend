import { useEffect, useState } from "react";
import { useBackendApi } from "./api/backend";
import "./App.scss";
import Cart, { CartProps, useCartState } from "./components/Cart";
import Header, { useHeaderState } from "./components/Header";
import MenuCategories, {
  MenuItem,
  useMenuCategoriesState,
} from "./components/MenuCategories";

function App() {
  const backendApiResponse = useBackendApi();

  const header = useHeaderState(backendApiResponse);
  const menuCategories = useMenuCategoriesState(backendApiResponse);
  //  const { cart, subTotal, dipatchCartAction } = useCartState(menuCategories);

  const [menuSelectedItems, setMenuSelectedItems] = useState<Array<string>>([]);

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
        ?.map((menuCategories) => menuCategories.items)
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
          {menuCategories?.map((menuCategories, index) => (
            <MenuCategories
              key={index}
              {...menuCategories}
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
      <div className="footer">
        <div>
          Made by Johan CHAN with ReactJs
          <a href="https://www.lereacteur.io/">@LeReacteur</a>
          <a href="https://github.com/JConan/lereacteur-exo-react_deliveroo-frontend">
            Github
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
