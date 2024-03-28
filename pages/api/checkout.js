import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';
import { Order } from '@/models/Order';
const stripe = require('stripe')(process.env.STRIPE_SK);
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.json('should be a post request');
    return;
  }
  await mongooseConnect();
  const { name, email, city, postalCode, address, country, cartProducts } =
    req.body;
  const productsIds = cartProducts;
  const uniqueIds = [...new Set(productsIds)];
  const productsInfos = await Product.find({ _id: { $in: uniqueIds } });
  let line_items = [];
  for (const productId of uniqueIds) {
    const productInfo = productsInfos.find(
      (p) => p._id.toString() === productId
    );
    const quantity = productsIds.filter((id) => id === productId)?.length || 0;
    if (quantity > 0) {
      line_items.push({
        quantity,
        price_data: {
          currency: 'USD',
          product_data: {
            name: productInfo.title,
          },
          unit_amount: productInfo.price * quantity * 100,
        },
      });
    }
  }
  const orderDoc = await Order.create({
    lineItems: line_items,
    name,
    email,
    city,
    postalCode,
    address,
    country,
    paid: false,
  });
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    customer_email: email,
    success_url: `${process.env.PUBLIC_URL}/cart?success=1`,
    cancel_url: `${process.env.PUBLIC_URL}/cart?success=0`,
    metadata: {
      orderId: orderDoc._id.toString(),
    },
  });
  console.log(session);
  res.json({
    url: session.url,
  });
}
