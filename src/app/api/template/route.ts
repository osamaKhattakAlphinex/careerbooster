import { NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
import puppeteerDev from "puppeteer";
import chromium from "@sparticuz/chromium";
export async function POST(req: any) {
  // try {
  const data = await req.json();
  const html = data.htmlToDoc;
  let browser: any;
  let pdf: any;
  try {
    if (process.env.NEXT_APP_STATE === "Development") {
      browser = await puppeteerDev.launch();
    } else {
      browser = await puppeteer.launch({
        ignoreDefaultArgs: [
          "--disable-extensions",
          "--single-process",
          "--disable-features=AudioServiceOutOfProcess",
        ],
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
        ignoreHTTPSErrors: true,
      });
    }
    if (browser && browser.isConnected()) {
      const page = await browser.newPage();

      const widthInPixels = Math.floor(3.5 * 96);
      const heightInPixels = Math.floor(2 * 96);

      const htmlContent = html;
      await page.setViewport({
        width: widthInPixels,
        height: heightInPixels,
      });
      await page.setContent(htmlContent);
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
    }
  } catch (error) {
    console.log(error);
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }
  return NextResponse.json({ result: pdf, success: true }, { status: 200 });
  // } catch (error) {
  //   return NextResponse.json(
  //     { result: "Error Occurred", success: false },
  //     { status: 500 }
  //   );
  // }
}
