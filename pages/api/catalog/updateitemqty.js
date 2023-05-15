import { Client } from 'square';
import { randomUUID } from 'crypto';

const { inventoryApi } = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: 'sandbox'
});

export default async function handler(req, res) {
  
  if ( req.method === 'POST' ) {
    try {
      const response = await inventoryApi.batchChangeInventory({
        idempotencyKey: randomUUID(),
        changes: [
          {
            type: 'ADJUSTMENT',
            adjustment: {
              fromState: 'IN_STOCK',
              toState: 'WASTE',
              locationId: 'EF6D9SACKWBKZ',
              catalogObjectId: '6F4K33KPNUVDWKZ43KUIFH6K',
              quantity: '2',
              occurredAt: '2020-12-18T21:19:00Z'
            }
          }
        ]
      });
    
      console.log(response.result);
    } catch(error) {
      console.log(error);
    }
  } else {
    res.status(500).send();
  }
}
