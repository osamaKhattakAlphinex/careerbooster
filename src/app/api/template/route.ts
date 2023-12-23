import { NextResponse } from "next/server";
import chromium from "chrome-aws-lambda";
export async function POST(req: any) {
  try {
    const formData = await req.formData();

    const html = formData.get("htmlToDoc");

    const browser = await chromium.puppeteer.launch({
      args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: true,
      ignoreHTTPSErrors: true,
    });
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
        top: "1cm",
        bottom: "1cm",
        right: "0.5cm",
        left: "0.5cm",
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
