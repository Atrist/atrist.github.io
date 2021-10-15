---
title: 剑指 Offer 22. 链表中倒数第k个节点
date: 2021-09-02Z10:00:00
---
## 题目
输入一个链表，输出该链表中倒数第k个节点。为了符合大多数人的习惯，本题从1开始计数，即链表的尾节点是倒数第1个节点。

例如，一个链表有 6 个节点，从头节点开始，它们的值依次是 1、2、3、4、5、6。这个链表的倒数第 3 个节点是值为 4 的节点。

## 解法: 双指针
这里可以使用两次遍历链表的方式，来得到答案。

但为了优化时间复杂度， 可以使用双指针方式。
1. a,b 两个指针
2. 当a遍历到第k个节点时，b开始遍历
3. 当a遍历到链表尾部时，b便是倒数第k个节点

### 代码
```js
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var getKthFromEnd = function(head, k) {
    let a = head,b = head;
    let first = 0;
    while(a.next){
        a = a.next;
        first++;
        if(first>=k){
            b = b.next
        }
    }
    return b
};
```
官方题解代码：
```js
var getKthFromEnd = function(head, k) {
    let fast = head, slow = head;
    
    while (fast && k > 0) {
        [fast, k] = [fast.next, k - 1];
    }
    while (fast) {
        [fast, slow] = [fast.next, slow.next];
    }
    return slow;
};
```
## 参考资料
1. [剑指 Offer 22. 链表中倒数第k个节点](https://leetcode-cn.com/problems/lian-biao-zhong-dao-shu-di-kge-jie-dian-lcof/)
2. [官方题解](https://leetcode-cn.com/problems/lian-biao-zhong-dao-shu-di-kge-jie-dian-lcof/solution/lian-biao-zhong-dao-shu-di-kge-jie-dian-1pz9l/)