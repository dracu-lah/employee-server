const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors"); // Import CORS

const app = express();
app.use(cors()); // Use CORS
app.use(bodyParser.json());

let data = require("./employees.json");

// CREATE
app.post("/employee", (req, res) => {
  const employee = req.body;
  data.push(employee);

  fs.writeFileSync("./employees.json", JSON.stringify(data));
  res.send("Employee added successfully!");
});

// READ
app.get("/employee/:id", (req, res) => {
  const id = req.params.id;
  const employee = data.find((emp) => emp.EmpID === id);

  res.send(employee);
});

// READ ALL
app.get("/employees", (req, res) => {
  res.send(data);
});

// UPDATE
app.put("/employee/:id", (req, res) => {
  const id = req.params.id;
  const employee = data.find((emp) => emp.EmpID === id);

  employee.Name = req.body.Name;
  employee.Salary = req.body.Salary;

  fs.writeFileSync("./employees.json", JSON.stringify(data));
  res.send("Employee updated successfully!");
});

// DELETE
app.delete("/employee/:id", (req, res) => {
  const id = req.params.id;
  const employeeIndex = data.findIndex((emp) => emp.EmpID === id);

  data.splice(employeeIndex, 1);

  fs.writeFileSync("./employees.json", JSON.stringify(data));
  res.send("Employee deleted successfully!");
});

app.listen(8000, () => console.log("Server started on port 8000"));
