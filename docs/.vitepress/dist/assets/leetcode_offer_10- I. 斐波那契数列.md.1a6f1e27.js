import{o as n,c as a,a as s}from"./app.49b0587d.js";const e='{"title":"I. 斐波那契数列","description":"","frontmatter":{},"headers":[{"level":2,"title":"I. 斐波那契数列","slug":"i-斐波那契数列"},{"level":3,"title":"示例 1：","slug":"示例-1："},{"level":3,"title":"示例 2：","slug":"示例-2："},{"level":2,"title":"分析","slug":"分析"},{"level":3,"title":"代码","slug":"代码"}],"relativePath":"leetcode/offer/10- I. 斐波那契数列.md","lastUpdated":1620221039542}',p={},t=s('<h2 id="i-斐波那契数列"><a class="header-anchor" href="#i-斐波那契数列" aria-hidden="true">#</a> I. 斐波那契数列</h2><p>写一个函数，输入 <code>n</code> ，求斐波那契（Fibonacci）数列的第 n 项（即 F(N)）。斐波那契数列的定义如下：</p><div class="language-"><pre><code>F(0) = 0,   F(1) = 1\nF(N) = F(N - 1) + F(N - 2), 其中 N &gt; 1.\n</code></pre></div><p>斐波那契数列由 0 和 1 开始，之后的斐波那契数就是由之前的两数相加而得出。</p><p>答案需要取模 1e9+7（1000000007），如计算初始结果为：1000000008，请返回 1。</p><h3 id="示例-1："><a class="header-anchor" href="#示例-1：" aria-hidden="true">#</a> 示例 1：</h3><div class="language-"><pre><code>输入：n = 2\n输出：1\n</code></pre></div><h3 id="示例-2："><a class="header-anchor" href="#示例-2：" aria-hidden="true">#</a> 示例 2：</h3><div class="language-"><pre><code>输入：n = 5\n输出：5\n</code></pre></div><h2 id="分析"><a class="header-anchor" href="#分析" aria-hidden="true">#</a> 分析</h2><p>这道题很简单, for 循环就行, 在求和的时候, 进行求余</p><h3 id="代码"><a class="header-anchor" href="#代码" aria-hidden="true">#</a> 代码</h3><div class="language-js"><pre><code><span class="token keyword">var</span> <span class="token function-variable function">fib</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">n</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">let</span> n0 <span class="token operator">=</span><span class="token number">0</span> <span class="token punctuation">,</span> n1<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">,</span> sum\n    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">&lt;</span>n<span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n        sum <span class="token operator">=</span> <span class="token punctuation">(</span>n0<span class="token operator">+</span>n1<span class="token punctuation">)</span> <span class="token operator">%</span> <span class="token number">1000000007</span>\n        n0 <span class="token operator">=</span> n1\n        n1 <span class="token operator">=</span> sum\n    <span class="token punctuation">}</span>\n    <span class="token keyword">return</span> n0\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre></div>',13);p.render=function(s,e,p,o,c,r){return n(),a("div",null,[t])};export default p;export{e as __pageData};
