const fs = require("fs");
const Papa = require("papaparse");
const path = require("path"); // Importa el módulo 'path'

// Read the CSV file
const csvFilePath = path.resolve(__dirname, "WATCHLIST.csv");
const csvData = fs.readFileSync(csvFilePath, "utf8");

// Parse CSV data
const parsedData = Papa.parse(csvData, { header: true });

// Filter out the columns you need (Const, Title, and URL)
const filteredData = parsedData.data.map((row) => ({
  id: row.Const,
  title: row.Title,
  url: row.URL,
}));

// Convert the movies list to JSON format
const moviesJson = JSON.stringify(filteredData, null, 2);

// Write the JSON data to a file
// const jsonOutputFilePath = "movies.json";
const jsonOutputFilePath = path.join("src", "data", "movies.json");
fs.writeFileSync(jsonOutputFilePath, moviesJson);

console.log("Filtered CSV file saved successfully!");
