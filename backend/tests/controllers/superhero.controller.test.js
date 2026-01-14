const superheroController = require("../../controllers/superhero.controller");
const Superhero = require("../../models/superhero.model");
const AppError = require("../../utils/appError");

jest.mock("../../models/superhero.model");

describe("Superhero Controller", () => {
  let mockReq, mockRes, mockNext;

  beforeEach(() => {
    mockReq = {
      query: {},
      params: {},
      body: {},
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    mockNext = jest.fn();

    jest.clearAllMocks();
  });

  describe("getAllSuperheroes", () => {
    it("should return all superheroes with default pagination", async () => {
      const mockSuperheroes = [
        { nickname: "Superman", real_name: "Clark Kent" },
        { nickname: "Batman", real_name: "Bruce Wayne" },
      ];

      const mockQuery = {
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue(mockSuperheroes),
      };
      Superhero.find.mockReturnValue(mockQuery);

      await superheroController.getAllSuperheroes(mockReq, mockRes, mockNext);

      expect(Superhero.find).toHaveBeenCalled();
      expect(mockQuery.skip).toHaveBeenCalledWith(0);
      expect(mockQuery.limit).toHaveBeenCalledWith(100);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "success",
        data: {
          superheroes: mockSuperheroes,
        },
      });
    });

    it("should handle pagination parameters", async () => {
      mockReq.query = { page: "2", limit: "10" };
      const mockSuperheroes = [];

      const mockQuery = {
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue(mockSuperheroes),
      };
      Superhero.find.mockReturnValue(mockQuery);

      await superheroController.getAllSuperheroes(mockReq, mockRes, mockNext);

      expect(mockQuery.skip).toHaveBeenCalledWith(10);
      expect(mockQuery.limit).toHaveBeenCalledWith(10);
    });
  });

  describe("getSuperhero", () => {
    it("should return a superhero by id", async () => {
      const mockSuperhero = {
        _id: "123",
        nickname: "Superman",
        real_name: "Clark Kent",
      };
      mockReq.params.id = "123";

      Superhero.findById.mockResolvedValue(mockSuperhero);

      await superheroController.getSuperhero(mockReq, mockRes, mockNext);

      expect(Superhero.findById).toHaveBeenCalledWith("123");
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "success",
        data: {
          superhero: mockSuperhero,
        },
      });
    });

    it("should call next with AppError when superhero not found", async () => {
      mockReq.params.id = "nonexistent";
      Superhero.findById.mockResolvedValue(null);

      await superheroController.getSuperhero(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalled();
      const error = mockNext.mock.calls[0][0];
      expect(error).toBeInstanceOf(AppError);
      expect(error.message).toBe("No superhero found with that ID");
      expect(error.statusCode).toBe(404);
    });
  });

  describe("createSuperhero", () => {
    it("should create a new superhero", async () => {
      const superheroData = {
        nickname: "Spider-Man",
        real_name: "Peter Parker",
        origin_description: "Bitten by a radioactive spider",
        superpowers: ["Web-slinging", "Spider-sense"],
        catch_phrase: "With great power comes great responsibility",
        images: ["spiderman.jpg"],
      };
      mockReq.body = superheroData;

      const createdSuperhero = { _id: "456", ...superheroData };
      Superhero.create.mockResolvedValue(createdSuperhero);

      await superheroController.createSuperhero(mockReq, mockRes, mockNext);

      expect(Superhero.create).toHaveBeenCalledWith(superheroData);
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "success",
        data: {
          superhero: createdSuperhero,
        },
      });
    });
  });

  describe("updateSuperhero", () => {
    it("should update an existing superhero", async () => {
      mockReq.params.id = "123";
      mockReq.body = { nickname: "Updated Superman" };

      const updatedSuperhero = {
        _id: "123",
        nickname: "Updated Superman",
        real_name: "Clark Kent",
      };
      Superhero.findByIdAndUpdate.mockResolvedValue(updatedSuperhero);

      await superheroController.updateSuperhero(mockReq, mockRes, mockNext);

      expect(Superhero.findByIdAndUpdate).toHaveBeenCalledWith(
        "123",
        { nickname: "Updated Superman" },
        { new: true, runValidators: true }
      );
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "success",
        data: {
          superhero: updatedSuperhero,
        },
      });
    });

    it("should call next with AppError when superhero not found", async () => {
      mockReq.params.id = "nonexistent";
      mockReq.body = { nickname: "Updated" };
      Superhero.findByIdAndUpdate.mockResolvedValue(null);

      await superheroController.updateSuperhero(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalled();
      const error = mockNext.mock.calls[0][0];
      expect(error).toBeInstanceOf(AppError);
      expect(error.message).toBe("No superhero found with that ID");
      expect(error.statusCode).toBe(404);
    });
  });

  describe("deleteSuperhero", () => {
    it("should delete a superhero", async () => {
      mockReq.params.id = "123";
      const deletedSuperhero = { _id: "123", nickname: "Superman" };
      Superhero.findByIdAndDelete.mockResolvedValue(deletedSuperhero);

      await superheroController.deleteSuperhero(mockReq, mockRes, mockNext);

      expect(Superhero.findByIdAndDelete).toHaveBeenCalledWith("123");
      expect(mockRes.status).toHaveBeenCalledWith(204);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "success",
        data: null,
      });
    });

    it("should call next with AppError when superhero not found", async () => {
      mockReq.params.id = "nonexistent";
      Superhero.findByIdAndDelete.mockResolvedValue(null);

      await superheroController.deleteSuperhero(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalled();
      const error = mockNext.mock.calls[0][0];
      expect(error).toBeInstanceOf(AppError);
      expect(error.message).toBe("No superhero found with that ID");
      expect(error.statusCode).toBe(404);
    });
  });
});
