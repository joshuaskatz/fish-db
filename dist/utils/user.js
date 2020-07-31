'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var getFirstName = function getFirstName(fullName) {
	return fullName.split(' ')[0];
};

var isValidPassword = function isValidPassword(password) {
	return password.length >= 8 && !password.toLowerCase().includes('password');
};

exports.getFirstName = getFirstName;
exports.isValidPassword = isValidPassword;