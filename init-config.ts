#!/usr/bin/env bun
import "zx/globals";

$.verbose = false;

console.log("🚀 OpenClaw 初始化\n");

// 配置
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

console.log("⚙️  配置中...\n");

// 配置
const set = async (path: string, val: unknown) => {
  await $`openclaw config set ${path} ${JSON.stringify(val)}`;
};

await set("models.providers.custom", {
  api: "openai-completions",
  baseUrl: url,
  apiKey: key,
  models: [{ id: model, name: model }],
});

await set("agents.defaults.models", { [`custom/${model}`]: {} });
await set("gateway.mode", "local");

// 验证
await $`openclaw config validate`;
console.log("\n✅ 完成! 运行: openclaw gateway run");
