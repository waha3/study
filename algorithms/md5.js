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
