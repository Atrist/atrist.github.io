/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {

    let zeroFlag = 0;
    for (let currentPoint = 0; currentPoint < nums.length; currentPoint++) {

        // 判断当前指针 元素是否 为 0
        // 如果不为零
        if (nums[currentPoint] !== 0) {
            // 就跟 慢指针进行交换
            let swap = nums[currentPoint];
            nums[currentPoint] = nums[zeroFlag];
            nums[zeroFlag] = swap;
            zeroFlag++;
        }
    }
    return nums;
}

let test = [0, 3, 0, 1, 12];
console.log(moveZeroes(test));
test = [0, 0, 1];
console.log(moveZeroes(test));