import axios from 'axios';

const apiEndpoint = '/api/auth';

// Register a new user
export async function registerUserAuth(user) {
  const { data } = await axios.post(`${apiEndpoint}/register`, user);
  localStorage.setItem('token', data.token);
}

// Login an existing user
export async function loginUserAuth(email, password) {
  const { data } = await axios.post(`${apiEndpoint}/login`, { email, password });
  localStorage.setItem('token', data.token);
}

// Logout the current user
export function logoutUserAuth() {
  localStorage.removeItem('token');
}

// Get the current user's details
export async function getCurrentUser() {
  try {
    const token = localStorage.getItem('token');
    const { data } = await axios.get(`${apiEndpoint}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (ex) {
    return null;
  }
}
