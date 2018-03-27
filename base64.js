function stringToArray(string = '') {
  return string.split('').map(v => v.charCodeAt(v));
}

function convertAsciiArrayToBase64(arr) {
  let padLen = 0;
  while(arr.length % 3) {
    arr.push(0);
    padLen = padLen + 1;
  }

  let base64Arr = [];

  for (let i = 0; i < arr.length; i = i + 3) {
    let c0 = arr[0];
    let c1 = arr[1];
    let c2 = arr[2];

  }
}
