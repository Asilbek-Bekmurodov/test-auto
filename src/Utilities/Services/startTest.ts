import { TEST_ENDPOINTS } from "./testConfig";
import type { TestType } from "./testConfig";
import type { StartTestResponse } from "./types";

const BASE_URL = "https://imtihongatayyorlov.pythonanywhere.com";
const token = localStorage.getItem("token");


console.log(token)
type StartTestParams = {
  type: TestType;
  language?: "uz" | "ru" | "en";
  slug?: string;
  number?: number;
};

export const startTest = async ({
  type,
  language = "uz",
  slug,
  number,
}: StartTestParams): Promise<StartTestResponse> => {
  let endpoint = TEST_ENDPOINTS[type];

  if (type === "topic" && slug) {
    endpoint = `/tests/topics/${slug}/start/`;
  }


  if (type === "ticket" && number) {
    endpoint = `/tests/tickets/${number}/start/`;
  }

  const res = await fetch(BASE_URL + endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ language }),
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
};
