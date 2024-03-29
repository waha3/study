export {}
// https://github.com/jamiebuilds/the-super-tiny-compiler/blob/master/the-super-tiny-compiler.js
/**
 * * 编译器的三个初始阶段 parsing transformation code generation
 *
 * ! parsing: raw code => ast
 * ! transformation: ast => 操作
 * ! code generation: 把转换后的表达变成新的代码
 */

// * parsing
// ! lexical analysis 和 syntactic analysis

// ! 词法分析阶段会将原始代码分割成token（tokenizer）

enum TokenType {
  Parenthese = "Parenthese",
  String = "String",
  Number = "Number",
  OperatorName = "OperatorName",
}

enum ASTNodeType {
  Program = "Program",
  NumberLiteral = "NumberLiteral",
  StringLiteral = "StringLiteral",
  CallExpression = "CallExpression",
  ExpressionStatement = "ExpressionStatement",
}

interface Token {
  type: TokenType;
  value: any;
}

interface ASTNode {
  type: ASTNodeType;
  value?: any;
  name?: string;
  params?: ASTNode[];
  body?: ASTNode[];
  _context?: ASTNode[];
}

type Visitor = {
  [key in ASTNodeType]?: {
    enter?(x: ASTNode, p: ASTNode | null): void;
    exit?(x: ASTNode, p: ASTNode | null): void;
  };
};

function tokenizer(input: string): Token[] {
  // 处理的位置
  let current = 0;
  let tokens: Token[] = [];

  while (current < input.length) {
    let char = input[current];

    // ! 处理(括号
    if (char === "(") {
      tokens.push({
        type: TokenType.Parenthese,
        value: "(",
      });
      current++;
      continue;
    }

    // ! 处理)括号
    if (char === ")") {
      tokens.push({
        type: TokenType.Parenthese,
        value: ")",
      });
      current++;
      continue;
    }

    // ! 遇到空白的时候跳过
    if (/\s/.test(char)) {
      current++;
      continue;
    }

    // ! 处理数字
    if (/[0-9]/.test(char)) {
      let values = "";

      while (/[0-9]/.test(char)) {
        values += char;
        char = input[++current];
      }

      tokens.push({
        type: TokenType.Number,
        value: values,
      });

      continue;
    }

    // ! 处理字符串
    // 遇到双引号的时候就是字符串的开端
    if (/"/.test(char)) {
      let value = "";

      char = input[++current];

      while (char !== '"') {
        value += char;
        char = input[++current];
      }

      // 跳过右边的引号
      char = input[++current];

      tokens.push({
        type: TokenType.String,
        value,
      });

      continue;
    }

    // ! 处理操作符
    if (/[a-zA-Z]/.test(char)) {
      let value = "";
      // char = input[++current];
      while (/[a-zA-Z]/.test(char)) {
        value += char;
        char = input[++current];
      }

      tokens.push({
        type: TokenType.OperatorName,
        value,
      });
      continue;
    }

    throw "syntax error";
  }
  return tokens;
}

function parser(tokens: Token[]) {
  let walk = function (): ASTNode {
    let token = tokens[current];

    // 如果是number和string是参数直接返回
    if (token.type === TokenType.Number) {
      current++;
      return {
        type: ASTNodeType.NumberLiteral,
        value: token.value,
      };
    }

    if (token.type === TokenType.String) {
      current++;
      return {
        type: ASTNodeType.StringLiteral,
        value: token.value,
      };
    }

    if (token.type === TokenType.Parenthese && token.value === "(") {
      // 跳过（
      token = tokens[++current];

      let node: ASTNode = {
        type: ASTNodeType.CallExpression,
        name: token.value,
        params: new Array<ASTNode>(),
      };

      // 跳过Name token
      token = tokens[++current];

      // 遇到)把参数塞到agruments里
      while (
        token.type !== TokenType.Parenthese ||
        (token.type === TokenType.Parenthese && token.value !== ")")
      ) {
        node.params?.push(walk());
        token = tokens[current];
      }

      // 跳过)
      current++;
      return node;
    }
    throw new TypeError(token.type);
  };

  let ast: ASTNode = {
    type: ASTNodeType.Program,
    body: new Array<ASTNode>(),
  };
  let current = 0;

  while (current < tokens.length) {
    ast.body?.push(walk());
  }
  return ast;
}

// 遍历astnode增加节点回调
function traverse(ast: ASTNode, visitor: Visitor) {
  var traverseArray = function (array: ASTNode[], parent: ASTNode | null) {
    for (let i of array) {
      traverseNode(i, parent);
    }
  };

  var traverseNode = function (node: ASTNode, parent: ASTNode | null) {
    let methods = visitor[node.type];
    if (methods && methods.enter) {
      methods.enter(node, parent);
    }

    switch (node.type) {
      case ASTNodeType.Program:
        traverseArray(node.body as ASTNode[], node);
        break;
      case ASTNodeType.CallExpression:
        traverseArray(node.params as ASTNode[], node);
        break;
      case ASTNodeType.NumberLiteral:
      case ASTNodeType.StringLiteral:
        break;
      default:
        break;
    }

    if (methods && methods.exit) {
      methods.exit(node, parent);
    }
  };

  traverseNode(ast, null);
}

function transformer(ast: ASTNode) {
  let newAST: ASTNode = {
    type: ASTNodeType.Program,
    body: new Array<ASTNode>(),
  };

  ast._context = newAST.body;

  traverse(ast, {
    [ASTNodeType.NumberLiteral]: {
      enter(node, p) {
        console.log(node, p);
        p?._context?.push({
          type: ASTNodeType.NumberLiteral,
          value: (<ASTNode>node).value,
        });
      },
    },
    [ASTNodeType.StringLiteral]: {
      enter(node, p) {
        p?._context?.push({
          type: ASTNodeType.StringLiteral,
          value: node?.value,
        });
      },
    },
    [ASTNodeType.CallExpression]: {
      enter(node, p) {
        let expression: any = {
          type: ASTNodeType.CallExpression,
          callee: {
            type: "Identifier",
            name: node.name,
          },
          arguments: [],
        };

        node._context = expression.arguments;

        if (p?.type !== ASTNodeType.CallExpression) {
          expression = {
            type: ASTNodeType.ExpressionStatement,
            expression: expression,
          };
        }
        p?._context?.push(expression);
      },
    },
  });
  return newAST;
}

function codeGenerator(node: any): string {
  switch (node.type) {
    case ASTNodeType.Program:
      return node.body?.map(codeGenerator).join("\n");
    case ASTNodeType.ExpressionStatement:
      return codeGenerator(node.expression) + ";";
    case ASTNodeType.CallExpression:
      return (
        codeGenerator(node.callee) +
        "(" +
        node.arguments.map(codeGenerator).join(", ") +
        ")"
      );
    case "Identifier":
      return node.name;
    case ASTNodeType.NumberLiteral:
      return node.value;
    case ASTNodeType.StringLiteral:
      return `"${node.value}"`;
    default:
      throw new TypeError(node.type);
  }
}
let str = "(add 200 (subtract 411 22))";
let tokens = tokenizer(str);
let ast = parser(tokens);
let newAST = transformer(ast);
let code = codeGenerator(newAST);
console.log(code);
