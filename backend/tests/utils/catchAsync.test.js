const catchAsync = require("../../utils/catchAsync");

describe("catchAsync", () => {
  let mockReq, mockRes, mockNext;

  beforeEach(() => {
    mockReq = {};
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    mockNext = jest.fn();
  });

  it("should call the async function with req, res, next", async () => {
    const asyncFn = jest.fn().mockResolvedValue(undefined);
    const wrappedFn = catchAsync(asyncFn);

    await wrappedFn(mockReq, mockRes, mockNext);

    expect(asyncFn).toHaveBeenCalledWith(mockReq, mockRes, mockNext);
  });

  it("should catch errors and pass them to next", async () => {
    const testError = new Error("Test error");
    const asyncFn = jest.fn().mockRejectedValue(testError);
    const wrappedFn = catchAsync(asyncFn);

    await wrappedFn(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(testError);
  });

  it("should not call next on successful execution", async () => {
    const asyncFn = jest.fn().mockResolvedValue(undefined);
    const wrappedFn = catchAsync(asyncFn);

    await wrappedFn(mockReq, mockRes, mockNext);

    expect(mockNext).not.toHaveBeenCalled();
  });

  it("should return a function", () => {
    const asyncFn = jest.fn();
    const result = catchAsync(asyncFn);

    expect(typeof result).toBe("function");
  });
});
