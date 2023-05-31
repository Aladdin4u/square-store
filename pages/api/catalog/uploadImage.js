import { Client, ApiError, FileWrapper } from "square";
import { randomUUID } from "crypto";
import fs from "fs";
import formidable from 'formidable';
import { resolve } from "path";

const { catalogApi } = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: "sandbox",
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const readFile = (req) => {
  const form = formidable();
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
      }
      resolve({ fields, files });
    });
  })
}

export default async function handler(req, res) {
  
  if (req.method === "POST") {
    const {fields, files} = await readFile(req)
    console.log("files ==>",fields.body, "testts",files)
    console.log("files4 ==>",files.image)
    res.json({files, fields})
    try {
      const file = new FileWrapper(fs.createReadStream(files.image, {
        contentType: 'image/jpeg',
      }));
      const response = await catalogApi.createCatalogImage(
        {
          idempotencyKey: randomUUID(),
          objectId: id,
          image: {
            type: "IMAGE",
            id: "#image_id",
            imageData: {
              name: "image_name",
              caption: "Image_caption",
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
