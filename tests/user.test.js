import 'cross-fetch/polyfill';

import { getProfile, getUsers, login, createUser } from './utils/operations';
import prisma from '../src/prisma';
import seedDatabase, { userOne } from './utils/seedDatabase';
import getClient from './utils/getClient';

const client = getClient();

beforeEach(seedDatabase);

test('Should create a new user', async () => {
	const variables = {
		data: {
			name: 'Hannah',
			email: 'hannah@example.com',
			password: 'password'
		}
	};

	const response = await client.mutate({
		mutation: createUser,
		variables
	});

	const userExists = await prisma.exists.User({
		id: response.data.createUser.user.id
	});

	expect(userExists).toBe(true);
});

test('Should expose public author profiles', async () => {
	const response = await client.query({
		query: getUsers
	});

	expect(response.data.users.length).toBe(2);
	expect(response.data.users[0].email).toBe(null);
	expect(response.data.users[0].name).toBe('Jacob');
	expect(response.data.users[1].email).toBe(null);
	expect(response.data.users[1].name).toBe('Ed');
});

test('Should not login with bad credentials', async () => {
	const variables = {
		data: {
			email: 'jacob@example.com',
			password: 'dafsdfadsfa'
		}
	};

	await expect(
		client.mutate({
			mutation: login,
			variables
		})
	).rejects.toThrow();
});

test('Should not sign up user with invalid password', async () => {
	const variables = {
		data: {
			name: 'Hannah',
			email: 'hannah@example.com',
			password: 'short'
		}
	};

	await expect(
		client.mutate({
			mutation: createUser,
			variables
		})
	).rejects.toThrow();
});

test('Should fetch user profile', async () => {
	const client = getClient(userOne.jwt);

	const { data } = await client.query({
		query: getProfile
	});

	expect(data.me.id).toBe(userOne.user.id);
	expect(data.me.name).toBe(userOne.user.name);
	expect(data.me.name).toBe(userOne.user.name);
});
