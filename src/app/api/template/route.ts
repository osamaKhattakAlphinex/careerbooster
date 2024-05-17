import { NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
import puppeteerDev from "puppeteer";
import chromium from "@sparticuz/chromium-min";
export const maxDuration = 300; // This function can run for a maximum of 5 minutes
export const dynamic = "force-dynamic";

export async function POST(req: any) {
  // try {
  const { html } = await req.json();
  let browser: any;
  let pdf: any;
  if (process.env.NEXT_APP_STATE === "Development") {
    browser = await puppeteerDev.launch();
  } else {
    browser = await puppeteer.launch({
      args: [...chromium.args, '--hide-scrollbars', '--disable-web-security'],
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(
        `https://github.com/Sparticuz/chromium/releases/download/v111.0.0/chromium-v111.0.0-pack.tar`
      ),
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });
  }
  if (browser && browser.isConnected()) {
    const page = await browser.newPage();

    const widthInPixels = Math.floor(3.5 * 96);
    const heightInPixels = Math.floor(2 * 96);

    await page.setViewport({
      width: widthInPixels,
      height: heightInPixels,
    });
    await page.setContent(html);
    pdf = await page.pdf({
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
    if (pdf && browser !== null) {
      await browser.close();
    }
    return NextResponse.json({ result: pdf, success: true }, { status: 200 });
  }

  // } catch (error) {
  //   return NextResponse.json(
  //     { result: "Error Occurred", success: false },
  //     { status: 500 }
  //   );
  // }
}
