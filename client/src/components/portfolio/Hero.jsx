function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-6">
      <h1 className="text-5xl md:text-6xl font-bold mb-4">
        Hi, I'm <span className="text-blue-500">Abneesh Patel</span>
      </h1>
      <p className="text-gray-400 max-w-xl mb-6">
        MERN Stack Developer passionate about building scalable web applications.
      </p>
      <button className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700 transition">
        View My Work
      </button>
    </section>
  );
}

export default Hero;
