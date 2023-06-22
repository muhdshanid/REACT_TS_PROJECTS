import React, { createContext, useContext, useState } from "react"
import Cart from "../components/Cart"
import { useLocalStorage } from "../hooks/useLocalStorage"

type Props = {
    children: React.ReactNode
}

type CartItem = {
    id: number,
    qty: number
}
type CartContextType = {
    openCart: () => void,
    closeCart: () => void,
    cartQty: number,
    cartItems: CartItem[]
    getQty: (id: number) => number,
    incQty: (id: number) => void
    decQty: (id: number) => void
    remove: (id: number) => void
}
const CartContext = createContext({} as CartContextType)

export const useCart = () => {
    return useContext(CartContext)
}

export const CartProvider = ({children}: Props) => {
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart",[])
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)
    const getQty = (id: number): number => {
        return cartItems.find(item => item.id === id)?.qty || 0
    }
    const incQty = (id: number): void  => {
        setCartItems((currItems) => {
            if( currItems.find(item => item.id === id) == null){
                return [...currItems, {id, qty: 1}]
            }else{
                return currItems.map(item => {
                    if( item.id === id){
                        return { ...item, qty: item.qty + 1}
                    }else{
                        return item
                    }
                })
            }
            }
        )}
    const decQty = (id: number) => {
        setCartItems((currItems) => {
            if( currItems.find(item => item.id === id)?.qty === 1){
                return currItems.filter(item => item.id !== id)
            }else{
                return currItems.map(item => {
                    if( item.id === id){
                        return { ...item, qty: item.qty - 1}
                    }else{
                        return item
                    }
                })
            }
            }
        )}
    const remove = (id: number) => {
        setCartItems(currItems => {
          return  currItems.filter(item => item.id !== id)
        })
    }
    const cartQty = cartItems.reduce((qty,item) => item.qty + qty, 0 )
    return <CartContext.Provider value={{ getQty, incQty, decQty, remove, cartItems, cartQty, openCart, closeCart}}>
        {children}
        <Cart isOpen={isOpen}/>
    </CartContext.Provider>

  }