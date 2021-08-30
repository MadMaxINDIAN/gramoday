// Author:      Naman KHater
// BASE URL:    /report

const express = require("express");
const { createReport } = require("../controllers/create.report.controller");
const { getReport } = require("../controllers/get.report.controller");
const router = express.Router();

// URL:     /create
// METHOD:  POST
// DESC:    Create report
router.post("/create", createReport);

// URL:     /
// METHOD:  GET
// DESC:    GET report
router.get("/", getReport);

module.exports = router;
