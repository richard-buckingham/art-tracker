
import { SelectData } from './selectData.interface';

export const locations: SelectData[] = [
  {
    value: "home",
    description: "Home",
    default: true
  },
  {
    value: "wyrena",
    description: "Wyrena",
    default: false
  },
  {
    value: "town-and-country",
    description: "Town & Country",
    default: false
  },
];
