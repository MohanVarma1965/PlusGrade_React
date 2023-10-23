import { TaxBracket } from "../../models/tax";

export interface TaxCalculatorState {
  loading: boolean;
  taxBrackets: TaxBracket[];
  error: string | null;
}

export const initialState: TaxCalculatorState = {
  taxBrackets: [],
  loading: false,
  error: null,
};
