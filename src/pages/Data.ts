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
  titleKey: string;
  active: boolean;
  path: string;
  darkIcon: keyof typeof images;
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
  title: string; // i18n key
  subtitle: string; // i18n key
  value: string;
};

export const stats: StatItem[] = [
  {
    title: "payment.stats.dtm",
    subtitle: "payment.stats.testsCount",
    value: "2 849",
  },
  {
    title: "payment.stats.topic",
    subtitle: "payment.stats.testsCount",
    value: "649",
  },
  {
    title: "payment.stats.auto",
    subtitle: "payment.stats.testsCount",
    value: "120",
  },
  {
    title: "payment.stats.certificate",
    subtitle: "payment.stats.testsCount",
    value: "60",
  },
];

export type Plan = {
  id: string;
  label: string; // i18n key
  price: number;
  oldPrice?: number;
};

export const plans: Plan[] = [
  {
    id: "1m",
    label: "payment.plans.1m",
    price: 35000,
  },
  {
    id: "3m",
    label: "payment.plans.3m",
    price: 79000,
    oldPrice: 105000,
  },
  {
    id: "6m",
    label: "payment.plans.6m",
    price: 129000,
    oldPrice: 210000,
  },
];

export const subPages: SubPages[] = [
  {
    icon: "boshSahifa",
    darkIcon: "darkHome",
    titleKey: "menu.home",
    active: true,
    path: "/home/",
  },
  {
    icon: "talim",
    darkIcon: "darkTalim",
    titleKey: "menu.education",
    active: false,
    path: "/home/education",
  },
  {
    icon: "tolov",
    darkIcon: "darkTolov",
    titleKey: "menu.payment",
    active: false,
    path: "/home/payment",
  },
  {
    icon: "yangilik",
    darkIcon: "darkYangilik",
    titleKey: "menu.news",
    active: false,
    path: "/home/news",
  },
  {
    icon: "xato",
    darkIcon: "darkXatolar",
    titleKey: "menu.mistakes",
    active: false,
    path: "/home/problems",
  },
];

export const cardsData: CardsData[] = [
  {
    id: 1,
    title: "cards.prep20",
    imgSrc: images.mainCard,
    path: "/test/prep20",
  },
  {
    id: 2,
    title: "cards.prep50",
    imgSrc: images.tayyorlov,
    path: "/test/prep50",
  },
  {
    id: 3,
    title: "cards.real",
    imgSrc: images.real,
    path: "/test/real",
  },
  {
    id: 4,
    title: "cards.tickets",
    imgSrc: images.biletlar,
    path: "/home/biletlar",
  },
  {
    id: 5,
    title: "cards.topicTests",
    imgSrc: images.mavzulashtirilgan,
    path: "/home/problems",
  },
  {
    id: 6,
    title: "cards.tricky",
    imgSrc: images.chalgituvchi,
    path: "/test/tricky",
  },
  {
    id: 7,
    title: "cards.marathon",
    imgSrc: images.marafon,
    path: "/test/marathon",
  },
  {
    id: 8,
    title: "cards.mistakes",
    imgSrc: images.marafon,
    path: "/test/mistakes",
  },
];

export const EducationCard: CardsData[] = [
  {
    id: 1,
    title: "education.rules",
    imgSrc: images.belgilar,
    path: "",
  },
  {
    id: 2,
    title: "education.signs",
    imgSrc: images.tayyorlov,
    path: "",
  },
  {
    id: 3,
    title: "education.terms",
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
