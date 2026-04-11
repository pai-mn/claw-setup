#!/usr/bin/env bun
/// <reference types="bun" />
/// <reference types="node" />
import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";

console.log("🚀 OpenClaw 初始化\n");

type ExistingConfig = {
  gateway?: {
    auth?: {
      token?: unknown;
    };
  };
  agents?: {
    defaults?: {
      workspace?: unknown;
    };
  };
};

const homeDir = process.env.OPENCLAW_HOME?.trim() || process.env.HOME || ".";
const stateDir = process.env.OPENCLAW_STATE_DIR?.trim();
const configPath = (() => {
  const explicit = process.env.OPENCLAW_CONFIG_PATH?.trim();
  if (explicit) {
    if (explicit === "~" || explicit.startsWith("~/")) {
      return path.join(homeDir, explicit.slice(2));
    }
    return explicit;
  }
  if (stateDir) {
    return path.join(stateDir, "openclaw.json");
  }
  return path.join(homeDir, ".openclaw", "openclaw.json");
})();

const readExistingConfig = async (): Promise<ExistingConfig> => {
  try {
    return JSON.parse(await fs.readFile(configPath, "utf8")) as ExistingConfig;
  } catch {
    return {};
  }
};

const expandHome = (value: string): string =>
  value === "~" || value.startsWith("~/") ? path.join(homeDir, value.slice(2)) : value;

const existingConfig = await readExistingConfig();
const existingGatewayToken =
  typeof existingConfig.gateway?.auth?.token === "string" && existingConfig.gateway.auth.token.trim()
    ? existingConfig.gateway.auth.token.trim()
    : undefined;
const existingWorkspace =
  typeof existingConfig.agents?.defaults?.workspace === "string" &&
  existingConfig.agents.defaults.workspace.trim()
    ? existingConfig.agents.defaults.workspace.trim()
    : undefined;

// 必需配置
const url = process.env.BASE_URL || "https://openrouter.ai/api/v1";
const modelsEnv = process.env.MODELS || "openrouter/free";
const models = modelsEnv.split(",").map(m => m.trim()).filter(Boolean);
const apiKey = process.env.API_KEY;
const gatewayToken =
  process.env.GATEWAY_TOKEN?.trim() || existingGatewayToken || crypto.randomBytes(24).toString("hex");
const workspace = expandHome(
  process.env.WORKSPACE?.trim() || existingWorkspace || path.join(homeDir, ".openclaw", "workspace"),
);

if (!apiKey) {
  console.error("❌ 错误: 环境变量 API_KEY 未设置");
  process.exit(1);
}

console.log(`BASE_URL: ${url}`);
console.log(`模型: ${models.join(", ")}`);
console.log(`API Key: ${apiKey.slice(0, 8)}...\n`);
console.log(`Workspace: ${workspace}`);
console.log(`Gateway Token: ${gatewayToken.slice(0, 8)}...\n`);

// 检查可选配置
const tgToken = process.env.TELEGRAM_BOT_TOKEN;

console.log("⚙️  配置中...\n");

const set = async (path: string, val: unknown) => {
  await Bun.$`openclaw config set ${path} ${JSON.stringify(val)}`.quiet();
};

// 基础配置
await set("models.providers.custom", {
  api: "openai-completions",
  baseUrl: url,
  apiKey,
  models: models.map(m => ({ id: m, name: m })),
});

const defaultModels: Record<string, {}> = {};
for (const m of models) {
  defaultModels[`custom/${m}`] = {};
}
await set("agents.defaults.models", defaultModels);
await set("agents.defaults.workspace", workspace);
await set("gateway.mode", "local");
await set("gateway.auth.mode", "token");
await set("gateway.auth.token", gatewayToken);

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
await Bun.$`openclaw config validate`.quiet();
console.log("\n✅ 完成! 运行: openclaw gateway run");
