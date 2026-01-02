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
  const token = localStorage.getItem("token");

  /* ================= AUTH CHECK ================= */

  const isFreeTicket = type === "ticket" && number === 1;

  if (!token && !isFreeTicket) {
    toast.error("Iltimos, tizimga kiring");
    throw new Error("User is not authenticated");
  }

  /* ================= ENDPOINT ================= */

  if (type === "topic" && slug) {
    endpoint = `/tests/topics/${slug}/start/`;
  }

  if (type === "ticket" && number) {
    endpoint = `/tests/tickets/${number}/start/`;
  }

  /* ================= HEADERS ================= */

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  /* ================= REQUEST ================= */

  const res = await fetch(BASE_URL + endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify({ language }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Server xatosi");
  }

  return res.json();
};
