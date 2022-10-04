import React, {createContext, useContext, useState} from "react";
import { PRODUCT_QUERY } from "./query";

const ShopContext = createContext()

export const StateContext = ({children}) => {
	const [showCart, setShowCart] = useState(false)
	const [cartItems, setCartItems] = useState([])
	const [qty, setQty] = useState(1)
	const [totalQuantity, setTotalQuantity] = useState(0)
	const [totalPrice, setTotalPrice] = useState(0)

	const increaseQty = () => {
		setQty((prevQty) => prevQty +1)
	}
	const decreaseQty = () => {
		setQty((prevQty) =>{
		if (prevQty -1<1) return 1;
		return prevQty -1;
	})
}
	const onAdd = (product, quantity) => {
		setTotalPrice(prevTotal => prevTotal + product.price * quantity)

		setTotalQuantity(prevTotal => prevTotal + quantity)

		const exist = cartItems.find((item) => item.slug === product.slug)
		if(exist) {
			setCartItems(cartItems.map((item)=> item.slug === product.slug ? {...exist, quantity: exist.quantity + quantity }: item))
		}
		else {
			setCartItems([...cartItems, {...product, quantity: quantity}])
		}
	}

		const onRemove = (product) => {
			setTotalPrice(prevTotal => prevTotal - product.price )


			setTotalQuantity(prevTotal => prevTotal - 1)


			const exist = cartItems.find((item) => item.slug === product.slug)
			if(exist.quantity ===1){
				setCartItems(cartItems.filter(item => item.slug !== product.slug ))
			}
			else {
				setCartItems(cartItems.map(item => item.slug === product.slug ? {...exist, quantity: exist.quantity -1}: item ))
			}
		}

	return (
		<ShopContext.Provider value={{qty, increaseQty, decreaseQty, showCart, setShowCart, cartItems, onAdd, onRemove, totalQuantity,totalPrice , setQty}}>
			{children}
		</ShopContext.Provider>
	)
}
export const  useStateContext = () => useContext(ShopContext);