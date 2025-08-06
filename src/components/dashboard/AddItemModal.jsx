import React, { useState } from "react";
import "./AddItemModal.scss";

const AddItemModal = ({ isOpen, onClose, onAddItem }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    isVegetarian: false,
    isSpicy: false,
    preparationTime: "",
    allergens: [],
    nutritionalInfo: {
      calories: "",
      protein: "",
      carbs: "",
      fat: "",
    },
  });

  const [errors, setErrors] = useState({});

  const categories = [
    "Appetizer",
    "Main Course",
    "Side Dish",
    "Bread",
    "Dessert",
    "Beverage",
  ];
  const allergenOptions = [
    "dairy",
    "nuts",
    "gluten",
    "eggs",
    "shellfish",
    "soy",
    "wheat",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("nutritionalInfo.")) {
      const nutritionalField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        nutritionalInfo: {
          ...prev.nutritionalInfo,
          [nutritionalField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleAllergenChange = (allergen) => {
    setFormData((prev) => ({
      ...prev,
      allergens: prev.allergens.includes(allergen)
        ? prev.allergens.filter((a) => a !== allergen)
        : [...prev.allergens, allergen],
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.price || formData.price <= 0)
      newErrors.price = "Valid price is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.preparationTime || formData.preparationTime <= 0)
      newErrors.preparationTime = "Valid preparation time is required";
    if (
      !formData.nutritionalInfo.calories ||
      formData.nutritionalInfo.calories <= 0
    )
      newErrors.calories = "Valid calories are required";
    if (
      !formData.nutritionalInfo.protein ||
      formData.nutritionalInfo.protein < 0
    )
      newErrors.protein = "Valid protein value is required";
    if (!formData.nutritionalInfo.carbs || formData.nutritionalInfo.carbs < 0)
      newErrors.carbs = "Valid carbs value is required";
    if (!formData.nutritionalInfo.fat || formData.nutritionalInfo.fat < 0)
      newErrors.fat = "Valid fat value is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const newItem = {
        id: Date.now(), // Generate temporary ID
        ...formData,
        price: parseFloat(formData.price),
        preparationTime: parseInt(formData.preparationTime),
        available: true,
        nutritionalInfo: {
          calories: parseInt(formData.nutritionalInfo.calories),
          protein: parseFloat(formData.nutritionalInfo.protein),
          carbs: parseFloat(formData.nutritionalInfo.carbs),
          fat: parseFloat(formData.nutritionalInfo.fat),
        },
      };

      onAddItem(newItem);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      image: "",
      isVegetarian: false,
      isSpicy: false,
      preparationTime: "",
      allergens: [],
      nutritionalInfo: {
        calories: "",
        protein: "",
        carbs: "",
        fat: "",
      },
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add New Item</h2>
          <button className="modal-close" onClick={handleClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Item Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter item name"
                className={errors.name ? "error" : ""}
              />
              {errors.name && (
                <span className="error-message">{errors.name}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={errors.category ? "error" : ""}
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <span className="error-message">{errors.category}</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter item description"
              rows="3"
              className={errors.description ? "error" : ""}
            />
            {errors.description && (
              <span className="error-message">{errors.description}</span>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">Price ($) *</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                min="0"
                className={errors.price ? "error" : ""}
              />
              {errors.price && (
                <span className="error-message">{errors.price}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="preparationTime">Preparation Time (min) *</label>
              <input
                type="number"
                id="preparationTime"
                name="preparationTime"
                value={formData.preparationTime}
                onChange={handleChange}
                placeholder="0"
                min="1"
                className={errors.preparationTime ? "error" : ""}
              />
              {errors.preparationTime && (
                <span className="error-message">{errors.preparationTime}</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="image">Image URL</label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="form-row">
            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="isVegetarian"
                  checked={formData.isVegetarian}
                  onChange={handleChange}
                />
                <span className="checkmark"></span>
                Vegetarian
              </label>
            </div>

            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="isSpicy"
                  checked={formData.isSpicy}
                  onChange={handleChange}
                />
                <span className="checkmark"></span>
                Spicy
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>Allergens</label>
            <div className="allergens-grid">
              {allergenOptions.map((allergen) => (
                <label key={allergen} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.allergens.includes(allergen)}
                    onChange={() => handleAllergenChange(allergen)}
                  />
                  <span className="checkmark"></span>
                  {allergen.charAt(0).toUpperCase() + allergen.slice(1)}
                </label>
              ))}
            </div>
          </div>

          <div className="nutritional-section">
            <h3>Nutritional Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="calories">Calories *</label>
                <input
                  type="number"
                  id="calories"
                  name="nutritionalInfo.calories"
                  value={formData.nutritionalInfo.calories}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  className={errors.calories ? "error" : ""}
                />
                {errors.calories && (
                  <span className="error-message">{errors.calories}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="protein">Protein (g) *</label>
                <input
                  type="number"
                  id="protein"
                  name="nutritionalInfo.protein"
                  value={formData.nutritionalInfo.protein}
                  onChange={handleChange}
                  placeholder="0"
                  step="0.1"
                  min="0"
                  className={errors.protein ? "error" : ""}
                />
                {errors.protein && (
                  <span className="error-message">{errors.protein}</span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="carbs">Carbs (g) *</label>
                <input
                  type="number"
                  id="carbs"
                  name="nutritionalInfo.carbs"
                  value={formData.nutritionalInfo.carbs}
                  onChange={handleChange}
                  placeholder="0"
                  step="0.1"
                  min="0"
                  className={errors.carbs ? "error" : ""}
                />
                {errors.carbs && (
                  <span className="error-message">{errors.carbs}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="fat">Fat (g) *</label>
                <input
                  type="number"
                  id="fat"
                  name="nutritionalInfo.fat"
                  value={formData.nutritionalInfo.fat}
                  onChange={handleChange}
                  placeholder="0"
                  step="0.1"
                  min="0"
                  className={errors.fat ? "error" : ""}
                />
                {errors.fat && (
                  <span className="error-message">{errors.fat}</span>
                )}
              </div>
            </div>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="btn btn--secondary"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn--primary">
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItemModal;
