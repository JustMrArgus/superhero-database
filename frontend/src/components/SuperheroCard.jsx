import { superheroApi } from "../services/api";

export const SuperheroCard = ({ superhero, onView, onEdit, onDelete }) => {
  const firstImage = superhero.images?.[0];
  const imageUrl = superheroApi.getImageUrl(firstImage);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={superhero.nickname}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
        <h3 className="absolute bottom-3 left-3 text-white font-bold text-xl drop-shadow-lg">
          {superhero.nickname}
        </h3>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-end">
        <div className="flex gap-2">
          <button
            onClick={() => onView(superhero)}
            className="flex-1 px-3 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
          >
            View Details
          </button>
          <button
            onClick={() => onEdit(superhero)}
            className="px-3 py-2 bg-amber-500 text-white text-sm font-medium rounded-lg hover:bg-amber-600 transition-colors cursor-pointer"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(superhero)}
            className="px-3 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
