import { Client, ApiError } from "square";
import { randomUUID } from "crypto";

const { paymentsApi } = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: "sandbox",
});

export default async function handler(req, res) {
  console.log(req.body)
  if (req.method === "POST") {
    try {
      const response = await paymentsApi.createPayment({
        sourceId: req.body.sourceId,
        idempotencyKey: randomUUID(),
        amountMoney: {
          amount: req.body.totalMoney,
          currency: "USD",
        },
        orderId: req.body.orderId,
      });
      console.log(response.result);
      res.json(
        JSON.parse(
          JSON.stringify(
            response.result,
            (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
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
    res.status(500).send();
  }
}
