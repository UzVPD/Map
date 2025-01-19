export interface GovernmentBuilding {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  department: string;
  services: string[];
  images: string[];
  website: string;
  rating: number;
  hours: string;
}


export const governmentBuildings: GovernmentBuilding[] = [
  {
    id: "1",
    name: "Администрация Президента Кыргызской Республики",
    address: "Проспект Чынгыза Айтматова, 301, Чон-Арык с., Ленинский район, Бишкек, 720016",
    lat: 42.808226,
    lng: 74.583031,
    department: "Правительство",
    services: ["Управление делами Президента Кыргызской Республики", "Общественная приемная Президента и председателя кабинета министров КР "],
    images: ["https://vesti.kg/media/k2/items/cache/a9f3236d5dfb199f7774e55d6f5a11a0_XL.jpg?t=20240806_061101", "https://data.kaktus.media/image/big/2022-04-15_21-21-15_696744.jpg"],
    website: "https://www.google.com",
    rating: 5,
    hours: "09:00 - 18:00"
  },
  {
    id: "2",
    name: "Государственное учреждение Тундук при Министерстве Цифрового развития ",
    address: "​Улица Токтоналиева, 96​1 этаж Октябрьский район, Бишкек, 720044",
    lat: 42.839034,
    lng: 74.599293,
    department: "​Государственный комитет информационных технологий и связи КР",
    services: ["ГУ Центр электронного взаимодействия Тундук"],
    images: ["https://st-1.akipress.org/cdn-st-0/qdL/4/1528853.72bdaa039c509f1bb0679228aac2e313.jpg", "https://data.gov.kg/uploads/group/2023-12-15-093849.576008.png"],
    website: "https://www.google.com",
    rating: 5,
    hours: "09:00 - 18:00"
  }
];


