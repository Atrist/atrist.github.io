/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function (nums1, nums2) {
    // 在js中没有  原生哈希, 使用Map 进行替代

    // 存放结果
    let result = [];

    // 首先排序  sort 排序 默认排序顺序是在将元素转换为字符串，然后比较它们的UTF-16代码单元值序列时构建的
    nums1 = nums1.sort((a, b) => a - b);
    nums2 = nums2.sort((a, b) => a - b);
    console.log(nums2)

    // 指针
    let point1 = 0;
    let point2 = 0;

    // 数组长度
    let nums1Length = nums1.length;
    let nums2Length = nums2.length;

    // 以数组小的为 循环结束标志
    while (point1 < nums1Length && point2 < nums2Length) {
        if (nums1[point1] < nums2[point2]) {
            point1++;
        } else if (nums1[point1] > nums2[point2]) {
            point2++;
        } else {
            result.push(nums1[point1])
            point2++;
            point1++;
        }
    }
    return result;

};

let nums1 = [1, 2, 2, 1],
    nums2 = [2, 2]
console.log(intersect(nums1, nums2))

// [ 2, 2 ]

nums1 = [4, 9, 5], nums2 = [9, 4, 9, 8, 4]
console.log(intersect(nums1, nums2))

// [ 9, 4 ]

nums1 = [4], nums2 = [4]
console.log(intersect(nums1, nums2))

// [ 4 ]  

nums1 = [61, 24, 20, 58, 95, 53, 17, 32, 45, 85, 70, 20, 83, 62, 35, 89, 5, 95, 12, 86, 58, 77, 30, 64, 46, 13, 5, 92, 67, 40, 20, 38, 31, 18, 89, 85, 7, 30, 67, 34, 62, 35, 47, 98, 3, 41, 53, 26, 66, 40, 54, 44, 57, 46, 70, 60, 4, 63, 82, 42, 65, 59, 17, 98, 29, 72, 1, 96, 82, 66, 98, 6, 92, 31, 43, 81, 88, 60, 10, 55, 66, 82, 0, 79, 11, 81]
nums2 = [5, 25, 4, 39, 57, 49, 93, 79, 7, 8, 49, 89, 2, 7, 73, 88, 45, 15, 34, 92, 84, 38, 85, 34, 16, 6, 99, 0, 2, 36, 68, 52, 73, 50, 77, 44, 61, 48]
console.log(intersect(nums1, nums2))