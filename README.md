# claw-setup

OpenClaw Docker 部署环境，预配置 OpenRouter。

## 快速开始

```bash
# 1. 配置
cp .env.example .env
# 编辑 .env 填入 OPENROUTER_API_KEY

# 2. 启动
docker compose up -d

# 3. 使用
docker compose exec claw bash
openclaw tui
```

## 自动配置

检测到以下环境变量时自动配置：

| 渠道 | 环境变量 |
|------|---------|
| 飞书 | `FEISHU_APP_ID` + `FEISHU_APP_SECRET` |
| Telegram | `TELEGRAM_BOT_TOKEN` |

示例：

```bash
OPENROUTER_API_KEY=sk-or-xxx...
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
