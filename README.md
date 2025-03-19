# md-to-cn-word

将Markdown转换为符合中国大陆地区惯用的初始风格的Word文档的库

## 特点

- 将Markdown内容转换为Word文档
- 转换结果符合中国大陆地区的排版习惯
- 支持转换为HTML或直接转换为Word文档
- 同时支持Node.js环境和浏览器环境（包括油猴脚本）
- 油猴脚本环境下已内置所有依赖，无需额外引入

## 安装

```bash
# 使用npm
npm install md-to-cn-word

# 使用yarn
yarn add md-to-cn-word

# 使用pnpm
pnpm add md-to-cn-word
```

## 使用方法

### 在Node.js中使用（ESM）

```javascript
// ESM方式导入
import { markdownToDocx, markdownToHtml, markdownToAll } from 'md-to-cn-word';
import fs from 'fs';

// 读取Markdown内容
const markdownContent = fs.readFileSync('example.md', 'utf-8');

// 转换为Word文档
const docxBuffer = await markdownToDocx(markdownContent);
fs.writeFileSync('output.docx', docxBuffer);

// 转换为HTML
const htmlContent = await markdownToHtml(markdownContent);
fs.writeFileSync('output.html', htmlContent);

// 同时获取Word和HTML
const { docxBuffer, htmlContent } = await markdownToAll(markdownContent);
```

### 在Node.js中使用（CommonJS）

```javascript
// CommonJS方式导入
const { markdownToDocx, markdownToHtml, markdownToAll } = require('md-to-cn-word');
const fs = require('fs');

// 读取Markdown内容
const markdownContent = fs.readFileSync('example.md', 'utf-8');

// 转换为Word文档
async function convert() {
  const docxBuffer = await markdownToDocx(markdownContent);
  fs.writeFileSync('output.docx', docxBuffer);
}

convert();
```

### 在油猴脚本中使用

```javascript
// ==UserScript==
// @name         Markdown to Chinese Word Converter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  将网页上的Markdown内容转换为符合中国习惯的Word文档
// @author       You
// @match        *://*/*
// @grant        GM_download
// @require      https://cdn.jsdelivr.net/npm/md-to-cn-word@0.2.3/dist/md-to-cn-word.min.js
// ==/UserScript==

(function() {
  'use strict';
  
  // 使用MdToCnWord库转换内容
  const markdownContent = "# 标题\n\n这是一段Markdown内容";
  const docxBuffer = await MdToCnWord.markdownToDocx(markdownContent);
  
  // 将Buffer转换为Blob
  const blob = new Blob([docxBuffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
  
  // 使用GM_download下载文件
  GM_download({
    url: URL.createObjectURL(blob),
    name: '转换文档.docx',
    saveAs: true
  });
})();
```

## API参考

### markdownToHtml(markdownContent)

将Markdown内容转换为HTML。

参数:
- `markdownContent` (String): Markdown文本内容

返回:
- Promise<String>: 返回HTML内容

### markdownToDocx(markdownContent, options)

将Markdown内容转换为Word文档。

参数:
- `markdownContent` (String): Markdown文本内容
- `options` (Object, 可选): 转换选项
  - `docxOptions` (Object, 可选): Word文档的配置选项

返回:
- Promise<Buffer>: 返回docx文档缓冲区

### markdownToAll(markdownContent, options)

同时将Markdown内容转换为HTML和Word文档。

参数:
- `markdownContent` (String): Markdown文本内容
- `options` (Object, 可选): 转换选项
  - `docxOptions` (Object, 可选): Word文档的配置选项

返回:
- Promise<Object>: 
  - `docxBuffer` (Buffer): Word文档缓冲区
  - `htmlContent` (String): HTML内容

## 许可证

LGPL-3.0-or-later 