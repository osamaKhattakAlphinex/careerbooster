import { NextApiHandler, NextApiRequest } from "next";
import formidable from "formidable";
import path from "path";
import fs from "fs/promises";

export const config = {
  api: {
    bodyParser: false,
  },
};

const readFile = (
  req: NextApiRequest,
  options: formidable.Options
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  const form = formidable(options);
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};

const handler: NextApiHandler = async (req, res) => {
  let directory = "";
  console.log("in file upload api handler");
  if (req?.query?.type === "coverLetter" && req?.query?.email) {
    // for CoverLetter and other tools file upload
    directory = `/public/files/userResumes/${req?.query?.email}`;
  } else if (req?.query?.type === "biography") {
    // for Biography page
    directory = "/public/files/bio";
  } else if (req?.query?.email) {
    // for logged in users
    directory = `/public/files/userResumes/${req?.query?.email}`;
  } else if (req?.query?.type === "linkedin-tool") {
    // for LinkedIn page
    directory = "/public/files/linkedin-temp";
  } else {
    // for homepage
    directory = "/public/files/temp";
  }

  try {
    await fs.readdir(path.join(process.cwd() + directory));
  } catch (error) {
    await fs.mkdir(path.join(process.cwd() + directory));
  }
  const options: formidable.Options = {};
  const saveLocally = true;
  const fileName = Date.now().toString();
  if (saveLocally) {
    options.uploadDir = path.join(process.cwd(), directory);
    options.filename = (name, ext, path, form) => {
      return fileName + ".pdf";
    };
  }
  await readFile(req, options);

  res.json({
    success: true,
    fileName: fileName,
  });
};

export default handler;
