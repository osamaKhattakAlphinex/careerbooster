
import { Metadata } from "next";
import { headers } from "next/dist/client/components/headers";
import { usePathname } from 'next/navigation';

// ... inside your server component


export const generateMetadata = (): Metadata=> {
    const headersList = headers();
const domain = headersList.get("x-forwarded-host") ||  "";
const protocol = headersList.get("x-forwarded-proto") || "";
const pathname = headersList.get("x-invoke-path") || "";
console.log(headersList, domain, protocol, pathname)
  return {
    title: "",
    description: "CareerBooster.ai | Developed by NausalTech",
}
};