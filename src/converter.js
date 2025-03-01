import showdown from 'showdown';
import * as cheerio from 'cheerio';
import HTMLtoDOCX from 'html-to-docx';
import inlineCss from 'inline-css';

// 内联 minireset.css 内容，避免使用文件系统
const miniresetCSS = `/*! minireset.css v0.0.6 | MIT License | github.com/jgthms/minireset.css */
/* modified by Xavi Lee */
html,
body,
p,
ol,
ul,
li,
dl,
dt,
dd,
blockquote,
figure,
fieldset,
legend,
textarea,
pre,
iframe,
hr,
h1,
h2,
h3,
h4,
h5,
h6 {
    margin: 0;
    padding: 0
}

ul {
    list-style: none
}

button,
input,
select {
    margin: 0
}

html {
    box-sizing: border-box
}

*,
*::before,
*::after {
    box-sizing: inherit
}

img,
video {
    height: auto;
    max-width: 100%
}

iframe {
    border: 0
}

table {
    border-collapse: collapse;
    border-spacing: 0
}

td,
th {
    padding: 0
}`;

/**
 * 将Markdown内容转换为符合中国大陆地区惯用的初始风格的HTML
 * @param {string} markdownContent - Markdown内容
 * @returns {Promise<string>} 返回HTML内容
 */
export async function markdownToHtml(markdownContent) {
  // 第一步：将Markdown转换为HTML
  const converter = new showdown.Converter({
    tables: true,
    tasklists: true,
    strikethrough: true,
    emoji: true,
  });
  
  let html = converter.makeHtml(markdownContent);
  
  // 使用cheerio加载HTML
  const $ = cheerio.load(html);
  
  // 处理标题：将h1到h6标签都变成加粗文本，删除原有标签，不添加换行
  $('h1, h2, h3, h4, h5, h6').each(function() {
    // 获取标题内容
    const content = $(this).text();
    
    // 创建加粗元素
    const bold = $('<strong></strong>').text(content);
    
    // 直接替换原标题元素
    $(this).replaceWith(bold);
  });
  
  // 处理段落：完全删除p标签，保留内容
  $('p').each(function() {
    // 跳过特殊段落（如在列表、引用等内部的段落）
    if ($(this).parent().is('li') || $(this).parent().is('blockquote')) {
      return;
    }
    
    // 获取段落内容的HTML字符串
    const content = $(this).html();
    
    // 创建一个临时容器
    const tempContainer = $('<span></span>').css('display', 'block').html(content);
    
    // 替换原p元素
    $(this).replaceWith(tempContainer);
  });
  
  // 处理无序列表：将无序列表转换为有序列表
  $('ul').each(function() {
    const ol = $('<ol></ol>').html($(this).html());
    $(this).replaceWith(ol);
  });
  
  // 获取处理后的HTML
  html = $('body').html();
  
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
  const finalHtml = await inlineCss(rawHtml, { url: '' });
  
  return finalHtml;
}

/**
 * 将Markdown内容转换为符合中国大陆地区惯用的初始风格的Word文档
 * @param {string} markdownContent - Markdown内容
 * @param {Object} options - 转换选项
 * @param {Object} [options.docxOptions] - Word文档的配置选项
 * @returns {Promise<Buffer>} 返回docx缓冲区
 */
export async function markdownToDocx(markdownContent, options = {}) {
  // 设置默认选项
  const docxOptions = options.docxOptions || {
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
  };
  
  // 使用markdownToHtml函数获取HTML内容
  const finalHtml = await markdownToHtml(markdownContent);
  
  // 将HTML转换为DOCX
  const docxBuffer = await HTMLtoDOCX(finalHtml, null, docxOptions);
  
  // 返回docx缓冲区
  return docxBuffer;
}

/**
 * 将Markdown内容转换为HTML和Word文档
 * @param {string} markdownContent - Markdown内容
 * @param {Object} options - 转换选项
 * @param {Object} [options.docxOptions] - Word文档的配置选项
 * @returns {Promise<{docxBuffer: Buffer, htmlContent: string}>} 返回docx缓冲区和HTML内容
 */
export async function markdownToAll(markdownContent, options = {}) {
  // 使用markdownToHtml函数获取HTML内容
  const htmlContent = await markdownToHtml(markdownContent);
  
  // 使用markdownToDocx函数获取DOCX缓冲区
  const docxBuffer = await markdownToDocx(markdownContent, options);
  
  // 返回docx缓冲区和HTML内容
  return {
    docxBuffer,
    htmlContent
  };
} 