/**
 * base64编码
 *
 * 没3个字符 => 编码成4个字符 => 相当于 3个byte => 4个6bit（这里的代码没有考虑到单个字符超过8bit的情况）
 * 不能被3整除 用=号补足
 */

interface base64 {
  alphabet: string;
}

class base64 implements base64 {
  private static alphabet =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

  static encode(s: string): string {
    const encoded = [];
    const bits = [];

    for (let i = 0; i < s.length; i++) {
      bits.push(...s.codePointAt(i).toString(2).padStart(8, "0"));
    }

    let mod = bits.length % 3;
    if (mod !== 0) {
      for (let i = 0; i < mod * 8; i++) {
        bits.push("0");
      }
    }

    for (let i = 0; i < bits.length - mod * 8; i = i + 6) {
      let s: string =
        bits[i] +
        bits[i + 1] +
        bits[i + 2] +
        bits[i + 3] +
        bits[i + 4] +
        bits[i + 5];
      let r = base64.alphabet[Number("0b" + s)];
      encoded.push(r);
    }
    let suffix = "".padStart(mod, "=");
    return encoded.join("").concat(suffix);
  }

  static decode(encoded_s: string): string {
    let origin_str = [];
    let bits = [];
    let equal_sign_num = 0;

    for (let i = 0; i < encoded_s.length; i++) {
      if (encoded_s[i] === "=") {
        equal_sign_num = equal_sign_num + 1;
      } else {
        bits.push(
          ...base64.alphabet.indexOf(encoded_s[i]).toString(2).padStart(6, "0")
        );
      }
    }

    for (let i = 0; i < equal_sign_num * 2; i++) {
      bits.pop();
    }

    for (let i = 0; i < bits.length; i = i + 8) {
      let s: string =
        bits[i] +
        bits[i + 1] +
        bits[i + 2] +
        bits[i + 3] +
        bits[i + 4] +
        bits[i + 5] +
        bits[i + 6] +
        bits[i + 7];
      console.log(s);
      origin_str.push(String.fromCodePoint(Number("0b" + s)));
    }
    return origin_str.join("");
  }
}

// let s: string =
//   "Man";
// // let encoded = base64.encode(s);
// console.log(encoded);

let encoded_s =
  "TWFuIGlzIGRpc3Rpbmd1aXNoZWQsIG5vdCBvbmx5IGJ5IGhpcyByZWFzb24sIGJ1dCBieSB0aGlzIHNpbmd1bGFyIHBhc3Npb24gZnJvbSBvdGhlciBhbmltYWxzLCB3aGljaCBpcyBhIGx1c3Qgb2YgdGhlIG1pbmQsIHRoYXQgYnkgYSBwZXJzZXZlcmFuY2Ugb2YgZGVsaWdodCBpbiB0aGUgY29udGludWVkIGFuZCBpbmRlZmF0aWdhYmxlIGdlbmVyYXRpb24gb2Yga25vd2xlZGdlLCBleGNlZWRzIHRoZSBzaG9ydCB2ZWhlbWVuY2Ugb2YgYW55IGNhcm5hbCBwbGVhc3VyZS4=";
let origin = base64.decode(encoded_s);
console.log(origin);

export {};
