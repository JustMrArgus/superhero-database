import { useState } from "react";
import { superheroApi } from "../services/api";

export const SuperheroForm = ({ superhero, onSubmit, loading }) => {
  const isEditing = !!superhero;

  const [formData, setFormData] = useState({
    nickname: superhero?.nickname || "",
    real_name: superhero?.real_name || "",
    origin_description: superhero?.origin_description || "",
    superpowers: superhero?.superpowers?.join(", ") || "",
    catch_phrase: superhero?.catch_phrase || "",
  });

  const [existingImages, setExistingImages] = useState(superhero?.images || []);
  const [newImages, setNewImages] = useState([]);
  const [imagesToRemove, setImagesToRemove] = useState([]);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages((prev) => [...prev, ...files]);
  };

  const removeExistingImage = (image) => {
    setExistingImages((prev) => prev.filter((img) => img !== image));
    setImagesToRemove((prev) => [...prev, image]);
  };

  const removeNewImage = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.nickname.trim()) {
      newErrors.nickname = "Nickname is required";
    }
    if (!formData.real_name.trim()) {
      newErrors.real_name = "Real name is required";
    }
    if (!formData.origin_description.trim()) {
      newErrors.origin_description = "Origin description is required";
    }
    if (!formData.superpowers.trim()) {
      newErrors.superpowers = "At least one superpower is required";
    }
    if (!formData.catch_phrase.trim()) {
      newErrors.catch_phrase = "Catch phrase is required";
    }

    const totalImages = existingImages.length + newImages.length;
    if (totalImages === 0) {
      newErrors.images = "At least one image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const submitData = new FormData();
    submitData.append("nickname", formData.nickname.trim());
    submitData.append("real_name", formData.real_name.trim());
    submitData.append("origin_description", formData.origin_description.trim());
    submitData.append("catch_phrase", formData.catch_phrase.trim());

    const superpowers = formData.superpowers
      .split(",")
      .map((p) => p.trim())
      .filter((p) => p);
    superpowers.forEach((power) => {
      submitData.append("superpowers", power);
    });

    existingImages.forEach((img) => {
      submitData.append("existingImages", img);
    });

    imagesToRemove.forEach((img) => {
      submitData.append("imagesToRemove", img);
    });

    newImages.forEach((file) => {
      submitData.append("images", file);
    });

    await onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nickname *
        </label>
        <input
          type="text"
          name="nickname"
          value={formData.nickname}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
            errors.nickname ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="e.g., Superman"
        />
        {errors.nickname && (
          <p className="text-red-500 text-sm mt-1">{errors.nickname}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Real Name *
        </label>
        <input
          type="text"
          name="real_name"
          value={formData.real_name}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
            errors.real_name ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="e.g., Clark Kent"
        />
        {errors.real_name && (
          <p className="text-red-500 text-sm mt-1">{errors.real_name}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Origin Description *
        </label>
        <textarea
          name="origin_description"
          value={formData.origin_description}
          onChange={handleChange}
          rows={3}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none ${
            errors.origin_description ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Describe the superhero's origin story..."
        />
        {errors.origin_description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.origin_description}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Superpowers * (comma separated)
        </label>
        <input
          type="text"
          name="superpowers"
          value={formData.superpowers}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
            errors.superpowers ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="e.g., Flight, Super strength, Heat vision"
        />
        {errors.superpowers && (
          <p className="text-red-500 text-sm mt-1">{errors.superpowers}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Catch Phrase *
        </label>
        <input
          type="text"
          name="catch_phrase"
          value={formData.catch_phrase}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
            errors.catch_phrase ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="e.g., Look, up in the sky!"
        />
        {errors.catch_phrase && (
          <p className="text-red-500 text-sm mt-1">{errors.catch_phrase}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Images *
        </label>

        {existingImages.length > 0 && (
          <div className="mb-3">
            <p className="text-xs text-gray-500 mb-2">Current Images:</p>
            <div className="flex flex-wrap gap-2">
              {existingImages.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={superheroApi.getImageUrl(image)}
                    alt={`Existing ${index + 1}`}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeExistingImage(image)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 cursor-pointer"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {newImages.length > 0 && (
          <div className="mb-3">
            <p className="text-xs text-gray-500 mb-2">New Images:</p>
            <div className="flex flex-wrap gap-2">
              {newImages.map((file, index) => (
                <div key={index} className="relative group">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`New ${index + 1}`}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeNewImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 cursor-pointer"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg cursor-pointer file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-blue-500 file:text-white file:cursor-pointer hover:file:bg-blue-600"
        />
        {errors.images && (
          <p className="text-red-500 text-sm mt-1">{errors.images}</p>
        )}
      </div>

      <div className="flex gap-3 pt-4 border-t border-gray-200">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          {loading
            ? "Saving..."
            : isEditing
            ? "Update Superhero"
            : "Create Superhero"}
        </button>
      </div>
    </form>
  );
};
