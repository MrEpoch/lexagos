import {
  Contact,
  Home,
  LayoutDashboard,
  LogIn,
  PersonStanding,
  User,
  UserPlus,
  Video,
} from "lucide-react";

export function getSidebarData(lang = "en") {
  return sidebarData.map((item: any) => ({
    ...item,
    text: item.text[lang],
  }));
}

export const sidebarData = [
  {
    link: "/",
    text: {
      en: "Home",
      cz: "Domov",
    },
    icon: Home,
  },
  {
    link: "/about",
    text: {
      en: "About",
      cz: "O nás",
    },
    icon: PersonStanding,
  },
  {
    link: "/contact",
    text: {
      en: "Contact",
      cz: "Kontakt",
    },
    icon: Contact,
  },
  {
    link: "/courses",
    text: {
      en: "Courses",
      cz: "Kurzy",
    },
    icon: Video,
  },
  {
    link: "/sign-in",
    text: {
      en: "Sign In",
      cz: "Přihlásit se",
    },
    icon: LogIn,
  },
  {
    link: "/sign-up",
    text: {
      en: "Sign Up",
      cz: "Registrace",
    },
    icon: UserPlus,
  },
  {
    link: "/actions",
    text: {
      en: "Actions",
      cz: "Akce",
    },
    icon: LayoutDashboard,
  },
  {
    link: "/account",
    text: {
      en: "Account",
      cz: "Účet",
    },
    icon: User,
  }
];

export const homePageCards = {
  en: [
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
    },
  ],
  cz: [
    {
      title: "Programování",
      description:
        "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
      link: "/courses",
      imgSrc: "/assets/python.svg",
    },
    {
      title: "Business",
      description:
        "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
      link: "/courses",
      imgSrc: "/assets/business.svg",
    },
    {
      title: "Jazyky",
      description:
        "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
      link: "/courses",
      imgSrc: "/assets/language.svg",
    },
  ],
};

export const errorKinds = {
  "course-create-failed": {
    title: "Course creation failed",
    description: "Please try again later.",
  },
};

export const FILE_TYPES = ["image/png", "image/jpeg", "image/jpg"];
