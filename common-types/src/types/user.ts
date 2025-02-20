export enum House {
    Gryffindor = "Gryffindor",
    Slytherin = "Slytherin",
    Hufflepuff = "Hufflepuff",
    Ravenclaw = "Ravenclaw",
  }
  
  export enum Role {
    Student = "Student",
    Professor = "Professor",
    Headmaster = "Headmaster",
    Prefect = "Prefect",
    Ghost = "Ghost",
  }

  export enum Gender {
    Male = "Male",
    Female = "Female",
    Other = "Other",
  }

  export enum Pet {
    Owl = "Owl",
    Cat = "Cat",
    Rat = "Rat",
    Frog = "Frog",
    Ferret = "Ferret",
  }

  export type User = {
    _id: string;
    fullName: string;
    birthDate: Date;
    profilePicture?: string;
    house: House;
    role: Role;
    pet: Pet;
  };