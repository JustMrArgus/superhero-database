import { superheroApi } from "../services/api";

export const SuperheroDetails = ({ superhero }) => {
  if (!superhero) return null;

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-700">Images</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {superhero.images?.map((image, index) => (
            <img
              key={index}
              src={superheroApi.getImageUrl(image)}
              alt={`${superhero.nickname} - ${index + 1}`}
              className="w-full h-32 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow"
            />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            Nickname
          </h3>
          <p className="text-xl font-bold text-gray-800">
            {superhero.nickname}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            Real Name
          </h3>
          <p className="text-lg text-gray-700">{superhero.real_name}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            Origin Description
          </h3>
          <p className="text-gray-700 leading-relaxed">
            {superhero.origin_description}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            Superpowers
          </h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {superhero.superpowers?.map((power, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
              >
                {power}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            Catch Phrase
          </h3>
          <blockquote className="italic text-gray-600 border-l-4 border-blue-500 pl-4 mt-2">
            &ldquo;{superhero.catch_phrase}&rdquo;
          </blockquote>
        </div>
      </div>
    </div>
  );
};
