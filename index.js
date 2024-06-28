import { ApolloServer, gql } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import http from "http";
import express from "express";
import cors from "cors";


const app = express();
app.use(cors());
app.use(express.json());
const httpServer = http.createServer(app);

// Define your schema
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    username: String!
    email: String!
    phone: String!
    website: String!
    aboutMe: String!
    photo: String!
    numberOfVote: Int!
  }
  type Query {
    users: [User!]!
    user(id: ID!): User
  }
  type Mutation {
    increaseVote(id: ID!): User
  }
`;

// Mock data
const users = [
  {
    id: 1,
    name: "John Doe",
    username: "johndoe",
    email: "john@example.com",
    phone: "123-456-7890",
    website: "johndoe.com",
    aboutMe: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    photo: "https://randomuser.me/api/portraits/men/1.jpg",
    numberOfVote: 0
  },
  {
    id: 2,
    name: "Jane Doe",
    username: "janedoe",
    email: "jane@example.com",
    phone: "123-456-7891",
    website: "janedoe.com",
    aboutMe: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices.",
    photo: "https://randomuser.me/api/portraits/women/2.jpg",
    numberOfVote: 0
  },
  {
    id: 3,
    name: "Alice Smith",
    username: "alicesmith",
    email: "alice@example.com",
    phone: "123-456-7892",
    website: "alicesmith.com",
    aboutMe: "Curabitur vehicula nisi at quam vehicula, ac feugiat eros iaculis.",
    photo: "https://randomuser.me/api/portraits/women/3.jpg",
    numberOfVote: 0
  },
  {
    id: 4,
    name: "Bob Johnson",
    username: "bobjohnson",
    email: "bob@example.com",
    phone: "123-456-7893",
    website: "bobjohnson.com",
    aboutMe: "Pellentesque habitant morbi tristique senectus et netus et malesuada.",
    photo: "https://randomuser.me/api/portraits/men/4.jpg",
    numberOfVote: 0
  },
  {
    id: 5,
    name: "Charlie Brown",
    username: "charliebrown",
    email: "charlie@example.com",
    phone: "123-456-7894",
    website: "charliebrown.com",
    aboutMe: "Suspendisse potenti. Nullam vehicula lectus ac quam facilisis.",
    photo: "https://randomuser.me/api/portraits/men/5.jpg",
    numberOfVote: 0
  }
];

// Define your resolvers
const resolvers = {
    Query: {
      users: () => users.sort((a, b) => b.numberOfVote - a.numberOfVote),
      user: (_, { id }) => users.find(user => user.id == id)
    },
    Mutation: {
      increaseVote: (_, { id }) => {
        const user = users.find(user => user.id == id);
        if (!user) {
          throw new Error(`User not found with ID: ${id}`);
        }
        user.numberOfVote++;
        return user;
      }
    }
  };


// // Create the Apollo Server instance
// const server = new ApolloServer({ typeDefs, resolvers });

// // Start the server
// server.listen().then(({ url }) => {
//   console.log(`🚀 Server ready at ${url}`);
// });



const startApolloServer = async(app, httpServer) => {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    await server.start();
    server.applyMiddleware({ app });
  }

  startApolloServer(app, httpServer);

  export default httpServer;