import{o as n,c as s,a}from"./app.06dc3881.js";const e='{"title":"删除与获得点数","description":"","frontmatter":{},"headers":[{"level":2,"title":"删除与获得点数","slug":"删除与获得点数"},{"level":3,"title":"示例 1：","slug":"示例-1："},{"level":3,"title":"示例 2：","slug":"示例-2："},{"level":2,"title":"分析","slug":"分析"},{"level":3,"title":"代码","slug":"代码"},{"level":2,"title":"## 参考资料","slug":"参考资料"}],"relativePath":"leetcode/dayOne/740. 删除并获得点数.md","lastUpdated":1620197352460}',p={},t=[a('<h2 id="删除与获得点数"><a class="header-anchor" href="#删除与获得点数" aria-hidden="true">#</a> 删除与获得点数</h2><p>给你一个整数数组 <code>nums</code> ，你可以对它进行一些操作。</p><p>每次操作中，选择任意一个<code> nums[i]</code> ，删除它并获得 <code>nums[i]</code> 的点数。之后，你必须<strong>删除</strong>每个等于 <code>nums[i] - 1</code> 或 <code>nums[i] + 1</code> 的元素。</p><p>开始你拥有 0 个点数。返回你能通过这些操作获得的最大点数。</p><h3 id="示例-1："><a class="header-anchor" href="#示例-1：" aria-hidden="true">#</a> 示例 1：</h3><div class="language-"><pre><code>输入：nums = [3,4,2]\n输出：6\n解释：\n删除 4 获得 4 个点数，因此 3 也被删除。\n之后，删除 2 获得 2 个点数。总共获得 6 个点数。\n</code></pre></div><h3 id="示例-2："><a class="header-anchor" href="#示例-2：" aria-hidden="true">#</a> 示例 2：</h3><div class="language-"><pre><code>输入：nums = [2,2,3,3,3,4]\n输出：9\n解释：\n删除 3 获得 3 个点数，接着要删除两个 2 和 4 。\n之后，再次删除 3 获得 3 个点数，再次删除 3 获得 3 个点数。\n总共获得 9 个点数。\n</code></pre></div><h2 id="分析"><a class="header-anchor" href="#分析" aria-hidden="true">#</a> 分析</h2><p>这道题的动态规划, 与 <a href="https://leetcode-cn.com/problems/house-robber/solution/da-jia-jie-she-by-leetcode-solution/" target="_blank" rel="noopener noreferrer">198.打家劫舍</a> 的状态转移是差不多的。</p><p>使用 dp[i] 来记录 删除之后得到的点数</p><p>dp[i] = Max(dp[i], dp[i-1])</p><p>当需要对已有的数据进行排列，以实现动态规划。</p><div class="language-"><pre><code>nums = [2,3,4,5,3,5] =&gt;\n\nsums = [0,0,2,6,4,10]\n\nsums[i] = nums中 i 的 总和\n</code></pre></div><h3 id="代码"><a class="header-anchor" href="#代码" aria-hidden="true">#</a> 代码</h3><div class="language-js"><pre><code><span class="token keyword">var</span> <span class="token function-variable function">deleteAndEarn</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">nums</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">let</span> maxVal <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span><span class="token operator">...</span>nums<span class="token punctuation">)</span>\n    <span class="token keyword">let</span> sums <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Array</span><span class="token punctuation">(</span>maxVal<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>\n    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> num <span class="token keyword">of</span> nums<span class="token punctuation">)</span><span class="token punctuation">{</span>\n        sums<span class="token punctuation">[</span>num<span class="token punctuation">]</span> <span class="token operator">+=</span> num\n    <span class="token punctuation">}</span>\n    <span class="token keyword">let</span> first <span class="token operator">=</span> sums<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token punctuation">,</span>second <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>sums<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span>sums<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span>\n    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">;</span>i<span class="token operator">&lt;</span>sums<span class="token punctuation">.</span>length<span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n        <span class="token keyword">let</span> temp <span class="token operator">=</span> second\n        <span class="token keyword">if</span><span class="token punctuation">(</span>first <span class="token operator">+</span> sums<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">&gt;</span> second<span class="token punctuation">)</span> second <span class="token operator">=</span> first <span class="token operator">+</span> sums<span class="token punctuation">[</span>i<span class="token punctuation">]</span>\n        first <span class="token operator">=</span> temp\n    <span class="token punctuation">}</span>\n    <span class="token keyword">return</span> second\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre></div><h2 id="参考资料"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> ## 参考资料</h2><ul><li><a href="https://leetcode-cn.com/problems/delete-and-earn/" target="_blank" rel="noopener noreferrer">leetcode题目链接</a></li><li><a href="https://leetcode-cn.com/problems/delete-and-earn/solution/shan-chu-bing-huo-de-dian-shu-by-leetcod-x1pu/" target="_blank" rel="noopener noreferrer">官方题解</a></li></ul>',18)];p.render=function(a,e,p,o,c,l){return n(),s("div",null,t)};export{e as __pageData,p as default};
