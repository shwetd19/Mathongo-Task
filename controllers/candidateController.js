const Candidate = require("../models/Candidate");
const mongoose = require('mongoose');
const excel = require("exceljs");
const async = require("async");
const fs = require("fs");
const path = require("path");

exports.uploadCandidates = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const workbook = new excel.Workbook();
    await workbook.xlsx.load(req.file.buffer);
    const worksheet = workbook.getWorksheet(1);

    const candidates = [];
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber !== 1) {
        const cityValue = row.getCell(3).value || "City is Not entered";
        candidates.push({
          name: row.getCell(1).value,
          email: row.getCell(2).value,
          city: cityValue,
        });
      }
    });

    let successfulAdds = 0;
    let failedAdds = [];
    let totalCandidates = candidates.length;

    await async.eachSeries(
      candidates,
      async (candidate, index) => {
        try {
          const existingCandidate = await Candidate.findOne({
            email: candidate.email,
          });
          if (!existingCandidate) {
            await Candidate.create(candidate);
            successfulAdds++;
          } else {
            console.error(
              "Skipping candidate with duplicate email:",
              candidate
            );
            failedAdds.push(candidate);
          }
        } catch (error) {
          console.error("Error uploading candidate:", error);
        }
      },
      (err) => {
        if (err) {
          console.error("Error processing candidates:", err);
          return res.status(500).json({ error: "Internal server error" });
        }

        const notAddedDueToDuplicateEmailsCsv = failedAdds
          .map(
            (candidate) =>
              `${candidate.name},${candidate.email},${candidate.city}\n`
          )
          .join("");

        console.log("CSV Content:", notAddedDueToDuplicateEmailsCsv);

        try {
          const filePath = path.resolve(__dirname, "../notaddedusers.csv");
          fs.writeFileSync(filePath, notAddedDueToDuplicateEmailsCsv, {
            encoding: "utf-8",
          });
          console.log(`CSV file written to: ${filePath}`);
        } catch (writeError) {
          console.error("Error writing to CSV file:", writeError);
        }

        console.log(`Successfully added: ${successfulAdds}`);
        console.log(`Not added due to duplicate emails: ${failedAdds.length}`);
        console.log(`Total candidates processed: ${totalCandidates}`);

        res.status(201).json({
          message: "Candidates uploaded successfully",
          successfulAdds: successfulAdds,
          failedAdds: failedAdds.length,
          totalCandidates: totalCandidates,
        });
      }
    );
  } catch (error) {
    console.error("Error uploading candidates:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.status(200).json(candidates);
  } catch (error) {
    console.error("Error fetching candidates:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllCandidateEmails = async (req, res) => {
  try {
    // Find all candidates in the database
    const candidates = await Candidate.find({}, 'email'); // Only select the 'email' field
    // Extract the emails into an array
    const emails = candidates.map(candidate => candidate.email);
    // Send the array of emails in the response
    res.status(200).json(emails);
  } catch (error) {
    console.error("Error fetching candidate emails:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};