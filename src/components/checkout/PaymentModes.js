import { useState } from "react";
import Error from "./Error";
import StripeForm from './stripe/stripeform';



const PaymentModes = ( { input, handleOnChange, cart, bill, stripeInputInfo } ) => {
	

	
	return (
		<div className="mt-3">
			<Error errors={ input.errors } fieldName={ 'paymentMethod' }/>
			
			{/*Pay with Paypal*/}
			<div className="form-check woo-next-payment-input-container mt-2">
				<label className="form-check-label">
					<input onChange={ handleOnChange } value="paypal" className="form-check-input mr-3" name="paymentMethod" type="radio"/>
					<span className="woo-next-payment-content">Pay with Paypal</span>
				</label>
			</div>
			<div className="form-check woo-next-payment-input-container mt-2">
				<label className="form-check-label">
					<input onChange={ handleOnChange } value="stripe" className="form-check-input mr-3" name="paymentMethod" type="radio"/>
					<span className="woo-next-payment-content">Credit Card (Stripe)</span>
				</label>
				</div>
				{bill && (
				<StripeForm cart={ cart } input={input} stripeInputInfo={stripeInputInfo} />
				
				)}
			{/*	Payment Instructions*/}
			<div className="woo-next-checkout-payment-instructions mt-2">
			{/* You can pay with your credit card if you don’t have a PayPal account. */}
			</div>
		</div>
	);
};

export default PaymentModes;
