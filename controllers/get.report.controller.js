const validator = require("validator");
const isEmpty = require("./../utils/objectIsEmpty");
const db = require("./../models");
const User = db.user;
const uuid4 = require("uuid4");
const Market = db.market;
const Report = db.report;
const Cmdty = db.cmdty;

const validate = (data) => {
	try {
		let errors = {};

        data.reportId = !isEmpty(data.reportId) ? data.reportId : "";
		
		if (validator.isEmpty(data.reportId)) {
            errors.reportId = "reportId is required";
		} else if (!uuid4.valid(data.reportId)) {
            errors.reportId = "reportId is not valid";
        }

		return {
			errors,
			isValid: isEmpty(errors),
		};
	} catch (e) {
		return {
			errors: {data: "Invalid input"},
			isValid: false 
		}
	}
};

exports.getReport = async (req, res) => {
	// Validation
	const { errors, isValid } = validate(req.query);
	if (!isValid) {
		return res.json({
			status: false,
			message: "Data Invalid",
			errors,
		});
	}
	
    const { reportId } = req.query;
    const report = await Report.findAll({where: {reportId}});
    if (report) {
        const users = [];
        var price = 0;
        for (let key in report) {
            users.push(report[key].UserId);
            price += report[key].price;
        }
        const cmdty = await Cmdty.findOne({where: {id: report[0].CmdtyId}});
        const market = await Market.findOne({where: {id: report[0].MarketId}});
        const data = {
            id: reportId,
            cmdtyId: report[0].CmdtyId,
            cmdtyName: cmdty.cmdtyName,
            marketName: market.marketName,
            marketId: report[0].MarketId,
            price: price/users.length,
            priceUnit: "Kg",
            users,
            timestamp: report[0].date
        }
        return res.json({
            status: true,
            message: "Report compiled successfully",
            report: data
        })
    } else {
        return res.json({
            status: true,
            message: "No report found for given ID"
        })
    }
};
