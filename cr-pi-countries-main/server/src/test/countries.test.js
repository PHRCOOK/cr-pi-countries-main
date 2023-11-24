const request = require("supertest");
const express = require("express");
const countriesRouter = require("../routes/countriesRouter");

const app = express();
app.use("/countries", countriesRouter);

describe("Test /countries routes", () => {
  test("GET /countries", async () => {
    try {
      const response = await request(app).get("/countries");
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    } catch (error) {
      console.error(error);
      throw error;
    }
  });

  test("GET /countries/:idPais", async () => {
    try {
      const response = await request(app).get("/countries/ARG");
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("name");
      expect(response.body).toHaveProperty("population");
      expect(response.body).toHaveProperty("area");
    } catch (error) {
      console.error(error);
      throw error;
    }
  });
});
