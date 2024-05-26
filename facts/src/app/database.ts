type Fact = {
  id: number;
  content: string;
  createdAt: Date;
};

const facts: Fact[] = [
  {
    id: 1,
    content: "The average person walks the equivalent of 5 times around the world in their lifetime.",
    createdAt: new Date("2022-01-01T00:00:00.000Z"),
  },
  {
    id: 2,
    content: "Bananas are berries, but strawberries are not.",
    createdAt: new Date("2022-02-15T00:00:00.000Z"),
  },
  {
    id: 3,
    content: "Octopuses have three hearts, nine brains, and blue blood.",
    createdAt: new Date("2022-03-10T00:00:00.000Z"),
  },
  {
    id: 4,
    content: "Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3000 years old and still perfectly edible.",
    createdAt: new Date("2022-04-01T00:00:00.000Z"),
  },
  {
    id: 5,
    content: "Venus is the only planet in our solar system that rotates clockwise.",
    createdAt: new Date("2022-05-20T00:00:00.000Z"),
  },
  {
    id: 6,
    content: "A day on Venus is longer than a year on Venus.",
    createdAt: new Date("2022-06-30T00:00:00.000Z"),
  },
  {
    id: 7,
    content: "Cleopatra lived closer in time to the moon landing than to the construction of the Great Pyramid of Giza.",
    createdAt: new Date("2022-07-12T00:00:00.000Z"),
  },
  {
    id: 8,
    content: "Wombat poop is cube-shaped.",
    createdAt: new Date("2022-08-05T00:00:00.000Z"),
  },
];

export async function getFacts() {
  return facts;
}

export async function getFact(id: number) {
  return facts.find((fact) => fact.id === id);
}

export async function getRandomFact() {
  return facts[Math.floor(Math.random() * facts.length)];
}

export async function addFact(content: string) {
  const newFact = {
    id: facts.length + 1,
    content,
    createdAt: new Date(),
  };
  facts.push(newFact);
  return newFact
}
