import { NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
import puppeteerDev from "puppeteer";
import chromium from "@sparticuz/chromium";
export async function POST(req: any) {
  try {
    const data = await req.json();
    const html = data.htmlToDoc;
    // console.log(html);
    let browser;
    chromium.setGraphicsMode = false;

    if (process.env.NEXT_APP_STATE === "Development") {
      browser = await puppeteerDev.launch();
    } else {
      browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
        ignoreHTTPSErrors: true,
      });
    }

    const page = await browser.newPage();

    const widthInPixels = Math.floor(3.5 * 96);
    const heightInPixels = Math.floor(2 * 96);

    const htmlContent = html;
    await page.setViewport({
      width: widthInPixels,
      height: heightInPixels,
    });
    await page.setContent(htmlContent);
    const pdf = await page.pdf({
      printBackground: true,
      width: "8.27in",
      height: "11.69in",
      margin: {
        top: "0.5cm",
        bottom: "0.5cm",
      },
      preferCSSPageSize: true,
    });
    await browser.close();
    return NextResponse.json({ result: pdf, success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { result: "Error Occurred", success: false },
      { status: 500 }
    );
  }
}
