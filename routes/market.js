// Author:      Naman KHater
// BASE URL:    /market

const express = require("express");
const { createMarket } = require("../controllers/create.market.controller");
const router = express.Router();

// URL:     /create
// METHOD:  POST
// DESC:    Create report
router.post(
	"/create",
    createMarket
);

module.exports = router;
