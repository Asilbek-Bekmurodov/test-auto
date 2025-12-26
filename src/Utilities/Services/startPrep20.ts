// services/startPrep20.ts

export interface Prep20Question {
  id: number;
  question_id: number;
  text: string;
  options?: string[]; // agar javob variantlari ham bor bo‘lsa
  image_url?: string;
  // rasm linki optional
}

export interface StartPrep20Response {
  session: {
    id: string;
  };
  type: "prep20";
  duration: number; // seconds
  questions: Prep20Question[];
}

const token = localStorage.getItem("token");


console.log(token);

/**
 * Backendga POST /tests/prep20/start/ chaqiradi
 * @param language til ("uz" | "ru" | "en")
 * @returns StartPrep20Response
 */

export const startPrep20 = async (
  language: "uz" | "ru" | "en" = "uz"
): Promise<StartPrep20Response> => {
  const res = await fetch(
    "https://imtihongatayyorlov.pythonanywhere.com/tests/prep20/start/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Agar login token ishlatilsa:
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ language }),
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Prep20 start error");
  }

  return res.json();
};
