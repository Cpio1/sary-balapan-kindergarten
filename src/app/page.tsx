import media from "@/generated/media.json";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { RevealObserver } from "@/components/RevealObserver";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Program } from "@/components/sections/Program";
import { Clubs } from "@/components/sections/Clubs";
import { Nutrition } from "@/components/sections/Nutrition";
import { Gallery } from "@/components/sections/Gallery";
import { Documents } from "@/components/sections/Documents";
import { Contacts } from "@/components/sections/Contacts";
import { site } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ChildCare",
  name: "Сары балапан",
  legalName: "ТОО «Сары балапан»",
  telephone: "+77076155683",
  address: { "@type": "PostalAddress", streetAddress: site.address },
  openingHours: "07:30-18:00",
  sameAs: [site.instagramUrl],
};

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero heroImage={media.hero} />
        <About />
        <Program />
        <Clubs />
        <Nutrition />
        <Gallery images={media.gallery} />
        <Documents />
        <Contacts />
      </main>
      <Footer />
      <WhatsAppFloat />
      <RevealObserver />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
