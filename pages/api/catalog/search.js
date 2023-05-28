import { Client } from "square";

const { catalogApi } = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: "sandbox",
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const response = await catalogApi.searchCatalogItems({
        textFilter: "Shirt",
        productTypes: ["REGULAR"],
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
      console.log(error);
    }
  } else {
    res.status(500).send();
  }
}
