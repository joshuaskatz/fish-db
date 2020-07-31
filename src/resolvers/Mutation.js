import bcrypt from 'bcryptjs';
import getUserId from '../utils/getUserId';
import generateToken from '../utils/generateToken';
import hashPassword from '../utils/hashPassword';

const Mutation = {
	//Authorizaiton
	async createUser(parent, args, { prisma }, info) {
		const password = await hashPassword(args.data.password);
		const user = await prisma.mutation.createUser({
			data: {
				...args.data,
				password
			}
		});

		return {
			user,
			token: generateToken(user.id)
		};
	},
	async login(parent, args, { prisma }, info) {
		const user = await prisma.query.user({
			where: { email: args.data.email }
		});

		if (!user) {
			throw new Error('Unable to login');
		}

		const isMatch = await bcrypt.compare(args.data.password, user.password);

		if (!isMatch) {
			throw new Error('Unable to login');
		}

		return {
			user,
			token: generateToken(user.id)
		};
	},
	deleteUser(parent, args, { prisma, request }, info) {
		const userId = getUserId(request);

		return prisma.mutation.deleteUser(
			{
				where: { id: userId }
			},
			info
		);
	},
	async updateUser(parent, args, { prisma, request }, info) {
		const userId = getUserId(request);

		if (typeof args.data.password === 'string') {
			args.data.password = await hashPassword(args.data.password);
		}

		return prisma.mutation.updateUser(
			{
				where: { id: userId },
				data: args.data
			},
			info
		);
	},
	//Dates
	createDate(parent, args, { prisma, request }, info) {
		const userId = getUserId(request);

		return prisma.mutation.createDates(
			{
				data: {
					...args.data,
					fish: { set: args.data.fish },
					flies: { set: args.data.flies },
					author: {
						connect: { id: userId }
					}
				}
			},
			info
		);
	},
	async updateDate(parent, args, { prisma, request }, info) {
		const userId = getUserId(request);

		const dateExists = await prisma.exists.Dates({
			id: args.id,
			author: {
				id: userId
			}
		});

		if (!dateExists) {
			throw new Error('Cannot update date');
		}

		return prisma.mutation.updateDates(
			{
				where: { id: args.id },
				data: args.data
			},
			info
		);
	},
	async deleteDate(parent, args, { prisma, request }, info) {
		const userId = getUserId(request);

		const dateExists = await prisma.exists.Dates({
			id: args.id,
			author: {
				id: userId
			}
		});

		if (!dateExists) {
			throw new Error('Cannot find date');
		}

		return prisma.mutation.deleteDates({
			where: { id: args.id }
		});
	},
	//Flies
	createFlies(parent, args, { prisma, request }, info) {
		const userId = getUserId(request);
		return prisma.mutation.createFly(
			{
				data: {
					...args.data,
					author: {
						connect: { id: userId }
					}
				}
			},
			info
		);
	},
	async updateFlies(parent, args, { prisma, request }, info) {
		const userId = getUserId(request);

		const flyExists = await prisma.exists.Fly({
			id: args.id,
			author: {
				id: userId
			}
		});

		if (!flyExists) {
			throw new Error('Cannot update fly');
		}

		return prisma.mutation.updateFly(
			{
				where: { id: args.id },
				data: args.data
			},
			info
		);
	},
	async deleteFlies(parent, args, { prisma }, info) {
		const userId = getUserId(request);

		const flyExists = await prisma.exists.Fly({
			id: args.id,
			author: {
				id: userId
			}
		});

		if (!flyExists) {
			throw new Error('Cannot delete fly');
		}

		return prisma.mutation.deleteFly({
			where: { id: args.id }
		});
	},
	//Fish
	createFish(parent, args, { prisma, request }, info) {
		const userId = getUserId(request);

		return prisma.mutation.createFish(
			{
				data: {
					...args.data,
					author: {
						connect: { id: userId }
					}
				}
			},
			info
		);
	},
	async updateFish(parent, args, { prisma, request }, info) {
		const userId = getUserId(request);

		const fishExists = await prisma.exists.Fish({
			id: args.id,
			author: {
				id: userId
			}
		});

		if (!fishExists) {
			throw new Error('Cannot update fish');
		}
		return prisma.mutation.updateFish(
			{
				where: { id: args.id },
				data: args.data
			},
			info
		);
	},
	async deleteFish(parent, args, { prisma }, info) {
		const userId = getUserId(request);

		const fishExists = await prisma.exists.Fish({
			id: args.id,
			author: {
				id: userId
			}
		});

		if (!fishExists) {
			throw new Error('Cannot update fish');
		}
		return prisma.mutation.deleteFish({
			where: { id: args.id }
		});
	},
	//Rivers
	createRiver(parent, args, { prisma, request }, info) {
		const userId = getUserId(request);

		return prisma.mutation.createRiver({
			data: {
				...args.data,
				author: {
					connect: { id: userId }
				}
			}
		});
	},
	async updateRiver(parent, args, { prisma, request }, info) {
		const userId = getUserId(request);

		const riverExists = await prisma.exists.River({
			id: args.id,
			author: {
				id: userId
			}
		});

		if (!riverExists) {
			throw new Error('Cannot find river');
		}

		return prisma.mutation.updateRiver({
			where: { id: args.id },
			data: args.data
		});
	},
	async deleteRiver(parent, args, { prisma, request }, info) {
		const userId = getUserId(request);

		const riverExists = await prisma.exists.River({
			id: args.id,
			author: {
				id: userId
			}
		});

		if (!riverExists) {
			throw new Error('Cannot find river');
		}

		return prisma.mutation.deleteRiver({
			where: { id: args.id }
		});
	},
	//Tackle
	createTackle(parent, args, { prisma, request }, info) {
		const userId = getUserId(request);

		return prisma.mutation.createTackle(
			{
				data: {
					...args.data,
					author: {
						connect: { id: userId }
					}
				}
			},
			info
		);
	},
	async updateTackle(parent, args, { prisma, request }, info) {
		const userId = getUserId(request);

		const tackleExists = await prisma.exists.Tackle({
			id: args.id,
			author: {
				id: userId
			}
		});

		if (!tackleExists) {
			throw new Error('Cannot update tackle');
		}

		return prisma.mutation.updateTackle(
			{
				where: {
					id: args.id
				},
				data: args.data
			},
			info
		);
	},
	async deleteTackle(parent, args, { prisma, request }, info) {
		const userId = getUserId(request);

		const tackleExists = await prisma.exists.Tackle({
			id: args.id,
			author: {
				id: userId
			}
		});

		if (!tackleExists) {
			throw new Error('Cannot delete tackle');
		}

		return prisma.mutation.deleteTackle({
			where: { id: args.id }
		});
	}
};

export { Mutation as default };
