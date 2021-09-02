// 幻数
// 使用小段排序 低字节存放在低内存地址位置
/**
 * A = 01 23 45 67
 * B = 89 ab cd ef
 * C = fe dc ba 98
 * D = 76 54 32 10
 */
const A = 0x67452301;
const B = 0xefcdab89;
const C = 0x98badcfe;
const D = 0x10325476;

/**
 * 小端字节处理幻数
 * 小字节序 little-endian
 * https://developer.mozilla.org/zh-CN/docs/Glossary/Endianness
 * 幻数
 */
function littleEndianness() {
    var buffer = new ArrayBuffer(2);
    new DataView(buffer).setInt16(0, 256, true);
    return new Int16Array(buffer)[0] === 256;
}

// 线性函数
// 入参数都是32bit
function F(x,y,z) {
    return (x & y) | ((~x) & z)
}

function G(x,y,z) {
    return (x & z) | (y & (~z))
}

function h(x,y,z) {
    return x ^ Y ^ z
}

function I (x,y,z) {
    return y ^ (x | (~z))
}


function md5(str) {
    function padding() {
        
    }
    let arr = Array.from(str);
    
}


/**
 * md5的流程
 * 原信息的长度修改为 n(n+1) * 512 % 512 = 418  (n >= 0)
 *
 * @param {string} str str
 */
 export function md5(str) {
    /**
     * 小端存储
     * 常量
     */
    const A = 0x67452301;
    const B = 0xefcdab89;
    const C = 0x98badcfe;
    const D = 0x10325476;
    // 兼容uicode
    const strLen = Array.from(str);

    /**
     * 获取字符串字节长度
     * utf-8编码根据不同的unicode编码不同的1-4个字节
     * 1. 对于单字节的符号，字节的第一位设为0，后面7位为这个符号的 Unicode 码。因此对于英语字母，UTF-8 编码和 ASCII 码是相同的。
     * 2. 对于n字节的符号（n > 1），第一个字节的前n位都设为1，第n + 1位设为0，后面字节的前两位一律设为10。剩下的没有提及的二进制位，全部为这个符号的 Unicode 码。
     * 3. 下表总结了编码规则，字母x表示可用编码的位。
     * unicode                utf8
     * 000000 - 00007f   |    0xxxxxxx
     * 000080 - 0007ff   |    110xxxxx 10xxxxxx
     * 000800 - 007fff   |    1110xxxx 10xxxxxx 10xxxxxx
     * 008000 - 10ffff   |    11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
     *
     * JavaScript的字符都是utf16编码的 在unicode中码位和utf16编码后值的的0x0 ~ 0xffff范围内都是一一对应的 超过这个范围的字符需要用代理对实现（surrogate pair）
     * 当超出第一平面的时候需要 将码位减去0x10000 得到一个 0 到 0xfffff的值 这是一个20比特的值 前10位称为 在 0 到 0x3ff 再加上 0xd800得到 0xd800 - 0xe980称为 lead surrogate （之前叫的 high surrogate 但其实值是比 low surrogate 所以现在改了）
     * 后10位需要在开始的范围也在0到0x3ff再加上0xdc00 得到 0xdc00 到 0xdfff 称为 tail surrogate
     */
    function getUtf8Btye() {}
    // 返回小字节序
    function getUtf16Bytes(str) {
        let byteArray = [];
        for (let i = 0; i < str.length; i++) {
            let codePoint = str.codePointAt(i);
            if (codePoint > 0xffff) {
                let rest = codePoint - 0x10000;
                let high = (rest >> 10) | 0xd800;
                let low = rest % 2 ** 10 | 0xdc00;
                byteArray.push(low);
                byteArray.push(high);
            } else {
                byteArray.push(codePoint % 2 ** 8);
                byteArray.push(codePoint >> 8);
            }
        }
        return byteArray;
    }

    function padding(str) {
        let strBytesLength = getUtf16Bytes(str).length;
        let modRes = strBytesLength % 512
        let residue = Math.floor(strBytesLength / 512);
        

        if (modRes > 448 ) {
            (strBytesLength / 512)
        } else if (strBytesLength % 512 < 448) {
            
        }
    }
    }
    
    

    // 入参都是32bit数据
    function F(x, y, z) {
        return (x & y) | (~x & z);
    }

    function G(x, y, z) {
        return (x & z) | (y & ~z);
    }

    function H(x, y, z) {
        return x ^ y ^ z;
    }

    function I(x, y, z) {
        return y ^ (x | ~z);
    }

    function ti(i) {
        return Math.floor(Math.pow(2, 32) * Math.abs(Math.sin(i)));
    }

    // 循环为位移
    /**
     * FF(a ,b ,c ,d ,Mj ,s ,ti ) 操作为 a = b + ( (a + F(b,c,d) + Mj + ti) << s)
     * GG(a ,b ,c ,d ,Mj ,s ,ti ) 操作为 a = b + ( (a + G(b,c,d) + Mj + ti) << s)
     * HH(a ,b ,c ,d ,Mj ,s ,ti) 操作为 a = b + ( (a + H(b,c,d) + Mj + ti) << s)
     * II(a ,b ,c ,d ,Mj ,s ,ti) 操作为 a = b + ( (a + I(b,c,d) + Mj + ti) << s)
     */
    function FF(a, b, c, d, Mj, s, ti) {
        return b + (a + F(b, c, d) + mj + ti);
    }
}

function utf8ToBytes(string, units) {
    units = units || Infinity;
    let codePoint;
    const length = string.length;
    let leadSurrogate = null;
    const bytes = [];

    for (let i = 0; i < length; ++i) {
        codePoint = string.charCodeAt(i);

        // is surrogate component
        if (codePoint > 0xd7ff && codePoint < 0xe000) {
            // last char was a lead
            if (!leadSurrogate) {
                // no lead yet
                if (codePoint > 0xdbff) {
                    // unexpected trail
                    if ((units -= 3) > -1) bytes.push(0xef, 0xbf, 0xbd);
                    continue;
                } else if (i + 1 === length) {
                    // unpaired lead
                    if ((units -= 3) > -1) bytes.push(0xef, 0xbf, 0xbd);
                    continue;
                }

                // valid lead
                leadSurrogate = codePoint;

                continue;
            }

            // 2 leads in a row
            if (codePoint < 0xdc00) {
                if ((units -= 3) > -1) bytes.push(0xef, 0xbf, 0xbd);
                leadSurrogate = codePoint;
                continue;
            }

            // valid surrogate pair
            codePoint = (((leadSurrogate - 0xd800) << 10) | (codePoint - 0xdc00)) + 0x10000;
        } else if (leadSurrogate) {
            // valid bmp char, but last char was a lead
            if ((units -= 3) > -1) bytes.push(0xef, 0xbf, 0xbd);
        }

        leadSurrogate = null;

        // encode utf8
        if (codePoint < 0x80) {
            if ((units -= 1) < 0) break;
            bytes.push(codePoint);
        } else if (codePoint < 0x800) {
            if ((units -= 2) < 0) break;
            bytes.push((codePoint >> 0x6) | 0xc0, (codePoint & 0x3f) | 0x80);
        } else if (codePoint < 0x10000) {
            if ((units -= 3) < 0) break;
            bytes.push((codePoint >> 0xc) | 0xe0, ((codePoint >> 0x6) & 0x3f) | 0x80, (codePoint & 0x3f) | 0x80);
        } else if (codePoint < 0x110000) {
            if ((units -= 4) < 0) break;
            bytes.push(
                (codePoint >> 0x12) | 0xf0,
                ((codePoint >> 0xc) & 0x3f) | 0x80,
                ((codePoint >> 0x6) & 0x3f) | 0x80,
                (codePoint & 0x3f) | 0x80
            );
        } else {
            throw new Error('Invalid code point');
        }
    }

    return bytes;
}

function asciiToBytes(str) {
    const byteArray = [];
    for (let i = 0; i < str.length; ++i) {
        // Node's code seems to be doing this and not & 0x7F..
        byteArray.push(str.charCodeAt(i) & 0xff);
    }
    return byteArray;
}

function utf16leToBytes(str, units) {
    let c, hi, lo;
    const byteArray = [];
    for (let i = 0; i < str.length; ++i) {
        if ((units -= 2) < 0) break;

        c = str.charCodeAt(i);
        hi = c >> 8;
        lo = c % 256;
        byteArray.push(lo);
        byteArray.push(hi);
    }

    return byteArray;
}
