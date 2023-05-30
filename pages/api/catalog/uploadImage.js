import { Client, ApiError } from "square";
import { randomUUID } from "crypto";

const { catalogApi } = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: "sandbox",
});

export default async function handler(req, res) {
  const {img} = req.body.img;
  console.log(img)
  if (req.method === "POST") {
    try {
      const file = new FileWrapper(fs.createReadStream(image));

      const response = await catalogApi.createCatalogImage(
        {
          idempotencyKey: randomUUID(),
          objectId: id,
          image: {
            type: "IMAGE",
            id: "#image_id",
            imageData: {
              name: "Image name 1",
              caption: "Image caption 1",
            },
          },
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
