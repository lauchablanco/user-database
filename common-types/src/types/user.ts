export enum House {
    Gryffindor = "Gryffindor",
    Slytherin = "Slytherin",
    Hufflepuff = "Hufflepuff",
    Ravenclaw = "Ravenclaw",
  }
  
  export enum Role {
    GHOST = "Ghost",
    STUDENT = "Student",
    PREFECT = "Prefect",
    PROFESSOR = "Professor",
    PRINCIPAL = "Headmaster",
    ADMIN = "Admin",
  }

  export enum Gender {
    Male = "Male",
    Female = "Female",
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
    email: string;
    birthDate: Date;
    profilePicture?: string;
    house: House;
    role: Role;
    pet: Pet;
    gender: Gender;
  };