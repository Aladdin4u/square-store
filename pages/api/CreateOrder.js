import { Client, ApiError } from "square";
import { randomUUID } from "crypto";
import axios from "axios"; // Import axios for making HTTP requests
import { products } from 'components/Cart.js';

const { OrdersApi } = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: "sandbox",
});

export default async function handler(req, res) {
  // ... existing code ...

  if (req.method === "POST") {
    try {
      const orderItems = products.map((product) => {
        return {
          catalogObjectId: product.id,
          quantity: product.quantity,
          variationName: "Default",
        };
      });

      const response = await OrdersApi.createOrder({
        locationId: "L8PQE1FX87X0V",
        order: {
          idempotencyKey: randomUUID(),
          lineItems: orderItems,
        },
      });

      // Accessing order information
      const { id, location_id, source, line_items, total_money } =
        response.result.order;

      // Accessing line items
      const { lineItems } = line_items;
      lineItems.forEach((lineItem) => {
        const { catalogObjectId, quantity, variationName } = lineItem;
        // Process each line item as needed
      });

      // Accessing total money
      const { amount, currency } = total_money;

      // ... existing code ...

      return res.json(response.result);
    } catch (error) {
      // ... existing error handling code ...
    }
  } else {
    return res.status(500).send();
  }
}
