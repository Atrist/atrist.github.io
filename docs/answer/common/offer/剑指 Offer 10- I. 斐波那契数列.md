---
title: 剑指 Offer 10- I. 斐波那契数列
date: 2021-09-04Z10:00:00
---
写一个函数，输入 n ，求斐波那契（Fibonacci）数列的第 n 项（即 F(N)）。斐波那契数列的定义如下：
```
F(0) = 0,   F(1) = 1
F(N) = F(N - 1) + F(N - 2), 其中 N > 1.
```
斐波那契数列由 0 和 1 开始，之后的斐波那契数就是由之前的两数相加而得出。

答案需要取模 1e9+7（1000000007），如计算初始结果为：1000000008，请返回 1。
## 题解1: 动态规划
斐波那契数的边界条件是 F(0)=0 和 F(1)=1。当 n>1 时，每一项的和都等于前两项的和，因此有如下递推关系：

$$F(n)=F(n−1)+F(n−2)$$

由于斐波那契数存在递推关系，因此可以使用动态规划求解。动态规划的状态转移方程即为上述递推关系，边界条件为 F(0) 和 F(1)。

### 代码
```js
var fib = function(n) {
    if(n<2) return n
    let n0 = 1, n1=2, sum
    for(let i = 2; i<n;i++){
        sum = (n0+n1) % 1000000007
        n0 = n1
        n1 = sum
    }
    return n0
};
```

## 参考资料
1. [剑指 Offer 10- I. 斐波那契数列](https://leetcode-cn.com/problems/fei-bo-na-qi-shu-lie-lcof/)
2. [官方题解](https://leetcode-cn.com/problems/fei-bo-na-qi-shu-lie-lcof/solution/fei-bo-na-qi-shu-lie-by-leetcode-solutio-hbss/)