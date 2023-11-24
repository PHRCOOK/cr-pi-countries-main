const { conn, Country } = require("../db.js");
const populateDb = require("../controllers/populateDb.js");

describe("Test populateDb function", () => {
  beforeAll(async () => {
    await conn.sync({ force: true });
  });

  test("populateDb should populate the database", async () => {
    try {
      await populateDb();
      const count = await Country.count();
      expect(count).toBeGreaterThan(0);
    } catch (error) {
      console.error(error);
      expect(true).toBe(false);
    }
  });

  afterAll(async () => {
    await conn.close();
  });
});
