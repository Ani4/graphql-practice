const graphql = require("graphql");
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
} = graphql;
const books = require("../../mock/books");
const authors = require("../../mock/author");
const _ = require("lodash");

// Schemas
// * BOOK
const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        isbn: { type: GraphQLID },
        title: { type: GraphQLString },
        subtitle: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return _.find(authors, { id: parent.author });
            },
        },
        published: { type: GraphQLString },
        publisher: { type: GraphQLString },
        pages: { type: GraphQLString },
        description: { type: GraphQLString },
        website: { type: GraphQLString },
    }),
});

// * Author
const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new graphql.GraphQLList(BookType),
            resolve(parent, args) {
                return _.filter(books, { author: parent.id });
            },
        },
    }),
});

// RootSchema
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: {
                id: { type: GraphQLID },
            },
            resolve(parent, args) {
                // logic goes here
                return _.find(books, { id: args.id });
            },
        },
        author: {
            type: AuthorType,
            args: {
                id: { type: GraphQLString },
            },
            resolve(parent, args) {
                // logic goes here
                return _.find(authors, { id: args.id });
            },
        },
        books: {
            type: new graphql.GraphQLList(BookType),
            resolve: (parent, args) => books,
        },
        authors: {
            type: new graphql.GraphQLList(AuthorType),
            resolve: (parent, args) => authors,
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
});
