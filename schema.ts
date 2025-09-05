import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
} from "graphql";

const usersData = [
  {
    id: "random1",
    name: "lebron james",
    email: "lebron@gmail.com",
    age: 42,
  },
  {
    id: "random2",
    name: "lebron james 2",
    email: "lebron2@gmail.com",
    age: 42,
  },
  {
    id: "random3",
    name: "lebron james 3",
    email: "lebron3@gmail.com",
    age: 35,
  },
];

interface User {
  id: string;
  name: string;
  email: string;
  age?: number;
}

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      listUsers: {
        type: new GraphQLList(UserType),
        args: {
          limit: { type: GraphQLInt },
        },
        resolve: (parent, args) => {
          const { limit } = args;
          if (limit && limit > 0) {
            return usersData.slice(0, limit);
          }
          return usersData;
        },
      },
      getUser: {
        type: UserType,
        args: {
          id: { type: new GraphQLNonNull(GraphQLID) }, // not null ID
        },
        resolve: (parent, args): User | null => {
          const { id } = args;
          const user = usersData.find((u) => u.id === id);
          return user || null;
        },
      },
    },
  }),
});
