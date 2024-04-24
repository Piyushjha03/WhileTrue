import Stripe from 'stripe';
import { v4 as uuid } from 'uuid';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const customerData = async (req, res) => {
    try {
        // Create a new customer
        const customer = await stripe.customers.create({
            email: req.body.email
        });

        // Create an invoice item for the course fee
        const invoiceItem = await stripe.invoiceItems.create({
            customer: customer.id,
            amount: 2500, // Amount in cents (25 USD * 100)
            currency: 'usd',
            description: 'Course Fee'
        });

        // Create an invoice for the customer
        const invoice = await stripe.invoices.create({
            collection_method: "charge_automatically",
            customer: invoiceItem.customer
        });

        // Log the created invoice for debugging
        console.log(invoice);

        // Send a success response to the client
        res.status(200).json({ message: 'Invoice created successfully', invoice });
    } catch (err) {
        // Log any errors
        console.error(err);
        // Send an error response to the client
        res.status(500).json({ error: 'Internal server error' });
    }
};

export { customerData };

const addNewCard = async (req,res)=>{
    try {
          const cardToken = await stripe.tokens.create({
            card:{
                name:req.body.card_name,
                number : req.body.card_number,
                exp_month : req.body.exp_month,
                exp_year: req.body.exp_year,
                cvc: req.body.cvc
            }
          })
          const card = await stripe.customers.createSource(req.body.customer_id,{
            source : `${cardToken.id}`
          })
          res.status(200).send({card:card.id})
    } catch (error) {
        console.log(error);
        
    }
}
export {addNewCard}

