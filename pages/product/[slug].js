import { ProductInfo, DetailsStyle, Quantity, Buy } from "../../styles/ProductDetails";
import { useQuery } from "urql";
import {useRouter} from 'next/router';
import { GET_PRODUCT_QUERY } from "../../lib/query";
import {AiFillPlusCircle, AiFillMinusCircle} from 'react-icons/ai'
import { useStateContext } from "../../lib/context";
import toast from 'react-hot-toast'
import { useEffect } from "react";

export default  function ProfuctDetails() {
	const {qty, increaseQty, decreaseQty, onAdd, setQty} = useStateContext()

	useEffect(() => {
		setQty(1)
	},[])

	console.log(qty)
	const {query} = useRouter()

	const [results] = useQuery({
		query: GET_PRODUCT_QUERY,
		variables: {slug: query.slug},
	})
	const {data, fetching, error} = results
	if(fetching) return <p>Loading....</p>
	if(error) return <p>Oh no...{error.message}</p>

	console.log(data)
	const {title, description, image} = data.products.data[0].attributes

const notify = () => {
	toast.success(`${title} Added to the Cart`)
}

	return(
		<DetailsStyle>
		<img src={image.data.attributes.formats.medium.url} alt={title} />
		<ProductInfo>
			<h2>{title}</h2>
			<p>{description}</p>
			<Quantity>
				<span>Quantity</span>
				<button><AiFillMinusCircle onClick={decreaseQty} /></button>
				<p>{qty}</p>
				<button><AiFillPlusCircle onClick={increaseQty} /></button>
			</Quantity>
		<Buy onClick={() => {onAdd(data.products.data[0].attributes, qty); notify()}} >Add To Cart</Buy>
			</ProductInfo>
	</DetailsStyle>
	)
}

