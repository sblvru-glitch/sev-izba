import PageModule from "@/app/components/page_modul";
import "./style.scss"
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About",
    description: "About page",
    keywords: ["about", "about us", "company", "team"],
    openGraph: {
      title: "About | Your Site Name",
      description: "Learn more about us, our mission, and our team.",
      url: "/about",
      type: "website",
    },
    alternates: {
      canonical: "/about",
    },
};

export default function About() {
    return (
        <>
            <PageModule variant="about">
                    <h1>About</h1>
            </PageModule>
        </>
    );
}