import { NextApiHandler, NextApiRequest } from "next";
import formidable from "formidable";
import path from "path";
import fs from "fs/promises";

import User from "../../src/db/schemas/User";

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
  try {
    await fs.readdir(
      path.join(process.cwd() + "/public", "/files", `/${req?.query?.email}`)
    );
  } catch (error) {
    await fs.mkdir(
      path.join(process.cwd() + "/public", "/files", `/${req?.query?.email}`)
    );
  }
  const options: formidable.Options = {};
  const saveLocally = true;
  const fileName = Date.now().toString();
  if (saveLocally) {
    options.uploadDir = path.join(
      process.cwd(),
      `/public/files/${req?.query?.email}`
    );
    options.filename = (name, ext, path, form) => {
      return fileName + "_" + path.originalFilename;
    };
  }
  await readFile(req, options);

  res.json({
    success: true,
    fileName: fileName,
  });
};

export default handler;
