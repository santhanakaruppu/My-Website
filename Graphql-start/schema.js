const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLNonNull,
} = require("graphql");

const { User, TodoList } = require("./db");

const UserType = new GraphQLObjectType({
  name: "user",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    todolist: {
      type: new GraphQLList(TodoType),
      resolve(parent, args) {
        return TodoList.findAll({ where: { userId: parent.id } });
      },
    },
  }),
});

const TodoType = new GraphQLObjectType({
  name: "todo",
  fields: () => ({
    id: { type: GraphQLID },
    description: { type: GraphQLString },
    isCompleted: { type: GraphQLBoolean },
    user: {
      type: UserType,
      resolve(parent, args) {
        return User.findByPk(parent.userId);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.findAll();
      },
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findByPk(args.id);
      },
    },
    todolist: {
      type: new GraphQLList(TodoType),
      resolve(parent, args) {
        return TodoList.findAll();
      },
    },
    todo: {
      type: TodoType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return TodoList.findByPk(args.id);
      },
    },
  },
});

const mutation = new GraphQLObjectType({
  name: "mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const user = new User({
          name: args.name,
          email: args.email,
          password: args.password,
        });
        return user.save();
      },
    },

    deleteUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const user = User.destroy({ where: { id: args.id } });
        return "todo deleted Successfully";
      },
    },

    updateUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parent, args) {
        const todo = User.update(args, { where: { id: args.id } });
        return User.findByPk(args.id);
      },
    },
    addTodo: {
      type: TodoType,
      args: {
        description: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLID) },
        isCompleted: { type: GraphQLBoolean },
      },
      resolve(parent, args) {
        const todo = new TodoList({
          description: args.description,
          isCompleted: args.isCompleted,
          userId: args.userId,
        });
        return todo.save();
      },
    },
    deleteTodo: {
      type: TodoType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const todo = TodoList.destroy({ where: { id: args.id } });
        return "todo deleted Successfully";
      },
    },

    updateTodo: {
      type: TodoType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        isCompleted: { type: GraphQLBoolean },
        userId: { type: GraphQLID },
      },
      resolve(parent, args) {
        const todo = TodoList.update(args, { where: { id: args.id } });
        return TodoList.findByPk(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
