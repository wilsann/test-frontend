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
  const [movies, setMovies] = useState([]); // ✅ Tetap array kosong
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [categories, setCategories] = useState([]);
  const [years, setYears] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchMovies = async () => {
      const params = new URLSearchParams();
      if (searchQuery) params.append("name", searchQuery);
      if (filterCategory) params.append("category", filterCategory);
      if (filterYear) params.append("year", filterYear);

      try {
        const res = await api.get(`/items?${params.toString()}`);
        const data = res.data || []; // ✅ Pastikan data adalah array
        setMovies(data);
        setCurrentPage(1); // Reset halaman ke 1 setiap filter berubah
      } catch (err) {
        console.error("Error fetching movies:", err);
        setMovies([]); // ✅ Set ke array kosong jika error
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
    <div style={styles.container}>
      <h2>Movie Catalog</h2>
      <LogoutButton />
      <SearchBar onSearch={setSearchQuery} />
      <FilterBar
        categories={categories}
        years={years}
        onFilter={(cat, year) => {
          setFilterCategory(cat);
          setFilterYear(year);
        }}
      />
      <div style={styles.cardContainer}>
        {currentMovies.length > 0 ? (
          currentMovies.map((movie) => <ItemCard key={movie.id} item={movie} />)
        ) : (
          <p>Tidak ada film ditemukan</p>
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

const styles = {
  container: {
    padding: "20px",
  },
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
};

export default UserDashboard;