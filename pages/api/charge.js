import Stripe from "stripe";
const stripe = new Stripe(process.env.SECRET_KEY);

export default async (req, res)=>{

    // console.log("LOQ REZ---->", req)

    const {id, amount, products, input} = req.body;
    const [name]=products

    console.log("INPPPUTT", input)
    console.log("INPPPUTT NAMEEE", input.firstName)

    try{
        const customer = stripe.customers.create({ name: `${input.firstName} ${input.lastName}`, email: input.email })
        const payment = await stripe.paymentIntents.create({
            amount,
            currency:'USD',
            description: name.name,
            payment_method: id,
            // customer:customer.id,
            confirm:true //charge it right away
        });

        console.log("CLIENT SECRT", payment.client_secret)

        return res.status(200).send(payment.client_secret)
    }
    catch(error){
        console.log(error);
        return res.status(400).json({
            message:error.message
        })

    }


}