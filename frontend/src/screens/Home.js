import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import AdminNavbar from "../components/AdminNavbar";
import { useNavigate, useLocation } from "react-router-dom";

export default function Home() {
  const [search, setSearch] = useState("");
  const [foodItems, setFoodItems] = useState([]);
  const [role, setRole] = useState("");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchData = async () => {
    console.log("🔍 fetchData called");

    try {
      const userEmail = localStorage.getItem("userEmail");
      if (userEmail) {
        const roleResponse = await fetch(
          `https://go-food-backend-k7r3.onrender.com/api/userRole?email=${encodeURIComponent(userEmail)}`
        );
        const roleData = await roleResponse.json();
        setRole(roleData.role || "");
      }

      const foodDataResponse = await fetch("https://go-food-backend-k7r3.onrender.com/api/foodData", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      
      if (!foodDataResponse.ok) {
        throw new Error(`HTTP error! status: ${foodDataResponse.status}`);
      }

      const foodData = await foodDataResponse.json();
     

      const allFoodItems = Array.isArray(foodData[0]) ? foodData[0] : [];
      let allCategories = Array.isArray(foodData[1]) ? foodData[1] : [];

      // 🔹 If no categories are returned from backend, generate from foodItems
      if (allCategories.length === 0 && allFoodItems.length > 0) {
        const categoryNames = [
          ...new Set(
            allFoodItems.map(
              (item) => item.CategoryName || item.categoryName || ""
            )
          ),
        ].filter(Boolean);

        allCategories = categoryNames.map((name, idx) => ({
          _id: idx,
          CategoryName: name,
        }));

        console.warn("⚠ Backend sent no categories — generated:", allCategories);
      }

      setFoodItems(allFoodItems);
      setCategories(allCategories);
    } catch (error) {
      console.error("❌ Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (location.state?.refresh) {
      fetchData();
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleAddItemClick = () => {
    navigate("/additem", {
      state: { adminEmail: localStorage.getItem("userEmail") },
    });
  };

  return (
    <>
      {role !== "admin" ? <Navbar /> : <AdminNavbar />}

      {/* Carousel */}
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        style={{ objectFit: "contain !important" }}
      >
        <div className="carousel-inner" id="carousel">
          <div className="carousel-caption" style={{ zIndex: "10" }}>
            <div className="d-flex justify-content-center">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="carousel-item active">
            <img
              src="https://www.foodandwine.com/thmb/DI29Houjc_ccAtFKly0BbVsusHc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/crispy-comte-cheesburgers-FT-RECIPE0921-6166c6552b7148e8a8561f7765ddf20b.jpg"
              className="d-block w-100"
              alt="Burger"
              style={{
                filter: "brightness(30%)",
                objectFit: "cover",
                height: "100vh",
              }}
            />
          </div>

          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/300x300/?pizza"
              className="d-block w-100"
              alt="Pizza"
              style={{
                filter: "brightness(30%)",
                objectFit: "cover",
                height: "100vh",
              }}
            />
          </div>

          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/300x300/?barbeque"
              className="d-block w-100"
              alt="Barbeque"
              style={{
                filter: "brightness(30%)",
                objectFit: "cover",
                height: "100vh",
              }}
            />
          </div>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Menu */}
      <div className="container">
        {role === "admin" && (
          <button className="btn btn-danger mx-2" onClick={handleAddItemClick}>
            ADD
          </button>
        )}

        {categories.length > 0 ? (
          categories.map((cat) => {
            const catNameLower = (cat.CategoryName || "").toLowerCase();

            const filteredItems = foodItems.filter((item) => {
              const itemCatLower = (
                item.CategoryName || item.categoryName || ""
              ).toLowerCase();
              return (
                itemCatLower === catNameLower &&
                (search
                  ? item.name?.toLowerCase().includes(search.toLowerCase())
                  : true)
              );
            });

            return (
              <div key={cat._id}>
                <div className="fs-3 m-3">{cat.CategoryName}</div>
                <hr />
                <div className="row mb-3">
                  {filteredItems.length > 0 ? (
                    filteredItems.map((filterItem) => (
                      <div
                        key={filterItem._id}
                        className="col-12 col-md-6 col-lg-3"
                      >
                        <Card
                          foodItem={filterItem}
                          options={filterItem.options?.[0] || {}}
                        />
                      </div>
                    ))
                  ) : (
                    <p className="text-muted">No items in this category.</p>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div>No data available</div>
        )}
      </div>

      <Footer />
    </>
  );
}
