// Author:      Naman KHater
// BASE URL:    /user

const express = require("express");
const { createReport } = require("../controllers/create.report.controller");
const { createUser } = require("../controllers/create.user.controller");
const router = express.Router();

// URL:     /create
// METHOD:  POST
// DESC:    Create report
router.post(
	"/create",
    createUser
);

module.exports = router;
