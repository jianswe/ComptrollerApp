export const baseUrl = import.meta.env.VITE_COMPTROLLER_API_URL 

export const fetchClient = async (apiUrl, httpMethod = 'GET', dataToSend = '') => {
    const token = localStorage.getItem('userToken'); // Retrieve token from localStorage
  
    let headers = {
      'Content-Type': 'application/json', // Optional: Set content type
    };  
    if (token) headers.Authorization = `Bearer ${token}` // Add JWT to Authorization header
  
    let request = {
      method: httpMethod,
      headers: headers,
    }
    if (httpMethod === 'POST' || httpMethod === 'PUT') {
      request.body = JSON.stringify(dataToSend)
    }
    const response = await fetch(apiUrl, request);

    // Check for 401 or other errors but don't handle it here
    if (!response.ok) {
      if (response.status === 401) {
        // Let the caller handle token expiration or unauthorized access
        console.error('Token expired or unauthorized.');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json(); // Parse the JSON response
}
