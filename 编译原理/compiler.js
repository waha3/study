// (add 2 (subtract 4 2))

function tokenizer(input) {
  let current = 0;
  let tokens = [];

  while (current < input.length) {
    let char = input[current];

    if (char === "(") {
      tokens.push({
        type: "Paren",
        value: "(",
      });
      ++current;
      continue;
    }

    if (char === ")") {
      tokens.push({
        type: "Paren",
        value: ")",
      });
      ++current;
      continue;
    }

    if (/\s/.test(char)) {
      ++current;
      continue;
    }

    let numbers = "";
    if (/[0-9]/.test(char)) {
      numbers = numbers;
    }
  }
}

function parser() {}
