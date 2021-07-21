import "./Cart.scss";
import { ReactComponent as MinusButton } from "../assets/images/minus.svg";
import { ReactComponent as PlusButton } from "../assets/images/plus.svg";
import { Dispatch, useEffect, useReducer, useState } from "react";

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

export type CartAction =
  | { type: "addItem"; item: { id: string; name: string; price: number } }
  | { type: "removeItem"; item: { id: string } };

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

type CartState = {
  cartItems: Array<CartItem>;
};

const cartReducer = (state: CartState, action: CartAction) => {
  const index = state.cartItems.findIndex((item) => item.id, action.item.id);
  const cartItems = state.cartItems.map((cartItem) => ({ ...cartItem }));

  switch (action.type) {
    case "addItem":
      index > -1
        ? cartItems[index].quantity++
        : cartItems.push({ ...action.item, quantity: 1 });
      break;
    case "removeItem":
      index > -1 && cartItems[index].quantity--;
      break;
  }

  return { cartItems: cartItems.filter((item) => item.quantity > 0) };
};

export const useCartState = () => {
  const [subTotal, setSubTotal] = useState(0);
  const [cart, dispatch] = useReducer(cartReducer, { cartItems: [] });

  useEffect(() => {
    setSubTotal(
      cart.cartItems
        .map((cartItem) => cartItem.price * cartItem.quantity)
        .reduce((total, current) => total + current, 0)
    );
  }, [cart]);

  return { cart, subTotal, dispatch: dispatch };
};

const Cart = ({
  cart,
  subTotal,
  dispatch,
}: {
  cart: CartState;
  subTotal: number;
  dispatch: Dispatch<CartAction>;
}) =>
  cart.cartItems.length > 0 ? (
    <div className="cart">
      <button>Valider mon panier</button>
      <div className="cartItems">
        {cart.cartItems.map((cartItem) => (
          <div key={cartItem.id} className="cartItem">
            <span>
              <MinusButton
                onClick={() =>
                  dispatch({ type: "removeItem", item: { ...cartItem } })
                }
              />
            </span>
            <span>{cartItem.quantity}</span>
            <span>
              <PlusButton
                onClick={() =>
                  dispatch({ type: "addItem", item: { ...cartItem } })
                }
              />
            </span>
            <span>{cartItem.name}</span>
            <span>{`${cartItem.price.toFixed(2)} €`}</span>
          </div>
        ))}
      </div>
      <div className="cartResults">
        <div>
          <span>Sous-total</span>
          <span>{`${subTotal.toFixed(2)} €`}</span>
        </div>
        <div>
          <span>Frais de livraison</span>
          <span>{`2,50 €`}</span>
        </div>
      </div>
      <div className="cartTotal">
        <div>
          <span>Total</span>
          <span>{`${(subTotal + 2.5).toFixed(2)} €`}</span>
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
