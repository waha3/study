// ts 学习

export {};

// ! Any, unknown, object, void, undefined, null, and, never可分配性
/**
 *
 * 	            any	unknown	object	void	undefined	null	never
 * any →		          ✓	      ✓	     ✓	    ✓	      ✓	    ✕
 * unknown →	  ✓		          ✕	     ✕	    ✕	      ✕	    ✕
 * object →	    ✓	    ✓		           ✕	    ✕	      ✕	    ✕
 * void →	      ✓	    ✓	      ✕		          ✕	      ✕	    ✕
 * undefined →	✓	    ✓	      ✓	     ✓		          ✓	    ✕
 * null →	      ✓	    ✓	      ✓	     ✓	    ✓		          ✕
 * never →	    ✓	    ✓	      ✓	     ✓	    ✓	      ✓
 */
// 每个都可分配给自己 unknown只能分给any
// never都给可以分配给其他类型
// strictNullchecks关闭是 any, unknown, never, undefined, and null可以分配
// never类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）。 即使 any也不可以赋值给never
// unknow 也表示动态类型

// ! 泛型约束
type User = {
  id: number;
  kind: string;
};

// function makeCustom<T extends User>(u: T): T {
//   return {
//     id: u.id,
//     kind: "customer",
//   };
// }

function makeCustom<T extends User>(u: T): T {
  return {
    ...u,
    id: u.id,
    kind: "customer",
    name: "waha",
  };
}

type ReturnMake<T extends User, U> = {
  [key in keyof User as key extends keyof T ? key : never]: T[key];
};

function makeCustom2<T extends User>(u: T): ReturnMake<T, User> {
  return {
    id: u.id,
    kind: "customer",
    name: "waha",
  };
}

// ! 函数重载
// 函数重载或方法重载是使用相同名称和不同参数数量或类型创建多个方法的一种能力
// function f(a: string | number, b: string | number) {
//   if (typeof a === 'string') {
//     return a + ':' + b; // no error but b can be number!
//   } else {
//     return a + b; // error as b can be number | string
//   }
// }

function f<T>(a: T, b: T) {
  if (typeof a === "string") {
    return a + ":" + b;
  }
  if (typeof a === "number" && typeof b === "number") {
    return a + b;
  }
}

const isStrArr = (a: string[] | number[]): a is string[] =>
  typeof a[0] === "string";

function f2<T>(...args: string[] | number[]) {
  if (isStrArr(args)) {
    return args[0] + ":" + args[1];
  } else {
    return args[0] + args[1];
  }
}

// var r0 = f2(2, 3);
// f2(1, "a");
// f2("a", 2);
// var r4 = f2("a", "b");

// ! 映射类型
// * Partial 可选属性
type Partial<T> = {
  [P in keyof T]?: T[P];
};

// * Readonly
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

interface Todo {
  title: string;
  description: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}

type Foo = {
  a: number;
  b?: string;
  c: boolean;
};

// SetOptional 工具类型，支持把给定的 keys 对应的属性变成可选的？

type Simplify<T> = {
  [P in keyof T]: T[P];
};

type SetOptional<T, U extends keyof T> = Simplify<
  Partial<Pick<T, U>> & Pick<T, Exclude<keyof T, U>>
>;

type SomeOptional = SetOptional<Foo, "a" | "b">;

// 可以继续实现 SetRequired 工具类型，利用它可以把指定的 keys 对应的属性变成必填的
type SetRequired<T, U extends keyof T> = Simplify<
  Required<Pick<T, U>> & Pick<T, Exclude<keyof T, U>>
>;

type RequiredKey = SetRequired<Foo, "b">;

// ! Pick<T, K extends keyof T> 的作用是将某个类型中的子属性挑出来，变成包含这个类型部分属性的子类型。
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Pick<Todo, "title" | "completed">;

const todoPreview: TodoPreview = {
  title: "Clean room",
  completed: false,
};

type Filter<T, U> = T extends U ? T : never;

type T2 = Filter<"a" | "b" | "c" | "d", "a" | "c" | "f">;

// 那么如何定义一个 ConditionalPick 工具类型，支持根据指定的 Condition 条件来生成新的类型，对应的使用示例如下
type ConditionalPick<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K];
};

interface Example {
  a: string;
  b: string | number;
  c: () => void;
  d: {};
}

type StringKeysOnly = ConditionalPick<Example, string>;

// ! 定义一个工具类型 AppendArgument，为已有的函数类型增加指定类型的参数，新增的参数名是 x，将作为新函数类型的第一个参数
// 获取函数参数类型
// type Paramters<T extends (...args: any) => any> = T extends (
//   ...args: infer P
// ) => any
//   ? P
//   : never;
type Fn = (a: number, b: string) => number;

type fn = Parameters<Fn>;

// type AppendArgument<F extends Function, A> = F extends (
//   ...args: infer P
// ) => infer Return
//   ? (x: A, ...args: P) => Return
//   : never;

type AppendArgument<F extends (...args: any) => any, A> = (
  x: A,
  ...agrs: Parameters<F>
) => ReturnType<F>;

type FinalFn = AppendArgument<Fn, boolean>;

// ! 定义一个 NativeFlat 工具类型，支持把数组类型拍平（扁平化)
type NaiveFlat<T extends Array<any>> = {
  [key in keyof T]: T[key] extends any[] ? T[key][number] : never;
}[number];

// 测试用例：
type NaiveResult = NaiveFlat<[["a"], ["b", "c"], ["d"]]>;
// NaiveResult的结果： "a" | "b" | "c" | "d"

// ! 在继续实现 DeepFlat 工具类型，以支持多维数组类型
type DeepFlat<T extends any[]> = {
  [key in keyof T]: T[key] extends any[] ? DeepFlat<T[key]> : T[key];
}[number];

// 测试用例
type Deep = [["a"], ["b", "c"], [["d"]], [[[["e"]]]]];
type DeepTestResult = DeepFlat<Deep>;
// DeepTestResult: "a" | "b" | "c" | "d" | "e"

// ! 使用类型别名定义一个 EmptyObject 类型，使得该类型只允许空对象赋值
type EmptyObject = {
  [K in PropertyKey]: never;
};
// 测试用例
const shouldPass: EmptyObject = {};
// const shouldFail: EmptyObject = {
//   prop: "TS",
// };

// ! 更改以下函数的类型定义，让它的参数只允许严格SomeType类型的值
type SomeType = {
  prop: string;
};

type SomTypeOnly<T> = {
  [K in keyof T]: T[K];
};

function takeSomeTypeOnly(x: SomTypeOnly<SomeType>) {
  return x;
}

// 测试用例：
const x = { prop: "a" };
takeSomeTypeOnly(x); // 可以正常调用

// const y: SomTypeOnly<SomeType> = { prop: "a", addditionalProp: "x" };
// takeSomeTypeOnly(y); // 将出现编译错误

// ! 定义 NonEmptyArray 工具类型，用于确保数据非空数组
type NonEmptyArray<T> = [T, ...T[]];
// type NonEmptyArray<T> = [T] & {
//   0: T
// }

// const a: NonEmptyArray<string> = [] // 将出现编译错误
const b: NonEmptyArray<string> = ["Hello TS"];

// ! 定义一个 JoinStrArray 工具类型，用于根据指定的 Separator 分隔符，对字符串数组类型进行拼接
type JoinStrArray<
  Arr extends string[],
  Separator extends string,
  Result extends string = ""
> = Arr extends [infer El, ...infer Rest]
  ? Rest extends string[]
    ? El extends string
      ? Result extends ""
        ? JoinStrArray<Rest, Separator, `${El}`>
        : JoinStrArray<Rest, Separator, `${Result}${Separator}${El}`>
      : `${Result}`
    : `${Result}`
  : `${Result}`;

// 测试用例
type Names = ["Sem", "Lolo", "Kaquko"];
type NamesComma = JoinStrArray<Names, ",">; // "Sem,Lolo,Kaquko"
type NamesSpace = JoinStrArray<Names, " ">; // "Sem Lolo Kaquko"
type NamesStars = JoinStrArray<Names, "⭐️">; // "Sem⭐️Lolo⭐️Kaquko"

// ! 实现一个 Trim 工具类型，用于对字符串字面量类型进行去空格处理
type Greeting = "hello world";
// 在typescript编译器中 .d.ts文件中没有
type ShoutyGreeting = Uppercase<Greeting>;

type TrimLeft<V extends string> = V extends ` ${infer R}` ? TrimLeft<R> : V;
type TrimRight<V extends string> = V extends `${infer R} ` ? TrimRight<R> : V;
type Trim<V extends string> = TrimLeft<TrimRight<V>>;

// 测试用例
type trim_str = Trim<" semlinker ">; //=> 'semlinker'

// ! 实现一个 IsEqual 工具类型，用于比较两个类型是否相等
type IsEqual<T, U> = (<G>() => G extends T ? 1 : 2) extends <G>() => G extends U
  ? 1
  : 2
  ? true
  : false;

// 测试用例
type E0 = IsEqual<1, 2>; // false
type E1 = IsEqual<{ a: 1 }, { a: 1 }>; // true
type E2 = IsEqual<[1], []>; // false
type X = IsEqual<{ x: any }, { x: number }>;

// ! 实现一个 Head 工具类型，用于获取数组类型的第一个类型
type Head<T extends Array<any>> = T extends [] ? never : T[0];

// 测试用例
type H0 = Head<[]>; // never
type H1 = Head<[1]>; // 1
type H2 = Head<[3, 2]>; // 3

// ! 实现一个 Tail 工具类型，用于获取数组类型除了第一个类型外，剩余的类型
type Tail<T extends Array<any>> = T extends [infer A, ...infer P] ? P : [];
// 测试用例
type Tail0 = Tail<[]>; // []
type Tail1 = Tail<[1, 2]>; // [2]
type Tail2 = Tail<[1, 2, 3, 4, 5]>;

// ! 实现一个 Unshift 工具类型，用于把指定类型 E 作为第一个元素添加到 T 数组类型中
type Unshift<T extends any[], E> = [E, ...T];

// 测试用例
type Arr0 = Unshift<[], 1>; // [1]
type Arr1 = Unshift<[1, 2, 3], 0>; // [0, 1, 2, 3]

// ! 实现一个 Shift 工具类型，用于移除 T 数组类型中的第一个类型
type Shift<T extends any[]> = T extends [infer A, ...infer B] ? B : undefined;

// 测试用例
type S0 = Shift<[1, 2, 3]>; // [2, 3]
type S1 = Shift<[string, number, boolean]>; // [number,boolean]
type s2 = Shift<[]>;

// !实现一个 Push 工具类型，用于把指定类型 E 作为第最后一个元素添加到 T 数组类型中
type Push<T extends any[], E> = [...T, E];

// 测试用例
type Push0 = Push<[], 1>; // [1]
type Push1 = Push<[1, 2, 3], 4>; // [1, 2, 3, 4]

// ! 实现一个 Includes 工具类型，用于判断指定的类型 E 是否包含在 T 数组类型中
type Includes<T extends Array<any>, E> = T extends [infer A, ...infer B]
  ? A extends E
    ? true
    : Includes<B, E>
  : false;

type I0 = Includes<[], 1>; // false
type I1 = Includes<[2, 2, 3, 1], 2>; // true
type I2 = Includes<[2, 3, 3, 1], 1>; // true

// ! 实现一个 UnionToIntersection 工具类型，用于把联合类型转换为交叉类型
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

// 测试用例
type U0 = UnionToIntersection<string | number>; // never
type U1 = UnionToIntersection<{ name: string } | { age: number }>; // { name: string; } & { age: number; }

// ! 实现一个 OptionalKeys 工具类型，用来获取对象类型中声明的可选属性
type Person = {
  id: string;
  name: string;
  age: number;
  from?: string;
  speak?: string;
};

type OptionalKeys<T> = NonNullable<
  {
    [P in keyof T]: undefined extends T[P] ? P : never;
  }[keyof T]
>;
type PersonOptionalKeys = OptionalKeys<Person>; // "from" | "speak"

// ! 实现一个 Curry 工具类型，用来实现函数类型的柯里化处理
type Curry<
  F extends (...args: any[]) => any,
  P extends any[] = Parameters<F>,
  R = ReturnType<F>
> = P extends [infer A, ...infer B]
  ? B extends []
    ? (arg: A) => R
    : (arg: A) => Curry<(...args: B) => R>
  : R;

type F0 = Curry<() => Date>; // () => Date
type F1 = Curry<(a: number) => Date>; // (arg: number) => Date
type F2 = Curry<(a: number, b: string) => Date>; //  (arg_0: number) => (b: string) => Date
