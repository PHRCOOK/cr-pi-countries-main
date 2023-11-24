const request = require("supertest");
const express = require("express");
const activitiesRouter = require("../routes/activitiesRouter");

const app = express();
app.use(express.json());
app.use("/activities", activitiesRouter);

describe("Activities Router", () => {
  it("should respond to POST", async () => {
    const res = await request(app)
      .post("/activities")
      .send({ name: "Test Activity" });

    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty("error");
  });

  it("should respond to GET", async () => {
    const res = await request(app).get("/activities");

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});
