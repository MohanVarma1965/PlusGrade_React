import { CalculateTaxAmountsUtil } from "./CalculateTaxAmountsUtil";

describe("CalculateTaxAmountsUtil Function", () => {
  // 1. Basic functionality
  it("1.1 calculates tax for a single bracket correctly", () => {
    const taxBrackets = [{ min: 0, max: 10000, rate: 0.1 }];
    expect(CalculateTaxAmountsUtil(5000, taxBrackets)).toEqual([500]);
  });

  // 2. Handling of edge cases
  it("2.1 returns 0 tax for 0 income", () => {
    const taxBrackets = [{ min: 0, max: 10000, rate: 0.1 }];
    expect(CalculateTaxAmountsUtil(0, taxBrackets)).toEqual([0]);
  });

  it("2.2 returns 0 tax for no tax brackets", () => {
    expect(CalculateTaxAmountsUtil(5000, [])).toEqual([]);
  });

  it("2.3 returns 0 tax when income is below the lowest bracket", () => {
    const taxBrackets = [{ min: 10000, max: 20000, rate: 0.1 }];
    expect(CalculateTaxAmountsUtil(5000, taxBrackets)).toEqual([0]);
  });

  // 3. Multiple tax brackets
  it("3.1 calculates tax for multiple brackets", () => {
    const taxBrackets = [
      { min: 0, max: 10000, rate: 0.1 },
      { min: 10001, max: 20000, rate: 0.15 },
    ];
    expect(CalculateTaxAmountsUtil(15000, taxBrackets)).toEqual([1000, 749.85]);
  });

  // 4. Bracket with no max limit
  it("4.1 calculates tax for a bracket with no max correctly", () => {
    const taxBrackets = [{ min: 0, rate: 0.1 }];
    expect(CalculateTaxAmountsUtil(50000, taxBrackets)).toEqual([5000]);
  });

  // 5. Income in between two brackets
  it("5.1 calculates tax correctly when income is in between two brackets", () => {
    const taxBrackets = [
      { min: 0, max: 10000, rate: 0.1 },
      { min: 10001, max: 20000, rate: 0.15 },
      { min: 20001, rate: 0.2 },
    ];
    expect(CalculateTaxAmountsUtil(10500, taxBrackets)).toEqual([1000, 74.85, 0]);
  });
});
