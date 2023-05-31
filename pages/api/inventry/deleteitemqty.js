import { Client, ApiError } from 'square';
import { randomUUID } from 'crypto';

const { inventoryApi } = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: 'sandbox'
});

export default async function handler(req, res) {
  const {id, quantity} = req.body.formData
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
              locationId: 'L8PQE1FX87X0V',
              catalogObjectId: id,
              quantity: quantity,
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
      if (error instanceof ApiError) {
        error.result.errors.forEach(function (e) {
          console.log(e.category);
          console.log(e.code);
          console.log(e.detail);
        });
      } else {
        console.log("Unexpected error occurred: ", error);
      }
    }
  } else {
    res.status(500).send();
  }
}
