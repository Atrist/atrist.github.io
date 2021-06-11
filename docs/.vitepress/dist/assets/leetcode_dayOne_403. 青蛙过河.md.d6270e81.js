import{o as n,c as s,a}from"./app.49b0587d.js";const p='{"title":"青蛙过河","description":"","frontmatter":{},"headers":[{"level":2,"title":"青蛙过河","slug":"青蛙过河"},{"level":3,"title":"示例 1：","slug":"示例-1："},{"level":3,"title":"示例 2：","slug":"示例-2："},{"level":2,"title":"分析","slug":"分析"},{"level":3,"title":"优化(记忆搜索优化)","slug":"优化-记忆搜索优化"},{"level":2,"title":"参考资料","slug":"参考资料"}],"relativePath":"leetcode/dayOne/403. 青蛙过河.md","lastUpdated":1619856226627}',t={},e=a('<h2 id="青蛙过河"><a class="header-anchor" href="#青蛙过河" aria-hidden="true">#</a> 青蛙过河</h2><p>一只青蛙想要过河。 假定河流被等分为若干个单元格，并且在每一个单元格内都有可能放有一块石子（也有可能没有）。 青蛙可以跳上石子，但是不可以跳入水中。</p><p>给你石子的位置列表 <code>stones</code>（用单元格序号 <strong>升序</strong> 表示）， 请判定青蛙能否成功过河（即能否在最后一步跳至最后一块石子上）。</p><p>开始时， 青蛙默认已站在第一块石子上，并可以假定它第一步只能跳跃一个单位（即只能从单元格 1 跳至单元格 2 ）。</p><p>如果青蛙上一步跳跃了 <code>k</code> 个单位，那么它接下来的跳跃距离只能选择为 <code>k - 1</code>、<code>k</code> 或 <code>k + 1</code> 个单位。 另请注意，青蛙只能向前方（终点的方向）跳跃。</p><h3 id="示例-1："><a class="header-anchor" href="#示例-1：" aria-hidden="true">#</a> 示例 1：</h3><div class="language-"><pre><code>输入：stones = [0,1,3,5,6,8,12,17]\n输出：true\n解释：青蛙可以成功过河，按照如下方案跳跃：跳 1 个单位到第 2 块石子, 然后跳 2 个单位到第 3 块石子, 接着 跳 2 个单位到第 4 块石子, 然后跳 3 个单位到第 6 块石子, 跳 4 个单位到第 7 块石子, 最后，跳 5 个单位到第 8 个石子（即最后一块石子）。\n</code></pre></div><h3 id="示例-2："><a class="header-anchor" href="#示例-2：" aria-hidden="true">#</a> 示例 2：</h3><div class="language-"><pre><code>输入：stones = [0,1,2,3,4,8,9,11]\n输出：false\n解释：这是因为第 5 和第 6 个石子之间的间距太大，没有可选的方案供青蛙跳跃过去。\n</code></pre></div><h2 id="分析"><a class="header-anchor" href="#分析" aria-hidden="true">#</a> 分析</h2><p>暴力解决，借助深度搜索，将所有的跳法求出来，如果有可行解，则返回true，如果无，则返回 false</p><p>因为 下一跳的距离只能是上一跳的 <code>k - 1</code>、<code>k</code> 或 <code>k + 1</code>。</p><p>参数的设定</p><ul><li>i 石头下标</li><li>k 跳动距离</li></ul><div class="language-js"><pre><code><span class="token keyword">var</span> <span class="token function-variable function">canCross</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">stones</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>  \n  <span class="token keyword">let</span> flag <span class="token operator">=</span> stones<span class="token punctuation">[</span>stones<span class="token punctuation">.</span>length<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span>\n  <span class="token keyword">if</span><span class="token punctuation">(</span>stones<span class="token punctuation">.</span>length <span class="token operator">===</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token keyword">return</span> flag <span class="token operator">===</span> <span class="token number">1</span> <span class="token operator">||</span> flag <span class="token operator">===</span> <span class="token number">0</span>\n  <span class="token keyword">const</span> <span class="token function-variable function">dfs</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">i<span class="token punctuation">,</span> k</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n    <span class="token comment">// 找到存在一跳位置的可能性</span>\n    <span class="token keyword">let</span> res <span class="token operator">=</span> <span class="token boolean">false</span>\n    <span class="token keyword">if</span><span class="token punctuation">(</span>k<span class="token operator">&lt;=</span><span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">return</span> res\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">===</span> flag<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">true</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>stones<span class="token punctuation">.</span><span class="token function">indexOf</span> <span class="token punctuation">(</span>i <span class="token operator">+</span> k<span class="token punctuation">)</span> <span class="token operator">!==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token function">dfs</span><span class="token punctuation">(</span>i <span class="token operator">+</span> k<span class="token punctuation">,</span> k<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>res  <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>stones<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>i<span class="token operator">+</span>k<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">!==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n         <span class="token function">dfs</span><span class="token punctuation">(</span>i <span class="token operator">+</span> k<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">,</span> k<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>res  <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>stones<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>i<span class="token operator">+</span>k<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">!==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token function">dfs</span><span class="token punctuation">(</span>i<span class="token operator">+</span>k<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> k<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>res  <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">return</span> res\n  <span class="token punctuation">}</span>\n  <span class="token keyword">return</span> <span class="token function">dfs</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre></div><p>会超时</p><h3 id="优化-记忆搜索优化"><a class="header-anchor" href="#优化-记忆搜索优化" aria-hidden="true">#</a> 优化(记忆搜索优化)</h3><h2 id="参考资料"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2><ul><li><a href="https://leetcode-cn.com/problems/frog-jump/" target="_blank" rel="noopener noreferrer">leetcode题目链接</a></li><li><a href="https://leetcode-cn.com/problems/frog-jump/solution/" target="_blank" rel="noopener noreferrer">官方题解</a></li></ul>',19);t.render=function(a,p,t,o,c,l){return n(),s("div",null,[e])};export default t;export{p as __pageData};
