const saltedMd5 = require('salted-md5');
const jwt = require('jsonwebtoken');
const userModel = require('../models/users');

module.exports = {
  create(req, res, next) {
    userModel.create(req.body, (err, result) => {
      if (err) next(err);
      else res.json({ status: 'success', message: 'User added successfully!!!', data: result });
    });
  },

  authenticate(req, res, next) {
    if (!req.body.email || !req.body.password) {
      res.status(400).send('email and password are required');
      return;
    }
    userModel.findOne({ email: req.body.email }, (err, userInfo) => {
      console.log({ password: saltedMd5(req.body.password) });
      if (err) {
        next(err);
      }
      else if (userInfo !== null
        && saltedMd5(req.body.password, process.env.SECRET_KEY) === userInfo.password
      ) {
        // eslint-disable-next-line no-underscore-dangle
        const token = jwt.sign({ id: userInfo._id }, req.app.get('secretKey'), { expiresIn: '1h' });
        const userInfoWithoutPassword = {};
        userInfoWithoutPassword._id = userInfo._id;
        userInfoWithoutPassword.email = userInfo.email;
        userInfoWithoutPassword.firstName = userInfo.firstName;
        userInfoWithoutPassword.lastName = userInfo.lastName;
        res.json({ status: 'success', message: 'user found!!!', data: { user: userInfoWithoutPassword, token } });
      }
      else {
        res.status(401).send('invalid email/password combination');
      }
    });
  },
};
