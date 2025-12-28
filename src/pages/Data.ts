import { images } from "../assets/images";

export type FAQItem = {
  question: string;
  answer: string;
};

export type TestimonialItem = {
  id: number;
  name: string;
  role: string;
  text: string;
  image: keyof typeof images;
};

export interface CardsData {
  imgSrc: string;
  title: string;
  id: number;
  path: string;
}

export type LessonMediaItem = {
  id: number;
  author: string;
  role: string;
  image: keyof typeof images;
  videoUrl?: string;
};

export interface SubPages {
  icon: keyof typeof images;
  title: string;
  active: boolean;
  path: string;
}

export type HowItWorksItem = {
  id: number;
  step: string; // "01", "02", "03"
  title: string;
  description: string;
  icon: keyof typeof images; // icon component
  iconBg: string; // tailwind bg color
  align?: "left" | "right"; // dizayndagi joylashuv
  highlighted?: boolean; // active / borderli holat
};

export type StatItem = {
  title: string;
  subtitle: string;
  value: string;
};

export type Plan = {
  id: string;
  label: string;
  price: number;
  oldPrice?: number;
};

export const stats: StatItem[] = [
  { title: "DTM", subtitle: "Testlar soni", value: "2 849 ta" },
  { title: "Mavzuli test", subtitle: "Testlar soni", value: "649 ta" },
  { title: "Avto", subtitle: "Testlar soni", value: "120 ta" },
  { title: "Milliy sertifikat", subtitle: "Testlar soni", value: "60 ta" },
];

export const plans: Plan[] = [
  { id: "1m", label: "1 Oylik", price: 35000 },
  { id: "3m", label: "3 Oylik", price: 79000, oldPrice: 105000 },
  { id: "6m", label: "6 Oylik", price: 129000, oldPrice: 210000 },
];
export interface TicketCard {
  id: number;
  category: string; // "Avto test"
  title: string; // "Bilet-1"
  testsCount: number; // 20
  year: string; // "Avtotest 2025"
  locked?: boolean;
  path: string;
}

export const subPages: SubPages[] = [
  {
    icon: "boshSahifa",
    title: "Bosh sahifa",
    active: true,
    path: "/home/",
  },
  {
    icon: "talim",
    title: "Ta'lim",
    active: false,
    path: "/home/education",
  },
  {
    icon: "tolov",
    title: "To’lovlar",
    active: false,
    path: "/home/payment",
  },
  {
    icon: "yangilik",
    title: "Yangiliklar",
    active: false,
    path: "/home/news",
  },
  {
    icon: "xato",
    title: "Xatoliklar",
    active: false,
    path: "/home/problems",
  },
];

export const cardsData: CardsData[] = [
  {
    id: 1,
    title: "Tayyorlov Imtihoni 20",
    imgSrc: images.mainCard,
    path: "/test/prep20",
  },
  {
    id: 2,
    title: "Tayyorlov imtihoni 50",
    imgSrc: images.tayyorlov,
    path: "/test/prep50",
  },
  {
    id: 3,
    title: "Real imtihon",
    imgSrc: images.real,
    path: "/test/real",
  },
  {
    id: 4,
    title: "Biletlar",
    imgSrc: images.biletlar,
    path: "/home/biletlar",
  },
  {
    id: 5,
    title: "Mavzulashtirilgan testlar",
    imgSrc: images.mavzulashtirilgan,
    path: "/home/problems",
  },
  {
    id: 6,
    title: "Chalg’ituvchi testlar",
    imgSrc: images.chalgituvchi,
    path: "/test/tricky",
  },
  {
    id: 7,
    title: "MArafon",
    imgSrc: images.marafon,
    path: "/test/marathon",
  },
];

export const EducationCard: CardsData[] = [
  {
    id: 1,
    title: "Yo'l harakati qoidalari",
    imgSrc: images.belgilar,
    path: "",
  },
  {
    id: 2,
    title: "Yo'l belgilari",
    imgSrc: images.tayyorlov,
    path: "",
  },
  {
    id: 3,
    title: "Atamalar",
    imgSrc: images.real,
    path: "",
  },
];

export const howItWorksData: HowItWorksItem[] = [
  {
    id: 1,
    step: "01",
    title: "Instruktor tayyorlash",
    description:
      "Haydovchilik guvohnomasiga ishonch bilan tayyorlaning! Bizning professional instruktorlarimiz sizni nazariy va amaliy jihatdan to‘liq tayyorlaydi.",
    icon: "howFirst",
    iconBg: "bg-indigo-100 text-indigo-600",
    align: "left",
  },
  {
    id: 2,
    step: "02",
    title: "Testga tayyorgarlik",
    description:
      "Har bir o‘quvchi bilan individual yondashuv, xavfsiz va samarali mashg‘ulotlar — barchasi sizning muvaffaqiyatli haydovchilik guvohnomasini qo‘lga kiritishingiz uchun!",
    icon: "howSecond",
    iconBg: "bg-yellow-100 text-yellow-600",
    align: "right",
  },
  {
    id: 3,
    step: "03",
    title: "O'z maqsadiz sari",
    description:
      "Tajribali instruktorlar, to‘liq dastur va individual yondashuv bilan haydovchilik guvohnomangizga ishonchli qadam tashlang!",
    icon: "howThird",
    iconBg: "bg-purple-100 text-purple-600",
    align: "left",
    highlighted: true,
  },
];
