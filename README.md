# md-to-cn-word

一个将Markdown转换为符合中国大陆地区惯用的初始风格的Word文档的库。

## 特点

- 将Markdown转换为Word文档（.docx格式）或HTML
- 自动调整格式以符合中国大陆地区惯用的初始风格：  

  - 将无序列表转换为有序列表
  - 使用宋体作为默认字体
  - 标题转换为加粗文本
  - 避免出现空行

## 安装

```bash
npm install md-to-cn-word
# 或者使用pnpm
pnpm add md-to-cn-word
# 或者使用yarn
yarn add md-to-cn-word
```

## 使用方法

### 作为库使用

```javascript
import { markdownToDocx, markdownToHtml, markdownToAll } from 'md-to-cn-word';
import fs from 'fs';

// 示例Markdown内容
const markdownContent = `
# 标题

这是一段文字。

- 列表项1
- 列表项2
- 列表项3
`;

// 方法1: 转换Markdown为Word文档Buffer
markdownToDocx(markdownContent)
  .then(docxBuffer => {
    // 将Buffer保存为文件
    fs.writeFileSync('output.docx', docxBuffer);
    console.log('Word文档已生成: output.docx');
  })
  .catch(err => {
    console.error('转换过程中发生错误:', err);
  });

// 方法2: 转换Markdown为HTML内容
markdownToHtml(markdownContent)
  .then(htmlContent => {
    // 将HTML内容保存为文件
    fs.writeFileSync('output.html', htmlContent);
    console.log('HTML文件已生成: output.html');
  })
  .catch(err => {
    console.error('转换过程中发生错误:', err);
  });

// 方法3: 同时获取Word文档Buffer和HTML内容
markdownToAll(markdownContent)
  .then(result => {
    const { docxBuffer, htmlContent } = result;
    
    // 将Buffer保存为Word文档
    fs.writeFileSync('output.docx', docxBuffer);
    console.log('Word文档已生成: output.docx');
    
    // 将HTML内容保存为文件
    fs.writeFileSync('output.html', htmlContent);
    console.log('HTML文件已生成: output.html');
  })
  .catch(err => {
    console.error('转换过程中发生错误:', err);
  });
```

### 自定义Word文档选项

```javascript
import { markdownToDocx } from 'md-to-cn-word';
import fs from 'fs';

const markdownContent = `# 自定义样式的文档`;

// 自定义Word文档选项
const options = {
  docxOptions: {
    title: '自定义文档标题',
    margin: {
      top: 1440,      // 上边距 1 英寸 (1440 缇)
      right: 1440,    // 右边距 1 英寸
      bottom: 1440,   // 下边距 1 英寸
      left: 1440,     // 左边距 1 英寸
    },
    font: 'SimSun',   // 宋体
    fontSize: 24,     // 字体大小
    pageNumber: true, // 是否显示页码
  }
};

markdownToDocx(markdownContent, options)
  .then(docxBuffer => {
    fs.writeFileSync('custom.docx', docxBuffer);
    console.log('自定义Word文档已生成: custom.docx');
  })
  .catch(err => {
    console.error('转换过程中发生错误:', err);
  });
```

## API参考

### markdownToHtml(markdownContent)

将Markdown内容转换为HTML。

**参数:**
- `markdownContent` (string): Markdown内容

**返回值:**
- Promise<string>: 返回HTML内容

### markdownToDocx(markdownContent, options)

将Markdown内容转换为Word文档Buffer。

**参数:**
- `markdownContent` (string): Markdown内容
- `options` (object, 可选): 转换选项
  - `docxOptions` (object, 可选): Word文档的配置选项

**返回值:**
- Promise<Buffer>: 返回Word文档的Buffer

### markdownToAll(markdownContent, options)

将Markdown内容同时转换为HTML和Word文档Buffer。

**参数:**
- `markdownContent` (string): Markdown内容
- `options` (object, 可选): 转换选项
  - `docxOptions` (object, 可选): Word文档的配置选项

**返回值:**
- Promise<{docxBuffer: Buffer, htmlContent: string}>: 返回包含Word文档Buffer和HTML内容的对象

## 许可证

LGPL-3.0-or-later
