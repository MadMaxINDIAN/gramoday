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

		data.userId = !isEmpty(data.userId) ? data.userId : "";
		data.marketId = !isEmpty(data.marketId) ? data.marketId : "";
		data.cmdtyId = !isEmpty(data.cmdtyId) ? data.cmdtyId : "";
		data.priceUnit = !isEmpty(data.priceUnit) ? data.priceUnit : "";
		data.convFactor = !isEmpty(data.convFactor) ? data.convFactor : "";
		data.price = !isEmpty(data.price) ? data.price : "";

		if (validator.isEmpty(data.userId)) {
			errors.userId = "userId is required";
		}
		if (validator.isEmpty(data.marketId)) {
			errors.marketId = "marketId is required";
		}
		if (validator.isEmpty(data.cmdtyId)) {
			errors.cmdtyId = "cmdtyId is required";
		}
		if (validator.isEmpty(data.priceUnit)) {
			errors.priceUnit = "priceUnit is required";
		}
		if (typeof data.convFactor != "number") {
			errors.convFactor = "Invalid convFactor";
		} else if (typeof data.convFactor == "number" && data.convFactor <= 0) {
			errors.convFactor = "Invalid convFactor";
		}
		if (typeof data.price != "number") {
			errors.price = "Invalid price";
		} else if (typeof data.price == "number" && data.price <= 0) {
			errors.price = "Invalid price";
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

exports.createReport = async (req, res) => {
	// Validation
	const { errors, isValid } = validate(req.body);
	if (!isValid) {
		return res.json({
			status: false,
			message: "Data Invalid",
			errors,
		});
	}
	const { userId, marketId, cmdtyId, price, convFactor } = req.body;
	const user = await User.findOne({ where: { id: userId } });
	if (!user) {
		return res.json({
			status: false,
			message: "User not found with given Id",
		});
	}
	const market = await Market.findOne({ where: { id: marketId } });
	if (!market) {
		return res.json({
			status: false,
			message: "Market not found with given Id",
		});
	}
	const cmdty = await Cmdty.findOne({ where: { id: cmdtyId } });
	if (!cmdty) {
		return res.json({
			status: false,
			message: "Cmdty not found with given Id",
		});
	}
	var start = new Date();
	start.setHours(0, 0, 0, 0);
	var report = await Report.findOne({
		where: { MarketId: marketId, CmdtyId: cmdtyId, date: start },
	});
	if (report) {
		const data = await Report.findOne({
			where: {
				UserId: userId,
				MarketId: marketId,
				CmdtyId: cmdtyId,
				date: start,
				reportID: report.reportID,
			}
		})
		if (data) {
			return res.json({
				status: false,
				message: "Same record exists"
			})
		} else {
			report = await Report.create({
				UserId: userId,
				MarketId: marketId,
				CmdtyId: cmdtyId,
				date: start,
				reportID: report.reportID,
				price: price/convFactor
			});
		}
	} else {
        report = await Report.create({
            UserId: userId,
			MarketId: marketId,
			CmdtyId: cmdtyId,
			date: start,
			reportID: uuid4(),
			price: price/convFactor
		})
    }
    return res.json({
        status: true,
        message: "Report saved",
        reportID: report.reportID
    })
};
