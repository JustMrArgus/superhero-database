export const Pagination = ({ currentPage, onPageChange, hasMore }) => {
  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-white border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        ← Previous
      </button>

      <span className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium">
        Page {currentPage}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasMore}
        className="px-4 py-2 bg-white border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        Next →
      </button>
    </div>
  );
};
