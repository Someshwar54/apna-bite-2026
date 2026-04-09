import Papa from 'papaparse';

// On Vercel, we will inject the Render API URL as VITE_API_URL.
// If it's missing, it falls back to the localhost 3001 server.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const getStalls = async () => {
  try {
    const res = await fetch(`${API_URL}/stalls`);
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getMenu = async () => {
  try {
    const res = await fetch(`${API_URL}/menu`);
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getOrders = async () => {
  try {
    const res = await fetch(`${API_URL}/orders`);
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getRiders = async () => {
  try {
    const res = await fetch(`${API_URL}/riders`);
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
};
