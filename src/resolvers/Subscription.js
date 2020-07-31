import getUserId from '../utils/getUserId';

const Subscription = {
	myTackle: {
		subscribe(parent, args, { prisma, request }, info) {
			const userId = getUserId(request);

			return prisma.subscription.tackle(
				{
					where: {
						node: {
							author: {
								id: userId
							}
						}
					}
				},
				info
			);
		}
	}
};

export { Subscription as default };
