import logo from "../assets/logo.svg";

const Header = () => {
  return (
    <header className="bg-[#444444] text-white">
      <div className="flex items-center gap-3 p-5">
        <div className="w-12">
          <img src={logo} alt="logo of the site" className="max-w-full" />
        </div>
        <p className="uppercase text-4xl font-bold ">Superhero Database</p>
      </div>
    </header>
  );
};

export default Header;
