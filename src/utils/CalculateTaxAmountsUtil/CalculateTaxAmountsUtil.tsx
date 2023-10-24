//Utility function to calculate the tax amounts based on provided income and tax brackets.
export const CalculateTaxAmountsUtil = (income: number, taxBrackets: any[]): number[] => {
  //Helper function to calculate tax for a single bracket based on the income.
  //An object representing a tax bracket. Contains min, max (optional), and rate properties.
  //@returns Calculated tax amount for the provided bracket and income.
  const calculateTaxForBracket = (bracket: any) => {
    if (income > (bracket.min || 0)) {
      const applicableIncome = bracket.max ? Math.min(income, bracket.max) - bracket.min : income - bracket.min;
      return applicableIncome * bracket.rate;
    }
    return 0;
  };

  return taxBrackets.map((bracket) => calculateTaxForBracket(bracket));
};
