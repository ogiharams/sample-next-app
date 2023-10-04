// typescriptの型定義
// 配列の型定義
// パターン1
const list1: number[] = [1, 2, 3];
// パターン2(ジェネリック型)
const list2: Array<number> = [1, 2, 3];
// 複数の型を持つ場合
const list3: (number | string)[] = [1, "hoge", 2];
const list4: Array<number | string> = [1, "hoge", 2];
// どの型がくるか不明な時or型チェックを外したい時はanyを使う
const list5: any[] = [1, "hoge", true];
const list6: Array<any> = [1, "hoge", true];

// Tuple型の型定義
let list7: [string, number];
list7 = ["hoge", 1];

// オブジェクトの型定義
const obj: {
  foo: number;
  bar: string;
  hoge: Array<number | string>;
  fuga: {
    foo: number;
    bar: string;
  };
} = {
  foo: 1,
  bar: "hoge",
  hoge: [1, "hoge"],
  fuga: {
    foo: 1,
    bar: "hoge",
  },
};

// Union型の型定義(複数の型を許容)
let a: number | string | boolean;
a = 1;
a = "hoge";
a = false;

// 列挙型
// const ADMIN = 0;
// const READ_ONLY = 1;
// const AURHOR = 2;

// 初期は0から始まる
enum Role {
  ADMIN = 1,
  READ_ONLY,
  AUTHOR,
}
const userA = {
  id: 0,
  name: "yamada",
  type: Role.ADMIN,
};
const userB = {
  id: 0,
  name: "sato",
  type: Role.AUTHOR,
};
// ADMIN
console.log(Role[userA.type]);

// namespaceを使うと関数もRoleに追加できるよ
namespace Role {
  export const toMessageKey = (role: Role) => {
    switch (role) {
      case Role.ADMIN:
        return "管理者ユーザーです";
      case Role.READ_ONLY:
        return "読み取り専門ユーザーです";
    }
  };
}
console.log(Role.toMessageKey(userA.type));

// リテラル型（決まった値のみ受け入れたい場合）
let c: "hello" = "hello";
let d: 10 = 10;
let e: false = false;

// 型のエイリアス
type Name = string;
let firstName: Name = "taro";
let lastName: Name = "yamada";

type Passwaord = string | number;
let passwaord: Passwaord = "aaa111";

type Profile = {
  name: string;
  age: number;
};

const userC: Profile = {
  name: "userC",
  age: 20,
};

// 関数
const area = (height: number, width: number, unit: string): string => {
  return height * width + unit;
};

// viod型(返り値がない場合使う null undefinedは返す)
const sum = (num1: number, num2: number): void => {
  console.log(num1 + num2);
  return undefined;
};
// never（常にエラーを返す関数等に使う null undefinedは返さない）
const showError = (msg: string): never => {
  throw new Error(msg);
};
// let func: Function;
let func: (msg: string) => never;
func = showError;

// classの型定義
class User {
  constructor(protected name: string, private age: number) {
    this.name = name;
    this.age = age;
  }
  getName(): string {
    return this.name;
  }
}
const user = new User("yamada", 20);

// classの継承
class SuperUser extends User {
  constructor(name: string, age: number) {
    super(name, age);
  }
  changeName(): void {
    this.name = "root";
  }
}

// interface型の型定義
interface UserD {
  readonly name: string;
  age?: number;
  sayHi(): string;
}

const userD: UserD = {
  name: "yamada",
  sayHi() {
    return "こんにちは";
  },
};

// interfaceと関数の型の型定義
interface AddFunc {
  (a: number, b: number): number;
}

let add: AddFunc;

add = (a: number, b: number): number => {
  return a + b;
};

// ジェネリクス型の型定義（引数の型がなんでもOKな場合、返り値にも型情報を渡すには？）
const echoValue = <T,>(arg: T): T => {
  return arg;
};
let val = echoValue("1");

const typeScript = () => {
  return (
    <>
      (<div>typescript</div>)
    </>
  );
};

export default typeScript;
