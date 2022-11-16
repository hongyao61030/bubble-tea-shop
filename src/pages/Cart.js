import { useContext } from "react";

import CartItem from "../components/CartItem";
import classes from "./Cart.module.css";
import CartContext from "../context/cartContext";
import ModalContext from "../context/modalContext";

const Cart = (props) => {
  const cartContext = useContext(CartContext);
  const { hide } = useContext(ModalContext);

  const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;
  const hasItems = cartContext.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartContext.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartContext.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartContext.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={hide}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </>
  );
};

export default Cart;
