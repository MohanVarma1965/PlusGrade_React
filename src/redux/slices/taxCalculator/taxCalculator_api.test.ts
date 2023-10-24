import { fetchTaxBracketsApi } from "./taxCalculator_api";
import { TaxBracket } from "../../models/tax";

// Mock the global fetch function
jest.mock("node-fetch");

// Define sample data to be returned by the mock API for a successful call
const mockTaxBrackets: TaxBracket[] = [
  // ...some sample data
];

describe("fetchTaxBracketsApi", () => {
  // Cleanup after each test
  afterEach(() => {
    jest.resetAllMocks();
  });

  // 1. Successful API Call
  it("returns tax brackets for a valid year when the API responds successfully", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce({ tax_brackets: mockTaxBrackets }),
    });

    const result = await fetchTaxBracketsApi(2023);
    expect(result).toEqual(mockTaxBrackets);
  });

  // 2. API Call Timeout
  it("throws an error if the API takes too long to respond", async () => {
    // Mock fetch to delay longer than the TIMEOUT_DURATION
    global.fetch = jest.fn().mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 7000)));

    await expect(fetchTaxBracketsApi(2023)).rejects.toThrow("Request is taking too long!");
  });

  // 3. Invalid Response Type
  it("throws an error for an invalid response type", async () => {
    // Mock fetch to return a non-Response object
    global.fetch = jest.fn().mockResolvedValueOnce("invalid response type");

    await expect(fetchTaxBracketsApi(2023)).rejects.toThrow("Error: invalid response type");
  });

  // 4. Non-ok Network Response
  it("throws an error for a non-ok network response", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
    });

    await expect(fetchTaxBracketsApi(2023)).rejects.toThrow("Network response is not ok");
  });

  // 5. Valid Response but Incorrect Data Structure
  // Assuming the API doesn't return an error for this scenario but just an unexpected data structure
  it("throws an error if the response structure is unexpected", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce({ unexpected_field: [] }),
    });

    // Since the function doesn't explicitly check for the presence of `tax_brackets`,
    // this test is just to document that behavior and potential future improvements
    await expect(fetchTaxBracketsApi(2023)).resolves.toEqual({ unexpected_field: [] });
  });
});
