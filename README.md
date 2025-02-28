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

### 在Node.js中使用

```javascript
import { markdownToDocx, markdownToHtml } from 'md-to-cn-word';
import fs from 'fs';

const markdownContent = fs.readFileSync('input.md', 'utf-8');

// 方法1: 转换Markdown为Word文档
markdownToDocx(markdownContent, 'output.docx', { generateHtml: true })
  .then(result => {
    console.log('Word文档已生成:', 'output.docx');
    
    // 获取HTML内容
    const { htmlContent } = result;
    console.log('HTML内容长度:', htmlContent.length);
  })
  .catch(err => {
    console.error('转换过程中发生错误:', err);
  });

// 方法2: 只转换Markdown为HTML
markdownToHtml(markdownContent)
  .then(htmlContent => {
    console.log('HTML内容长度:', htmlContent.length);
    
    // 可以对HTML内容进行进一步处理
    // 例如，发送到前端、保存到数据库等
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

### 在浏览器中使用


#### 在您自己的扩展项目中使用

##### 方法一：作为依赖引入（推荐）

1. 在您的扩展项目中安装依赖：

```bash
# 使用npm
npm install md-to-cn-word --save

# 或使用yarn
yarn add md-to-cn-word

# 或使用pnpm
pnpm add md-to-cn-word
```

2. 构建扩展版本并复制到您的扩展目录：

```bash
# 在node_modules/md-to-cn-word目录下构建
cd node_modules/md-to-cn-word
npm run build:extension

# 复制构建好的文件到您的扩展目录
mkdir -p ../../extension/lib
cp dist/md-to-cn-word.extension.min.js ../../extension/lib/
```

3. 在您的扩展的manifest.json中声明为web accessible resource：

```json
"web_accessible_resources": [
  {
    "resources": ["lib/md-to-cn-word.extension.min.js"],
    "matches": ["<all_urls>"]
  }
]
```

4. 在您的扩展的JavaScript文件中导入和使用：

```javascript
// 方法1：使用import导入（推荐）
import mdToCnWord from './lib/md-to-cn-word.extension.min.js';

// 方法2：动态导入
const src = chrome.runtime.getURL('lib/md-to-cn-word.extension.min.js');
const module = await import(src);
const mdToCnWord = module.default;

// 使用便捷方法
// 1. 转换为HTML
const htmlContent = await mdToCnWord.convertToHtml(markdownContent);

// 2. 转换为Word并下载
await mdToCnWord.convertToDocxAndDownload(markdownContent, 'document.docx');

// 3. 渲染到DOM元素
await mdToCnWord.renderMarkdown(markdownContent, '#preview');
```


在浏览器扩展中使用时：
- 不支持文件系统操作，因此`outputPath`参数将被忽略
- 返回的`docxBuffer`是一个ArrayBuffer，可以用于创建Blob对象并提供下载
- 使用扩展版本提供的便捷方法可以简化常见操作
- 对于需要频繁转换的场景，考虑使用Web Worker以避免阻塞UI线程
- 如果您的扩展需要处理大量Markdown，建议在后台脚本中进行处理
- 注意跨域资源访问限制，特别是在内容脚本中使用时

markdownToDocx函数返回一个Promise，解析为包含以下属性的对象：
- `docxBuffer`: Word文档的Buffer（在浏览器中是ArrayBuffer）
- `htmlContent`: 生成的HTML内容字符串

markdownToHtml函数返回一个Promise，解析为HTML内容字符串。
