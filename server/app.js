const express = require("express");
const graphqlHTTP = require("express-graphql");
const app = express();
const port = process.env.PORT || 4000;
const www = process.env.WWW || "./";

app.use("/graphql", graphqlHTTP({}));
app.use(express.static(www));
console.log(`serving ${www}`);

app.get("*", (req, res) => {
    res.send("hello");
});

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
