import { mongooseConnect } from '@/lib/mongoose';
import { Order } from '@/models/Order';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import { buffer } from 'micro';
export default async function handler(req, res) {
  await mongooseConnect();
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      await buffer(req),
      sig,
      process.env.endpointSecret
    );
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const data = event.data.object;
      const orderId = data.metadata.orderId;
      const paid = data.payment_status === 'paid';
      if (orderId && paid) {
        await Order.findOneAndUpdate(
          { _id: orderId },
          { $set: { paid: true } }
        );
      }
      console.log(data, 'dataaaaaaaaa');

      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  res.status(200).json({ received: true });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
