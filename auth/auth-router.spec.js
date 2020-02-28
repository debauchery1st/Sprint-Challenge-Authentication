const request = require("supertest");

const server = require("../api/server.js");

describe("auth router", function() {
  const testUsername = `user${Math.ceil(Math.random() * 1024)}test`;
  let testToken = "";
  describe("GET /api/auth/login", function() {
    it("GET login should return 404", function() {
      return request(server)
        .get("/api/auth/login")
        .then(res => {
          expect(res.status).toBe(404);
        });
    });
    it("GET register should return 404", function() {
      return request(server)
        .get("/api/auth/register")
        .then(res => {
          expect(res.status).toBe(404);
        });
    });
    it("POST register should return 201", function() {
      return request(server)
        .post("/api/auth/register")
        .send({ username: testUsername, password: "testPassword" })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(201);
    });
    it("POST login should return 200", function() {
      return request(server)
        .post("/api/auth/login")
        .send({ username: testUsername, password: "testPassword" })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .then(res => {
          testToken = res.body.token || false;
          expect(res.status).toBe(200);
          expect(testToken);
        });
    });
  });
});
