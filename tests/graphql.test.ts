import { graphql } from "graphql";
import { schema } from "../schema";

export function measureTime() {
  const start = Date.now();
  return () => Date.now() - start;
}

describe("GraphQL API Tests", () => {
  // Test listUsers returns data
  test("listUsers should return all users", async () => {
    const query = `
      query {
        listUsers {
          id
          name
          email
          age
        }
      }
    `;

    const result = await graphql({ schema, source: query });

    expect(result.errors).toBeUndefined();
    expect(result.data).toBeDefined();
    expect((result.data as any).listUsers).toHaveLength(3);
  });

  // Test with limit
  test("listUsers with limit should work", async () => {
    const query = `
      query listUsers($limit: Int) {
        listUsers(limit: $limit) {
          id
          name
        }
      }
    `;

    const result = await graphql({
      schema,
      source: query,
      variableValues: { limit: 2 },
    });

    expect(result.errors).toBeUndefined();
    expect((result.data as any).listUsers).toHaveLength(2);
  });

  // Test getUser valid
  test("getUser should return specific user", async () => {
    const query = `
      query getUser($id: ID!) {
        getUser(id: $id) {
          id
          name
          email
        }
      }
    `;

    const result = await graphql({
      schema,
      source: query,
      variableValues: { id: "random1" },
    });

    expect(result.errors).toBeUndefined();
    expect((result.data as any).getUser).toBeDefined();
    expect((result.data as any).getUser.id).toBe("random1");
  });

  // Test getUser with non-existent ID
  test("getUser with non-existent ID should return null", async () => {
    const query = `
      query getUser($id: ID!) {
        getUser(id: $id) {
          id
          name
        }
      }
    `;

    const result = await graphql({
      schema,
      source: query,
      variableValues: { id: "fakeid" },
    });

    expect(result.errors).toBeUndefined();
    expect((result.data as any).getUser).toBeNull();
  });

  // Test performance
  test("listUsers should resolve within 100ms", async () => {
    const query = `
      query {
        listUsers {
          id
          name
        }
      }
    `;

    const start = Date.now();
    const result = await graphql({ schema, source: query });
    const time = Date.now() - start;

    expect(result.errors).toBeUndefined();
    expect(time).toBeLessThan(100);
  });

  // Security test: non-existent field
  test("querying non-existent field should return error", async () => {
    const query = `
      query {
        listUsers {
          id
          name
          fakefield
        }
      }
    `;

    const result = await graphql({ schema, source: query });

    expect(result.errors).toBeDefined();
    expect(result.errors).toHaveLength(1);
  });

  // Security test: non-existent query
  test("non-existent query should return error", async () => {
    const query = `
      query {
        fakeQuery {
          id
        }
      }
    `;

    const result = await graphql({ schema, source: query });

    expect(result.errors).toBeDefined();
  });
});
