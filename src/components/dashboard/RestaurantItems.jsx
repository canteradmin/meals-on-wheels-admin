import React, { useState, useEffect } from "react";
import AddItemModal from "./AddItemModal";
import "./RestaurantItems.scss";

const RestaurantItems = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      const mockMenuItems = [
        {
          id: "item_001",
          name: "Chicken Biryani",
          description: "Aromatic rice dish with tender chicken and spices",
          price: 350,
          category: "Main Course",
          image: "https://example.com/chicken-biryani.jpg",
          isOutOfStock: false,
          preparationTime: 25,
          isVegetarian: false,
          isSpicy: true,
          allergens: ["dairy"],
          nutritionalInfo: {
            calories: 450,
            protein: 25,
            carbs: 15,
            fat: 30,
          },
        },
        {
          id: "item_002",
          name: "Butter Chicken",
          description: "Creamy tomato-based curry with tender chicken",
          price: 380,
          category: "Main Course",
          image: "https://example.com/butter-chicken.jpg",
          isOutOfStock: false,
          preparationTime: 20,
          isVegetarian: false,
          isSpicy: false,
          allergens: ["dairy"],
          nutritionalInfo: {
            calories: 380,
            protein: 22,
            carbs: 12,
            fat: 28,
          },
        },
        {
          id: "item_003",
          name: "Dal Makhani",
          description: "Creamy black lentils slow-cooked with spices",
          price: 180,
          category: "Main Course",
          image: "https://example.com/dal-makhani.jpg",
          isOutOfStock: false,
          preparationTime: 15,
          isVegetarian: true,
          isSpicy: false,
          allergens: ["dairy"],
          nutritionalInfo: {
            calories: 280,
            protein: 12,
            carbs: 45,
            fat: 8,
          },
        },
      ];

      setMenuItems(mockMenuItems);
      setLoading(false);
    }, 1000);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  const toggleAvailability = (itemId) => {
    setMenuItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? { ...item, isOutOfStock: !item.isOutOfStock }
          : item
      )
    );
  };

  const handleAddItem = (newItem) => {
    const itemWithId = {
      ...newItem,
      id: `item_${Date.now()}`,
      isOutOfStock: false,
    };
    setMenuItems((prevItems) => [...prevItems, itemWithId]);
    setShowAddModal(false);
  };

  const handleDeleteItem = (itemId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setMenuItems((prevItems) =>
        prevItems.filter((item) => item.id !== itemId)
      );
    }
  };

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    "all",
    ...new Set(menuItems.map((item) => item.category)),
  ];

  if (loading) {
    return (
      <div className="restaurant-items">
        <div className="items-header">
          <h2>Menu Items</h2>
          <p>Manage your restaurant menu</p>
        </div>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading menu items...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="restaurant-items">
      <div className="items-header">
        <h2>Menu Items</h2>
        <p>Manage your restaurant menu</p>
      </div>

      <div className="items-controls">
        <div className="filters">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="category-filter">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="actions">
          <button
            className="btn btn--primary"
            onClick={() => setShowAddModal(true)}
          >
            Add New Item
          </button>
        </div>
      </div>

      <div className="items-grid">
        {filteredItems.map((item) => (
          <div key={item.id} className="item-card">
            <div className="item-image">
              <img src={item.image} alt={item.name} />
              <div className="item-badges">
                {item.isVegetarian && (
                  <span className="badge vegetarian">🥬 Veg</span>
                )}
                {item.isSpicy && <span className="badge spicy">🌶️ Spicy</span>}
              </div>
            </div>

            <div className="item-content">
              <div className="item-header">
                <h3>{item.name}</h3>
                <div className="item-price">{formatCurrency(item.price)}</div>
              </div>

              <p className="item-description">{item.description}</p>

              <div className="item-details">
                <div className="detail">
                  <span className="label">Category:</span>
                  <span className="value">{item.category}</span>
                </div>
                <div className="detail">
                  <span className="label">Prep Time:</span>
                  <span className="value">{item.preparationTime} min</span>
                </div>
                {item.allergens.length > 0 && (
                  <div className="detail">
                    <span className="label">Allergens:</span>
                    <span className="value">{item.allergens.join(", ")}</span>
                  </div>
                )}
              </div>

              <div className="item-actions">
                <div className="availability-toggle">
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={!item.isOutOfStock}
                      onChange={() => toggleAvailability(item.id)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                  <span className="availability-label">
                    {item.isOutOfStock ? "Out of Stock" : "Available"}
                  </span>
                </div>

                <div className="action-buttons">
                  <button className="btn btn--small btn--secondary">
                    Edit
                  </button>
                  <button
                    className="btn btn--small btn--danger"
                    onClick={() => handleDeleteItem(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="no-items">
          <p>No menu items found matching your criteria.</p>
        </div>
      )}

      {showAddModal && (
        <AddItemModal
          onAddItem={handleAddItem}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
};

export default RestaurantItems;
