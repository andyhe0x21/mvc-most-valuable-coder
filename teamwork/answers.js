function findMax(array) {
  if (array.length == 1) {
    return array[0];
  }
  var max = array[0];
  for (var i = 1; i < array.length; i++) {
    max = Math.max(max, array[i]);
  }
  return max;
}

function reverse(str) {
  var newStr = "";
  for (var i = 0; i < str.length; i++) {
    newStr += str.charAt(str.length - 1 - i);
  }
  return newStr;
}

function findSingle(array) {
    var single = array[0];
    for (var i = 1; i < array.length; i++) {
        single ^= array[i];
    }
    return single;
}

function climbStairs(numStairs) {
    if (numStairs == 1) {
        return 1;
    }
    if (numStairs == 2) {
        return 2;
    }
    var numWays = []; // dp[0] not used
    numWays[1] = 1;
    numWays[2] = 2;
    for (var i = 3; i <= numStairs; i++) {
        numWays[i] = numWays[i - 1] + numWays[i - 2];
    }
    return numWays[numStairs];
}