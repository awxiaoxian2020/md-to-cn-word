#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { markdownToDocx, markdownToHtml } from './converter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 解析命令行参数
const args = process.argv.slice(2);
let generateHtml = false;
let onlyHtml = false;

// 检查是否有--html选项
const htmlFlagIndex = args.findIndex(arg => arg === '--html');
if (htmlFlagIndex !== -1) {
  generateHtml = true;
  // 从参数列表中移除--html标志
  args.splice(htmlFlagIndex, 1);
}

// 检查是否有--only-html选项
const onlyHtmlFlagIndex = args.findIndex(arg => arg === '--only-html');
if (onlyHtmlFlagIndex !== -1) {
  onlyHtml = true;
  // 从参数列表中移除--only-html标志
  args.splice(onlyHtmlFlagIndex, 1);
}

if (args.length < 1) {
  console.log('\n使用方法: md-to-cn-word <markdown文件路径> [输出文件路径] [选项]\n');
  console.log('选项:');
  console.log('  --html       生成HTML文件（用于调试）');
  console.log('  --only-html  只生成HTML文件，不生成Word文档\n');
  console.log('示例:');
  console.log('  md-to-cn-word input.md');
  console.log('  md-to-cn-word input.md output.docx');
  console.log('  md-to-cn-word input.md --html');
  console.log('  md-to-cn-word input.md output.docx --html');
  console.log('  md-to-cn-word input.md --only-html');
  console.log('  md-to-cn-word input.md output.html --only-html\n');
  process.exit(1);
}

const inputFile = args[0];
// 根据选项确定输出文件的扩展名
const defaultExtension = onlyHtml ? '.html' : '.docx';
// 如果没有指定输出文件，则使用输入文件名（更改扩展名）
const outputFile = args[1] || path.join(
  path.dirname(inputFile),
  `${path.basename(inputFile, path.extname(inputFile))}${defaultExtension}`
);

// 检查输入文件是否存在
if (!fs.existsSync(inputFile)) {
  console.error(`错误: 找不到文件 "${inputFile}"`);
  process.exit(1);
}

// 读取Markdown文件
const markdownContent = fs.readFileSync(inputFile, 'utf-8');

// 根据选项决定转换方式
if (onlyHtml) {
  console.log(`\n正在将 "${inputFile}" 转换为HTML: "${outputFile}"...`);
  
  markdownToHtml(markdownContent, outputFile)
    .then(htmlContent => {
      console.log(`\n✅ 转换完成!`);
      console.log(`🌐 HTML文件已保存为: "${outputFile}"`);
      console.log('\n感谢使用md-to-cn-word工具！');
    })
    .catch(err => {
      console.error('\n❌ 转换过程中发生错误:', err);
      process.exit(1);
    });
} else {
  // 转换并保存为docx
  console.log(`\n正在将 "${inputFile}" 转换为 "${outputFile}"...`);
  if (generateHtml) {
    console.log('转换过程中会同时生成HTML文件，方便查看中间结果。');
  }

  markdownToDocx(markdownContent, outputFile, { generateHtml })
    .then(result => {
      console.log(`\n✅ 转换完成!`);
      console.log(`📄 Word文档已保存为: "${outputFile}"`);
      if (generateHtml) {
        console.log(`🌐 HTML文件已保存为: "${outputFile.replace(/\.docx$/i, '.html')}"`);
      }
      console.log('\n感谢使用md-to-cn-word工具！');
    })
    .catch(err => {
      console.error('\n❌ 转换过程中发生错误:', err);
      process.exit(1);
    });
} 