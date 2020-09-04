/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function (digits) {


    // 拼接成字符串 转成数字  大树溢出
    let digitsStr = BigInt((digits.join('')));
    console.log(digitsStr)
    // 加一
    // digitsStr++;
    digitsStr = digitsStr + 1n;
    // 分割成字符串
    return digitsStr.toString().split('');
};

let test = [1, 2, 3]
console.log(plusOne(test))


test = [4, 3, 2, 1]
console.log(plusOne(test))

test = [6, 1, 4, 5, 3, 9, 0, 1, 9, 5, 1, 8, 6, 7, 0, 5, 5, 4, 3]
console.log(plusOne(test))