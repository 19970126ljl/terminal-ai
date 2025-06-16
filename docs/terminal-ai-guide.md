# Terminal AI 使用指南

Terminal AI 是一个强大的命令行 AI 助手工具，支持多种 AI 提供商（如 OpenAI、Google Gemini 等）。本文档将详细介绍如何从源码安装、配置和使用 Terminal AI。

## 目录

- [从源码安装](#从源码安装)
- [代理配置](#代理配置)
- [基本配置](#基本配置)
- [基本用法](#基本用法)
- [作为库使用](#作为库使用)
- [常见问题](#常见问题)

## 从源码安装

1. 克隆仓库：
```bash
git clone <repository-url>
cd terminal-ai
```

2. 安装依赖：
```bash
npm install
```

3. 构建项目：
```bash
npm run build
```

4. 全局安装（可选）：
```bash
npm link
```

## 代理配置

Terminal AI 支持通过环境变量配置代理。你可以选择以下任一方式：

1. 在 shell 配置文件中设置（推荐）：
```bash
# 在 ~/.zshrc 或 ~/.bashrc 中添加
export HTTPS_PROXY=http://localhost:7890
export https_proxy=http://localhost:7890
export HTTP_PROXY=http://localhost:7890
export http_proxy=http://localhost:7890
export ALL_PROXY=http://localhost:7890
```

2. 在运行时临时设置：
```bash
HTTPS_PROXY=http://localhost:7890 ai <command>
```

3. 创建环境变量文件：
```bash
# 创建 .env 文件
echo "HTTPS_PROXY=http://localhost:7890" > .env
```

## 基本配置

1. 初始化配置：
```bash
ai init
```
这将引导你完成基本配置：
- 选择 AI 提供商（如 OpenAI、Google Gemini 等）
- 输入 API Key
- 配置模型和其他选项

2. 验证配置：
```bash
ai check
```
这将检查：
- 网络连接
- API Key 有效性
- 模型可用性
- 速率限制

3. 查看当前配置：
```bash
ai config
```

## 基本用法

1. 简单对话：
```bash
ai chat "你好，请介绍一下自己"
```

2. 代码相关：
```bash
# 解释代码
ai code "解释这段代码的作用" < file.js

# 生成代码
ai code "写一个 Python 函数来排序列表"
```

3. 文件处理：
```bash
# 分析文件内容
ai -f file.txt "总结这个文件的主要内容"

# 处理多个文件
ai -f file1.txt -f file2.txt "比较这两个文件的差异"
```

4. 管道操作：
```bash
# 处理命令输出
ls -la | ai "解释这个目录的内容"

# 处理文件内容
cat config.json | ai "检查这个配置文件是否有问题"
```

## 作为库使用

Terminal AI 也可以作为库集成到其他项目中。以下是一个基本示例：

```typescript
import { executeChatPipeline } from 'terminal-ai';
import { ChatPipelineParameters } from 'terminal-ai';

async function useTerminalAI() {
  const parameters: ChatPipelineParameters = {
    executionContext: {
      provider: {
        apiKey: 'your-api-key',
        baseURL: 'https://api.openai.com/v1/',
        model: 'gpt-3.5-turbo'
      },
      config: {
        // 其他配置...
      },
      isTTYstdin: true,
      isTTYstdout: true
    },
    chatContext: {
      messages: []
    }
  };

  try {
    await executeChatPipeline(parameters);
  } catch (error) {
    console.error('Error:', error);
  }
}
```

## 常见问题

1. **代理不生效**
   - 确保环境变量正确设置
   - 检查代理服务器是否正常运行
   - 尝试使用 `ai check` 验证连接

2. **API Key 无效**
   - 运行 `ai init` 重新配置
   - 检查 API Key 是否正确复制
   - 确认账户余额和权限

3. **模型不可用**
   - 使用 `ai check` 检查模型状态
   - 确认你的 API Key 有权限访问该模型
   - 尝试切换到其他可用模型

4. **性能问题**
   - 检查网络连接质量
   - 确认代理服务器性能
   - 考虑使用更快的模型

## 高级配置

1. 自定义提示词：
```yaml
# ~/.ai/config.yaml
prompts:
  chat:
    context:
      - role: system
        content: "你是一个专业的编程助手"
  code:
    output:
      - role: system
        content: "请用简洁的代码回答"
```

2. 多提供商配置：
```yaml
# ~/.ai/config.yaml
provider: gemini
providers:
  gemini:
    baseURL: https://generativelanguage.googleapis.com/v1beta/openai/
    model: models/gemini-2.0-flash
    apiKey: your-gemini-key
    type: gemini_openai
  openai:
    baseURL: https://api.openai.com/v1
    model: gpt-3.5-turbo
    apiKey: your-openai-key
    type: openai
```

## 开发相关

1. 运行测试：
```bash
npm test
```

2. 代码检查：
```bash
npm run lint
```

3. 类型检查：
```bash
npm run type-check
```

## 贡献

欢迎提交 Issue 和 Pull Request 来帮助改进 Terminal AI。在提交 PR 之前，请确保：

1. 代码通过所有测试
2. 通过 lint 检查
3. 通过类型检查
4. 更新相关文档

## 许可证

[许可证信息] 