// 浏览器扩展版本的入口文件
import { markdownToDocx, markdownToHtml } from './converter.js';

// 导出函数
const mdToCnWord = {
  markdownToDocx,
  markdownToHtml,
  
  // 便捷方法：将Markdown转换为HTML
  async convertToHtml(markdown) {
    return await markdownToHtml(markdown);
  },
  
  // 便捷方法：将Markdown转换为Word文档并下载
  async convertToDocxAndDownload(markdown, filename = 'document.docx') {
    try {
      const result = await markdownToDocx(markdown);
      const { docxBuffer } = result;
      
      // 创建Blob对象
      const blob = new Blob([docxBuffer], { 
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
      });
      
      // 创建下载链接
      const url = URL.createObjectURL(blob);
      
      // 创建下载链接并触发下载
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      
      // 清理
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);
      
      return true;
    } catch (error) {
      console.error('转换或下载失败:', error);
      return false;
    }
  },
  
  // 便捷方法：将Markdown转换为HTML并插入到指定元素
  async renderMarkdown(markdown, targetElement) {
    if (typeof targetElement === 'string') {
      targetElement = document.querySelector(targetElement);
    }
    
    if (!targetElement) {
      throw new Error('目标元素不存在');
    }
    
    const html = await markdownToHtml(markdown);
    targetElement.innerHTML = html;
    return html;
  }
};

// 如果在浏览器环境中，将函数挂载到window对象上
if (typeof window !== 'undefined') {
  window.mdToCnWord = mdToCnWord;
}

// 导出函数，以便可以通过ES模块导入
export default mdToCnWord;
export { markdownToDocx, markdownToHtml }; 