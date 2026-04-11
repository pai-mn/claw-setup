#!/usr/bin/env bash
set -e

cd "$(dirname "$0")" || exit 1

# 检查 bun 是否已安装（而不是检查 .openclaw 目录）
if [ ! -x "$HOME/.bun/bin/bun" ]; then
  echo "🔧 首次初始化..."
  mkdir -p .openclaw
  
  # 安装 bun
  echo "📥 安装 bun..."
  curl -fsSL https://bun.sh/install | bash
  
  # 写入 .bashrc（供交互式使用）
  echo 'export BUN_INSTALL="$HOME/.bun"' >> ~/.bashrc
  echo 'export PATH="$BUN_INSTALL/bin:$PATH"' >> ~/.bashrc
fi

# 设置 PATH
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"

echo "📍 bun 路径: $(which bun)"

# 如果没装过 openclaw，先执行安装
if ! command -v openclaw &> /dev/null; then
  echo "📦 安装依赖..."
  bun install
  bun add -g openclaw
fi

# 每次启动都同步配置
echo "⚙️  初始化配置..."
bun init-config.ts

echo "🚀 启动 gateway..."
exec openclaw gateway run
