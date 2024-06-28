# Apollo Server with GraphQL

This repository demonstrates a simple GraphQL server setup using Apollo Server with Express. It includes schema definition, mock data, resolvers for querying users and increasing vote counts, and basic setup instructions.

## Getting Started

### Prerequisites

Make sure you have Node.js installed on your machine.

## Consuming the GraphQL API

You can consume the GraphQL API hosted at [https://wingie-fake-api.vercel.app/graphql](https://wingie-fake-api.vercel.app/graphql).

#### Example Queries

#### Query to Fetch Users

```graphql
{
  users {
    id
    name
    username
    email
    phone
    website
    aboutMe
    photo
    numberOfVote
  }
}
```

#### Query to Fetch a User by ID

```graphql
{
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      username
      email
      phone
      website
      aboutMe
      photo
      numberOfVote
    }
  }
}
```

#### Mutation to Increase Vote Count

```graphql
mutation IncreaseVote($id: ID!) {
  increaseVote(id: $id) {
    id
    name
    numberOfVote
  }
}
```
