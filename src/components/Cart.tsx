import "./Cart.scss";
import { ReactComponent as MinusButton } from "../assets/images/minus.svg";
import { ReactComponent as PlusButton } from "../assets/images/plus.svg";

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
