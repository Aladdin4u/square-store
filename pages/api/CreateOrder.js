import { Client, ApiError } from "square";
import { randomUUID } from "crypto";

const { ordersApi } = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: "sandbox",
});

export default async function handler(req, res) {
  const { orderItems } = req.body;
  console.log("order", orderItems);
  if (req.method === "POST") {
    try {
      const response = await ordersApi.createOrder({
        order: {
          locationId: 'L8PQE1FX87X0V',
          lineItems: orderItems
        },
        idempotencyKey: randomUUID()
      });

      console.log(response.result);
      res.json(
        JSON.parse(
          JSON.stringify(
            response.result,
            (key, value) =>
              typeof value === "bigint" ? value.toString() : value // return everything else unchanged
          )
        )
      );
    } catch (error) {
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
    return res.status(500).send();
  }
}
