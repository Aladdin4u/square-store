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
              fromState: 'NONE',
              toState: 'IN_STOCK',
              locationId: 'L8PQE1FX87X0V',
              catalogObjectId: 'IR5KJ5GLVN6F2PV3VELIHOMA',
              quantity: '100',
              occurredAt: new Date().toISOString()
            }
          },
          {
            type: 'ADJUSTMENT',
            adjustment: {
              fromState: 'NONE',
              toState: 'IN_STOCK',
              locationId: 'L8PQE1FX87X0V',
              catalogObjectId: 'VDKRQCLTKBFTMN6I5NO3ONQG',
              quantity: '100',
              occurredAt: new Date().toISOString()
            }
          }
        ]
      });
    
      console.log(response.result);
      return res.json(
        JSON.parse(
          JSON.stringify(
            response.result,
            (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
          )
        )
      );
    } catch(error) {
      console.log(error);
    }
  } else {
    res.status(500).send();
  }
}
