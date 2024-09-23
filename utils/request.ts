export async function useRequest(url: string, token: string|null, method: 'GET'|'POST'|'PATCH'|'DELETE', formData?: any): Promise<{ data: any, error: any }> {
  const config = useRuntimeConfig();
  const options: {
    baseURL: string,
    method: 'GET'|'POST'|'PATCH'|'DELETE',
    headers: { [key: string]: string },
    body?: any
  } = {
    baseURL: config.public.apiUrl as string || '',
    method: method,
    headers: {},
  }
  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }
  if (formData) {
    options.body = formData;
    console.log('formData', formData);
  }
  const { data, error }: { data: any, error: any } = await useFetch(url, options);
  return { data: data.value, error: error.value };
}