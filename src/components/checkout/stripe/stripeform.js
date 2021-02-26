import {loadStripe} from '@stripe/stripe-js'
import {Elements, CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router'

const CheckForm = ({success, cart , input})=>{
    const stripe = useStripe();
    const elements = useElements();

    const amnt= (cart.totalProductsPrice.replace("$","")).replace(".","")
    console.log("input~~~", input)

    const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log("hello world")
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card', 
            card: elements.getElement(CardElement)
        })
        if(!error){
            const {id} =paymentMethod;
            const {products}=cart
            try {
                const {data} = await axios.post("/api/charge", {id, amount:amnt, products})
                console.log(data);
                success();
            }catch(error){
                console.log(error)
            }
        }
    }


return (
    <div 
    style={{maxWidth:"400px", margin :"0 auto"}}>
        <CardElement/>
        <button 
        onClick={handleSubmit}
        type="submit" disabled={!stripe}>Pay</button>
    </div>
)
}

const stripePromise = loadStripe("pk_test_51ILYcRDeBWDEYf9HSk5SLdknkerXF6apf7j34pL0iFbV6cn3evQJXAeD7DuxUqWYGaVw1YLrUPzBfTBk4A73JLvh00lMm0wR9N");

const StripeForm =({cart})=>{
    const router= useRouter()
    const[status, setStatus]=useState("ready");

    if(status === "success"){
        router.push("/success")
    }
    return (
        <Elements stripe={stripePromise}>
            <CheckForm cart={ cart } success={()=>{setStatus("success")}} />
        </Elements>
    )
} 

export default StripeForm