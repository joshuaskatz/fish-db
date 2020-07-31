'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _getUserId = require('../utils/getUserId');

var _getUserId2 = _interopRequireDefault(_getUserId);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Subscription = {
	myTackle: {
		subscribe: function subscribe(parent, args, _ref, info) {
			var prisma = _ref.prisma,
			    request = _ref.request;

			var userId = (0, _getUserId2.default)(request);

			return prisma.subscription.tackle({
				where: {
					node: {
						author: {
							id: userId
						}
					}
				}
			}, info);
		}
	}
};

exports.default = Subscription;