# GraphQL API with Automated Testing

Simple GraphQL API implementation with comprehensive test suite built with TypeScript and Node.js.

## Project Structure

```
├── index.ts              # HTTP server implementation
├── schema.ts             # GraphQL schema and resolvers
├── tests/
│   ├── graphql.test.ts   # Main test suite
│   └── test-utils.ts     # Test utilities
├── jest.config.js        # Jest configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies and scripts
```

## Installation

```bash
npm install
```

## Running the Server

```bash
npm run dev
```

The GraphQL endpoint will be available at `http://localhost:4000/graphql`

## API Schema

### Queries

**listUsers(limit: Int): [User!]!**
Returns a list of all users, optionally limited by the limit parameter.

**getUser(id: ID!): User**
Returns a specific user by ID, or null if not found.

### User Type

- `id: ID!` - Unique identifier
- `name: String!` - User's full name
- `email: String!` - User's email address
- `age: Int` - User's age (optional)

## Example Queries

### Get all users
```graphql
query {
  listUsers {
    id
    name
    email
    age
  }
}
```

### Get users with limit
```graphql
query listUsers($limit: Int) {
  listUsers(limit: $limit) {
    id
    name
    email
  }
}
```

Variables:
```json
{ "limit": 2 }
```

### Get specific user
```graphql
query getUser($id: ID!) {
  getUser(id: $id) {
    id
    name
    email
    age
  }
}
```

Variables:
```json
{ "id": "random1" }
```

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run tests with detailed output
npm run test:verbose
```

### Test Coverage

The test suite covers:

- **Functional Tests**: Validates correct query responses and data structures
- **Error Handling**: Tests invalid queries and non-existent resources
- **Performance Tests**: Ensures queries execute within 100ms
- **Security Tests**: Validates proper error handling for invalid fields and queries

### Test Results

All tests validate the following requirements:
- Valid queries return expected data structures
- Invalid queries and missing users are handled appropriately
- Query execution time remains under 100ms
- Non-existent fields and queries return proper GraphQL errors

## Development

### Available Scripts

- `npm run dev` - Start development server with ts-node
- `npm run build` - Compile TypeScript to JavaScript
- `npm test` - Run test suite
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate coverage report
- `npm run test:verbose` - Run tests with detailed output

### Sample Data

The API includes three sample users for testing:
- random1: lebron james (lebron@gmail.com, age: 42)
- random2: lebron james 2 (lebron2@gmail.com, age: 42)  
- random3: lebron james 3 (lebron3@gmail.com, no age)

## Technical Implementation

- **Framework**: Native Node.js HTTP server with graphql-http
- **Schema**: GraphQL schema with custom resolvers
- **Data Storage**: In-memory array (no external database)
- **Testing**: Jest with TypeScript support
- **Type Safety**: Full TypeScript implementation