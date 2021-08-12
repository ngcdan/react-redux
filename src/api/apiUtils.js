export async function handleResponse(response) {
  if (response.ok) return response.json();
  throw response;
}

export function handleError(error) {
  console.error("API call falded " + error);
  throw error;
}