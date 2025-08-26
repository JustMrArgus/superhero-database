const Hero = () => {
  return (
    <section className="relative h-[50vh] w-full">
      <div className="absolute inset-0 bg-cover bg-center bg-[url('/images/hero-image.jpg')]"></div>
      <div className=" bg-black opacity-75 inset-0 absolute"></div>
      <div className="h-full flex items-center justify-center">
        <div className="relative text-white text-center">
          <h1 className="uppercase font-bold text-6xl mb-2">
            Superhero database
          </h1>
          <p className="text-[1.1rem]">Your greatest superhero collection</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
