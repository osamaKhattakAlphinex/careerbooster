import { getPages } from "../lib/pages";

const URL = "https://careerbooster.ai";

export default async function sitemap() {
  const pages = getPages();
  const pageURLs = pages.map(({ name, route }) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...pageURLs];
}
