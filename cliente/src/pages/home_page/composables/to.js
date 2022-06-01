export async function to(promise) {
  const response = { data: null, error: null };

  try {
    const data = await promise;
    response.data = data;
  } catch (error) {
    response.error = error;
  }
  return response;
}
