import Link from 'next/link'
import {FiShoppingBag} from 'react-icons/fi'
import { NavStyles, NavItems} from '../styles/NavbarStyles'
import Cart from './Cart'
import { useStateContext } from '../lib/context'
import User from './User'
import {useUser} from '@auth0/nextjs-auth0'

const Nav = () => {
	const {showCart, setShowCart, totalQuantity} = useStateContext()
	const {user, error, isLoading} = useUser()
 return (
	<NavStyles>
		<Link href={'/'}>Carting Shop</Link>
		<NavItems>
			<User />
			<div onClick={() => setShowCart(true)}>
				{totalQuantity > 0 && <span>{totalQuantity}</span> }
				<FiShoppingBag /> 
				<h3>Cart</h3>
			</div>
		</NavItems>
		{showCart && <Cart />}
	</NavStyles>

 )
}
export default Nav;