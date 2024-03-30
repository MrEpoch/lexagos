import { Contact, Home, PersonStanding, Video } from "lucide-react";

export const sidebarData = [
  {
    link: "/",
    text: "Home",
    icon: Home,
  },
  {
    link: "/about",
    text: "About",
    icon: PersonStanding,
  },
  {
    link: "/contact",
    text: "Contact",
    icon: Contact,
  },
  {
    link: "/courses",
    text: "Courses",
    icon: Video,
  },
];

export const homePageCards = [
  {
    title: "Programming",
    description:
      "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
    link: "/courses",
    imgSrc: "/assets/python.svg",
  },
  {
    title: "Business",
    description:
      "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat..",
    link: "/courses",
    imgSrc: "/assets/business.svg",
  },
  {
    title: "Languages",
    description:
      "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
    link: "/courses",
    imgSrc: "/assets/language.svg",
  }
]
