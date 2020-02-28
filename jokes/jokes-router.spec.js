const request = require("supertest");

const server = require("../api/server.js");

// replace after expiration
const testToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6InN0dWRlbnQ0MiIsImlhdCI6MTU4MjkwOTAzNywiZXhwIjoxNTgyOTk1NDM3fQ.5JW9nKEggphU5GB4hpVlHno9Q7htw80Ma4SCdzdSuqk";

describe("jokes router", function() {
  describe("GET /api/jokes", function() {
    it("UNAUTHORIZED should return 401", function() {
      return request(server)
        .get("/api/jokes")
        .then(res => {
          expect(res.status).toBe(401);
        });
    });

    it("UNAUTHORIZED displays {'you': 'shall not pass!'}", function() {
      return request(server)
        .get("/api/jokes")
        .then(res => {
          expect(res.body.you).toBe("shall not pass!");
        });
    });

    it("UNAUTHORIZED returns a JSON formatted body", function() {
      return request(server)
        .get("/api/jokes")
        .then(res => {
          expect(res.type).toMatch(/json/);
        });
    });

    it("AUTHORIZED returns 200", function() {
      return request(server)
        .get("/api/jokes")
        .set("Accept", "application/json")
        .set("Authorization", testToken)
        .then(res => {
          expect(res.status).toBe(200);
        });
    });

    it("AUTHORIZED displays a populated list", function() {
      return request(server)
        .get("/api/jokes")
        .set("Accept", "application/json")
        .set("Authorization", testToken)
        .then(res => {
          expect(res.body.length > 0).toBe(true);
        });
    });

    it("AUTHORIZED displays a list of objects, each containing a joke", function() {
      return request(server)
        .get("/api/jokes")
        .set("Accept", "application/json")
        .set("Authorization", testToken)
        .then(res => {
          expect(
            res.body
              .map(o => Object.keys(o).includes("joke"))
              .reduce((a, b) => a && b)
          ).toBe(true);
        });
    });

    it("AUTHORIZED returns a JSON formatted body", function() {
      return request(server)
        .get("/api/jokes")
        .set("Accept", "application/json")
        .set("Authorization", testToken)
        .then(res => {
          expect(res.type).toMatch(/json/);
        });
    });
  });
});
