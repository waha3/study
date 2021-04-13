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