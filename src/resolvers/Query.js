import getUserId from '../utils/getUserId';

const Query = {
	users(parent, args, { prisma }, info) {
		const opArgs = {
			first: args.first,
			skip: args.skip,
			after: args.after,
			orderBy: args.orderBy
		};

		if (args.query) {
			opArgs.where = {
				OR: [ { name_contains: args.query } ]
			};
		}

		return prisma.query.users(opArgs, info);
	},

	me(parent, args, { prisma, request }, info) {
		const userId = getUserId(request);

		return prisma.query.user({
			where: {
				id: userId
			}
		});
	},
	dates(parent, args, { prisma }, info) {
		const opArgs = {};

		if (args.query) {
			opArgs.where = {
				OR: [ { date_contains: args.query } ]
			};
		}

		return prisma.query.dateses(opArgs, info);
	},
	myDates(parent, args, { prisma, request }, info) {
		const userId = getUserId(request);

		//add opargs for query/pagination
		return prisma.query.dateses(
			{
				where: {
					author: { id: userId }
				}
			},
			info
		);
	},
	flies(parent, args, { prisma }, info) {
		const opArgs = {};

		if (args.query || args.type) {
			opArgs.where = {
				OR: [
					{ name_contains: args.query },
					{ color_contains: args.query },
					{ type_contains: args.query }
				]
			};
		}

		return prisma.query.flies(opArgs, info);
	},
	fish(parent, args, { prisma }, info) {
		const opArgs = {};

		if (args.query) {
			opArgs.where = {
				OR: [
					{ species_contains: args.query },
					{ subspecies_contains: args.query }
				]
			};
		}

		return prisma.query.fishs(opArgs, info);
	},
	rivers(parent, args, { prisma }, info) {
		const opArgs = {};

		if (args.query) {
			opArgs.where = {
				OR: [ { name_contains: args.query } ]
			};
		}

		return prisma.query.rivers(opArgs, info);
	},
	tackle(parent, args, { prisma }, info) {
		const opArgs = {};

		if (args.query) {
			opArgs.where = {
				OR: [
					{ rod_contains: args.query },
					{ rodWeight_contains: args.query }
				]
			};
		}

		return prisma.query.tackles(opArgs, info);
	},
	myTackle(parent, args, { prisma, request }, info) {
		const userId = getUserId(request);

		return prisma.query.tackles(
			{
				where: {
					author: { id: userId }
				}
			},
			info
		);
	}
};

export { Query as default };
