import { TaxBracket } from "../../models/tax";
import { TIMEOUT_DURATION } from "../../../constants/taxConstants";

//TODO: can be added as a new utility function
// Helper function for timeout
// Useful for handling API request timeouts.
const timeout = (time: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error("Request is taking too long!")), time);
  });
};

/**
 * Function to fetch tax brackets for a given year
 *
 * This function fetches tax brackets from the server for the specified year.
 * It uses Promise.race to handle timeouts and ensures the API doesn't take longer than the specified TIMEOUT_DURATION.
 *
 */
export const fetchTaxBracketsApi = async (year: number): Promise<TaxBracket[]> => {
  // Fetch promise to retrieve tax brackets for the given year
  const fetchPromise = fetch(`http://localhost:5000/tax-calculator/tax-year/${year}`);

  // Use Promise.race to handle potential timeout of fetch request
  const response = await Promise.race([fetchPromise, timeout(TIMEOUT_DURATION)]);

  // Handle non-successful HTTP responses
  if (!(response instanceof Response)) {
    throw new Error(response as any);
  }

  if (!response.ok) {
    throw new Error("Network response is not ok");
  }

  // parse and return the JSON response
  return response.json().then((data) => data.tax_brackets);
};
