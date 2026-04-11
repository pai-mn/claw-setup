# claw-setup

OpenClaw Docker 部署环境。

## 快速开始

```bash
cp .env.example .env
# 编辑 .env 填入 API_KEY
docker compose up -d
docker compose exec claw bash
openclaw tui
```

如需安装 OpenClaw 微信插件，可额外执行：

```bash
bunx @tencent-weixin/openclaw-weixin-cli install
```

## 配置

| 变量 | 说明 | 默认值 |
|------|------|--------|
| `API_KEY` | 必需，模型服务 API Key | 必填 |
| `BASE_URL` | API 基础地址 | `https://openrouter.ai/api/v1` |
| `MODELS` | 模型名称，多个用逗号分隔 | `openrouter/free` |
| `WORKSPACE` | 可选，Agent 默认工作目录 | `~/.openclaw/workspace` |
| `GATEWAY_TOKEN` | 可选，固定 Gateway Token；未提供时首次自动生成 | 首次自动生成 |
| `TELEGRAM_BOT_TOKEN` | 可选，Telegram Bot Token | 未设置 |
