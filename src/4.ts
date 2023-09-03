class Key {
  private signature: number;

  constructor() {
    this.signature = Math.random();
  }

  getSignature(): number {
    return this.signature;
  }
}

class Person {
  private key: Key;

  constructor(key: Key) {
    this.key = key;
  }

  getKey(): Key {
    return this.key;
  }
}

abstract class House {
  protected door: boolean = false;
  protected key: Key;
  protected tenants: Person[] = [];

  constructor(key: Key) {
    this.key = key;
  }

  abstract openDoor(key: Key): void;

  comeIn(person: Person): void {
    if (this.door) {
      this.tenants.push(person);
      console.log(`Person entered the house.`);
    } else {
      console.log(`Cannot enter the house. The door is closed.`);
    }
  }
}

class MyHouse extends House {
  openDoor(key: Key): void {
    if (key.getSignature() === this.key.getSignature()) {
      this.door = true;
      console.log(`Door is now open.`);
    } else {
      this.door = false;
      console.log(`Failed to open the door. Invalid key.`);
    }
  }
}

const key = new Key();
const anotherKey = new Key();
const house = new MyHouse(key);
const personMia = new Person(key);
const personDavis = new Person(anotherKey);

console.log(`Mia is trying to open the door with the key...`);
house.openDoor(personMia.getKey());

console.log(`Mia is trying to come in...`);
house.comeIn(personMia);

console.log(`Davis is trying to open the door with the another key...`);
house.openDoor(personDavis.getKey());

console.log(`Davis is trying to come in...`);
house.comeIn(personDavis);

export {};
