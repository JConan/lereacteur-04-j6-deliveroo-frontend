import "./Cart.scss";
import { ReactComponent as MinusButton } from "../assets/images/minus.svg";
import { ReactComponent as PlusButton } from "../assets/images/plus.svg";
import { MenuCategoriesProps, MenuItem } from "./MenuCategories";
import { useEffect, useReducer, useState } from "react";

export type CartProps = {
  menuItems: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  balance: {
    subTotal: number;
    fee: number;
    total: number;
  };
};

export type CartHandlers = {
  onAddMenuItem: (id: string) => void;
  onRemoveMenuItem: (id: string) => void;
};

type CartAction =
  | { type: "addItem"; itemId: string }
  | { type: "removeItem"; itemId: string };

interface CartItem {
  id: string;
  quantity: number;
}

type CartState = {
  cartItems: Array<CartItem>;
};

const cartReducer = (state: CartState, action: CartAction) => {
  return state;
};

export const useCartState = (menuCategories: Array<MenuCategoriesProps>) => {
  const [menuCatalogue, setMenuCatalogue] = useState<Array<MenuItem>>([]);
  const [subTotal, setSubTotal] = useState(0);
  const [cart, dispatch] = useReducer(cartReducer, { cartItems: [] });

  useEffect(() => {
    setMenuCatalogue(menuCategories.flatMap((category) => category.items));
  }, [menuCategories]);

  useEffect(() => {
    setSubTotal(
      cart.cartItems
        .map(
          (cartItem) =>
            [
              cartItem,
              // corresponding menuItem should always exist in menuCatalogue ?
              menuCatalogue.find((menuItem) => cartItem.id === menuItem.id),
            ] as [CartItem, MenuItem]
        )
        .map(([cartItem, menuItem]) => cartItem.quantity * menuItem.price)
        .reduce((total, current) => total + current)
    );
  }, [menuCatalogue, cart]);

  return { cart, subTotal, dipatchCartAction: dispatch };
};

const Cart = ({
  menuItems,
  balance,
  onAddMenuItem,
  onRemoveMenuItem,
}: CartProps & CartHandlers) =>
  menuItems.length > 0 ? (
    <div className="cart">
      <button>Valider mon panier</button>
      <div className="cartItems">
        {menuItems.map((menuItem) => (
          <div key={menuItem.id} className="cartItem">
            <span>
              <MinusButton onClick={() => onRemoveMenuItem(menuItem.id)} />
            </span>
            <span>{menuItem.quantity}</span>
            <span>
              <PlusButton onClick={() => onAddMenuItem(menuItem.id)} />
            </span>
            <span>{menuItem.name}</span>
            <span>{`${menuItem.price.toFixed(2)} €`}</span>
          </div>
        ))}
      </div>
      <div className="cartResults">
        <div>
          <span>Sous-total</span>
          <span>{`${balance.subTotal.toFixed(2)} €`}</span>
        </div>
        <div>
          <span>Frais de livraison</span>
          <span>{`${balance.fee.toFixed(2)} €`}</span>
        </div>
      </div>
      <div className="cartTotal">
        <div>
          <span>Total</span>
          <span>{`${balance.total.toFixed(2)} €`}</span>
        </div>
      </div>
    </div>
  ) : (
    <div className="cart cartEmpty">
      <button>Valider mon panier</button>
      <div>Votre panier est vide</div>
    </div>
  );

export default Cart;
