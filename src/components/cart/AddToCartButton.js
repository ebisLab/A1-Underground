import { useState, useContext, useCallback } from "react";
import Router from 'next/router';
import { useQuery, useMutation } from '@apollo/client';
import { AppContext } from "../context/AppContext";
import { getFormattedCart } from "../../functions";
import Link from "next/link";
import { v4 } from 'uuid';
import GET_CART from "../../queries/get-cart";
import ADD_TO_CART from "../../mutations/add-to-cart";



const AddToCart = ( props ) => {
	const { product } = props;

	const productQryInput = {
		clientMutationId: v4(), // Generate a unique id.
		productId: product.productId,
	};

	const [ cart, setCart ] = useContext( AppContext );
	const [refreshMe,setRefreshMe]=useContext(AppContext);

	const [ showViewCart, setShowViewCart ] = useState( false );
	const [ requestError, setRequestError ] = useState( null );
	const [updateState, setUpdateState] = useState(false);

	/**
	 * @TODO will update this in future, when required.
	 * Handles adding items to the cart.
	 *
	 * @return {void}
	 */

	// Get Cart Data.
	const { loading, error, data, refetch } = useQuery( GET_CART, {
		notifyOnNetworkStatusChange: true,
		onCompleted: () => {
			// console.warn( 'completed GET_CART' );

			// Update cart in the localStorage.
			const updatedCart = getFormattedCart( data );
			localStorage.setItem( 'woo-next-cart', JSON.stringify( updatedCart ) );

			// Update cart data in React Context.
			setCart( updatedCart );
		}
	} );

	// Add to Cart Mutation.
	const [ addToCart, { data: addToCartRes, loading: addToCartLoading, error: addToCartError }] = useMutation( ADD_TO_CART, {
		variables: {
			input: productQryInput,
		},
		onCompleted: () => {
			// console.warn( 'completed ADD_TO_CART' );

			// If error.
			if ( addToCartError ) {
				setRequestError( addToCartError.graphQLErrors[ 0 ].message );
			}

			// On Success:
			// 1. Make the GET_CART query to update the cart with new values in React context.
			refetch();

			// 2. Show View Cart Button
			setShowViewCart( true )

			refetch();
			forceUpdate();
		},
		onError: ( error ) => {
			if ( error ) {
				setRequestError( error.graphQLErrors );
			}
		}
	} );

	const handleAddToCartClick = () => {
		 setRequestError( null );
		 addToCart().then(()=>{

		 setTimeout(()=>{
			window.location.href = "/cart"
		 }, 1500)		 
		} )
		
		 
	};

	return (
		<div>
			{/* Add To Cart Loading*/}
			{addToCartLoading && <p>Adding to Cart...</p>}

			{/*	Check if its an external product then put its external buy link */}
			{ "ExternalProduct" === product.__typename ? (
					<a href={ product.externalUrl } target="_blank" className="px-3 py-1 rounded-sm mr-3 text-sm border-solid border border-current inline-block hover:bg-purple-600 hover:text-white hover:border-purple-600">Buy now</a>
				) :
				<div style={{display: "flex", width: "100%", justifyContent: "center"}}>
				
				{cart === null?  
				(<>

				<button onClick={ handleAddToCartClick }>
					Sign Me up
				</button>
				<svg style={{display: showViewCart? "unset": "none"}} className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
					<circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
					<path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>
				</>
				): <Link href="/cart"><button className="">View Cart</button></Link>}
				
				</div>
			}
		</div>
	);
};

export default AddToCart;
