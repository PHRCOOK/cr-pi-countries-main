const { Sequelize } = require("sequelize");
const defineActivityModel = require("../models/Activity");

describe("Activity model", () => {
  let db;
  let Activity;
  let activity;

  beforeAll(async () => {
    db = new Sequelize("postgres://postgres:P1234567@localhost:5432/countries");
    Activity = defineActivityModel(db);
    await db.sync();
  });

  beforeEach(async () => {
    activity = await Activity.create({
      name: "Caminata",
      difficulty: 3,
      duration: 60,
      season: "Summer",
    });
  });

  test("create activity", async () => {
    expect(activity.id).toBe(1);
    expect(activity.name).toBe("Caminata");
    expect(activity.difficulty).toBe(3);
    expect(activity.duration).toBe(60);
    expect(activity.season).toBe("Summer");
  });

  afterAll(async () => {
    await db.close();
  });
});
