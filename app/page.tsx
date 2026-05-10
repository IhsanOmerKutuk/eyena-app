import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Audiences from "@/components/Audiences";
import Partnership from "@/components/Partnership";
import DealerForm from "@/components/DealerForm";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-[#0A0A0A] overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Audiences />
      <Partnership />
      <DealerForm />
      <Contact />
      <Footer />
    </main>
  );
}
