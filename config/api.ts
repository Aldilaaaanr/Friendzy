export const API_BASE_URL =
    process.env.EXPO_PUBLIC_API_URL ||
    "https://mock.apidog.com/m1/1130685-1122610-983278";

export const getApiUrl = (endpoint: string): string => {
    const cleanEndpoint = endpoint.startsWith("/")
        ? endpoint.slice(1)
        : endpoint;
    return `${API_BASE_URL}/${cleanEndpoint}`;
};
