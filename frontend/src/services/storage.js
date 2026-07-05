// Local storage utility service to persist favorites, predictions, and quiz recommendations history.

const KEYS = {
  FAVORITES: 'fashion_assistant_favorites',
  HISTORY: 'fashion_assistant_history',
};

export const getFavorites = () => {
  const data = localStorage.getItem(KEYS.FAVORITES);
  return data ? JSON.parse(data) : [];
};

export const saveFavorite = (item) => {
  const favorites = getFavorites();
  // Avoid duplicate saves
  const exists = favorites.some((fav) => fav.id === item.id);
  if (!exists) {
    favorites.push({ ...item, savedAt: new Date().toISOString() });
    localStorage.setItem(KEYS.FAVORITES, JSON.stringify(favorites));
  }
  return favorites;
};

export const removeFavorite = (itemId) => {
  const favorites = getFavorites();
  const updated = favorites.filter((fav) => fav.id !== itemId);
  localStorage.setItem(KEYS.FAVORITES, JSON.stringify(updated));
  return updated;
};

export const isFavorite = (itemId) => {
  const favorites = getFavorites();
  return favorites.some((fav) => fav.id === itemId);
};

export const getHistory = () => {
  const data = localStorage.getItem(KEYS.HISTORY);
  return data ? JSON.parse(data) : [];
};

export const saveHistoryItem = (historyItem) => {
  const history = getHistory();
  const newItem = {
    id: `hist_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString(),
    ...historyItem,
  };
  history.unshift(newItem); // Prepend so latest shows first
  // Keep history size reasonable (e.g., last 20 items)
  const cappedHistory = history.slice(0, 20);
  localStorage.setItem(KEYS.HISTORY, JSON.stringify(cappedHistory));
  return cappedHistory;
};

export const clearHistory = () => {
  localStorage.removeItem(KEYS.HISTORY);
  return [];
};
