/**
 * API configuration utility with dynamic localhost fallback for GitHub Pages
 * When hosted on GitHub Pages (https://theoriongd.github.io/ZENTHLYR/), API calls
 * route directly to the local backend core at http://127.0.0.1:8000.
 * In local dev (localhost:5173), Vite proxy forwards /api and /assets_vault seamlessly.
 */

const isGitHubPages = typeof window !== 'undefined' && window.location.hostname.includes('github.io');

export const API_BASE_URL = isGitHubPages 
  ? (localStorage.getItem('zenthlyr_core_url') || 'http://127.0.0.1:8000') 
  : '';

export function getApiUrl(endpoint) {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_BASE_URL}${cleanEndpoint}`;
}

export function getAssetUrl(filename) {
  return `${API_BASE_URL}/assets_vault/${encodeURIComponent(filename)}`;
}
