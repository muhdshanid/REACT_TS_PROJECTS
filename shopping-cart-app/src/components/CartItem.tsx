import React from "react";
import { useCart } from "../context/CartContext";
import items from "../data/items.json";
import { Button, Stack } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";
type Props = {
  id: number;
  qty: number;
};

const CartItem = ({ id, qty }: Props) => {
  const { remove } = useCart();
  const item = items.find((i) => i.id === id);
  if (item == null) return null;
  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={item.imgUrl}
        alt="product"
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          {item.name}
          {qty > 1 && <span style={{fontSize: ".65rem"}} className="text-muted">
            x{qty}</span>}
        </div>
        <div className="text-muted" style={{fontSize: ".75rem"}}>
            {formatCurrency(item.price)}
        </div>
      </div>
      <div>
        {
            formatCurrency(item.price * qty)
        }
      </div>
      <Button variant="outline-danger" size="sm" onClick={() => remove(item.id)}>
        &times;
      </Button>
    </Stack>
  );
};

export default CartItem;
