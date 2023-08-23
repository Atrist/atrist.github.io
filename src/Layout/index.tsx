// 整体页面路由
import * as React from 'react';

const Index = ({ children }) => (
  <>
    <nav>
      导航栏
    </nav>
    {children}
    <footer>
      页脚
    </footer>
  </>
);

export default Index;
