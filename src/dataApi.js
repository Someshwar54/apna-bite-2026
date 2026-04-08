import Papa from 'papaparse';

// Helper to fetch and parse CSV files from public folder
export const fetchData = async (fileName) => {
  try {
    const res = await fetch(`/data/${fileName}`);
    if (!res.ok) {
       throw new Error(`Failed to fetch ${fileName}: ${res.statusText}`);
    }
    const text = await res.text();
    return new Promise((resolve, reject) => {
      Papa.parse(text, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results) => {
          resolve(results.data);
        },
        error: (error) => {
          console.error(`Error parsing ${fileName}:`, error);
          reject(error);
        }
      });
    });
  } catch (err) {
    console.error(err);
    return []; // Return empty array to prevent infinite loading
  }
};

// Application specific data loaders
export const getStalls = () => fetchData('stalls_30.csv');
export const getMenu = () => fetchData('menu_30.csv');
export const getOrders = () => fetchData('orders_30.csv');
export const getRiders = () => fetchData('riders_30.csv');
