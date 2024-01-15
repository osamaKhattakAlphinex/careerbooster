// import { NextResponse } from "next/server";
// import puppeteer from "puppeteer-core";
// import puppeteerDev from "puppeteer";
// import chromium from "@sparticuz/chromium";

import { NextResponse } from "next/server";

// function isValidLinkedInProfile(url) {
//   var linkedinPattern = /^https:\/\/www\.linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/;
//   return linkedinPattern.test(url);
// }

// export async function POST(req) {
//   try {
//     const { linkedInUrl } = await req.json();


//     if (!isValidLinkedInProfile(linkedInUrl)) {
//       return NextResponse.json(
//         { result: "Invalid LinkedIn profile URL", success: false },
//         { status: 400 }
//       );
//     }

//     let browser;
//     chromium.setGraphicsMode = false;

//     if (process.env.NEXT_APP_STATE === "Development") {
//       browser = await puppeteerDev.launch({ headless: false });
//     } else {
//       browser = await puppeteer.launch({
//         args: chromium.args,
//         defaultViewport: chromium.defaultViewport,
//         executablePath: await chromium.executablePath(),
//         headless: chromium.headless,
//       });
//     }

//     const page = await browser.newPage();

//     console.log("page created", page);

//     // const userAgent =
//     //   "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36";
//     // await page.setUserAgent(userAgent);

//     try {
//       // await page.goto(linkedInUrl, {
//       //   waitUntil: "networkidle0",
//       //   timeout: 100000,
//       // });
//       await page.goto("https://www.linkedin.com/in/m-usama-butt-a9a536196/");
//       console.log("page", page);

//       // Ensure that the selector is present before attempting to access it
//       // await page.waitForSelector(".identity-headline");

//       // Use evaluate to extract the content of the element
//       const headlines = await page.evaluate(() => {
//         const headlineElement = document.querySelector(".identity-headline");
//         return headlineElement ? headlineElement.textContent?.trim() : null;
//       });

//       console.log(headlines);

//       if (headlines) {
//         return NextResponse.json(
//           { result: headlines, success: true },
//           { status: 200 }
//         );
//       } else {
//         return NextResponse.json(
//           { result: "No headline found", success: false },
//           { status: 404 }
//         );
//       }
//     } catch (error) {
//       console.error("Error during page navigation:", error);
//       return NextResponse.json(
//         { result: "Error Occurred", success: false },
//         { status: 500 }
//       );
//     }
//   } catch (error) {
//     console.error("Error parsing JSON:", error);
//     return NextResponse.json(
//       { result: "Invalid JSON payload", success: false },
//       { status: 400 }
//     );
//   } finally {
//     await browser.close();
//   }
// }


function getAbout(json) {
  const aboutComponent = json?.included?.find((d) =>
    d.entityUrn?.includes("ABOUT")
  );
  return aboutComponent?.topComponents?.[1]?.components?.textComponent?.text
    ?.text;
}

function getExperience(json) {
  const experienceEntity = json?.included?.find(
    (d) =>
      !d?.entityUrn?.includes("VOLUNTEERING_EXPERIENCE") &&
      d?.entityUrn?.includes("EXPERIENCE")
  );

  return experienceEntity?.topComponents?.[1].components?.fixedListComponent?.components?.map(
    (e) => {
      const entity = e?.components?.entityComponent;
      return {
        title: entity?.title?.text,
        companyName: entity?.subtitle?.text,
        description:
          entity?.subComponents?.components?.[0]?.components?.fixedListComponent
            ?.components?.[0]?.components?.textComponent?.text?.text,
        dates: entity?.caption?.text,
        location: entity?.metadata?.text,
        companyUrl: entity?.image?.actionTarget,
      };
    }
  );
}

function getVolunteering(json) {
  const volunteeringEntity = json?.included?.find((d) =>
    d?.entityUrn?.includes("VOLUNTEERING_EXPERIENCE")
  );

  if (volunteeringEntity?.topComponents.length === 0) {
    return [];
  }

  return volunteeringEntity?.topComponents?.[1]?.components?.fixedListComponent?.components?.map(
    (e) => {
      const entity = e?.components?.entityComponent;
      return {
        title: entity?.title?.text,
        companyName: entity?.subtitle?.text,
        description:
          entity?.subComponents?.components?.[0]?.components?.textComponent
            ?.text?.text,
        dates: entity?.caption?.text,
        location: entity?.metadata?.text,
        companyUrl: entity?.image?.actionTarget,
      };
    }
  );
}

function getEducation(json) {
  const educationComponent = json?.included?.find((d) => {
    return d?.entityUrn?.includes("EDUCATION");
  });

  if (educationComponent?.topComponents.length === 0) {
    return [];
  }

  return educationComponent?.topComponents?.[1]?.components?.fixedListComponent?.components?.map(
    (e) => {
      const entity = e?.components?.entityComponent;
      return {
        schoolName: entity?.title?.text,
        degree: entity?.subtitle?.text,
        description:
          entity?.subComponents?.components?.[0]?.components?.insightComponent
            ?.text?.text?.text,
        dates: entity?.caption?.text,
        schoolUrl: entity?.image?.actionTarget,
      };
    }
  );
}

function getLocation(json) {
  const locationComponent = json?.included?.find(
    (d) =>
      !d?.entityUrn?.includes("VOLUNTEERING_EXPERIENCE") &&
      d?.entityUrn?.includes("EXPERIENCE")
  );
  return locationComponent?.topComponents[1]?.components?.fixedListComponent
    ?.components?.[1]?.components?.entityComponent?.metadata?.text;
}

async function getMiddleProfile(profileId) {
  try {
    const res = await fetch(
      `https://www.linkedin.com/voyager/api/graphql?includeWebMetadata=true&variables=(profileUrn:urn%3Ali%3Afsd_profile%3A${profileId})&&queryId=voyagerIdentityDashProfileCards.2d68c43b54ee24f8de25bc423c3cf7e4`,
      {
        headers: {
          accept: "application/vnd.linkedin.normalized+json+2.1",
          "accept-language": "en-US,en-CA;q=0.9,en-AU;q=0.8,en;q=0.7",
          "csrf-token": "ajax:1690738384797705558",
          "sec-ch-ua":
            '"Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"macOS"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          Referer: "https://www.linkedin.com/in/cyprien-toffa-aa9040171/",
          "Referrer-Policy": "strict-origin-when-cross-origin",
        },
        body: null,
        method: "GET",
      }
    );
    const json = await res.json();

    return {
      location: getLocation(json),
      about: getAbout(json),
      experience: getExperience(json),
      education: getEducation(json),
      volunteering: getVolunteering(json),
    };
  } catch (error) {
    console.log("error at middleProfile", error.message);
  }
}

async function getTopProfile(handle) {
  try {
    const res = await fetch(
      `https://www.linkedin.com/voyager/api/identity/dash/profiles?q=memberIdentity&memberIdentity=${handle}&decorationId=com.linkedin.voyager.dash.deco.identity.profile.TopCardSupplementary-128`,
      {
        headers: {
          accept: "application/vnd.linkedin.normalized+json+2.1",
          "accept-language": "en-US,en-CA;q=0.9,en-AU;q=0.8,en;q=0.7",
          "sec-ch-ua":
            '"Google Chrome";v="113", "Chromium";v="113", "Not-A.Brand";v="24"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"macOS"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          cookie:
            '',
          Referer: "https://www.linkedin.com/in/adrianhorning/",
          "Referrer-Policy": "strict-origin-when-cross-origin",
        },
        body: null,
        method: "GET",
      }
    );
    const data = await res.json();

    const entityWithAllTheData = data?.included?.find(
      (d) => d?.publicIdentifier && d?.publicIdentifier !== "adrianhorning"
    );
    const thingWithProfileId =
      entityWithAllTheData?.profileStatefulProfileActions?.overflowActions?.find(
        (d) => {
          return d?.report?.authorProfileId;
        }
      );
    return {
      firstName: entityWithAllTheData?.firstName,
      lastName: entityWithAllTheData?.lastName,
      headline: entityWithAllTheData?.headline,
      handle: entityWithAllTheData?.publicIdentifier,
      url: `https://www.linkedin.com/in/${entityWithAllTheData?.publicIdentifier}/`,
      publicIdentifier: entityWithAllTheData?.publicIdentifier,
      profileId: thingWithProfileId?.report?.authorProfileId,
    };
  } catch (error) {
    console.log("error at topProfile", error.message);
  }
}

export async function POST(req) {
  const url = "https://www.linkedin.com/in/muhammad-waqas-shaukat-39b270a7/"
  const handle = url.split("/in/")[1].split("/")[0];
  console.log("handle", handle);

  const topProfile = await getTopProfile(handle);
  const middle = await getMiddleProfile(topProfile?.profileId);
  // const recentActivity = await getRecentActivity(topProfile?.profileId);
  const profile = {
    ...topProfile,
    ...middle,
    // recentActivity,
  };
  return NextResponse.json(profile);
}