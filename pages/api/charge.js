import Stripe from "stripe";
const stripe = new Stripe("sk_test_51ILYcRDeBWDEYf9HRr0VnWAztlHtv6AzLqID3UCGJ2ytlWhzjvs8JphgSjEFA8Cw7YaTosE7P5YFSExqOEqyACxu00TWqQKS7d");

export default async (req, res)=>{

    const {id, amount, products} = req.body;
    const [name]=products

    try{
        const payment = await stripe.paymentIntents.create({
            amount,
            currency:'USD',
            description: name.name, 
            payment_method: id,
            confirm:true //charge it right away
        });
        console.log("payment--->", payment)
        return res.status(200).json({
            confirm: 'ABC123'
        })
    }
    catch(error){
        console.log(error);
        return res.status(400).json({
            message:error.message
        })

    }


}