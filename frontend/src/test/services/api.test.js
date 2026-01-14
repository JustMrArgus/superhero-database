import { describe, it, expect, vi, beforeEach } from "vitest";
import { superheroApi } from "../../services/api";

const API_URL = "http://localhost:3000";

describe("superheroApi", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
    vi.stubEnv("VITE_API_URL", API_URL);
  });

  describe("getAll", () => {
    it("fetches superheroes with default pagination", async () => {
      const mockResponse = {
        data: { superheroes: [{ nickname: "Superman" }] },
      };
      globalThis.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await superheroApi.getAll();

      expect(globalThis.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/superheroes?page=1&limit=5")
      );
      expect(result).toEqual(mockResponse);
    });

    it("fetches superheroes with custom pagination", async () => {
      const mockResponse = { data: { superheroes: [] } };
      globalThis.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      await superheroApi.getAll(2, 10);

      expect(globalThis.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/superheroes?page=2&limit=10")
      );
    });

    it("throws error when request fails", async () => {
      globalThis.fetch.mockResolvedValueOnce({
        ok: false,
      });

      await expect(superheroApi.getAll()).rejects.toThrow(
        "Failed to fetch superheroes"
      );
    });
  });

  describe("getById", () => {
    it("fetches a single superhero", async () => {
      const mockResponse = { data: { superhero: { nickname: "Batman" } } };
      globalThis.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await superheroApi.getById("123");

      expect(globalThis.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/superheroes/123")
      );
      expect(result).toEqual(mockResponse);
    });

    it("throws error when request fails", async () => {
      globalThis.fetch.mockResolvedValueOnce({
        ok: false,
      });

      await expect(superheroApi.getById("123")).rejects.toThrow(
        "Failed to fetch superhero"
      );
    });
  });

  describe("create", () => {
    it("creates a new superhero", async () => {
      const mockResponse = { data: { superhero: { nickname: "Spider-Man" } } };
      const formData = new FormData();
      formData.append("nickname", "Spider-Man");

      globalThis.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await superheroApi.create(formData);

      expect(globalThis.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/superheroes"),
        {
          method: "POST",
          body: formData,
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("throws error with message from response when request fails", async () => {
      globalThis.fetch.mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({ message: "Validation error" }),
      });

      await expect(superheroApi.create(new FormData())).rejects.toThrow(
        "Validation error"
      );
    });
  });

  describe("update", () => {
    it("updates an existing superhero", async () => {
      const mockResponse = {
        data: { superhero: { nickname: "Updated Hero" } },
      };
      const formData = new FormData();

      globalThis.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await superheroApi.update("123", formData);

      expect(globalThis.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/superheroes/123"),
        {
          method: "PATCH",
          body: formData,
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("throws error with message from response when request fails", async () => {
      globalThis.fetch.mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({ message: "Update failed" }),
      });

      await expect(superheroApi.update("123", new FormData())).rejects.toThrow(
        "Update failed"
      );
    });
  });

  describe("delete", () => {
    it("deletes a superhero", async () => {
      globalThis.fetch.mockResolvedValueOnce({
        ok: true,
      });

      const result = await superheroApi.delete("123");

      expect(globalThis.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/superheroes/123"),
        {
          method: "DELETE",
        }
      );
      expect(result).toBe(true);
    });

    it("throws error when request fails", async () => {
      globalThis.fetch.mockResolvedValueOnce({
        ok: false,
      });

      await expect(superheroApi.delete("123")).rejects.toThrow(
        "Failed to delete superhero"
      );
    });
  });

  describe("getImageUrl", () => {
    it("returns correct image URL", () => {
      const url = superheroApi.getImageUrl("hero.jpg");
      expect(url).toContain("/img/heroes/hero.jpg");
    });
  });
});
