// 浏览器版本的入口文件
import { markdownToDocx, markdownToHtml } from './converter.js';

// 将函数挂载到window对象上
window.mdToCnWord = {
  markdownToDocx,
  markdownToHtml
};

// 导出函数，以便可以通过ES模块导入
export { markdownToDocx, markdownToHtml }; 