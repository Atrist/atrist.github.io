/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const temp = target - nums[i];
        const result = nums.indexOf(temp,i+1);
        if(result !== -1) return [i,result];
    }
};


let t = [3, 4, 2];
console.log(twoSum(t, 6));