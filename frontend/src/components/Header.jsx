export const Header = ({ onCreate }) => {
  return (
    <header className="bg-black/30 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-2xl font-bold text-white">
                Superhero Database
              </h1>
              <p className="text-purple-300 text-sm">
                Manage your superhero collection
              </p>
            </div>
          </div>
          <button
            onClick={onCreate}
            className="px-6 py-3 bg-linear-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl cursor-pointer flex items-center gap-2"
          >
            <span className="text-xl">+</span>
            Add Superhero
          </button>
        </div>
      </div>
    </header>
  );
};
