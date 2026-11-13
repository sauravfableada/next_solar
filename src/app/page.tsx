import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Solutions from "@/components/Solutions";
import WhyChooseUs from "@/components/WhyChooseUs";
import Projects from "@/components/Projects";
import Products from "@/components/Products";
import Sustainability from "@/components/Sustainability";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <About />
        <Solutions />
        <WhyChooseUs />
        <Projects />
        <Products />
        <Sustainability />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
