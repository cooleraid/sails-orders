/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
const bcrypt = require('bcryptjs');
const hashPassword = (value) => {
	/* eslint no-param-reassign:off */
	const hash = bcrypt.hashSync(value.password, 8);
	value.password = hash;
	return value;
};
module.exports = {
	primaryKey: 'id',
	attributes: {
		email: {
			type: 'string',
			required: true,
			isEmail: true,
			unique: true
		},
		password: {
			type: 'string',
			required: true
		}
	},
	beforeCreate(value, next) {
		if (!_.isNull(value.password) && !_.isEmpty(value.password)) hashPassword(value);
		next();
	},
	customToJSON: function () {
		return _.omit(this, ['password'])
	},
	verifyPassword(user, pass, cb) {
		const obj = user;
		if (cb) return bcrypt.compare(pass, obj.password, cb);
		return bcrypt.compareSync(pass, obj.password);
	},
	hashPassword(pass) {
		const obj = {
			password: pass,
		};
		if (!_.isNull(pass)) hashPassword(obj);
		return obj.password;
	},
	validationMessages: {
		email: {
			required: 'Email is required',
		},
		password: {
			required: 'Password is required',
		},
	},
}
