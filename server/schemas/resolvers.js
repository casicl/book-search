//define the query and mutation functionality to work with the Mongoose models
const {User}= require("../models");
const {signToken} = require("../utils/auth");
const { saveBook, deleteBook } = require("../controllers/user-controller");
const { AuthenticationError } = require("../utils/auth");

const resolvers = {
    Query: {
        // user: async () => {
        //     return User.find();
        // },

        // user: async (parent, {userId}) => {
        //     return User.findOne({_id: userId});
        // },

        me: async (parent, args, context)=> {
            if (context.user) {
                return User.findOne({_id: context.user.id});
            }
            throw AuthenticationError;
        },
    },

    Mutation: {
        addUser: async (parent, {name, email, password})=> {
            const user = await User.create({name, email, password});
            const token = signToken(user);
    
            return {token, user};


        },
        login: async (parent, {email, password})=> {
            const user = await User.findOne({email});

            if (!user) {
                throw AuthenticationError;
            }

            const passwordMatch = await user.iscorrectPassword(password);
//error if password is incorrect
            if (!passwordMatch) {
                throw AuthenticationError;
            }
            const token = signToken(user);
            return {token, user};
        },

        // saveBook: async (parent, {bookInfo}, context)=> {
        //     if (context.user) {
        //         return User.findOneandUpdate(
        //             {_id: userId},
        //             {
        //                 $addBook: {bookInfo: bookInfo},
        //             },
        //             {
        //                 new: true,
        //                 runValidators: true,
        //             }
        //         );
                

        //     }
        //     //do not allow if user not logged in
        //    throw AuthenticationError; 


            
        // },
        //delete a book the user has saved?? from their savedbooks
        deleteBook: async (parent, {bookInfo}, context) => {
            if (context.user) {
                return User.findOneandUpdate(
                    {_id: context.user.id},
                    {$pull: {bookInfo: bookInfo}},
                    {new: true}
                );
            }
            throw AuthenticationError;
        },
     
    },
};

module.exports = resolvers;
