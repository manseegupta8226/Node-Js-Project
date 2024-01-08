const User = require("../models/User");
const Order = require("../models/Order");
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = "343771537642-e77417pc0bl861t94l6sd68qs00g9pav.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);

const createToken = (id) => {
    return jwt.sign({ id }, 'THISISOUTSECRETKEYIAMEXCITEDTOWORKATVOOSH');
};

module.exports.addUser = async (req, res) => {
    const { name, email, phone_number, password } = req.body
    console.log(req.body)
    try {
        const user = await User.create({ name, email, phone_number, password });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true });
        res.status(201).json(user);
    }
    catch (err) {
        console.log(err);
        res.status(400).send('error, user not created');
    }
}

module.exports.loginUser = async (req, res) => {
    if (req.body.login_by == "google") {
        console.log(req.body)
        const { email, name, login_by } = req.body;
        try {
            const user = await User.findOne({ email });
            if (user) {
                console.log("user exist")
                const token = createToken(user._id);
                res.cookie('jwt', token, { httpOnly: true });
            } else {
                console.log("new user")
                let password="qwerty123"
                const user = await User.create({ name, email, password });
                const token = createToken(user._id);
                res.cookie('jwt', token, { httpOnly: true });
                res.status(201).json({ _id:user._id, name:user.name });
            }
            res.status(200).json({  _id:user._id, name:user.name  });
        } catch (err) {
            console.log(err)
        }

    } else {
        console.log(req.body)
        const { phone_number, password } = req.body
        try {
            const user = await User.login(phone_number, password);
            const token = createToken(user._id);
            res.cookie('jwt', token, { httpOnly: true });
            res.status(200).json({ _id:user._id, name:user.name });
        } catch (err) {
            console.log(err)
            res.status(400).json(err.message);
        }
    }

    // try {
    //     const user = await User.login(phone_number, password);
    //     const token = createToken(user._id);
    //     res.cookie('jwt', token, { httpOnly: true });
    //     res.status(200).json({user});
    //   } catch (err) {
    //     console.log(err)
    //     res.status(400).json({error:err});
    //   }
}

module.exports.addOrder = async (req, res) => {
    const { user_id, orderItem, sub_total, phone_number } = req.body;
    console.log(req.body)
    try {
        const order = await Order.create({ user_id, orderItem, sub_total, phone_number });
        res.status(201).json(order);
    }
    catch (err) {
        console.log(err);
        res.status(400).send('error, order not created');
    }
}

module.exports.getOrder = async (req, res, next) => {
    console.log(req.query.user_id)
    const userId = req.query.user_id

    try {
        const orders = await Order.find({ user_id: userId });
        console.log(orders)
        res.status(201).json(orders);
    }
    catch (err) {
        console.log(err);
        res.status(400).send('error, order list not found');
    }
}

module.exports.getLogin = async (req, res, next) => {
    res.send('LOGIN ');
}