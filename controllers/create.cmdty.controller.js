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

    data.cmdtyId = !isEmpty(data.cmdtyId) ? data.cmdtyId : "";
    data.cmdtyName = !isEmpty(data.cmdtyName) ? data.cmdtyName : "";

    if (validator.isEmpty(data.cmdtyName)){
        errors.cmdtyName = 'cmdtyName is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

exports.createCmdty = async (req, res) => {
    // Validation
    const { errors, isValid } = validate(req.body);
    if (!isValid) {
        return res.json({
            status: false,
            message: "Data Invalid",
            errors
        })
    }
    const { cmdtyId, cmdtyName } = req.body;
    var cmdty = await Cmdty.findOne({where: {id: cmdtyId}});
    if (cmdty) {
        return res.json({
            status: false,
            message: "Cmdty already exists with given Id"
        })
    }
    else {
        const obj = {
            id: cmdtyId || uuid4(),
            cmdtyName,
        };
        cmdty = await Cmdty.create(obj);
        return res.json({
            status: true,
            message: "Cmdty created",
            cmdty
        })
    }
};
