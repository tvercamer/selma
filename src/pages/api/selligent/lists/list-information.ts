import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

import { getAllData } from "@/utils/selligent.utils";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const options = {
    headers: {
      Accept: "application/json",
      "X-ApiKey": `${process.env.SELLIGENT_API_KEY}:${process.env.SELLIGENT_API_SECRET}`,
    },
  };

  const organization = request.query.organization || process.env.SELLIGENT_TEST_ORGANIZATION;
  const axiosURL = `${process.env.SELLIGENT_BASE_URL}/organizations/${organization}/lists`;

  switch (request.method) {
    case "GET":
      const listResponse = await axios.get(axiosURL, options);
      const lists = listResponse.data.lists;

      // Get additional information    
      const metaDataList = lists.map((list: any) => `${axiosURL}/${list.api_name}`);
      const listsMetaData = await getAllData(metaDataList, options);
      lists.map((list: any) => {
        const metaData = listsMetaData.find((metaRecord: any) => metaRecord.api_name === list.api_name);
        list.meta = metaData;
      })

      // Return full DB structure
      response.status(200).json(lists);
      break;
    default:
      response.setHeader("Allow", ["GET", "POST"]);
      response.status(405).end(`Method ${request.method} Not Allowed`);
      break;
  }
}