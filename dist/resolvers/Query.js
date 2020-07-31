'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _getUserId = require('../utils/getUserId');

var _getUserId2 = _interopRequireDefault(_getUserId);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Query = {
	users: function users(parent, args, _ref, info) {
		var prisma = _ref.prisma;

		var opArgs = {
			first: args.first,
			skip: args.skip,
			after: args.after,
			orderBy: args.orderBy
		};

		if (args.query) {
			opArgs.where = {
				OR: [{ name_contains: args.query }]
			};
		}

		return prisma.query.users(opArgs, info);
	},
	me: function me(parent, args, _ref2, info) {
		var prisma = _ref2.prisma,
		    request = _ref2.request;

		var userId = (0, _getUserId2.default)(request);

		return prisma.query.user({
			where: {
				id: userId
			}
		});
	},
	dates: function dates(parent, args, _ref3, info) {
		var prisma = _ref3.prisma;

		var opArgs = {};

		if (args.query) {
			opArgs.where = {
				OR: [{ date_contains: args.query }]
			};
		}

		return prisma.query.dateses(opArgs, info);
	},
	myDates: function myDates(parent, args, _ref4, info) {
		var prisma = _ref4.prisma,
		    request = _ref4.request;

		var userId = (0, _getUserId2.default)(request);

		//add opargs for query/pagination
		return prisma.query.dateses({
			where: {
				author: { id: userId }
			}
		}, info);
	},
	flies: function flies(parent, args, _ref5, info) {
		var prisma = _ref5.prisma;

		var opArgs = {};

		if (args.query || args.type) {
			opArgs.where = {
				OR: [{ name_contains: args.query }, { color_contains: args.query }, { type_contains: args.query }]
			};
		}

		return prisma.query.flies(opArgs, info);
	},
	fish: function fish(parent, args, _ref6, info) {
		var prisma = _ref6.prisma;

		var opArgs = {};

		if (args.query) {
			opArgs.where = {
				OR: [{ species_contains: args.query }, { subspecies_contains: args.query }]
			};
		}

		return prisma.query.fishs(opArgs, info);
	},
	rivers: function rivers(parent, args, _ref7, info) {
		var prisma = _ref7.prisma;

		var opArgs = {};

		if (args.query) {
			opArgs.where = {
				OR: [{ name_contains: args.query }]
			};
		}

		return prisma.query.rivers(opArgs, info);
	},
	tackle: function tackle(parent, args, _ref8, info) {
		var prisma = _ref8.prisma;

		var opArgs = {};

		if (args.query) {
			opArgs.where = {
				OR: [{ rod_contains: args.query }, { rodWeight_contains: args.query }]
			};
		}

		return prisma.query.tackles(opArgs, info);
	},
	myTackle: function myTackle(parent, args, _ref9, info) {
		var prisma = _ref9.prisma,
		    request = _ref9.request;

		var userId = (0, _getUserId2.default)(request);

		return prisma.query.tackles({
			where: {
				author: { id: userId }
			}
		}, info);
	}
};

exports.default = Query;