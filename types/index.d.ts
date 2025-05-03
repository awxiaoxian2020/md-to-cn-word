/**
 * md-to-cn-word 类型定义文件
 */

/**
 * 文档选项接口
 */
export interface DocxOptions {
  /**
   * 文档标题
   */
  title?: string;
  /**
   * 文档边距
   */
  margin?: {
    /**
     * 上边距（缇）
     */
    top?: number;
    /**
     * 右边距（缇）
     */
    right?: number;
    /**
     * 下边距（缇）
     */
    bottom?: number;
    /**
     * 左边距（缇）
     */
    left?: number;
  };
  /**
   * 字体
   */
  font?: string;
  /**
   * 字号（磅）
   */
  fontSize?: number;
  /**
   * 是否添加页码
   */
  pageNumber?: boolean;
}

/**
 * 转换选项接口
 */
export interface ConversionOptions {
  /**
   * Word文档选项
   */
  docxOptions?: DocxOptions;
}

/**
 * 转换结果接口
 */
export interface ConversionResult {
  /**
   * Word文档缓冲区
   */
  docxBuffer: Buffer;
  /**
   * HTML内容
   */
  htmlContent: string;
}

/**
 * 将Markdown内容转换为符合中国大陆地区惯用的初始风格的HTML
 * @param markdownContent - Markdown内容
 * @returns 返回HTML内容
 */
export function markdownToHtml(markdownContent: string): Promise<string>;

/**
 * 将Markdown内容转换为符合中国大陆地区惯用的初始风格的Word文档
 * @param markdownContent - Markdown内容
 * @param options - 转换选项
 * @returns 返回docx缓冲区
 */
export function markdownToDocx(markdownContent: string, options?: ConversionOptions): Promise<Buffer>;

/**
 * 将Markdown内容转换为HTML和Word文档
 * @param markdownContent - Markdown内容
 * @param options - 转换选项
 * @returns 返回docx缓冲区和HTML内容
 */
export function markdownToAll(markdownContent: string, options?: ConversionOptions): Promise<ConversionResult>; 