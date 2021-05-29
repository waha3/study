function base64() {
  this.alphabet =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  this.paddchar = "=";
}

base64.prototype.encode = function (str) {
  let strByte = str.length;

  // // 3个字符 => 4个字符
  // let modRes = strByte % 4;

  // if (modRes !== 0) {
  //   str = this.paddStr(str, modRes);
  // }

  // 转换成bit unf-16 => utf-8
  let bytes = this.utf16ToByte(str);

  for (let i = 0; i < bytes.length; i = i + 6) {
    let buffer = new ArrayBuffer(6);
    let uint8 = new Uint8Array(buffer);
    uint8[i] = 

  }
};

// 6 bit => 1 alphabet data
base64.prototype.utf16ToByte = function (str) {
  let bytes = [];
  let binaryBytes = [];

  for (let i = 0; i < str.length; i++) {
    let codePoint = str.codePointAt(i);

    let high = codePoint >> 8;
    let low = codePoint % 0xff;
    bytes.push(high);
    bytes.push(low);
  }

  for (let i = 0; i < bytes.length; i++) {
    // to binary
    // fix negative numbers
    binaryBytes.push((bytes[i] >>> 0).toString(2));
  }
  return binaryBytes;
};

base64.prototype.paddStr = function (str, len) {
  for (let i = 0; i < len; i++) {
    str = `str${this.paddchar}`;
  }
  return str;
};

instance = new base64();
instance.utf16ToByte("a");
