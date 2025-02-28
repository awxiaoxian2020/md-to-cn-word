# md-to-cn-word

一个将Markdown文件转换为符合中国大陆地区惯用的初始风格的Word文档的工具。

## 特点

- 将Markdown转换为Word文档（.docx格式）
- 自动调整格式以符合中国大陆地区惯用的初始风格：  

  - 将无序列表转换为有序列表
  - 使用宋体作为默认字体
  - 标题转换为加粗文本
  - 避免出现空行

## 安装

### 全局安装

```bash
npm install -g md-to-cn-word
# 或者使用pnpm
pnpm add -g md-to-cn-word
```

### 本地安装

```bash
git clone https://github.com/awxiaoxian2020/md-to-cn-word.git
cd md-to-cn-word
pnpm install
```

## 使用方法

### 命令行使用

```bash
md-to-cn-word input.md [output.docx] [--html] [--only-html]
```

参数说明：
- `input.md`：必需，输入的Markdown文件路径
- `output.docx`：可选，输出的文件路径。如果不指定，将使用输入文件名（更改扩展名为.docx或.html，取决于选项）
- `--html`：可选，生成HTML文件用于调试。如果指定此选项，将生成一个与输出的docx文件同名但扩展名为.html的文件
- `--only-html`：可选，只生成HTML文件，不生成Word文档。如果指定此选项，输出文件的扩展名默认为.html

示例：
```bash
# 基本用法
md-to-cn-word input.md

# 指定输出文件
md-to-cn-word input.md output.docx

# 同时生成HTML文件
md-to-cn-word input.md --html

# 指定输出文件并生成HTML
md-to-cn-word input.md output.docx --html

# 只生成HTML文件
md-to-cn-word input.md --only-html

# 指定HTML输出文件
md-to-cn-word input.md output.html --only-html
```

### 作为模块使用

```javascript
import { markdownToDocx, markdownToHtml } from 'md-to-cn-word';
import fs from 'fs';

const markdownContent = fs.readFileSync('input.md', 'utf-8');

// 方法1: 转换Markdown为Word文档
markdownToDocx(markdownContent, 'output.docx', { generateHtml: true })
  .then(result => {
    console.log('Word文档已生成:', 'output.docx');
  })
  .catch(err => {
    console.error('转换过程中发生错误:', err);
  });

// 方法2: 只转换Markdown为 HTML
markdownToHtml(markdownContent)
  .then(htmlContent => {
    console.log('HTML内容长度:', htmlContent.length);
    

  })
  .catch(err => {
    console.error('转换过程中发生错误:', err);
  });

// 方法3: 转换Markdown为HTML并保存到文件
markdownToHtml(markdownContent, 'output.html')
  .then(htmlContent => {
    console.log('HTML文件已生成:', 'output.html');
  })
  .catch(err => {
    console.error('转换过程中发生错误:', err);
  });
```

markdownToDocx函数返回一个Promise，解析为包含以下属性的对象：
- `docxBuffer`: Word文档的Buffer
- `htmlContent`: 生成的HTML内容字符串

markdownToHtml函数返回一个Promise，解析为HTML内容字符串。
