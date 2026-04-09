import Papa from 'papaparse';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

export const getStalls = async () => {
  try {
    const res = await fetch(`${API_BASE}/stalls`);
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getMenu = async () => {
  try {
    const res = await fetch(`${API_BASE}/menu`);
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getOrders = async () => {
  try {
    const res = await fetch(`${API_BASE}/orders`);
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getRiders = async () => {
  try {
    const res = await fetch(`${API_BASE}/riders`);
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
};
