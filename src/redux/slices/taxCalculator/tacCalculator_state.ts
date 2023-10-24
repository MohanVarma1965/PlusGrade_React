// Import the TaxBracket model for defining the structure of tax brackets
import { TaxBracket } from "../../models/tax";

// structure for the state of the tax calculator
export interface TaxCalculatorState {
  loading: boolean;
  taxBrackets: TaxBracket[];
  error: string | null;
}

// Set the initial state values for the tax calculator
export const initialState: TaxCalculatorState = {
  taxBrackets: [],
  loading: false,
  error: null,
};
