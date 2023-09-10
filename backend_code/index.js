const express = require("express");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const countryRoute = require("./routes/base_tables/country");
const stateRoute = require("./routes/base_tables/state");
const districtRoute = require("./routes/base_tables/district");
const streamRoute = require("./routes/base_tables/stream");
const universityRoute = require("./routes/base_tables/university");
const roleRoute = require("./routes/role");
const competitionRoute = require("./routes/competition");
const organisationRoute = require("./routes/organisations");
const departmentRoute = require("./routes/departments");
const mainCategoryRoute = require("./routes/mainCategories");
const heiRoute = require("./routes/base_tables/hei");
const subCategoryRoute = require("./routes/subCategories");
const problemStatementRoute = require("./routes/problemStatement");
const projectRoute = require("./routes/project");
const fundingAgencyRoute = require("./routes/fundingAgency");


// const roleMiddleware = require("./middleware/roleMiddleware");

require("dotenv").config();

const dbConnection = require("./utils/DBconnection");
const roleMiddleware = require("./middleware/roleMiddleware");


const app = express();

app.use(express.json());
app.use(require("cors")());
app.use(express.urlencoded({extended:true}));

const routePrefix = "api";

//app.use("*", roleMiddleware);

app.use(`/${routePrefix}/auth`, authRoute);
app.use(`/${routePrefix}/user`, userRoute);
app.use(`/${routePrefix}/countries`, countryRoute);
app.use(`/${routePrefix}/states`, stateRoute);
app.use(`/${routePrefix}/districts`, districtRoute);
app.use(`/${routePrefix}/streams`, streamRoute);
app.use(`/${routePrefix}/role`, roleRoute);
app.use(`/${routePrefix}/universities`, universityRoute);
app.use(`/${routePrefix}/competition`, competitionRoute);
app.use(`/${routePrefix}/hei`, heiRoute);
app.use(`/${routePrefix}/organisations`, organisationRoute);
app.use(`/${routePrefix}/departments`, departmentRoute);
app.use(`/${routePrefix}/main-categories`, mainCategoryRoute);
app.use(`/${routePrefix}/sub-categories`, subCategoryRoute);
app.use(`/${routePrefix}/problemStatement`, problemStatementRoute)
app.use(`/${routePrefix}/project`, projectRoute)
app.use(`/${routePrefix}/fundingAgency`, fundingAgencyRoute)
// app.use(`/ch`, subCategoryRoute);


app.listen(4000, async () => {
  try {
    await dbConnection(process.env.MONGO_URI);

    console.log("dbConnected at", process.env.MONGO_URI);
  } catch (error) {
    console.log("Db not connected");
  }
});
