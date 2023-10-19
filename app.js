const express = require("express");
const app = express();
const sql = require('mssql');

app.get("/data", async function (req, res) {
  try {
    await sql.connect('Server=172.23.0.2,1433;Database=TEST;User Id=sa;Password=Thieu@098551298;Encrypt=false;');
    const result = await sql.query`select * from TestINFO`;
    console.log('Connected');

    res.status(200).json(result.recordset); // Sending the result to the client as JSON
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  } finally {
    sql.close(); // Close the SQL connection
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
