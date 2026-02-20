function ProjectCard({ project }) {
  return (
    <div className="bg-gray-800 p-6 rounded-xl hover:scale-105 transition transform">
      <h3 className="text-2xl font-semibold mb-3">{project.title}</h3>
      <p className="text-gray-400">{project.description}</p>
    </div>
  );
}

export default ProjectCard;
