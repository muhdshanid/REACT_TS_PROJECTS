import { Button, Card } from "react-bootstrap"
import { formatCurrency } from "../utilities/formatCurrency"
import { useCart } from "../context/CartContext"

type Props = {
    id: number,
    name: string,
    price: number,
    imgUrl: string
}

const StoreItem = ({id, name, price, imgUrl}: Props) => {
    const { getQty, incQty, decQty, remove} = useCart()
    const qty = getQty(id)
  return (
    <Card className="h-100">
        <Card.Img variant="top" src={imgUrl} 
        style={{height: "200px", objectFit: "cover"}}/>
        <Card.Body className="d-flex flex-column ">
            <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                <span className="fs-2">{name}</span>
                <span className="ms-2 text-muted">{
                    formatCurrency(price)
                }</span>
            </Card.Title>
            <div className="mt-auto">
                {
                    qty === 0 ? (
                        <Button onClick={() => incQty(id)} className="w-100">Add To Cart</Button>
                    ) : (
                        <div style={{gap: ".5rem"}} className="d-flex align-items-center flex-column">
                            <div style={{gap: ".5rem"}}  className="d-flex align-items-center justify-content-center">
                                <Button onClick={() => decQty(id)}>-</Button>
                                <div>
                                <span className="fs-3">
                                   {qty}
                                </span> In Cart
                                </div>
                                <Button onClick={() => incQty(id)}>+</Button>
                            </div>
                            <Button onClick={() => remove(id)} variant="danger">Remove</Button>
                        </div>
                    )
                }
            </div>
        </Card.Body>
    </Card>
  )
}

export default StoreItem