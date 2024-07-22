export const userData = [
  {
    id: 1,
    avatar:
      "https://github.com/jakobhoeg/shadcn-chat/blob/master/public/User1.png",
    messages: [
      {
        id: 1,
        avatar:
          "https://github.com/jakobhoeg/shadcn-chat/blob/master/public/User1.png",
        name: "Jane Doe",
        message: "Hey, Jakob",
      },
      {
        id: 2,
        avatar:
          "https://github.com/jakobhoeg/shadcn-chat/blob/master/public/LoggedInUser.jpg",
        name: "Jakob Hoeg",
        message: "Hey!",
      },
      {
        id: 3,
        avatar:
          "https://github.com/jakobhoeg/shadcn-chat/blob/master/public/User1.png",
        name: "Jane Doe",
        message: "How are you?",
      },
      {
        id: 4,
        avatar:
          "https://github.com/jakobhoeg/shadcn-chat/blob/master/public/LoggedInUser.jpg",
        name: "Jakob Hoeg",
        message: "I am good, you?",
      },
      {
        id: 5,
        avatar:
          "https://github.com/jakobhoeg/shadcn-chat/blob/master/public/User1.png",
        name: "Jane Doe",
        message: "I am good too!",
      },
      {
        id: 6,
        avatar: "/LoggedInUser.jpg",
        name: "Jakob Hoeg",
        message: "That is good to hear!",
      },
      {
        id: 7,
        avatar:
          "https://github.com/jakobhoeg/shadcn-chat/blob/master/public/User1.png",
        name: "Jane Doe",
        message: "How has your day been so far?",
      },
      {
        id: 8,
        avatar: "/LoggedInUser.jpg",
        name: "Jakob Hoeg",
        message:
          "It has been good. I went for a run this morning and then had a nice breakfast. How about you?",
      },
      {
        id: 9,
        avatar:
          "https://github.com/jakobhoeg/shadcn-chat/blob/master/public/User1.png",
        name: "Jane Doe",
        message: "I had a relaxing day. Just catching up on some reading.",
      },
    ],
    name: "Jane Doe",
  },
  {
    id: 2,
    avatar: "/User2.png",
    name: "John Doe",
  },
  {
    id: 3,
    avatar: "/User3.png",
    name: "Elizabeth Smith",
  },
  {
    id: 4,
    avatar: "/User4.png",
    name: "John Smith",
  },
];

export type UserData = {
  _id?: String;
  email: String;
  username: String;
};

export const loggedInUserData = {
  id: 5,
  avatar: "/LoggedInUser.jpg",
  name: "Jakob Hoeg",
};


export const countries = [
  { name: "United States", code: "US", population: 331002651, continent: "North America", capital: "Washington, D.C." },
  { name: "Canada", code: "CA", population: 37742154, continent: "North America", capital: "Ottawa" },
  { name: "United Kingdom", code: "GB", population: 67886011, continent: "Europe", capital: "London" },
  { name: "Australia", code: "AU", population: 25499884, continent: "Oceania", capital: "Canberra" },
  { name: "India", code: "IN", population: 1380004385, continent: "Asia", capital: "New Delhi" },
  { name: "Germany", code: "DE", population: 83783942, continent: "Europe", capital: "Berlin" },
  { name: "France", code: "FR", population: 65273511, continent: "Europe", capital: "Paris" },
  { name: "Japan", code: "JP", population: 126476461, continent: "Asia", capital: "Tokyo" },
  { name: "Brazil", code: "BR", population: 212559417, continent: "South America", capital: "Brasília" },
  { name: "South Africa", code: "ZA", population: 59308690, continent: "Africa", capital: "Pretoria" }
];

export const investorTypes = [
  "Angle Investor",
  "Venture Capitalist (VC)",
  "Family investor",
];

export const industryTypes = [
  "Agriculture",
  "Automotive",
  "Construction",
  "Education",
  "Finance",
  "Healthcare",
  "Hospitality",
  "Information Technology",
  "Manufacturing",
  "Real Estate",
  "Retail",
  "Transportation",
  "Utilities"
];


export type LoggedInUserData = typeof loggedInUserData;

export interface Message {
  id: number;
  avatar: string;
  name: string;
  message: string;
}

export interface User {
  id: number;
  avatar: string;
  messages: Message[];
  name: string;
}
