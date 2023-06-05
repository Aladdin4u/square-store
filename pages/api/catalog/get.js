import { Client, ApiError } from "square";

const { catalogApi } = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: "sandbox",
});

export default async function handler(req, res) {
  try {
    const response = await catalogApi.listCatalog(undefined,'ITEM_VARIATION');

    return res.json(
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
}
