## 剑指 Offer II 069. 山峰数组的顶部
符合下列属性的数组 arr 称为 山峰数组（山脉数组） ：

- arr.length >= 3
- 存在 i（0 < i < arr.length - 1）使得：
- arr[0] < arr[1] < ... arr[i-1] < arr[i]
- arr[i] > arr[i+1] > ... > arr[arr.length - 1]
- 给定由整数组成的山峰数组 arr ，返回任何满足 arr[0] < arr[1] < ... arr[i - 1] < arr[i] > arr[i + 1] > ... > arr[arr.length - 1] 的下标 i ，即山峰顶部。
### 示例1：
```
输入：arr = [0,1,0]
输出：1
```
### 示例2：
```
输入：arr = [1,3,5,4,2]
输出：2
```
### 提示：

- $3 <= arr.length <= 10^4$
- $0 <= arr[i] <= 10^6$
- 题目数据保证 arr 是一个山脉数组
## 题解1： 一次遍历
由于题目数据保证了 arr 是一个山脉数组，所以可以使用一次遍历，当遍历到一个元素比后一个元素大的时候，则说明此元素是山峰顶部，直接返回即可。

### 代码
```js
var peakIndexInMountainArray = function(arr) {
    for(let i=0;i<arr.length;i++){
        if(arr[i]>arr[i+1]) return i
    }
};
```
## 题解2： 二分查找
记满足题目要求的下标 i 为 $i_\textit{ans}$。我们可以发现：

- 当 $i < i_\textit{ans}$  时，$\textit{arr}_i < \textit{arr}_{i+1}$ 恒成立；
- 当 $i \geq i_\textit{ans}$ 时，$\textit{arr}_i > \textit{arr}_{i+1}$ 恒成立。

 $i_\textit{ans}  即为「最小的满足 $\textit{arr}_i > \textit{arr}_{i+1}$ 的下标 i」，我们可以用二分查找的方法来找出 $i_\textit{ans}$ 。

### 代码
```js
var peakIndexInMountainArray = function(arr) {
   let res = 0
   let left=0, right= arr.length;
   while(left<=right){
       const mid = Math.floor((left+right)/2)
       // 缩小右边边界
       if(arr[mid]>arr[mid+1]){
           res = mid
           right = mid-1
        // 缩小左边边界
       }else{
           left = mid+1
       }
   }
   return res
};
```

## 参考资料
1. [leetcode题目网址](https://leetcode-cn.com/problems/B1IidL/)
2. [官方题解](https://leetcode-cn.com/problems/B1IidL/solution/shan-feng-shu-zu-de-ding-bu-by-leetcode-9j8lk/)