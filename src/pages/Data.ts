import { images } from "../assets/images";
export interface CardsData {
  imgSrc: string;
  title: string;
  id: number;
}

export interface SubPages {
  icon: keyof typeof images;
  title: string;
  active: boolean;
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
  },
  {
    id: 2,
    title: "Tayyorlov imtihoni 50",
    imgSrc: images.tayyorlov,
  },
  {
    id: 3,
    title: "Real imtihon",
    imgSrc: images.real,
  },
  {
    id: 4,
    title: "Biletlar",
    imgSrc: images.biletlar,
  },
  {
    id: 5,
    title: "Mavzulashtirilgan testlar",
    imgSrc: images.mavzulashtirilgan,
  },
  {
    id: 6,
    title: "Chalg’ituvchi testlar",
    imgSrc: images.chalgituvchi,
  },
  {
    id: 7,
    title: "MArafon",
    imgSrc: images.marafon,
  },
];

export const EducationCard: CardsData[] = [
  {
    id: 1,
    title: "Yo'l harakati qoidalari",
    imgSrc: images.belgilar,
  },
  {
    id: 2,
    title: "Yo'l belgilari",
    imgSrc: images.tayyorlov,
  },
  {
    id: 3,
    title: "Atamalar",
    imgSrc: images.real,
  },
];
