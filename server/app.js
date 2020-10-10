const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");

const app = express();
const port = process.env.PORT || 4000;
const www = process.env.WWW || "./";

// initial of graphQL API
app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

app.use(express.static(www));
console.log(`serving ${www}`);

app.get("*", (req, res) => {
    res.send("hello");
});

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
