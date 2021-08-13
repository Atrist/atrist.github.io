import{o as n,c as a,a as s}from"./app.06dc3881.js";const t='{"title":"什么是队列","description":"","frontmatter":{},"headers":[{"level":2,"title":"什么是队列","slug":"什么是队列"},{"level":2,"title":"代码的实现","slug":"代码的实现"},{"level":3,"title":"入队","slug":"入队"},{"level":3,"title":"出队","slug":"出队"},{"level":3,"title":"应用","slug":"应用"},{"level":2,"title":"手动实现","slug":"手动实现"}],"relativePath":"leetcode/dataStructure/队列.md","lastUpdated":1619447679794}',p={},e=[s('<h2 id="什么是队列"><a class="header-anchor" href="#什么是队列" aria-hidden="true">#</a> 什么是队列</h2><p>队列也称先进先出(FIFO), 它一般使用数组来实现， 有如下的规定</p><ol><li>只能从队尾插入</li><li>只能从队头删除</li></ol><h2 id="代码的实现"><a class="header-anchor" href="#代码的实现" aria-hidden="true">#</a> 代码的实现</h2><p>在JavaScript中实现队列还是比较简单的，借助 Array的<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift" target="_blank" rel="noopener noreferrer">shift</a>, <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push" target="_blank" rel="noopener noreferrer">push</a>两个方法就可以实现。</p><h3 id="入队"><a class="header-anchor" href="#入队" aria-hidden="true">#</a> 入队</h3><div class="language-"><pre><code>Array.push\n</code></pre></div><h3 id="出队"><a class="header-anchor" href="#出队" aria-hidden="true">#</a> 出队</h3><div class="language-"><pre><code>Array.shift\n</code></pre></div><h3 id="应用"><a class="header-anchor" href="#应用" aria-hidden="true">#</a> 应用</h3><p>在 树 的 层序遍历中，一般会使用队列来记录, 同一层级的节点</p><div class="language-js"><pre><code><span class="token keyword">function</span> <span class="token function">dfs</span><span class="token punctuation">(</span><span class="token parameter">tree</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n  <span class="token keyword">let</span> queue <span class="token operator">=</span> <span class="token punctuation">[</span>tree<span class="token punctuation">]</span>\n  <span class="token keyword">while</span><span class="token punctuation">(</span>queue<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">{</span>\n    <span class="token keyword">let</span> node <span class="token operator">=</span> queue<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token comment">// 层序遍历</span>\n    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>val<span class="token punctuation">)</span>\n    node<span class="token punctuation">.</span>left <span class="token operator">&amp;&amp;</span> queue<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>left<span class="token punctuation">)</span>\n    node<span class="token punctuation">.</span>right <span class="token operator">&amp;&amp;</span> queue<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>right<span class="token punctuation">)</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre></div><h2 id="手动实现"><a class="header-anchor" href="#手动实现" aria-hidden="true">#</a> 手动实现</h2><p>在这里可以使用标记队头位置和队尾位置的方式， 进行手动实现一个效率较高的队列</p><div class="language-js"><pre><code><span class="token keyword">class</span> <span class="token class-name">queue</span> <span class="token punctuation">{</span>\n  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>array <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>head <span class="token operator">=</span> <span class="token number">0</span>\n  <span class="token punctuation">}</span>\n  <span class="token function">push</span><span class="token punctuation">(</span><span class="token parameter">val</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>array<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span>\n  <span class="token punctuation">}</span>\n  <span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>head <span class="token operator">&lt;=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>array<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">{</span>\n      <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>array<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>head<span class="token operator">++</span><span class="token punctuation">]</span>\n    <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>\n      <span class="token keyword">return</span> <span class="token keyword">null</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre></div>',15)];p.render=function(s,t,p,o,c,l){return n(),a("div",null,e)};export{t as __pageData,p as default};
