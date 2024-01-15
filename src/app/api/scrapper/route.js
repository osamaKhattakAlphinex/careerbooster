import { NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
import puppeteerDev from "puppeteer";
import chromium from "@sparticuz/chromium";

function isValidLinkedInProfile(url) {
  var linkedinPattern = /^https:\/\/www\.linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/;
  return linkedinPattern.test(url);
}

export async function POST(req) {
  try {
    const { linkedInUrl } = await req.json();

    if (!isValidLinkedInProfile(linkedInUrl)) {
      return NextResponse.json(
        { result: "Invalid LinkedIn profile URL", success: false },
        { status: 400 }
      );
    }

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
      });
    }

    const page = await browser.newPage();

    const userAgent =
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36";
    await page.setUserAgent(userAgent);

    try {
      await page.goto(linkedInUrl, {
        waitUntil: "networkidle0",
        timeout: 100000,
      });

      // Ensure that the selector is present before attempting to access it
      // await page.waitForSelector(".identity-headline");

      // Use evaluate to extract the content of the element
      const headlines = await page.evaluate(() => {
        const headlineElement = document.querySelector(".identity-headline");
        return headlineElement ? headlineElement.textContent?.trim() : null;
      });

      console.log(headlines);

      if (headlines) {
        return NextResponse.json(
          { result: headlines, success: true },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { result: "No headline found", success: false },
          { status: 404 }
        );
      }
    } catch (error) {
      console.error("Error during page navigation:", error);
      return NextResponse.json(
        { result: "Error Occurred", success: false },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return NextResponse.json(
      { result: "Invalid JSON payload", success: false },
      { status: 400 }
    );
  } finally {
    await browser.close();
  }
}
