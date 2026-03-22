# claw-setup

OpenClaw Docker 部署环境，预配置 **OpenRouter** 及其免费模型。

## 快速开始

```bash
# 1. 配置
cp .env.example .env
# 编辑 .env 填入 OPENROUTER_API_KEY
# 默认已配置 OpenRouter 免费模型，可修改 MODELS 使用其他模型

# 2. 启动
docker compose up -d

# 3. 使用
docker compose exec claw bash
openclaw tui
```

## 环境变量

### 核心配置

| 变量 | 说明 | 默认值 |
|------|------|--------|
| `OPENROUTER_API_KEY` | **必需**，OpenRouter API Key | - |
| `BASE_URL` | API 基础地址 | `https://openrouter.ai/api/v1` |
| `MODELS` | 模型名称，多个用逗号分隔 | `openrouter/free` |

### 可选渠道

| 渠道 | 环境变量 |
|------|---------|
| 飞书 | `FEISHU_APP_ID` + `FEISHU_APP_SECRET` |
| Telegram | `TELEGRAM_BOT_TOKEN` |

### 示例

```bash
# 基础配置（必需）
OPENROUTER_API_KEY=sk-or-xxx...

# 使用 OpenRouter 免费模型（默认）
MODELS="openrouter/free"

# 自定义 API 端点
BASE_URL="https://api.openai.com/v1"
MODELS="gpt-4o,gpt-4o-mini"

# 多模型配置（逗号分隔）
MODELS="stepfun/step-3.5-flash:free,arcee-ai/trinity-large-preview:free "

# 渠道配置
FEISHU_APP_ID=cli_xxx...
FEISHU_APP_SECRET=xxx...
TELEGRAM_BOT_TOKEN=123456:ABC...
```

## 文件说明

- `compose.yml` - Docker 配置
- `claw.sh` - 容器启动脚本
- `init-config.ts` - OpenClaw 初始化
- `.env` - 环境变量（gitignore）
- `.env.example` - 环境变量示例
- `.openclaw/` - 配置数据（gitignore）

## 重置

```bash
docker compose down
rm -rf .openclaw
```
