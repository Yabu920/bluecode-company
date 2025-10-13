// lib/auth.ts
export const ADMIN_CREDENTIALS = {
  username: "yeab920@gmail.com",
  password: "Yeab920@.com",
};

export function isAuthenticated() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("isLoggedIn") === "true";
}

export function login(username: string, password: string): boolean {
  if (
    username === ADMIN_CREDENTIALS.username &&
    password === ADMIN_CREDENTIALS.password
  ) {
    localStorage.setItem("isLoggedIn", "true");
    return true;
  }
  return false;
}

export function logout() {
  localStorage.removeItem("isLoggedIn");
}
