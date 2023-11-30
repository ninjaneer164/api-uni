import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { Roles } from './controllers/roles.js';
import { Users } from './controllers/users.js';
import { Sessions } from './controllers/sessions.js';

const PORT = 3000;

const typeDefs = `#graphql
  type Role {
    id: ID!
    name: String!
    user: User
  }

  type Session {
    id: ID!
    user: User!
    userId: String!
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    role: Role!
    roleId: String!
    session: Session
  }

  input RoleCreateInput {
    name: String!
  }

  input RoleEditInput {
    id: ID!
    name: String!
  }

  input SessionCreateInput {
    userId: String!
  }

  input UserCreateInput {
    firstName: String!
    lastName: String!
    roleId: String!
  }

  input UserEditInput {
    firstName: String
    id: ID!
    lastName: String
    roleId: String
  }

  type Mutation {
    createRole(data: RoleCreateInput): Role
    createSession(data: SessionCreateInput): Session
    createUser(data: UserCreateInput): User
    editUser(data: UserEditInput): User
    editRole(data: RoleEditInput): Role
    deleteSession(id: ID!): Session
    deleteRole(id: ID!): Role
  }

  type Query {
    roleById(id: ID!): Role
    roleByName(name: String!): Role
    roles: [Role]
    sessionById(id: ID!): Session
    sessionByRoleIdAndUserId(roleId: ID!, userId: ID!): Session
    sessions: [Session]
    userById(id: ID!): User
    users: [User]
  }
`;

const resolvers = {
  Mutation: {
    createRole: Roles.createRole,
    createSession: Sessions.createSession,
    createUser: Users.createUser,
    editUser: Users.editUser,
    editRole: Roles.editRole,
    deleteSession: Sessions.deleteSession,
    deleteRole: Roles.deleteRole,
  },
  Query: {
    roleById: Roles.getRoleById,
    roleByName: Roles.getRoleByName,
    roles: Roles.getRoles,
    sessionById: Sessions.getSessionById,
    sessionByRoleIdAndUserId: Sessions.getSessionByRoleIdAndUserId,
    sessions: Sessions.getSessions,
    userById: Users.getUserById,
    users: Users.getUsers,
  },
  User: {
    role: Roles.getUserRole,
    session: Sessions.getUserSession,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: PORT },
});

console.log(`🚀  Server ready at: ${url}`);
