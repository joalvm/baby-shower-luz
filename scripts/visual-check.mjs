import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { spawn } from "node:child_process";

const outDir = "tmp/visual-check";
const shouldStartServer = process.env.VISUAL_START_SERVER === "1";
const serverPort = process.env.VISUAL_PORT ?? "3002";
const url =
  process.env.VISUAL_URL ??
  (shouldStartServer ? `http://127.0.0.1:${serverPort}` : "http://127.0.0.1:3000");

let server;

async function waitForServer(targetUrl) {
  const deadline = Date.now() + 45000;
  let lastError;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(targetUrl);
      if (response.ok) return;
      lastError = new Error(`HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
    }
    await new Promise((resolve) => setTimeout(resolve, 600));
  }

  throw lastError ?? new Error("Server did not respond");
}

await mkdir(outDir, { recursive: true });

if (shouldStartServer) {
  const command = process.platform === "win32" ? "cmd.exe" : "npm";
  const args =
    process.platform === "win32"
      ? ["/c", "npm", "run", "start", "--", "--hostname", "127.0.0.1", "--port", serverPort]
      : ["run", "start", "--", "--hostname", "127.0.0.1", "--port", serverPort];

  server = spawn(command, args, {
    cwd: process.cwd(),
    env: { ...process.env, PORT: serverPort },
    stdio: "ignore",
    shell: false,
  });
  await waitForServer(url);
}

const browser = await chromium.launch();

async function capture(name, viewport, options = {}) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForLoadState("load", { timeout: 30000 }).catch(() => undefined);

  if (options.openLetter) {
    await page.getByRole("button", { name: "Abrir carta" }).click();
    await page.waitForTimeout(1200);
  }

  if (typeof options.scrollY === "number") {
    await page.evaluate((y) => window.scrollTo(0, y), options.scrollY);
    await page.waitForTimeout(1300);
  }

  await page.screenshot({ path: `${outDir}/${name}.png`, fullPage: false });

  const metrics = await page.evaluate(() => {
    const ignored = [
      "single-watercolor-bg",
      "cloud-svg",
      "tree-svg",
      "butterfly-svg",
      "garden-svg",
      "flower-bundle",
      "fairy-svg",
    ];
    const overflowing = [...document.querySelectorAll("body *")]
      .filter((el) => {
        const className = String(el.getAttribute("class") ?? "");
        if (ignored.some((item) => className.includes(item))) return false;
        if (ignored.some((item) => el.closest(`.${item}`))) return false;
        const rect = el.getBoundingClientRect();
        return rect.right > window.innerWidth + 2 || rect.left < -2;
      })
      .slice(0, 12)
      .map((el) => ({
        tag: el.tagName,
        className: String(el.getAttribute("class") ?? ""),
        left: Math.round(el.getBoundingClientRect().left),
        right: Math.round(el.getBoundingClientRect().right),
      }));

    return {
      scrollHeight: document.documentElement.scrollHeight,
      viewport: { width: window.innerWidth, height: window.innerHeight },
      overflowing,
      title: document.title,
    };
  });

  await page.close();
  return { name, ...metrics };
}

const desktop = { width: 1440, height: 950 };
const tablet = { width: 820, height: 1180 };
const mobile = { width: 390, height: 844 };

const results = [];
results.push(await capture("desktop-letter-closed", desktop));
results.push(await capture("desktop-letter-open", desktop, { openLetter: true }));
results.push(await capture("desktop-intro", desktop, { scrollY: 1250 }));
results.push(await capture("desktop-flower-open", desktop, { scrollY: 2600 }));
results.push(await capture("desktop-details", desktop, { scrollY: 5000 }));
results.push(await capture("desktop-final", desktop, { scrollY: 6500 }));
results.push(await capture("tablet-letter", tablet));
results.push(await capture("mobile-letter", mobile));
results.push(await capture("mobile-flower-open", mobile, { scrollY: 2300 }));

await browser.close();
if (server) server.kill();

console.log(JSON.stringify(results, null, 2));
