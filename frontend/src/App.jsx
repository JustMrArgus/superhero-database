import { useEffect, useState } from "react";
import { useSuperheroes } from "./hooks/useSuperheroes";
import { SuperheroList } from "./components/SuperheroList";
import { SuperheroDetails } from "./components/SuperheroDetails";
import { SuperheroForm } from "./components/SuperheroForm";
import { Modal } from "./components/Modal";
import { ConfirmDialog } from "./components/ConfirmDialog";
import { Header } from "./components/Header";

const App = () => {
  const {
    superheroes,
    loading,
    error,
    currentPage,
    fetchSuperheroes,
    createSuperhero,
    updateSuperhero,
    deleteSuperhero,
  } = useSuperheroes();

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [selectedSuperhero, setSelectedSuperhero] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchSuperheroes(1);
  }, [fetchSuperheroes]);

  const handleView = (superhero) => {
    setSelectedSuperhero(superhero);
    setViewModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedSuperhero(null);
    setIsEditing(false);
    setFormModalOpen(true);
  };

  const handleEdit = (superhero) => {
    setSelectedSuperhero(superhero);
    setIsEditing(true);
    setViewModalOpen(false);
    setFormModalOpen(true);
  };

  const handleDeleteClick = (superhero) => {
    setSelectedSuperhero(superhero);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedSuperhero) return;
    await deleteSuperhero(selectedSuperhero._id);
    setDeleteDialogOpen(false);
    setSelectedSuperhero(null);
  };

  const handleFormSubmit = async (formData) => {
    if (isEditing && selectedSuperhero) {
      await updateSuperhero(selectedSuperhero._id, formData);
    } else {
      await createSuperhero(formData);
    }
    setFormModalOpen(false);
    setSelectedSuperhero(null);
  };

  const handlePageChange = (page) => {
    if (page < 1) return;
    fetchSuperheroes(page);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header onCreate={handleCreate} />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200">
            {error}
          </div>
        )}

        <SuperheroList
          superheroes={superheroes}
          loading={loading}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      </main>

      <Modal
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        title={selectedSuperhero?.nickname || "Superhero Details"}
      >
        <SuperheroDetails superhero={selectedSuperhero} />
      </Modal>

      <Modal
        isOpen={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        title={isEditing ? "Edit Superhero" : "Create New Superhero"}
      >
        <SuperheroForm
          key={isEditing ? selectedSuperhero?._id : "new"}
          superhero={isEditing ? selectedSuperhero : null}
          onSubmit={handleFormSubmit}
          loading={loading}
        />
      </Modal>

      <ConfirmDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Superhero"
        message={`Are you sure you want to delete ${selectedSuperhero?.nickname}? This action cannot be undone.`}
        loading={loading}
      />
    </div>
  );
};

export default App;
