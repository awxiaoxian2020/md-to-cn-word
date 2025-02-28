import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import showdown from 'showdown';
import { JSDOM } from 'jsdom';
import HTMLtoDOCX from 'html-to-docx';
import inlineCss from 'inline-css';

// 获取当前文件的目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 将Markdown内容转换为符合中国大陆地区惯用的初始风格的HTML
 * @param {string} markdownContent - Markdown内容
 * @param {string} [outputPath] - 可选，输出的HTML文件路径
 * @returns {Promise<string>} 返回HTML内容
 */
export async function markdownToHtml(markdownContent, outputPath = null) {
  // 读取minireset.css文件
  const miniresetPath = path.join(__dirname, 'lib', 'minireset.css');
  const miniresetCSS = fs.readFileSync(miniresetPath, 'utf-8');
  
  // 第一步：将Markdown转换为HTML
  const converter = new showdown.Converter({
    tables: true,
    tasklists: true,
    strikethrough: true,
    emoji: true,
  });
  
  let html = converter.makeHtml(markdownContent);
  
  // 第二步：使用JSDOM处理HTML，使其符合中国大陆地区惯用的初始风格
  const dom = new JSDOM(html);
  const document = dom.window.document;
  
  // 处理标题：将h1到h6标签都变成加粗文本，删除原有标签，不添加换行
  const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
  for (const heading of headings) {
    // 获取标题内容
    const content = heading.textContent;
    
    // 创建加粗元素
    const bold = document.createElement('strong');
    bold.textContent = content;
    
    // 直接替换原标题元素
    heading.parentNode.replaceChild(bold, heading);
  }
  
  // 处理段落：完全删除p标签，保留内容
  const paragraphs = Array.from(document.querySelectorAll('p'));
  for (const p of paragraphs) {
    // 跳过特殊段落（如在列表、引用等内部的段落）
    if (p.parentElement.tagName === 'LI' || 
        p.parentElement.tagName === 'BLOCKQUOTE') {
      continue;
    }
    
    // 获取段落内容的HTML字符串
    const content = p.innerHTML;
    
    // 创建一个临时容器
    const tempContainer = document.createElement('span');
    tempContainer.style.display = 'block';
    tempContainer.style.textIndent = '2em';
    tempContainer.innerHTML = content;
    
    // 替换原p元素
    p.parentNode.replaceChild(tempContainer, p);
  }
  
  // 处理无序列表：将无序列表转换为有序列表
  const unorderedLists = Array.from(document.querySelectorAll('ul'));
  for (const ul of unorderedLists) {
    const ol = document.createElement('ol');
    ol.innerHTML = ul.innerHTML;
    ul.parentNode.replaceChild(ol, ul);
  }
  
  // 获取处理后的HTML
  html = document.body.innerHTML;
  
  // 添加一些基本样式，包括minireset.css
  const rawHtml = `
    <html>
      <head>
        <meta charset="UTF-8">
        <title>转换文档</title>
        <style>
          ${miniresetCSS}
          /* 自定义样式 */
          body { font-family: SimSun, serif; line-height: 22pt; }
        </style>
      </head>
      <body>${html}</body>
    </html>
  `;
  
  // 将样式转换为内联样式
  const finalHtml = await inlineCss(rawHtml, { url: 'file://' });
  
  // 如果提供了输出路径，则保存HTML文件
  if (outputPath) {
    fs.writeFileSync(outputPath, finalHtml);
    console.log(`HTML文件已保存为 "${outputPath}"`);
  }
  
  return finalHtml;
}

/**
 * 将Markdown内容转换为符合中国大陆地区惯用的初始风格的Word文档
 * @param {string} markdownContent - Markdown内容
 * @param {string} outputPath - 输出的Word文档路径
 * @param {Object} options - 转换选项
 * @param {boolean} [options.generateHtml=false] - 是否生成HTML文件
 * @returns {Promise<{docxBuffer: Buffer, htmlContent: string}>} 返回docx缓冲区和HTML内容
 */
export async function markdownToDocx(markdownContent, outputPath, options = {}) {
  // 设置默认选项
  const { generateHtml = false } = options;
  
  // 使用markdownToHtml函数获取HTML内容
  const finalHtml = await markdownToHtml(markdownContent);
  
  // 如果选择生成HTML文件，则输出HTML文件
  if (generateHtml) {
    const htmlOutputPath = outputPath.replace(/\.docx$/i, '.html');
    fs.writeFileSync(htmlOutputPath, finalHtml);
    console.log(`HTML文件已保存为 "${htmlOutputPath}"`);
  }
  
  // 将HTML转换为DOCX
  const docxBuffer = await HTMLtoDOCX(finalHtml, null, {
    title: 'Converted Document',
    margin: {
      top: 1440,      // 上边距 1 英寸 (1440 缇)
      right: 1440,    // 右边距 1 英寸
      bottom: 1440,   // 下边距 1 英寸
      left: 1440,     // 左边距 1 英寸
    },
    font: 'SimSun',
    fontSize: 24,
    pageNumber: true,
  });
  
  // 保存文件
  fs.writeFileSync(outputPath, docxBuffer);
  
  // 返回docx缓冲区和HTML内容
  return {
    docxBuffer,
    htmlContent: finalHtml
  };
} 