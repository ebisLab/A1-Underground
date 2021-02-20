import { useContext} from 'react';
import { AppContext } from "../context/AppContext";
import Error from "./Error";

const PaymentModes = ( { input, handleOnChange, bill } ) => {
	
	// const [ extraInput, setExtraInput ] = useContext( AppContext );
	return (
		<div className="mt-3">
			<Error errors={ input.errors } fieldName={ 'paymentMethod' }/>
			{/*Direct bank transfers*/}
			{/* <div className="form-check woo-next-payment-input-container mt-2">
				<label className="form-check-label">
					<input onChange={ handleOnChange } value="bacs" className="form-check-input mr-3" name="paymentMethod" type="radio"/>
					<span className="woo-next-payment-content">Direct Bank Transfer</span>
				</label>
			</div> */}
			{/*Pay with Paypal*/}
			<div className="form-check woo-next-payment-input-container mt-2">
				<label className="form-check-label">
					<input onChange={ handleOnChange } value="paypal" className="form-check-input mr-3" name="paymentMethod" type="radio"/>
					<span className="woo-next-payment-content">Pay with Paypal</span>
				</label>
			</div>
			{/* <div className="form-check woo-next-payment-input-container mt-2">
				<label className="form-check-label">
					<input onChange={ handleOnChange } value="creditcard" className="form-check-input mr-3" name="paymentMethod" type="radio"/>
					<span className="woo-next-payment-content">Pay with Paypal Checkout</span>
				</label>
			</div> */}
			{/*Check Payments*/}
			{/* <div className="form-check woo-next-payment-input-container mt-2">
				<label className="form-check-label">
					<input onChange={ handleOnChange } value="cheque" className="form-check-input mr-3" name="paymentMethod" type="radio"/>
					<span className="woo-next-payment-content">Check Payments</span>
				</label>
			</div> */}
			{/*Pay with Stripe*/}
			{/* <div className="form-check woo-next-payment-input-container mt-2">
				<label className="form-check-label">
					<input onChange={ handleOnChange } value="stripe" className="form-check-input mr-3" name="paymentMethod" type="radio"/>
					<span className="woo-next-payment-content">Stripe</span>
				</label>
				</div> */}
				{/* {bill && (<>
				<div>
					<label>Card Number</label>
				<input value="" placeholder="1234 1234 1234 1234"></input>
				</div>
				<div>
					<label>Expiry Date</label>
					<input value="" placeholder="MM/YY"/>
				</div>
				<div>
					<label>Card Code</label>
					<input value="" placeholder="CVC"/>
				</div>
				
				</>)} */}
			
			{/* <div className="form-check woo-next-payment-input-container mt-2">
				<label className="form-check-label">
					<input onChange={ handleOnChange } value="cod" className="form-check-input mr-3" name="paymentMethod" type="radio"/>
					<span className="woo-next-payment-content">Cash on Delivery</span>
				</label>
			</div>
			<div className="form-check woo-next-payment-input-container mt-2">
				<label className="form-check-label">
					<input onChange={ handleOnChange } value="jccpaymentgatewayredirect" className="form-check-input mr-3" name="paymentMethod" type="radio"/>
					<span className="woo-next-payment-content">JCC</span>
				</label>
			</div>
			<div className="form-check woo-next-payment-input-container mt-2">
				<label className="form-check-label">
					<input onChange={ handleOnChange } value="ccavenue" className="form-check-input mr-3" name="paymentMethod" type="radio"/>
					<span className="woo-next-payment-content">CC Avenue</span>
				</label>
			</div> */}
			{/*	Payment Instructions*/}
			<div className="woo-next-checkout-payment-instructions mt-2">
			You can pay with your credit card if you don’t have a PayPal account.
			</div>
		</div>
	);
};

export default PaymentModes;
