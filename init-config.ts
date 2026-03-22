#!/usr/bin/env bun
import "zx/globals";

$.verbose = false;

console.log("🚀 OpenClaw 初始化\n");

// 必需配置
const url = "https://openrouter.ai/api/v1";
const model = "openrouter/free";
const key = process.env.OPENROUTER_API_KEY;

if (!key) {
  console.error("❌ 错误: 环境变量 OPENROUTER_API_KEY 未设置");
  process.exit(1);
}

console.log(`BASE_URL: ${url}`);
console.log(`模型: ${model}`);
console.log(`API Key: ${key.slice(0, 8)}...\n`);

// 检查可选配置
const feishuAppId = process.env.FEISHU_APP_ID;
const feishuSecret = process.env.FEISHU_APP_SECRET;
const tgToken = process.env.TELEGRAM_BOT_TOKEN;

console.log("⚙️  配置中...\n");

const set = async (path: string, val: unknown) => {
  await $`openclaw config set ${path} ${JSON.stringify(val)}`;
};

// 基础配置
await set("models.providers.custom", {
  api: "openai-completions",
  baseUrl: url,
  apiKey: key,
  models: [{ id: model, name: model }],
});

await set("agents.defaults.models", { [`custom/${model}`]: {} });
await set("gateway.mode", "local");

// 飞书
if (feishuAppId && feishuSecret) {
  console.log("📱 配置飞书...");
  await set("channels.feishu", {
    enabled: true,
    appId: feishuAppId,
    appSecret: { source: "env", id: "FEISHU_APP_SECRET" },
  });
  console.log("   ✅ 完成");
}

// Telegram
if (tgToken) {
  console.log("📱 配置 Telegram...");
  await set("channels.telegram", {
    enabled: true,
    botToken: { source: "env", id: "TELEGRAM_BOT_TOKEN" },
  });
  console.log("   ✅ 完成");
}

// 验证
await $`openclaw config validate`;
console.log("\n✅ 完成! 运行: openclaw gateway run");
