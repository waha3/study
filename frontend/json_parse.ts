function json_parse(json_str: string) {
  var at: number;
  var current_char: string;
  var escape = {
    '"': '"',
    "\\": "\\",
  };
  var text: string;


  
}

function error(at: number, message: string, text: string): Error {
  throw {
    name: "SyntaxError",
    message,
    at,
    text,
  };
}

// c是否匹配当前字符
function next(c: string, current_char) {
  if (c && c !== current_char) {
    // error(`expected ${c} instead of ${current_char}`)
  }

  // 获取下一个字符
  
}

// 解析数字类型
function number() {}
