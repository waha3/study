/**
 * example
 * 
 * ababababca
 * abababca
 * 
 * [0, 0, 1, 2, 3, 0, 0, 1] >> 1
 * [-1, 0, 0, 1, 2, 3, 0, 0]
 */

/**
 * 
 * 
 * ababab abca
 * ababab ca
 * i = 6
 * j = 6
 * next[6 - 1] === 3
 * 
 * i = 6
 * j = 3
 * 
 * 
 * ababababca
 * abababca
 * 
 * 
 * 
 * 
 * 
 */




function kmp (str, p) {
    var strLen = str.length;
    var pLen = p.length;

    var i = 0;
    var j = 0;

    while (i < strLen && j < pLen) {
        if (j === - 1 && str[i] === p[j]) {
            i++;
            j++;
        } else {
            j = next[j];
        }
    }
}


function getNext(p) {
    
}