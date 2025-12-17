export type House = "Gryffindor" | "Slytherin" | "Hufflepuff" | "Ravenclaw";

export type Wand = {
  wood?: string;
  core?: string;
  length?: number | null;
};

export type Character = {
  id: string;
  name: string;
  alternate_names?: string[];
  species?: string;
  gender?: string;
  house?: string;
  dateOfBirth?: string;
  yearOfBirth?: number;
  wizard?: boolean;
  ancestry?: string;
  eyeColour?: string;
  hairColour?: string;
  wand?: Wand;
  patronus?: string;
  hogwartsStudent?: boolean;
  hogwartsStaff?: boolean;
  actor?: string;
  alive?: boolean;
  image?: string;
};

export type Spell = {
  name: string;
  description: string;
};

export type OutletContext = {
  house: House;
  setHouse: (house: House) => void;
};
