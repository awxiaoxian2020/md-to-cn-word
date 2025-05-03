import fs from 'fs';
import { markdownToDocx, markdownToHtml, markdownToAll } from '../src/module.js';

// 测试用的Markdown内容
const markdownContent = `
# 测试标题

这是一段测试文本。

## 二级标题

- 列表项1
- 列表项2
- 列表项3

### 三级标题

1. 有序列表项1
2. 有序列表项2

**加粗文本** *斜体文本*

> 引用文本

\`\`\`javascript
// 代码块
console.log('Hello, World!');
\`\`\`

---

[链接文本](https://example.com)

![图片描述](https://example.com/image.png)
`;

// 测试函数
async function runTests() {
  console.log('开始测试...');
  
  try {
    // 测试 markdownToHtml
    console.log('测试 markdownToHtml...');
    const htmlContent = await markdownToHtml(markdownContent);
    fs.writeFileSync('test/output.html', htmlContent);
    console.log('✅ markdownToHtml 测试通过');
    
    // 测试 markdownToDocx
    console.log('测试 markdownToDocx...');
    const docxBuffer = await markdownToDocx(markdownContent);
    fs.writeFileSync('test/output.docx', docxBuffer);
    console.log('✅ markdownToDocx 测试通过');
    
    // 测试 markdownToAll
    console.log('测试 markdownToAll...');
    const { docxBuffer: allDocxBuffer, htmlContent: allHtmlContent } = await markdownToAll(markdownContent);
    fs.writeFileSync('test/output_all.docx', allDocxBuffer);
    fs.writeFileSync('test/output_all.html', allHtmlContent);
    console.log('✅ markdownToAll 测试通过');
    
    // 测试自定义选项
    console.log('测试自定义选项...');
    const options = {
      docxOptions: {
        title: '测试文档',
        margin: {
          top: 1440,
          right: 1440,
          bottom: 1440,
          left: 1440,
        },
        font: 'SimSun',
        fontSize: 24,
        pageNumber: true,
      }
    };
    const customDocxBuffer = await markdownToDocx(markdownContent, options);
    fs.writeFileSync('test/output_custom.docx', customDocxBuffer);
    console.log('✅ 自定义选项测试通过');
    
    console.log('所有测试通过！');
  } catch (error) {
    console.error('❌ 测试失败:', error);
    process.exit(1);
  }
}

// 运行测试
runTests(); 