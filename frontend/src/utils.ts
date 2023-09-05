import { TOKEN, USER } from "./constants";

export function getUserFromLocalStorage(): User {
  const userObject = JSON.parse(localStorage.getItem(USER) || "{}");
  return userObject;
}

export function getTokenFromLocalStorage(): string | null {
  const token = localStorage.getItem(TOKEN);
  return token;
}
