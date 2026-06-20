 // Get image URL with base URL
  const getImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith('http')) return path;
    return `${import.meta.env.VITE_STORAGE_BASE_URL || ''}${path}`;
  };

  export { getImageUrl };