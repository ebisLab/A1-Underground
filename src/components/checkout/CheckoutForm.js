import { useState, useContext, useEffect } from 'react';
import Billing from "./Billing";
import YourOrder from "./YourOrder";
import PaymentModes from "./PaymentModes";
import { AppContext } from "../context/AppContext";
import validateAndSanitizeCheckoutForm from '../../validator/checkout';
import { useMutation, useQuery } from '@apollo/client';
import { getFormattedCart, createCheckoutData } from "../../functions";
import OrderSuccess from "./OrderSuccess";
import GET_CART from "../../queries/get-cart";
import CHECKOUT_MUTATION from "../../mutations/checkout";

const CheckoutForm = () => {

	const initialState = {
		firstName: '',
		lastName: '',
		company: '',
		country: '',
		address1: '',
		address2: '',
		city: '',
		state: '',
		postcode: '',
		phone: '',
		email: '',
		createAccount: false,
		orderNotes: '',
		paymentMethod: '',
		errors: null
	};

	// Use this for testing purposes, so you dont have to fill the checkout form over an over again.
	// const initialState = {
	// 	firstName: 'Imran',
	// 	lastName: 'Sayed',
	// 	address1: '109 Hills Road Valley',
	// 	address2: 'Station Road',
	// 	city: 'Pune',
	// 	state: 'Maharastra',
	// 	country: 'ID',
	// 	postcode: '400298',
	// 	phone: '9959338989',
	// 	email: 'imran@gmail.com',
	// 	company: 'Tech',
	// 	createAccount: false,
	// 	orderNotes: '',
	// 	paymentMethod: 'cod',
	// 	errors: null
	// };

	const [ cart, setCart ] = useContext( AppContext );	
	const [ bill, setBill ] = useState(false);

	const [ input, setInput ] = useState( initialState );
	const [ orderData, setOrderData ] = useState( null );
	const [ requestError, setRequestError ] = useState( null );
	const [ stripeInputInfo, setStripeInputInfo] =useState()


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

	// Checkout or CreateOrder Mutation.
	const [ checkout, { data: checkoutResponse, loading: checkoutLoading, error: checkoutError } ] = useMutation( CHECKOUT_MUTATION, {
		variables: {
			input: orderData
		},
		onCompleted: () => {
			// console.warn( 'completed CHECKOUT_MUTATION' );
			refetch();
		},
		onError: ( error ) => {
			if ( error ) {
				setRequestError( error.graphQLErrors[ 0 ].message );
			}
		}
	} );

	/*
	 * Handle form submit.
	 *
	 * @param {Object} event Event Object.
	 *
	 * @return {void}
	 */
	const handleFormSubmit = ( event ) => {
		console.log("EVENT",event)
		event.preventDefault();
		const result = validateAndSanitizeCheckoutForm( input );
		if ( ! result.isValid ) {
			setInput( { ...input,  errors: result.errors } );
			return;
		}
		if (event.target.value == "stripe"){
			console.log("submited")
			setStripeInputInfo("yay it submitted")
		}
		const checkOutData = createCheckoutData( input );
		setOrderData( checkOutData );
		setRequestError( null );
		setStripeInputInfo("yay it submitted")

	};

	const handleStripeSubmit =(e)=>{
		console.log("submited on stripe")
	}

	/*
	 * Handle onchange input.
	 *
	 * @param {Object} event Event Object.
	 *
	 * @return {void}
	 */
	const handleOnChange = ( event ) => {

		if ( 'createAccount' === event.target.name ) {
			const newState = { ...input, [event.target.name]: ! input.createAccount };
			setInput( newState );
		} 		
		else if (event.target.value === "stripe"){
			setBill(true)
		}
		else {
			const newState = { ...input, [event.target.name]: event.target.value };
			setInput( newState );
			setBill(false)
			
		}
	};

	useEffect( () => {

		if ( null !== orderData ) {
			// Call the checkout mutation when the value for orderData changes/updates.
			checkout();
		}

	}, [ orderData ] );

	return (
		<>
			{ cart ? (
				<form onSubmit={ bill? handleStripeSubmit: handleFormSubmit } className="woo-next-checkout-form">
					<div className="grid-cont grid grid-cols-1 md:grid-cols-2 gap-20">
						{/*Billing Details*/}
						<div className="billing-details">
							<h2 className="text-xl font-medium mb-4">Billing Details</h2>
							<Billing input={ input } handleOnChange={ handleOnChange }/>
						</div>
						{/* Order & Payments*/}
						<div className="your-orders">
							{/*	Order*/}
							<h2 className="text-xl font-medium mb-4">Your Order</h2>
							<YourOrder cart={ cart }/>

							{/*Payment*/}
							<PaymentModes input={ input } setInput={setInput} cart={ cart } handleOnChange={ handleOnChange } stripeInputInfo={stripeInputInfo} bill={bill}/>
							<div className="woo-next-place-order-btn-wrap mt-5">
								{bill? "":(<button className="bg-purple-600 text-white px-5 py-3 rounded-sm w-auto xl:w-full" type="submit">
									Place Order
								</button>)}
							</div>

							{/* Checkout Loading*/}
							{checkoutLoading && <p>Processing Order...</p>}
							{requestError && <p>Error : { requestError } :( Please try again</p>}
						</div>
					</div>
				</form>
			) : '' }

		{/*	Show message if Order Sucess*/}
		<OrderSuccess response={ checkoutResponse }/>
		</>
	);
};

export default CheckoutForm;
