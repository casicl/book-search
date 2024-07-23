//define the query and mutation functionality to work with the Mongoose models
//typedefs must correspond to the resolvers
const { User } = require("../models");
const { signToken } = require("../utils/auth");
// const { saveBook, deleteBook } = require("../controllers/user-controller");
const { AuthErr } = require("../utils/auth");

const resolvers = {
  Query: {
    // user: async () => {
    //     return User.find();
    // },

    // user: async (parent, {userId}) => {
    //     return User.findOne({_id: userId});
    // },

    //come back to this
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).select("-__v -password");
      }
      throw AuthErr;
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthErr;
      }
      //match to front end or something
      const passwordMatch = await user.passwordMatches(password);
      //error if password is incorrect
      if (!passwordMatch) {
        throw AuthErr;
      }
      const token = signToken(user);
      return { token, user };
    },

    saveBook: async (parent, { bookInfo }, context) => {
      console.log("resolver", bookInfo);
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $push: { savedBooks: bookInfo },
          },
          {
            new: true,
            runValidators: true,
          }
        );
        return user;
      }
      //do not allow if user not logged in
      throw AuthErr;
    },
    //delete a book the user has saved?? from their savedbooks
    deleteBook: async (parent, { bookId }, context) => {
      console.log("deletebook", this.deleteBook, context.user._id, bookId);
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
        return updatedUser;
      }
      throw AuthErr;
    },
  },
};

module.exports = resolvers;
