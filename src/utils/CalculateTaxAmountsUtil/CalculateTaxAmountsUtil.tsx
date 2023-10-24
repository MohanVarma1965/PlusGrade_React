export const CalculateTaxAmountsUtil = (income: number, taxBrackets: any[]): number[] => {
  const calculateTaxForBracket = (bracket: any) => {
    if (income > (bracket.min || 0)) {
      const applicableIncome = bracket.max ? Math.min(income, bracket.max) - bracket.min : income - bracket.min;
      return applicableIncome * bracket.rate;
    }
    return 0;
  };

  return taxBrackets.map((bracket) => calculateTaxForBracket(bracket));
};
