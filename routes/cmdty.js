// Author:      Naman KHater
// BASE URL:    /cmdty

const express = require("express");
const { createCmdty } = require("../controllers/create.cmdty.controller");
const router = express.Router();

// URL:     /create
// METHOD:  POST
// DESC:    Create Cmdty
router.post(
	"/create",
    createCmdty
);

module.exports = router;
