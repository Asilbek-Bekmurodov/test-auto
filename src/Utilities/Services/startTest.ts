import { toast } from "react-toastify";
import { TEST_ENDPOINTS } from "./testConfig";
import type { TestType } from "./testConfig";
import type { StartTestResponse } from "./types";

const BASE_URL = "https://imtihongatayyorlov.pythonanywhere.com";

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
  const token = localStorage.getItem("token"); // ✅ bu yerda

  if (!token) {
    toast.error("User is not authenticated");

    throw new Error("User is not authenticated");
  }

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
    const errorText = await res.text();
    // toast.error(errorText || "Server xatosi"); // avval toast
    throw new Error(errorText);
  }

  return res.json();
};
