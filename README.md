# claw-setup

OpenClaw Docker 部署环境，预配置 OpenRouter。

## 使用

```bash
# 1. 配置 API Key
echo "OPENROUTER_API_KEY=sk-or-xxx..." > .env

# 2. 启动
docker compose up -d

# 3. 进入容器
docker compose exec claw bash
openclaw tui
```

## 文件说明

- `compose.yml` - Docker 配置
- `claw.sh` - 容器启动脚本
- `init-config.ts` - OpenClaw 初始化
- `.env` - API Key（已 gitignore）
- `.openclaw/` - 配置数据（已 gitignore）

## 重置

```bash
docker compose down
rm -rf .openclaw
```
