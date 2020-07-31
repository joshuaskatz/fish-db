import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import prisma from '../../src/prisma';

const userOne = {
	input: {
		name: 'Jacob',
		email: 'jacob@example.com',
		password: bcrypt.hashSync('password')
	},
	user: undefined,
	jwt: undefined
};

const userTwo = {
	input: {
		name: 'Ed',
		email: 'ed@example.com',
		password: bcrypt.hashSync('password')
	},
	user: undefined,
	jwt: undefined
};
const dateOne = {
	input: {
		date: 'July 26th, 2020',
		amountCaught: '0',
		averageSize: '',
		largestSize: '',
		fish: [],
		flies: [ 'Tan Caddis', 'Yellow Sally' ],
		river: 'South Mills River',
		tackle: 'Moonshine Drifter 3 wt.'
	},
	date: undefined
};

const dateTwo = {
	input: {
		date: 'July 2nd, 2020',
		amountCaught: '10',
		averageSize: '7',
		largestSize: '11',
		fish: [ 'Brook Trout' ],
		flies: [ 'Tan Caddis', 'Red Hopper Imitation' ],
		river: 'Yellowstone Prong',
		tackle: 'Moonshine Drifter 3 wt.'
	},
	date: undefined
};

const tackleOne = {
	input: {
		rod: 'Moonshine Drifter',
		rodWeight: 3,
		rodLengthFeet: 7,
		rodLengthInches: 6,
		overcharged: 'No',
		leaderLengthFeet: 9,
		leaderLengthInches: 0,
		tippetSize: 6
	},
	tackle: undefined
};

const tackleTwo = {
	input: {
		rod: 'Redington Path',
		rodWeight: 4,
		rodLengthFeet: 9,
		rodLengthInches: 0,
		overcharged: 'No',
		leaderLengthFeet: 9,
		leaderLengthInches: 0,
		tippetSize: 6
	},
	tackle: undefined
};

const riverOne = {
	input: {
		name: 'South Mills',
		latitude: 32.0,
		longitude: -83.0,
		regulation: 'Delayed Harvest',
		overgrown: 'Slightly Overgrown',
		size: 'Midsize River'
	},
	river: undefined
};

const riverTwo = {
	input: {
		latitude: 33.0,
		longitude: -82.0,
		name: 'North Mills',
		overgrown: 'Slightly Overgrown',
		size: 'Midsize River',
		regulation: 'Delayed Harvest'
	},
	river: undefined
};

const flyOne = {
	input: {
		type: 'Dry',
		name: 'Caddis',
		color: 'Tan'
	},
	fly: undefined
};

const flyTwo = {
	input: {
		type: 'Streamer',
		name: 'Wooly Bugger',
		color: 'Black'
	},
	fly: undefined
};

const fishOne = {
	input: {
		species: 'Rainbow Trout',
		subspecies: 'Palimino Trout'
	},
	fish: undefined
};

const fishTwo = {
	input: {
		species: 'Brook Trout'
	},
	fish: undefined
};

const seedDatabase = async () => {
	//Delete test data\
	await prisma.mutation.deleteManyFlies();
	await prisma.mutation.deleteManyFishs();
	await prisma.mutation.deleteManyRivers();
	await prisma.mutation.deleteManyTackles();
	await prisma.mutation.deleteManyDateses();
	await prisma.mutation.deleteManyUsers();

	//Create user one
	userOne.user = await prisma.mutation.createUser({
		data: userOne.input
	});

	userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.JWT_SECRET);

	//Create user two
	userTwo.user = await prisma.mutation.createUser({
		data: userTwo.input
	});

	userTwo.jwt = jwt.sign({ userId: userTwo.user.id }, process.env.JWT_SECRET);

	//Create date one
	dateOne.date = await prisma.mutation.createDates({
		data: {
			...dateOne.input,
			flies: { set: dateTwo.input.flies },
			fish: { set: dateTwo.input.fish },
			author: {
				connect: {
					id: userOne.user.id
				}
			}
		}
	});

	//Create date two
	dateTwo.date = await prisma.mutation.createDates({
		data: {
			...dateTwo.input,
			flies: { set: dateTwo.input.flies },
			fish: { set: dateTwo.input.fish },
			author: {
				connect: {
					id: userOne.user.id
				}
			}
		}
	});

	//Create tackle one
	tackleOne.tackle = await prisma.mutation.createTackle({
		data: {
			...tackleOne.input,
			author: {
				connect: {
					id: userTwo.user.id
				}
			}
		}
	});

	//Create tackle two
	tackleTwo.tackle = await prisma.mutation.createTackle({
		data: {
			...tackleTwo.input,
			author: {
				connect: {
					id: userOne.user.id
				}
			}
		}
	});

	//Create river one
	riverOne.river = await prisma.mutation.createRiver({
		data: {
			...riverOne.input,
			author: {
				connect: {
					id: userTwo.user.id
				}
			}
		}
	});

	//Create river two
	riverTwo.river = await prisma.mutation.createRiver({
		data: {
			...riverTwo.input,
			author: {
				connect: {
					id: userTwo.user.id
				}
			}
		}
	});

	//Create fish one
	fishOne.fish = await prisma.mutation.createFish({
		data: {
			...fishOne.input,
			author: {
				connect: {
					id: userOne.user.id
				}
			}
		}
	});

	//Create fish two
	fishTwo.fish = await prisma.mutation.createFish({
		data: {
			...fishTwo.input,
			author: {
				connect: {
					id: userTwo.user.id
				}
			}
		}
	});

	//Create fly one
	flyOne.fly = await prisma.mutation.createFly({
		data: {
			...flyOne.input,
			author: {
				connect: {
					id: userOne.user.id
				}
			}
		}
	});

	//Create fly two
	flyTwo.fly = await prisma.mutation.createFly({
		data: {
			...flyTwo.input,
			author: {
				connect: {
					id: userTwo.user.id
				}
			}
		}
	});
};

export {
	seedDatabase as default,
	userOne,
	userTwo,
	dateOne,
	dateTwo,
	tackleOne,
	tackleTwo,
	riverOne,
	riverTwo,
	fishOne,
	fishTwo,
	flyOne,
	flyTwo
};
