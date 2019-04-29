const userModel = require('../app/api/models/users');

module.exports = () => {
  const rootUser = {
    email: 'john.lenon@homesweethome.com',
    firstName: 'John',
    lastName: 'Lenon',
    password: 'hey jude',
  };
  userModel.findOne({ email: rootUser.email }, (err, userInfo) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log('Unable to read if default user exists');
    }
    else if (!userInfo) {
      userModel.create(rootUser, (createError, result) => {
        if (createError) {
          // eslint-disable-next-line no-console
          console.log('Unable to create default user');
          // eslint-disable-next-line no-console
          console.error(createError);
          return;
        }
        // eslint-disable-next-line no-console
        console.log(result);
      });
    }
  });
};
