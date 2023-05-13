import { Client } from 'square';
import { randomUUID } from 'crypto';

const { catalogApi } = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: 'sandbox'
});

export default async function handler(req, res) {
  
  if ( req.method === 'POST' ) {
    try {
        const response = await catalogApi.upsertCatalogObject({
          idempotencyKey: randomUUID(),
          object: {
            type: 'ITEM',
            id: '#coffee',
            itemData: {
              name: 'Coffee',
              description: 'Coffee Drink',
              abbreviation: 'Co',
              variations: [
                {
                  type: 'ITEM_VARIATION',
                  id: '#small_coffee',
                  itemVariationData: {
                    itemId: '#coffee',
                    name: 'Small',
                    pricingType: 'FIXED_PRICING',
                    priceMoney: {
                      amount: 300,
                      currency: 'USD'
                    }
                  }
                },
                {
                  type: 'ITEM_VARIATION',
                  id: '#large_coffee',
                  itemVariationData: {
                    itemId: '#coffee',
                    name: 'Large',
                    pricingType: 'FIXED_PRICING',
                    priceMoney: {
                      amount: 350,
                      currency: 'USD'
                    }
                  }
                }
              ]
            }
          }
        });
      
        console.log(response.result);
        res.json(response.result)
      } catch(error) {
        console.log(error);
      }
  } else {
    res.status(500).send();
  }
}
