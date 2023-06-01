import { Client, ApiError, FileWrapper } from "square";
import { randomUUID } from "crypto";

const { catalogApi } = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: "sandbox",
});

export default async function handler(req, res) {
  const id = req.body.id;
  console.log(img);
  if (req.method === "POST") {
    try {
      const file = new FileWrapper(fs.createReadStream(id));

      const response = await catalogApi.updateCatalogImage(
        id,
        {
          idempotencyKey: randomUUID(),
        },
        file
      );

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
    res.status(500).send();
  }
}
