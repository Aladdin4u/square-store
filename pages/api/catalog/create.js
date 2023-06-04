import { Client, ApiError } from "square";
import { randomUUID } from "crypto";

const { catalogApi } = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: "sandbox",
});

export default async function handler(req, res) {
  const { name, description, variation, color, size, images } =
    req.body.newproduct;
    console.log(req.body)
  if (req.method === "POST") {
    try {
      const response = await catalogApi.batchUpsertCatalogObjects({
        idempotencyKey: randomUUID(),
        batches: [
          {
            objects: [
              {
                type: "ITEM_OPTION",
                id: "#item_option_color",
                itemOptionData: {
                  name: `COLOR_OPTIONS_${name.toUpperCase()}`,
                  values: color,
                },
              },
              {
                type: "ITEM_OPTION",
                id: "#item_option_size",
                itemOptionData: {
                  name: `SIZE_OPTIONS_${name.toUpperCase()}`,
                  values: size,
                },
              },
              {
                type: "ITEM",
                id: "#item",
                itemData: {
                  name: name,
                  descriptionHtml: description,
                  variations: variation,
                  productType: "REGULAR",
                  itemOptions: [
                    {
                      itemOptionId: "#item_option_size",
                    },
                    {
                      itemOptionId: "#item_option_color",
                    },
                  ],
                },
              },
            ],
          },
        ],
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
    res.status(500).send();
  }
}
