import { Client, ApiError, FileWrapper } from "square";
import { randomUUID } from "crypto";
import formidable from 'formidable';
import fs from "fs";

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
  const options = {};
    options.filename = (name, ext, path, form) => {
      return path.originalFilename;
    };
  const form = formidable(options);
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  })
}

export default async function handler(req, res) {
  
  if (req.method === "POST") {
    const { fields, files } = await readFile(req)
    const filepath = files.image.filepath
    const id = fields.id
    try {
      const file = new FileWrapper(fs.createReadStream(filepath));

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
