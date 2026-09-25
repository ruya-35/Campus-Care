const BASE_URL = "";

export async function apiClient(path, options = {}) {
    const response = await fetch(`${BASE_URL}${path}`, options);

    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}.`);
    }

    return response.json();
}