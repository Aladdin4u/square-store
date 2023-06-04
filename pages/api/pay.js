import { Client } from 'square';
import { randomUUID } from 'crypto';
import { totalAmount } from './orders.js';

const { paymentsApi } = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: 'sandbox'
});

export default async function handler(req, res) {
  
  if ( req.method === 'POST' ) {
    const { result } = await paymentsApi.createPayment({
      idempotencyKey: randomUUID(),
      sourceId: req.body.sourceId,
      amountMoney: {
        currency: 'USD',
        amount: totalAmount
      }
    })
    console.log(result);
    res.status(200).json(result);
  } else {
    res.status(500).send();
  }
}
