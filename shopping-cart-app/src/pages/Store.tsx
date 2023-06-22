import { Col, Row } from "react-bootstrap"
import items from '../data/items.json'
import StoreItem from "../components/StoreItem"



const Store = () => {
  return (
    <Row md={2} xs={1} lg={3} className="g-3">
        {
            items.map(item => {
                const {id, name, price, imgUrl} = item
                return (
                    <Col key={item.id}>
                        <StoreItem id={id} name={name} price={price} imgUrl={imgUrl}/>
                    </Col>
                )
            })
        }
    </Row>
  )
}

export default Store