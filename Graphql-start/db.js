const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("sk", "root", "password", {
  dialect: "mysql",
  host: "127.0.0.1",
});

const User = sequelize.define(
  "users",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      isEmail: true,
    },
    password: { type: DataTypes.STRING, allowNull: false },
  },
  {
    freezeTableNames: true,
    timestamps: false,
  }
);

const TodoList = sequelize.define("todoList", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isCompleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

User.hasMany(TodoList, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  //onUpdate: "CASCADE",
});

TodoList.belongsTo(User, { onDelete: "CASCADE" });

// sequelize.sync({ force: true }).then(() => {
//   return User.create({
//     name: "sk",
//     email: "sk@gamil.com",
//     password: "123435",
//   })
//     .then((user) => {
//       return user.createTodoList({
//         description: "test todo",
//       });
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// });

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = {
  sequelize,
  User,
  TodoList,
};
