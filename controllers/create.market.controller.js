const validator = require("validator");
const isEmpty = require("./../utils/objectIsEmpty");
const db = require("./../models");
const User = db.user;
const uuid4 = require("uuid4");
const Market = db.market;
const Report = db.report;
const Cmdty = db.cmdty;

const validate = (data) => {
    let errors = {};

    data.marketId = !isEmpty(data.marketId) ? data.marketId : "";
    data.marketName = !isEmpty(data.marketName) ? data.marketName : "";
    data.marketType = !isEmpty(data.marketType) ? data.marketType : "";

    if (validator.isEmpty(data.marketName)){
        errors.marketName = 'marketName is required';
    }
    if (validator.isEmpty(data.marketType)){
        errors.marketType = 'marketType is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

exports.createMarket = async (req, res) => {
    // Validation
    const { errors, isValid } = validate(req.body);
    if (!isValid) {
        return res.json({
            status: false,
            message: "Data Invalid",
            errors
        })
    }
    const { marketId, marketName, marketType } = req.body;
    var market = await Market.findOne({where: {id: marketId}});
    if (market) {
        return res.json({
            status: false,
            message: "Market already exists with given Id"
        })
    }
    else {
        const obj = {
            id: marketId || uuid4(),
            marketName,
            marketType
        };
        market = await Market.create(obj);
        return res.json({
            status: true,
            message: "Market created",
            market
        })
    }
};
