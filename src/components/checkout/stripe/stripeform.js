import {loadStripe} from '@stripe/stripe-js'
import {Elements, CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router'
import Error from "../Error";


const CheckForm = ({success, cart , input})=>{
    const stripe = useStripe();
    const elements = useElements();

    const amnt= (cart.totalProductsPrice.replace("$","")).replace(".","")


    const handleSubmit = async (e)=>{
        e.preventDefault();


        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card', 
            card: elements.getElement(CardElement),
            // email: input.phone,
            // customer:customer.id,
            billing_details: {
                name: `${input.firstName} ${input.lastName}`,
                email: input.email,
                phone: input.phone,
                address: {
                  city: input.city,
                  country: input.country,
                  line1: input.address1,
                  line2: input.address2,
                  postal_code: input.postcode,
                  state: input.state
                },
              },
        })
        if(!error){
            const {id} =paymentMethod;
            const {products}=cart
            try {
                const {data} = await axios.post("/api/charge", {id, amount:amnt, products, input})
                console.log(data);
                success();
            }catch(error){
                console.log(error)
            }
        }
    }


return (
    <div 
    style={{maxWidth:"400px", margin :"0 auto", color: "white"}}>
        <CardElement style={{color:"white !important"}} color="white"/>
        <button 
        onClick={handleSubmit}
        style={{marginTop:"1em"}}
        className="bg-purple-600 text-white px-5 py-3 rounded-sm w-auto xl:w-full"
        type="submit" disabled={!stripe}>Place Order</button>
    </div>
)
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_PUBLISHABLE_KEY);

const StripeForm =({cart, input})=>{
    const router= useRouter()
    const[status, setStatus]=useState("ready");

    if(status === "success"){
        router.push("/success")
        console.log("SUCCESSFUL SUBMIT")
    }
    return (
        <Elements stripe={stripePromise}>
            <CheckForm cart={ cart } success={()=>{setStatus("success")}} input={input} />
        </Elements>
    )
} 

export default StripeForm