import { TaxBracket } from "../../models/tax";

const TIMEOUT_DURATION = 6000;
// Helper function for timeout
const timeout = (time: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error("Request is taking too long!")), time);
  });
};

export const fetchTaxBracketsApi = async (year: number): Promise<TaxBracket[]> => {
  const fetchPromise = fetch(`http://localhost:5000/tax-calculator/tax-year/${year}`);
  const response = await Promise.race([fetchPromise, timeout(TIMEOUT_DURATION)]);

  // Assert the response type
  if (!(response instanceof Response)) {
    throw new Error(response as any);
  }

  if (!response.ok) {
    throw new Error("Network response is not ok");
  }

  return response.json().then((data) => data.tax_brackets);
};
