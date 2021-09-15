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
