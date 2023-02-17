import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

import { getAllData, SelligentRequestOptions } from "@/utils/selligent.utils";

interface IAdditionalInformation {
  label: string;
  URLs: string[];
  key?: string;
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const organization =
    request.query.organization || process.env.SELLIGENT_TEST_ORGANIZATION;
  const axiosURL = `${process.env.SELLIGENT_BASE_URL}/organizations/${organization}/lists`;

  switch (request.method) {
    case "GET":
      const listResponse = await axios.get(axiosURL, SelligentRequestOptions);
      const lists = listResponse.data.lists;

      // Get additinal information
      const listInformationURLs = lists.map(
        (list: any) => `${axiosURL}/${list.api_name}`
      );
      const listInformationData = await getAllData(listInformationURLs);
      lists.map((list: any) => {
        list.information = listInformationData.find(
          (record: any) => record.api_name == list.api_name
        );
      });

      // Get fields
      for(const list of lists){
        const fieldResponse = await axios.get(`${axiosURL}/${list.api_name}/fields`, SelligentRequestOptions);
        const fieldsData = fieldResponse.data;
        list.fields = fieldsData.fields;
      }

      // Get relations
      for(const list of lists){
        const relationResponse = await axios.get(`${axiosURL}/${list.api_name}/relations`, SelligentRequestOptions);
        const relationData = relationResponse.data;
        list.relations = relationData.relations;
      }

      // Return full DB structure
      response.status(200).json(lists);
      break;
    default:
      response.setHeader("Allow", ["GET", "POST"]);
      response.status(405).end(`Method ${request.method} Not Allowed`);
      break;
  }
}
