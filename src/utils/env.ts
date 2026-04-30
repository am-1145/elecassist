export const getEnvVar = (key: string): string => {
  // Read from runtime window.ENV (Docker/Cloud Run)
  if (typeof window !== 'undefined' && (window as any).ENV && (window as any).ENV[key]) {
    return (window as any).ENV[key];
  }
  // Fallback to build-time Vite environment variables
  return import.meta.env[key] || '';
};
