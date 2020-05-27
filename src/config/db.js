const { Pool } = require("pg");

module.exports = new Pool({
    user: "Lucas",
    password: "Javascript",
    host: "localhost",
    port: 5432,
    database: "gym_manager"
});