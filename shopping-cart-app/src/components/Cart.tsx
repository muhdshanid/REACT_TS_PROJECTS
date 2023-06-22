import { Offcanvas, Stack } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import CartItem from "./CartItem";
import { formatCurrency } from "../utilities/formatCurrency";
import items from "../data/items.json";

type Props = {
  isOpen: boolean;
};
const Cart = ({ isOpen }: Props) => {
  const { closeCart, cartItems } = useCart();
  return (
    <Offcanvas show={isOpen} placement="end" onHide={closeCart}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total:{" "}
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = items.find((i) => i.id === cartItem.id)
                return total + (item?.price || 0) * cartItem.qty
              },0)
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Cart;
