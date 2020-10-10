const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 4000;
const www = process.env.WWW || "./";
const { url } = require("./env");
mongoose.connect(url, { useNewUrlParser: true }).then(
    (c) => console.log("successfully connected to database", c),
    (e) => console.error("Failed while connecting to data base", e)
);
// initial of graphQL API
app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

app.use(express.static(www));
console.log(`serving ${www}`);

app.get("*", (req, res) => {
    res.send("hello");
});

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
