'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _getUserId = require('../utils/getUserId');

var _getUserId2 = _interopRequireDefault(_getUserId);

var _generateToken = require('../utils/generateToken');

var _generateToken2 = _interopRequireDefault(_generateToken);

var _hashPassword = require('../utils/hashPassword');

var _hashPassword2 = _interopRequireDefault(_hashPassword);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Mutation = {
	//Authorizaiton
	createUser: function () {
		var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parent, args, _ref, info) {
			var prisma = _ref.prisma;
			var password, user;
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							_context.next = 2;
							return (0, _hashPassword2.default)(args.data.password);

						case 2:
							password = _context.sent;
							_context.next = 5;
							return prisma.mutation.createUser({
								data: _extends({}, args.data, {
									password: password
								})
							});

						case 5:
							user = _context.sent;
							return _context.abrupt('return', {
								user: user,
								token: (0, _generateToken2.default)(user.id)
							});

						case 7:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, this);
		}));

		function createUser(_x, _x2, _x3, _x4) {
			return _ref2.apply(this, arguments);
		}

		return createUser;
	}(),
	login: function () {
		var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(parent, args, _ref3, info) {
			var prisma = _ref3.prisma;
			var user, isMatch;
			return regeneratorRuntime.wrap(function _callee2$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							_context2.next = 2;
							return prisma.query.user({
								where: { email: args.data.email }
							});

						case 2:
							user = _context2.sent;

							if (user) {
								_context2.next = 5;
								break;
							}

							throw new Error('Unable to login');

						case 5:
							_context2.next = 7;
							return _bcryptjs2.default.compare(args.data.password, user.password);

						case 7:
							isMatch = _context2.sent;

							if (isMatch) {
								_context2.next = 10;
								break;
							}

							throw new Error('Unable to login');

						case 10:
							return _context2.abrupt('return', {
								user: user,
								token: (0, _generateToken2.default)(user.id)
							});

						case 11:
						case 'end':
							return _context2.stop();
					}
				}
			}, _callee2, this);
		}));

		function login(_x5, _x6, _x7, _x8) {
			return _ref4.apply(this, arguments);
		}

		return login;
	}(),
	deleteUser: function deleteUser(parent, args, _ref5, info) {
		var prisma = _ref5.prisma,
		    request = _ref5.request;

		var userId = (0, _getUserId2.default)(request);

		return prisma.mutation.deleteUser({
			where: { id: userId }
		}, info);
	},
	updateUser: function () {
		var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(parent, args, _ref6, info) {
			var prisma = _ref6.prisma,
			    request = _ref6.request;
			var userId;
			return regeneratorRuntime.wrap(function _callee3$(_context3) {
				while (1) {
					switch (_context3.prev = _context3.next) {
						case 0:
							userId = (0, _getUserId2.default)(request);

							if (!(typeof args.data.password === 'string')) {
								_context3.next = 5;
								break;
							}

							_context3.next = 4;
							return (0, _hashPassword2.default)(args.data.password);

						case 4:
							args.data.password = _context3.sent;

						case 5:
							return _context3.abrupt('return', prisma.mutation.updateUser({
								where: { id: userId },
								data: args.data
							}, info));

						case 6:
						case 'end':
							return _context3.stop();
					}
				}
			}, _callee3, this);
		}));

		function updateUser(_x9, _x10, _x11, _x12) {
			return _ref7.apply(this, arguments);
		}

		return updateUser;
	}(),

	//Dates
	createDate: function createDate(parent, args, _ref8, info) {
		var prisma = _ref8.prisma,
		    request = _ref8.request;

		var userId = (0, _getUserId2.default)(request);

		return prisma.mutation.createDates({
			data: _extends({}, args.data, {
				fish: { set: args.data.fish },
				flies: { set: args.data.flies },
				author: {
					connect: { id: userId }
				}
			})
		}, info);
	},
	updateDate: function () {
		var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(parent, args, _ref9, info) {
			var prisma = _ref9.prisma,
			    request = _ref9.request;
			var userId, dateExists;
			return regeneratorRuntime.wrap(function _callee4$(_context4) {
				while (1) {
					switch (_context4.prev = _context4.next) {
						case 0:
							userId = (0, _getUserId2.default)(request);
							_context4.next = 3;
							return prisma.exists.Dates({
								id: args.id,
								author: {
									id: userId
								}
							});

						case 3:
							dateExists = _context4.sent;

							if (dateExists) {
								_context4.next = 6;
								break;
							}

							throw new Error('Cannot update date');

						case 6:
							return _context4.abrupt('return', prisma.mutation.updateDates({
								where: { id: args.id },
								data: args.data
							}, info));

						case 7:
						case 'end':
							return _context4.stop();
					}
				}
			}, _callee4, this);
		}));

		function updateDate(_x13, _x14, _x15, _x16) {
			return _ref10.apply(this, arguments);
		}

		return updateDate;
	}(),
	deleteDate: function () {
		var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(parent, args, _ref11, info) {
			var prisma = _ref11.prisma,
			    request = _ref11.request;
			var userId, dateExists;
			return regeneratorRuntime.wrap(function _callee5$(_context5) {
				while (1) {
					switch (_context5.prev = _context5.next) {
						case 0:
							userId = (0, _getUserId2.default)(request);
							_context5.next = 3;
							return prisma.exists.Dates({
								id: args.id,
								author: {
									id: userId
								}
							});

						case 3:
							dateExists = _context5.sent;

							if (dateExists) {
								_context5.next = 6;
								break;
							}

							throw new Error('Cannot find date');

						case 6:
							return _context5.abrupt('return', prisma.mutation.deleteDates({
								where: { id: args.id }
							}));

						case 7:
						case 'end':
							return _context5.stop();
					}
				}
			}, _callee5, this);
		}));

		function deleteDate(_x17, _x18, _x19, _x20) {
			return _ref12.apply(this, arguments);
		}

		return deleteDate;
	}(),

	//Flies
	createFlies: function createFlies(parent, args, _ref13, info) {
		var prisma = _ref13.prisma,
		    request = _ref13.request;

		var userId = (0, _getUserId2.default)(request);
		return prisma.mutation.createFly({
			data: _extends({}, args.data, {
				author: {
					connect: { id: userId }
				}
			})
		}, info);
	},
	updateFlies: function () {
		var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(parent, args, _ref14, info) {
			var prisma = _ref14.prisma,
			    request = _ref14.request;
			var userId, flyExists;
			return regeneratorRuntime.wrap(function _callee6$(_context6) {
				while (1) {
					switch (_context6.prev = _context6.next) {
						case 0:
							userId = (0, _getUserId2.default)(request);
							_context6.next = 3;
							return prisma.exists.Fly({
								id: args.id,
								author: {
									id: userId
								}
							});

						case 3:
							flyExists = _context6.sent;

							if (flyExists) {
								_context6.next = 6;
								break;
							}

							throw new Error('Cannot update fly');

						case 6:
							return _context6.abrupt('return', prisma.mutation.updateFly({
								where: { id: args.id },
								data: args.data
							}, info));

						case 7:
						case 'end':
							return _context6.stop();
					}
				}
			}, _callee6, this);
		}));

		function updateFlies(_x21, _x22, _x23, _x24) {
			return _ref15.apply(this, arguments);
		}

		return updateFlies;
	}(),
	deleteFlies: function () {
		var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(parent, args, _ref16, info) {
			var prisma = _ref16.prisma;
			var userId, flyExists;
			return regeneratorRuntime.wrap(function _callee7$(_context7) {
				while (1) {
					switch (_context7.prev = _context7.next) {
						case 0:
							userId = (0, _getUserId2.default)(request);
							_context7.next = 3;
							return prisma.exists.Fly({
								id: args.id,
								author: {
									id: userId
								}
							});

						case 3:
							flyExists = _context7.sent;

							if (flyExists) {
								_context7.next = 6;
								break;
							}

							throw new Error('Cannot delete fly');

						case 6:
							return _context7.abrupt('return', prisma.mutation.deleteFly({
								where: { id: args.id }
							}));

						case 7:
						case 'end':
							return _context7.stop();
					}
				}
			}, _callee7, this);
		}));

		function deleteFlies(_x25, _x26, _x27, _x28) {
			return _ref17.apply(this, arguments);
		}

		return deleteFlies;
	}(),

	//Fish
	createFish: function createFish(parent, args, _ref18, info) {
		var prisma = _ref18.prisma,
		    request = _ref18.request;

		var userId = (0, _getUserId2.default)(request);

		return prisma.mutation.createFish({
			data: _extends({}, args.data, {
				author: {
					connect: { id: userId }
				}
			})
		}, info);
	},
	updateFish: function () {
		var _ref20 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(parent, args, _ref19, info) {
			var prisma = _ref19.prisma,
			    request = _ref19.request;
			var userId, fishExists;
			return regeneratorRuntime.wrap(function _callee8$(_context8) {
				while (1) {
					switch (_context8.prev = _context8.next) {
						case 0:
							userId = (0, _getUserId2.default)(request);
							_context8.next = 3;
							return prisma.exists.Fish({
								id: args.id,
								author: {
									id: userId
								}
							});

						case 3:
							fishExists = _context8.sent;

							if (fishExists) {
								_context8.next = 6;
								break;
							}

							throw new Error('Cannot update fish');

						case 6:
							return _context8.abrupt('return', prisma.mutation.updateFish({
								where: { id: args.id },
								data: args.data
							}, info));

						case 7:
						case 'end':
							return _context8.stop();
					}
				}
			}, _callee8, this);
		}));

		function updateFish(_x29, _x30, _x31, _x32) {
			return _ref20.apply(this, arguments);
		}

		return updateFish;
	}(),
	deleteFish: function () {
		var _ref22 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(parent, args, _ref21, info) {
			var prisma = _ref21.prisma;
			var userId, fishExists;
			return regeneratorRuntime.wrap(function _callee9$(_context9) {
				while (1) {
					switch (_context9.prev = _context9.next) {
						case 0:
							userId = (0, _getUserId2.default)(request);
							_context9.next = 3;
							return prisma.exists.Fish({
								id: args.id,
								author: {
									id: userId
								}
							});

						case 3:
							fishExists = _context9.sent;

							if (fishExists) {
								_context9.next = 6;
								break;
							}

							throw new Error('Cannot update fish');

						case 6:
							return _context9.abrupt('return', prisma.mutation.deleteFish({
								where: { id: args.id }
							}));

						case 7:
						case 'end':
							return _context9.stop();
					}
				}
			}, _callee9, this);
		}));

		function deleteFish(_x33, _x34, _x35, _x36) {
			return _ref22.apply(this, arguments);
		}

		return deleteFish;
	}(),

	//Rivers
	createRiver: function createRiver(parent, args, _ref23, info) {
		var prisma = _ref23.prisma,
		    request = _ref23.request;

		var userId = (0, _getUserId2.default)(request);

		return prisma.mutation.createRiver({
			data: _extends({}, args.data, {
				author: {
					connect: { id: userId }
				}
			})
		});
	},
	updateRiver: function () {
		var _ref25 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(parent, args, _ref24, info) {
			var prisma = _ref24.prisma,
			    request = _ref24.request;
			var userId, riverExists;
			return regeneratorRuntime.wrap(function _callee10$(_context10) {
				while (1) {
					switch (_context10.prev = _context10.next) {
						case 0:
							userId = (0, _getUserId2.default)(request);
							_context10.next = 3;
							return prisma.exists.River({
								id: args.id,
								author: {
									id: userId
								}
							});

						case 3:
							riverExists = _context10.sent;

							if (riverExists) {
								_context10.next = 6;
								break;
							}

							throw new Error('Cannot find river');

						case 6:
							return _context10.abrupt('return', prisma.mutation.updateRiver({
								where: { id: args.id },
								data: args.data
							}));

						case 7:
						case 'end':
							return _context10.stop();
					}
				}
			}, _callee10, this);
		}));

		function updateRiver(_x37, _x38, _x39, _x40) {
			return _ref25.apply(this, arguments);
		}

		return updateRiver;
	}(),
	deleteRiver: function () {
		var _ref27 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(parent, args, _ref26, info) {
			var prisma = _ref26.prisma,
			    request = _ref26.request;
			var userId, riverExists;
			return regeneratorRuntime.wrap(function _callee11$(_context11) {
				while (1) {
					switch (_context11.prev = _context11.next) {
						case 0:
							userId = (0, _getUserId2.default)(request);
							_context11.next = 3;
							return prisma.exists.River({
								id: args.id,
								author: {
									id: userId
								}
							});

						case 3:
							riverExists = _context11.sent;

							if (riverExists) {
								_context11.next = 6;
								break;
							}

							throw new Error('Cannot find river');

						case 6:
							return _context11.abrupt('return', prisma.mutation.deleteRiver({
								where: { id: args.id }
							}));

						case 7:
						case 'end':
							return _context11.stop();
					}
				}
			}, _callee11, this);
		}));

		function deleteRiver(_x41, _x42, _x43, _x44) {
			return _ref27.apply(this, arguments);
		}

		return deleteRiver;
	}(),

	//Tackle
	createTackle: function createTackle(parent, args, _ref28, info) {
		var prisma = _ref28.prisma,
		    request = _ref28.request;

		var userId = (0, _getUserId2.default)(request);

		return prisma.mutation.createTackle({
			data: _extends({}, args.data, {
				author: {
					connect: { id: userId }
				}
			})
		}, info);
	},
	updateTackle: function () {
		var _ref30 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(parent, args, _ref29, info) {
			var prisma = _ref29.prisma,
			    request = _ref29.request;
			var userId, tackleExists;
			return regeneratorRuntime.wrap(function _callee12$(_context12) {
				while (1) {
					switch (_context12.prev = _context12.next) {
						case 0:
							userId = (0, _getUserId2.default)(request);
							_context12.next = 3;
							return prisma.exists.Tackle({
								id: args.id,
								author: {
									id: userId
								}
							});

						case 3:
							tackleExists = _context12.sent;

							if (tackleExists) {
								_context12.next = 6;
								break;
							}

							throw new Error('Cannot update tackle');

						case 6:
							return _context12.abrupt('return', prisma.mutation.updateTackle({
								where: {
									id: args.id
								},
								data: args.data
							}, info));

						case 7:
						case 'end':
							return _context12.stop();
					}
				}
			}, _callee12, this);
		}));

		function updateTackle(_x45, _x46, _x47, _x48) {
			return _ref30.apply(this, arguments);
		}

		return updateTackle;
	}(),
	deleteTackle: function () {
		var _ref32 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(parent, args, _ref31, info) {
			var prisma = _ref31.prisma,
			    request = _ref31.request;
			var userId, tackleExists;
			return regeneratorRuntime.wrap(function _callee13$(_context13) {
				while (1) {
					switch (_context13.prev = _context13.next) {
						case 0:
							userId = (0, _getUserId2.default)(request);
							_context13.next = 3;
							return prisma.exists.Tackle({
								id: args.id,
								author: {
									id: userId
								}
							});

						case 3:
							tackleExists = _context13.sent;

							if (tackleExists) {
								_context13.next = 6;
								break;
							}

							throw new Error('Cannot delete tackle');

						case 6:
							return _context13.abrupt('return', prisma.mutation.deleteTackle({
								where: { id: args.id }
							}));

						case 7:
						case 'end':
							return _context13.stop();
					}
				}
			}, _callee13, this);
		}));

		function deleteTackle(_x49, _x50, _x51, _x52) {
			return _ref32.apply(this, arguments);
		}

		return deleteTackle;
	}()
};

exports.default = Mutation;