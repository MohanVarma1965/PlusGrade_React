import { TaxBracket } from "../../models/tax";

export const fetchTaxBracketsApi = async (
  year: number
): Promise<TaxBracket[]> => {
  const response = await fetch(
    `http://localhost:5000/tax-calculator/tax-year/${year}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json().then((data) => data.tax_brackets);
};
