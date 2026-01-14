import { SuperheroCard } from "./SuperheroCard";
import { Pagination } from "./Pagination";
import { ClipLoader } from "react-spinners";

export const SuperheroList = ({
  superheroes,
  loading,
  currentPage,
  onPageChange,
  onView,
  onEdit,
  onDelete,
}) => {
  if (loading && superheroes.length === 0) {
    return (
      <div className="flex justify-center items-center py-20">
        <ClipLoader />
      </div>
    );
  }

  const hasMore = superheroes.length === 5;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {superheroes.map((superhero) => (
          <SuperheroCard
            key={superhero._id}
            superhero={superhero}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        onPageChange={onPageChange}
        hasMore={hasMore}
      />
    </div>
  );
};
