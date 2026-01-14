const mongoose = require("mongoose");

const superheroSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: [true, "Superhero must have a nickname"],
    trim: true,
  },
  real_name: {
    type: String,
    required: [true, "Superhero must have a real name"],
    trim: true,
  },
  origin_description: {
    type: String,
    required: [true, "Superhero must have a description"],
  },
  superpowers: {
    type: [String],
    required: [true, "Superhero must have superpowers"],
    validate: {
      validator: function (val) {
        return val.length > 0;
      },
      message: "Superhero must have at least one superpower",
    },
  },
  catch_phrase: {
    type: String,
    required: [true, "Superhero must have a catch phrase"],
  },
  images: {
    type: [String],
    required: [true, "Superhero must have images"],
    validate: {
      validator: function (val) {
        return val.length > 0;
      },
      message: "Superhero must have at least one image",
    },
  },
});

const TestSuperhero = mongoose.model("TestSuperhero", superheroSchema);

describe("Superhero Model Schema Validation", () => {
  describe("required fields", () => {
    it("should fail validation without nickname", async () => {
      const superhero = new TestSuperhero({
        real_name: "Clark Kent",
        origin_description: "From Krypton",
        superpowers: ["Flight"],
        catch_phrase: "Up, up and away!",
        images: ["superman.jpg"],
      });

      await expect(superhero.validate()).rejects.toThrow(
        "Superhero must have a nickname"
      );
    });

    it("should fail validation without real_name", async () => {
      const superhero = new TestSuperhero({
        nickname: "Superman",
        origin_description: "From Krypton",
        superpowers: ["Flight"],
        catch_phrase: "Up, up and away!",
        images: ["superman.jpg"],
      });

      await expect(superhero.validate()).rejects.toThrow(
        "Superhero must have a real name"
      );
    });

    it("should fail validation without origin_description", async () => {
      const superhero = new TestSuperhero({
        nickname: "Superman",
        real_name: "Clark Kent",
        superpowers: ["Flight"],
        catch_phrase: "Up, up and away!",
        images: ["superman.jpg"],
      });

      await expect(superhero.validate()).rejects.toThrow(
        "Superhero must have a description"
      );
    });

    it("should fail validation without catch_phrase", async () => {
      const superhero = new TestSuperhero({
        nickname: "Superman",
        real_name: "Clark Kent",
        origin_description: "From Krypton",
        superpowers: ["Flight"],
        images: ["superman.jpg"],
      });

      await expect(superhero.validate()).rejects.toThrow(
        "Superhero must have a catch phrase"
      );
    });
  });

  describe("superpowers validation", () => {
    it("should fail validation with empty superpowers array", async () => {
      const superhero = new TestSuperhero({
        nickname: "Superman",
        real_name: "Clark Kent",
        origin_description: "From Krypton",
        superpowers: [],
        catch_phrase: "Up, up and away!",
        images: ["superman.jpg"],
      });

      await expect(superhero.validate()).rejects.toThrow(
        "Superhero must have at least one superpower"
      );
    });

    it("should pass validation with at least one superpower", async () => {
      const superhero = new TestSuperhero({
        nickname: "Superman",
        real_name: "Clark Kent",
        origin_description: "From Krypton",
        superpowers: ["Flight"],
        catch_phrase: "Up, up and away!",
        images: ["superman.jpg"],
      });

      await expect(superhero.validate()).resolves.not.toThrow();
    });
  });

  describe("images validation", () => {
    it("should fail validation with empty images array", async () => {
      const superhero = new TestSuperhero({
        nickname: "Superman",
        real_name: "Clark Kent",
        origin_description: "From Krypton",
        superpowers: ["Flight"],
        catch_phrase: "Up, up and away!",
        images: [],
      });

      await expect(superhero.validate()).rejects.toThrow(
        "Superhero must have at least one image"
      );
    });

    it("should pass validation with at least one image", async () => {
      const superhero = new TestSuperhero({
        nickname: "Superman",
        real_name: "Clark Kent",
        origin_description: "From Krypton",
        superpowers: ["Flight"],
        catch_phrase: "Up, up and away!",
        images: ["superman.jpg"],
      });

      await expect(superhero.validate()).resolves.not.toThrow();
    });
  });

  describe("trim functionality", () => {
    it("should trim whitespace from nickname", () => {
      const superhero = new TestSuperhero({
        nickname: "  Superman  ",
        real_name: "Clark Kent",
        origin_description: "From Krypton",
        superpowers: ["Flight"],
        catch_phrase: "Up, up and away!",
        images: ["superman.jpg"],
      });

      expect(superhero.nickname).toBe("Superman");
    });

    it("should trim whitespace from real_name", () => {
      const superhero = new TestSuperhero({
        nickname: "Superman",
        real_name: "  Clark Kent  ",
        origin_description: "From Krypton",
        superpowers: ["Flight"],
        catch_phrase: "Up, up and away!",
        images: ["superman.jpg"],
      });

      expect(superhero.real_name).toBe("Clark Kent");
    });
  });

  describe("valid superhero creation", () => {
    it("should pass validation with all valid fields", async () => {
      const superhero = new TestSuperhero({
        nickname: "Superman",
        real_name: "Clark Kent",
        origin_description: "Born on Krypton, sent to Earth as a baby",
        superpowers: ["Flight", "Super strength", "Heat vision"],
        catch_phrase: "Up, up and away!",
        images: ["superman1.jpg", "superman2.jpg"],
      });

      await expect(superhero.validate()).resolves.not.toThrow();
      expect(superhero.nickname).toBe("Superman");
      expect(superhero.superpowers).toHaveLength(3);
      expect(superhero.images).toHaveLength(2);
    });
  });
});
