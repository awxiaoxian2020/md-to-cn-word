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
md-to-cn-word input.md [output.docx] [--html]
```

参数说明：
- `input.md`：必需，输入的Markdown文件路径
- `output.docx`：可选，输出的Word文档路径。如果不指定，将使用输入文件名（更改扩展名为.docx）
- `--html`：可选，生成HTML文件用于调试。如果指定此选项，将生成一个与输出的docx文件同名但扩展名为.html的文件

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
```

### 作为模块使用

```javascript
import { markdownToDocx } from 'md-to-cn-word';

const markdownContent = '# 标题\n\n这是一个段落。';
const outputPath = 'output.docx';
const options = {
  generateHtml: false // 设置为true可生成HTML文件用于调试
};

markdownToDocx(markdownContent, outputPath, options)
  .then(() => {
    console.log('转换完成!');
  })
  .catch(err => {
    console.error('转换失败:', err);
  });
```
