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

    data.userId = !isEmpty(data.userId) ? data.userId : "";
    data.userName = !isEmpty(data.userName) ? data.userName : "";

    if (validator.isEmpty(data.userName)){
        errors.userName = 'userName is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

exports.createUser = async (req, res) => {
    // Validation
    const { errors, isValid } = validate(req.body);
    if (!isValid) {
        return res.json({
            status: false,
            message: "Data Invalid",
            errors
        })
    }
    const { userId, userName } = req.body;
    var user = await User.findOne({where: {id: userId}});
    if (user) {
        return res.json({
            status: false,
            message: "User already exists with given Id"
        })
    }
    else {
        const obj = {
            id: userId || uuid4(),
            name: userName
        };
        user = await User.create(obj);
        return res.json({
            status: true,
            message: "User created",
            user
        })
    }
};
