import{o as e,c as r,a}from"./app.06dc3881.js";const d='{"title":"子数组异或查询","description":"","frontmatter":{},"headers":[{"level":2,"title":"子数组异或查询","slug":"子数组异或查询"},{"level":3,"title":"示例 1：","slug":"示例-1："},{"level":3,"title":"示例 2：","slug":"示例-2："},{"level":2,"title":"分析","slug":"分析"},{"level":3,"title":"代码","slug":"代码"}],"relativePath":"leetcode/dayOne/1310. 子数组异或查询.md","lastUpdated":1620790820362}',i={},l=[a('<h2 id="子数组异或查询"><a class="header-anchor" href="#子数组异或查询" aria-hidden="true">#</a> 子数组异或查询</h2><p>有一个正整数数组 arr，现给你一个对应的查询数组 queries，其中 <code>queries[i] = [Li, Ri]</code>。</p><p>对于每个查询 i，请你计算从 Li 到 Ri 的 <code>XOR</code> 值（即 <code>arr[Li] xor arr[Li+1] xor ... xor arr[Ri]</code>）作为本次查询的结果。</p><p>并返回一个包含给定查询 <code>queries</code> 所有结果的数组。</p><h3 id="示例-1："><a class="header-anchor" href="#示例-1：" aria-hidden="true">#</a> 示例 1：</h3><div class="language-"><pre><code>输入：arr = [1,3,4,8], queries = [[0,1],[1,2],[0,3],[3,3]]\n输出：[2,7,14,8] \n解释：\n数组中元素的二进制表示形式是：\n1 = 0001 \n3 = 0011 \n4 = 0100 \n8 = 1000 \n查询的 XOR 值为：\n[0,1] = 1 xor 3 = 2 \n[1,2] = 3 xor 4 = 7 \n[0,3] = 1 xor 3 xor 4 xor 8 = 14 \n[3,3] = 8\n</code></pre></div><h3 id="示例-2："><a class="header-anchor" href="#示例-2：" aria-hidden="true">#</a> 示例 2：</h3><div class="language-"><pre><code>输入：arr = [4,8,2,10], queries = [[2,3],[1,3],[0,0],[0,3]]\n输出：[8,0,4,4]\n</code></pre></div><h2 id="分析"><a class="header-anchor" href="#分析" aria-hidden="true">#</a> 分析</h2><h3 id="代码"><a class="header-anchor" href="#代码" aria-hidden="true">#</a> 代码</h3><div class="language-js"><pre><code>\n</code></pre></div>',11)];i.render=function(a,d,i,n,o,s){return e(),r("div",null,l)};export{d as __pageData,i as default};
