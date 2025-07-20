export const setToken = (token) => localStorage.setItem("token", token);
export const setRole = (role) => localStorage.setItem("role", role);
export const getToken = () => localStorage.getItem("token");
export const getRole = () => localStorage.getItem("role");
export const isAuthenticated = () => !!getToken();
export const isAdmin = () => getRole() === "admin";
export const isUser = () => getRole() === "user";