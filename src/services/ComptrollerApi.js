import {  baseUrl, fetchClient } from './fetchClient'

const API_URL = `${baseUrl}/api/taxreports`; 

export const getAllTaxReports = async () => {
  try {
    const data = await fetchClient(API_URL);
    return data;
  } catch (error) {
    console.error('Error fetching Comptroller data:', error);
    throw error;
  }
};

export const updateTaxReport = async (report) => {
  try {
    const apiUrl = `${API_URL}/${report.id}`
    const data = await fetchClient(apiUrl, 'PUT', report);
    return data;
  } catch (error) {
    console.error('Error updating Comptroller data:', error);
    throw error;
  }
};

// creating a new report
export const createTaxReport = async (newReport) => {
  try {
    const data = await fetchClient(API_URL, 'POST', newReport)
    return data;
  } catch (error) {
    console.error('Error creating Comptroller data:', error);
    throw error;
  }
}

export const deleteTaxReport = async (reportId) => {
  try {
    const data = await fetchClient(`${API_URL}/${reportId}`, 'DELETE');
    return data;
  } catch (error) {
    console.error('Error deleting Comptroller data:', error);
    throw error;
  }
}