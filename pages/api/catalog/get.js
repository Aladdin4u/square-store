import { Client } from 'square';

const { catalogApi } = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: 'sandbox'
});

export default async function handler(req, res) {
  
  try {
    const response = await catalogApi.listCatalog();
  
    console.log(response.result);
    res.json(response.toString())
  } catch(error) {
    console.log(error);
  }
}
