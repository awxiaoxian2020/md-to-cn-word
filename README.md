# md-to-cn-word

将Markdown转换为符合中国大陆地区惯用的初始风格的Word文档的库。

## 功能特点

- 将Markdown转换为符合中国大陆地区惯用的初始风格的HTML
- 将Markdown转换为符合中国大陆地区惯用的初始风格的Word文档
- 自定义文档格式（字体、字号、边距等）
- 支持CommonJS和ES模块

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

### 基本用法

```javascript
import { markdownToDocx } from 'md-to-cn-word';
import fs from 'fs';

// Markdown内容
const markdownContent = `
# 标题

这是一段文本。

- 列表项1
- 列表项2
`;

// 转换为Word文档
(async () => {
  const docxBuffer = await markdownToDocx(markdownContent);
  
  // 保存Word文档
  fs.writeFileSync('output.docx', docxBuffer);
})();
```

### 高级用法

```javascript
import { markdownToDocx, markdownToHtml, markdownToAll } from 'md-to-cn-word';
import fs from 'fs';

// Markdown内容
const markdownContent = `
# 标题

这是一段文本。

- 列表项1
- 列表项2
`;

// 自定义选项
const options = {
  docxOptions: {
    title: '我的文档',
    margin: {
      top: 1440,    // 上边距1英寸
      right: 1440,  // 右边距1英寸
      bottom: 1440, // 下边距1英寸
      left: 1440,   // 左边距1英寸
    },
    font: 'SimSun', // 宋体
    fontSize: 24,   // 小四号字体（24磅）
    pageNumber: true, // 添加页码
  }
};

// 转换为Word文档
(async () => {
  // 转换为Word文档
  const docxBuffer = await markdownToDocx(markdownContent, options);
  fs.writeFileSync('output.docx', docxBuffer);
  
  // 转换为HTML
  const htmlContent = await markdownToHtml(markdownContent);
  fs.writeFileSync('output.html', htmlContent);
  
  // 同时获取Word文档和HTML
  const { docxBuffer: docx, htmlContent: html } = await markdownToAll(markdownContent, options);
  fs.writeFileSync('output2.docx', docx);
  fs.writeFileSync('output2.html', html);
})();
```

## API

### markdownToHtml(markdownContent)

将Markdown内容转换为符合中国大陆地区惯用的初始风格的HTML。

**参数：**
- `markdownContent` {string} - Markdown内容

**返回值：**
- `Promise<string>` - 返回HTML内容

### markdownToDocx(markdownContent, options)

将Markdown内容转换为符合中国大陆地区惯用的初始风格的Word文档。

**参数：**
- `markdownContent` {string} - Markdown内容
- `options` {Object} - 可选，转换选项
  - `docxOptions` {Object} - Word文档的配置选项
    - `title` {string} - 文档标题
    - `margin` {Object} - 文档边距
      - `top` {number} - 上边距（缇）
      - `right` {number} - 右边距（缇）
      - `bottom` {number} - 下边距（缇）
      - `left` {number} - 左边距（缇）
    - `font` {string} - 字体
    - `fontSize` {number} - 字号（磅）
    - `pageNumber` {boolean} - 是否添加页码

**返回值：**
- `Promise<Buffer>` - 返回docx缓冲区

### markdownToAll(markdownContent, options)

将Markdown内容转换为HTML和Word文档。

**参数：**
- `markdownContent` {string} - Markdown内容
- `options` {Object} - 可选，转换选项，与markdownToDocx相同

**返回值：**
- `Promise<Object>` - 返回包含以下属性的对象
  - `docxBuffer` {Buffer} - Word文档缓冲区
  - `htmlContent` {string} - HTML内容

## 许可证

LGPL-3.0-or-later 