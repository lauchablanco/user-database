export enum House {
    Gryffindor = "Gryffindor",
    Slytherin = "Slytherin",
    Hufflepuff = "Hufflepuff",
    Ravenclaw = "Ravenclaw",
  }
  
  export type User = {
    _id: string;
    name: string;
    surname: string;
    profilePicture?: string;
    house: House;
  };