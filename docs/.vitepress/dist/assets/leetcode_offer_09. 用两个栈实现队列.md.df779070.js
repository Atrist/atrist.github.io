import{o as n,c as a,a as s}from"./app.06dc3881.js";const t='{"title":"用两个栈实现队列","description":"","frontmatter":{},"headers":[{"level":2,"title":"用两个栈实现队列","slug":"用两个栈实现队列"},{"level":3,"title":"示例 1：","slug":"示例-1："},{"level":3,"title":"示例 2：","slug":"示例-2："},{"level":2,"title":"分析","slug":"分析"},{"level":3,"title":"代码","slug":"代码"}],"relativePath":"leetcode/offer/09. 用两个栈实现队列.md","lastUpdated":1620220483861}',p={},e=[s('<h2 id="用两个栈实现队列"><a class="header-anchor" href="#用两个栈实现队列" aria-hidden="true">#</a> 用两个栈实现队列</h2><p>用两个栈实现一个队列。队列的声明如下，请实现它的两个函数 <code>appendTail</code> 和 · ，分别完成在队列尾部插入整数和在队列头部删除整数的功能。(若队列中没有元素，deleteHead 操作返回 -1 )</p><h3 id="示例-1："><a class="header-anchor" href="#示例-1：" aria-hidden="true">#</a> 示例 1：</h3><div class="language-"><pre><code>输入：\n[&quot;CQueue&quot;,&quot;appendTail&quot;,&quot;deleteHead&quot;,&quot;deleteHead&quot;]\n[[],[3],[],[]]\n输出：[null,null,3,-1]\n</code></pre></div><h3 id="示例-2："><a class="header-anchor" href="#示例-2：" aria-hidden="true">#</a> 示例 2：</h3><div class="language-"><pre><code>输入：\n[&quot;CQueue&quot;,&quot;deleteHead&quot;,&quot;appendTail&quot;,&quot;appendTail&quot;,&quot;deleteHead&quot;,&quot;deleteHead&quot;]\n[[],[],[5],[2],[],[]]\n输出：[null,-1,null,null,5,2]\n</code></pre></div><h2 id="分析"><a class="header-anchor" href="#分析" aria-hidden="true">#</a> 分析</h2><ul><li>栈: 先进后出</li><li>队列: 先进先出</li></ul><p>两个栈 一个用来输入，一个用来输出</p><p>当输出栈为空时, 将此时输入栈的内容入栈到输出栈中</p><h3 id="代码"><a class="header-anchor" href="#代码" aria-hidden="true">#</a> 代码</h3><div class="language-js"><pre><code><span class="token keyword">var</span> <span class="token function-variable function">CQueue</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>input <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>output <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token comment">/** \n * @param {number} value\n * @return {void}\n */</span>\n<span class="token class-name">CQueue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">appendTail</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>input<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token comment">/**\n * @return {number}\n */</span>\n<span class="token class-name">CQueue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">deleteHead</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>output<span class="token punctuation">.</span>length <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>input<span class="token punctuation">.</span>length <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span>\n        <span class="token keyword">else</span><span class="token punctuation">{</span>\n            <span class="token keyword">while</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>input<span class="token punctuation">.</span>length <span class="token operator">!==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">this</span><span class="token punctuation">.</span>output<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>input<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>output<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre></div>',12)];p.render=function(s,t,p,o,u,c){return n(),a("div",null,e)};export{t as __pageData,p as default};
