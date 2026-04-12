# claw-setup

OpenClaw Docker Quick Setup

## 快速开始

```bash
cp .env.example .env
# 编辑 .env 填入 API_KEY
docker compose up -d
docker compose exec claw bash
openclaw tui
```

## 配置

```env
# 必需，模型服务 API Key
API_KEY=

# API 基础地址
# 默认值: https://openrouter.ai/api/v1
BASE_URL=https://openrouter.ai/api/v1

# 模型名称，多个用逗号分隔
# 默认值: openrouter/free
MODELS=openrouter/free

# 可选，Agent 默认工作目录
# 默认值: ~/.openclaw/workspace
WORKSPACE=~/.openclaw/workspace

# 可选，固定 Gateway Token；未提供时首次自动生成
# 默认值: 首次自动生成
# GATEWAY_TOKEN=

# 可选，Telegram Bot Token
# TELEGRAM_BOT_TOKEN=
```

---

## 步骤

1. Install bun
2. Install n via bun
3. Install node via n
4. Install openclaw via npm
5. Add model, e.g. Kimi, Minimax
6. Setup IM, e.g. Telegram, Weixin
7. Test

环境变量

```sh
export N_PREFIX="$HOME/.n"
export PATH="$N_PREFIX/bin:$PATH"
```

OpenClaw 微信插件

```bash
bunx @tencent-weixin/openclaw-weixin-cli install
```