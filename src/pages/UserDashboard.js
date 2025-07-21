import React, { useEffect, useState } from "react";
import api from "../services/api";
import ItemCard from "../components/ItemCard";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import FilterBar from "../components/FilterBar";
import { Navigate } from "react-router-dom";
import { isAdmin } from "../services/authService";
import LogoutButton from "../components/LogoutButton";

function UserDashboard() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [categories, setCategories] = useState([]);
  const [years, setYears] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 18;

  useEffect(() => {
    const fetchMovies = async () => {
      const params = new URLSearchParams();
      if (searchQuery) params.append("name", searchQuery);
      if (filterCategory) params.append("category", filterCategory);
      if (filterYear) params.append("year", filterYear);

      try {
        const res = await api.get(`/items?${params.toString()}`);
        const data = res.data || [];
        setMovies(data);
        setCurrentPage(1);
      } catch (err) {
        console.error("Error fetching movies:", err);
        setMovies([]);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await api.get("/items/distinct/genre");
        setCategories(res.data || []);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setCategories([]);
      }
    };

    const fetchYears = async () => {
      try {
        const res = await api.get("/items/distinct/year");
        setYears(res.data || []);
      } catch (err) {
        console.error("Error fetching years:", err);
        setYears([]);
      }
    };

    fetchMovies();
    fetchCategories();
    fetchYears();
  }, [searchQuery, filterCategory, filterYear]);

  const indexOfLast = currentPage * itemsPerPage;
  const currentMovies = movies.slice(indexOfLast - itemsPerPage, indexOfLast);
  const totalPages = Math.ceil(movies.length / itemsPerPage);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const role = isAdmin() ? "admin" : "user";
  if (role === "admin") {
    return <Navigate to="/admin" />;
  }

  return (
    <div className="p-5"> {/* Refactored container style */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold">Movie Catalog</h2>
        <LogoutButton />
      </div>
      <SearchBar onSearch={setSearchQuery} />
      <FilterBar
        categories={categories}
        years={years}
        onFilter={(cat, year) => {
          setFilterCategory(cat);
          setFilterYear(year);
        }}
      />

      <div className="grid grid-cols- md:grid-cols-3 lg:grid-cols-6 gap-4 justify-items-center"> {/* Refactored cardContainer to a responsive grid */}
        {currentMovies.length > 0 ? (
          currentMovies.map((movie) => <ItemCard key={movie.id} item={movie} />)
        ) : (
          <p className="col-span-full text-center">Tidak ada film ditemukan</p>
        )}
      </div>
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default UserDashboard;