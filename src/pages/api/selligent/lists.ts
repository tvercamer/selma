import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const options = {
    headers: {
      "Accep|t": "application/json",
      "X-ApiKey": `${process.env.SELLIGENT_API_KEY}:${process.env.SELLIGENT_API_SECRET}`,
    },
  };

  const res = await axios.get(
    `${process.env.SELLIGENT_BASE_URL}/organizations/${process.env.SELLIGENT_TEST_ORGANIZATION}/lists`,
    options
  );

  response.status(200).json(res.data);
}
