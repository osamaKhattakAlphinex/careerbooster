import { NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
import puppeteerDev from "puppeteer";
import chromium from "@sparticuz/chromium-min";
export const maxDuration = 300; // This function can run for a maximum of 5 minutes
export const dynamic = "force-dynamic";
async function getBrowser() {
  if (process.env.NEXT_APP_STATE === "Development") {
    return puppeteerDev.launch();
  } else {
    return puppeteer.launch({
      args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(
        `https://github.com/Sparticuz/chromium/releases/download/v111.0.1/chromium-v111.0.1-pack.tar`
      ),
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });
  }
}

async function getPage() {
  let _page: any;
  if (_page) return _page;

  const browser = await getBrowser();
  _page = await browser.newPage();
  return _page;
}
export async function POST(req: any) {
  try {
    const { html } = await req.json();

    const page = await getPage();

    const widthInPixels = Math.floor(3.5 * 96);
    const heightInPixels = Math.floor(2 * 96);

    await page.setViewport({
      width: widthInPixels,
      height: heightInPixels,
    });
    await page.setContent(html);
    const pdf = await page.pdf({
      printBackground: true,
      width: "8.27in",
      height: "11.68in",
      margin: {
        top: "0",
        right: "0",
        bottom: "0",
        left: "0",
      },
      preferCSSPageSize: true,
    });

    return NextResponse.json({ result: pdf, success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { result: "Error Occurred", success: false },
      { status: 500 }
    );
  }
}
