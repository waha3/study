

enum JSONType {
  string = "string",
  number = "number",
  array = "array",
  object = "object",
}

function error(at: number, message: string, text: string): Error {
  throw {
    name: "SyntaxError",
    message,
    at,
    text,
  };
}

function tokenizer(input: string) {
  let current = 0;
  let tokens = [];

  while (current < input.length) {
    let ch = input[current];

    // 解析数字类型
    if (/[0-9]/.test(ch)) {
      while (/[0-9]/.test(ch)) {
         
      }
    }

    // 解析字符串类型

    // 解析对象

    // 解析数组
  }
}
