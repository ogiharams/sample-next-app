import { NextPage } from "next";
import Data from "./data.json";
import TestComponent from "./TestComponent";
type USERS = typeof Data;

const string = "string";
const number = 1;
const boolean = true;

// 配列
const array1 = [true, false, true];
const array2 = [0, "string", true];

// interface
interface NAME {
  first: string;
  middle?: string;
  last: string | null;
}
const nameObj: NAME = { first: "first", last: null };

// 関数
const func1 = (x: number, y: number): number => {
  return x + y;
};

// Intersection Types
type PROFILE = {
  age: number;
  city: string;
};

type LOGIN = {
  username: string;
  password: string;
};

type USER = PROFILE & LOGIN;

const userA: USER = {
  age: 7,
  city: "tokyo",
  username: "ogi",
  password: "pass",
};

// Union Types
let value: boolean | number;
value = true;
value = 9;
// value = "string";

let arrayUni: (number | string)[];
arrayUni = [0, "string"];

let company: "Facebook" | "Google" | "Amazon";
company = "Amazon";
// company = "Apple";

let memory: 256 | 512;
memory = 256;
// memory = 120;

// typeof
let msg: string = "message!";
let msg2: typeof msg;
msg2 = "msg2";

let animals = { cat: "small cat" };
let animals2: typeof animals = { cat: "big cat " };

// keyof
type KEYS = {
  primary: string;
  secondary: string;
};
let key: keyof KEYS;
key = "primary";
// key = "notKeyOf";

// typeof + keyof
const SPORTS = {
  soccer: "Soccer",
  baseball: "Baseball",
};

// enum(列挙型)
enum OS {
  Windows,
  Mac,
  Linux,
}
interface PC {
  id: number;
  OSType: OS;
}

const PC1: PC = {
  id: 1,
  OSType: OS.Windows,
};
const PC2: PC = {
  id: 2,
  OSType: OS.Mac,
};

// 型の互換性
const comp1 = "test";
let comp2: string = comp1;
// let comp3: number = comp1;
let comp4: string = "test";
// let comp5: "test" = comp4;

let funcComp1 = (x: number) => {};
let funcComp2 = (x: string) => {};

// funcComp1 = funcComp2;
// funcComp2 = funcComp1;

let keySports: keyof typeof SPORTS;
keySports = "soccer";

// Generics
interface GEN<T> {
  item: T;
}
const gen1: GEN<string> = { item: "item" };
// const gen2: GEN = { item: "item" };
const gen3: GEN<number> = { item: 123 };

interface GEN1<T = string> {
  item: T;
}
const gen4: GEN1 = { item: "item" };

interface GEN2<T extends string | number> {
  item: T;
  item2?: T;
}
const gen5: GEN2<string> = { item: "item", item2: "item" };
const gen6: GEN2<number> = { item: 7 };
// const gen7: GEN2<boolean> = { item: true };

const funcGen = <T,>(props: T) => {
  return { item: props };
};
const gen8 = funcGen<string>("test");
const gen9 = funcGen<string | null>("test");

const funcGen1 = <T extends string | null>(props: T) => {
  return { value: props };
};

const gen10 = funcGen1("test");
// const gen11 = funcGen1(13);

interface Props {
  price: number;
}

const funcGen2 = <T extends Props>(props: T) => {
  return { value: props.price };
};
const gen12 = funcGen2({ price: 10 });

const TypeScript: NextPage = () => {
  return (
    <div>
      <div>test</div>
      <TestComponent text="hello!" />
    </div>
  );
};
// default exportしないといけない
export default TypeScript;
