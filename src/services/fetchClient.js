export const baseUrl = import.meta.env.VITE_COMPTROLLER_API_URL ?? "https://comptrollerapi.azurewebsites.net"

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
    const contentType = response.headers.get('Content-Type');

    let data = null;
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    // If response is not ok, throw an error with status and response data
    if (!response.ok) {
      const error = new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
      error.response = {
        status: response.status,
        statusText: response.statusText,
        body: data, // Attach the response body to the error
      };
      throw error;
    }

    return data;
}
