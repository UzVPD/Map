export interface GovernmentBuilding {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  department: string;
  services: string[];
}

export const governmentBuildings: GovernmentBuilding[] = [
  {
    id: "1",
    name: "Администрация Президента Кыргызской Республики",
    address: "Проспект Чынгыза Айтматова, 301, Чон-Арык с., Ленинский район, Бишкек, 720016",
    lat: 42.808226,
    lng: 74.583031,
    department: "Правительство",
    services: ["Управление делами Президента Кыргызской Республики", "Общественная приемная Президента и председателя кабинета министров КР "]
  },
];

