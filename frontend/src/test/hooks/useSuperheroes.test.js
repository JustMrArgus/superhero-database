import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useSuperheroes } from "../../hooks/useSuperheroes";
import { superheroApi } from "../../services/api";

vi.mock("../../services/api", () => ({
  superheroApi: {
    getAll: vi.fn(),
    getById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("useSuperheroes", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("initializes with default values", () => {
    const { result } = renderHook(() => useSuperheroes());

    expect(result.current.superheroes).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.currentPage).toBe(1);
    expect(result.current.totalPages).toBe(1);
  });

  describe("fetchSuperheroes", () => {
    it("fetches superheroes and updates state", async () => {
      const mockSuperheroes = [
        { _id: "1", nickname: "Superman" },
        { _id: "2", nickname: "Batman" },
      ];
      superheroApi.getAll.mockResolvedValueOnce({
        data: { superheroes: mockSuperheroes },
      });

      const { result } = renderHook(() => useSuperheroes());

      await act(async () => {
        await result.current.fetchSuperheroes(1);
      });

      expect(result.current.superheroes).toEqual(mockSuperheroes);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(null);
    });

    it("sets error on fetch failure", async () => {
      superheroApi.getAll.mockRejectedValueOnce(new Error("Network error"));

      const { result } = renderHook(() => useSuperheroes());

      await act(async () => {
        await result.current.fetchSuperheroes(1);
      });

      expect(result.current.error).toBe("Network error");
      expect(result.current.loading).toBe(false);
    });

    it("updates currentPage after fetch", async () => {
      superheroApi.getAll.mockResolvedValueOnce({
        data: { superheroes: [] },
      });

      const { result } = renderHook(() => useSuperheroes());

      await act(async () => {
        await result.current.fetchSuperheroes(3);
      });

      expect(result.current.currentPage).toBe(3);
    });
  });

  describe("createSuperhero", () => {
    it("creates superhero and refreshes list", async () => {
      const newHero = { _id: "3", nickname: "Spider-Man" };
      superheroApi.create.mockResolvedValueOnce({
        data: { superhero: newHero },
      });
      superheroApi.getAll.mockResolvedValueOnce({
        data: { superheroes: [newHero] },
      });

      const { result } = renderHook(() => useSuperheroes());
      const formData = new FormData();

      await act(async () => {
        await result.current.createSuperhero(formData);
      });

      expect(superheroApi.create).toHaveBeenCalledWith(formData);
      expect(superheroApi.getAll).toHaveBeenCalled();
    });

    it("sets error on create failure", async () => {
      superheroApi.create.mockRejectedValueOnce(new Error("Create failed"));

      const { result } = renderHook(() => useSuperheroes());

      await act(async () => {
        try {
          await result.current.createSuperhero(new FormData());
        } catch {
          /* expected */
        }
      });

      expect(result.current.error).toBe("Create failed");
    });
  });

  describe("updateSuperhero", () => {
    it("updates superhero and refreshes list", async () => {
      const updatedHero = { _id: "1", nickname: "Updated Hero" };
      superheroApi.update.mockResolvedValueOnce({
        data: { superhero: updatedHero },
      });
      superheroApi.getAll.mockResolvedValueOnce({
        data: { superheroes: [updatedHero] },
      });

      const { result } = renderHook(() => useSuperheroes());
      const formData = new FormData();

      await act(async () => {
        await result.current.updateSuperhero("1", formData);
      });

      expect(superheroApi.update).toHaveBeenCalledWith("1", formData);
    });

    it("sets error on update failure", async () => {
      superheroApi.update.mockRejectedValueOnce(new Error("Update failed"));

      const { result } = renderHook(() => useSuperheroes());

      await act(async () => {
        try {
          await result.current.updateSuperhero("1", new FormData());
        } catch {
          /* expected */
        }
      });

      expect(result.current.error).toBe("Update failed");
    });
  });

  describe("deleteSuperhero", () => {
    it("deletes superhero and refreshes list", async () => {
      superheroApi.delete.mockResolvedValueOnce(true);
      superheroApi.getAll.mockResolvedValueOnce({
        data: { superheroes: [] },
      });

      const { result } = renderHook(() => useSuperheroes());

      await act(async () => {
        await result.current.deleteSuperhero("1");
      });

      expect(superheroApi.delete).toHaveBeenCalledWith("1");
      expect(superheroApi.getAll).toHaveBeenCalled();
    });

    it("sets error on delete failure", async () => {
      superheroApi.delete.mockRejectedValueOnce(new Error("Delete failed"));

      const { result } = renderHook(() => useSuperheroes());

      await act(async () => {
        try {
          await result.current.deleteSuperhero("1");
        } catch {
          /* expected */
        }
      });

      expect(result.current.error).toBe("Delete failed");
    });
  });

  describe("getSuperhero", () => {
    it("fetches a single superhero", async () => {
      const hero = { _id: "1", nickname: "Superman" };
      superheroApi.getById.mockResolvedValueOnce({
        data: { superhero: hero },
      });

      const { result } = renderHook(() => useSuperheroes());

      let fetchedHero;
      await act(async () => {
        fetchedHero = await result.current.getSuperhero("1");
      });

      expect(superheroApi.getById).toHaveBeenCalledWith("1");
      expect(fetchedHero).toEqual(hero);
    });

    it("sets error on getSuperhero failure", async () => {
      superheroApi.getById.mockRejectedValueOnce(new Error("Fetch failed"));

      const { result } = renderHook(() => useSuperheroes());

      await act(async () => {
        try {
          await result.current.getSuperhero("1");
        } catch {
          /* expected */
        }
      });

      expect(result.current.error).toBe("Fetch failed");
    });
  });
});
