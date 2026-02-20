import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "MERN Portfolio",
    description: "Full-stack portfolio with admin dashboard.",
  },
  {
    title: "E-Commerce App",
    description: "Shopping app with cart and payments.",
  },
];

function Projects() {
  return (
    <section className="py-20 px-6">
      <h2 className="text-4xl font-bold text-center mb-12">Projects</h2>
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </section>
  );
}

export default Projects;
