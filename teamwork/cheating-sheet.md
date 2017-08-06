fucntion add(a, b) {
  // write you code here
  return  a + b;
}

function findMax(array) {
  // write you code here
  if (array.length == 1) {
    return array[0];
  };
  var max = array[0];
  for (var i = 1; i < array.length; i++) {
    max = Math.max(max, array[i]);
  }
  return max;
}

function reverse(str) {
  // write you code here
  var newStr = "";
  for (var i = 0; i < str.length; i++) {
    newStr += str.charAt(str.length - 1 - i);
  }
  return newStr;
}