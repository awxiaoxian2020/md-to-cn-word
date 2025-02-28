// 导出转换器函数，以便用户可以将其作为模块导入
import { markdownToDocx, markdownToHtml } from './converter.js';

// 检测是否在浏览器环境中
const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';

// 如果在浏览器环境中，将函数挂载到window对象上
if (isBrowser) {
  window.mdToCnWord = {
    markdownToDocx,
    markdownToHtml
  };
}

export { markdownToDocx, markdownToHtml }; 