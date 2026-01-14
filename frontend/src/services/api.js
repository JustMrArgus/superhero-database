const API_URL = import.meta.env.VITE_API_URL;

export const superheroApi = {
  async getAll(page = 1, limit = 5) {
    const response = await fetch(
      `${API_URL}/api/superheroes?page=${page}&limit=${limit}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch superheroes");
    }
    return response.json();
  },

  async getById(id) {
    const response = await fetch(`${API_URL}/api/superheroes/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch superhero");
    }
    return response.json();
  },

  async create(formData) {
    const response = await fetch(`${API_URL}/api/superheroes`, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create superhero");
    }
    return response.json();
  },

  async update(id, formData) {
    const response = await fetch(`${API_URL}/api/superheroes/${id}`, {
      method: "PATCH",
      body: formData,
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to update superhero");
    }
    return response.json();
  },

  async delete(id) {
    const response = await fetch(`${API_URL}/api/superheroes/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete superhero");
    }
    return true;
  },

  getImageUrl(imageName) {
    return `${API_URL}/img/heroes/${imageName}`;
  },
};
