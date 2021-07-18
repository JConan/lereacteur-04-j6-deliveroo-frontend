import "./Cart.scss";

export type CartProps = {
  menuItems: CartMenuItems;
  balance: CartBalance;
};

export type CartMenuItems = Array<{
  id: string;
  name: string;
  quantity: number;
  price: number;
}>;

export type CartBalance = {
  subTotal: number;
  fee: number;
  total: number;
};

const Cart = ({ menuItems, balance }: CartProps) =>
  menuItems.length > 0 ? (
    <div className="cart">
      <button>Valider mon panier</button>
      <div className="cartItems">
        {menuItems.map((menuItem) => (
          <div key={menuItem.id} className="cartItem">
            <span>
              <svg
                style={{
                  width: "20px",
                  height: "20px",
                  cursor: "pointer",
                  color: "rgb(0, 206, 189)",
                }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
            </span>
            <span>{menuItem.quantity}</span>
            <span>
              <svg
                style={{
                  width: "20px",
                  height: "20px",
                  cursor: "pointer",
                  color: "rgb(0, 206, 189)",
                }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
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
