const request = require("supertest");
const express = require("express");
const countriesRouter = require("../routes/countriesRouter");

const app = express();
app.use("/countries", countriesRouter);

describe("Test /countries routes", () => {
  test("GET /countries", async () => {
    const response = await request(app).get("/countries");
    expect(response.statusCode).toBe(200);
    // Aquí puedes añadir más expectativas sobre la respuesta
  });

  test("GET /countries/:idPais", async () => {
    const response = await request(app).get("/countries/ARG");
    expect(response.statusCode).toBe(200);
    // Aquí puedes añadir más expectativas sobre la respuesta
  });
});
