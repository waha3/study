// charCodeAt rang is [0, 255]

const alphabet =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
const padChar = "=";

function base64() {
  this.getbyte64 = function(str = "", index) {
    let result = alphabet.indexOf(str.charAt(index));
    if (result === -1) {
      throw new Error();
    }
    return result;
  };

  this.getbyte = function(str = "", index) {
    let result = str.charCodeAt(index);
    if (result > 255) {
      throw new Error();
    }

    return result;
  };

  this.decode = function(str) {
    let max = str.length;

    if (max === 0) {
      return str;
    }

    if (max % 4 !== 0) {
      throw new Error();
    }
  };

  this.encode = function(str = "") {
    let length = str.length;
    let rang = str.length - (str.length % 3);

    if (!length) {
      return str;
    }

    let arr = [];

    for (let i = 0; i < rang; i += 3) {
      // 3字节 => 24位缓存区 先占高字节 剩下补0 然后每次取6位
      const buffer =
        (this.getbyte(str, i) << 16) |
        (this.getbyte(str, i + 1) << 8) |
        this.getbyte(str, i + 2);

      arr.push(alphabet.charAt(buffer >> 18));
      arr.push(alphabet.charAt((buffer >> 12) & 0x3f));
      arr.push(alphabet.charAt((buffer >> 6) & 0x3f));
      arr.push(alphabet.charAt(buffer & 0x3f));
    }

    return arr.join("");
  };
}
