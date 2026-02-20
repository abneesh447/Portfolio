import Hero from "../../components/portfolio/Hero";
import About from "../../components/portfolio/About";
import Projects from "../../components/portfolio/Projects";

function Home() {
  return (
    <div className="bg-gray-950 text-white">
      <Hero />
      <About />
      <Projects />
    </div>
  );
}

export default Home;
