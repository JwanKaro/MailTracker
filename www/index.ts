import { IRouter } from '@type';
export const defualt: IRouter.Endpoint = {
	handler: (req, res) => {
		console.log(req);

		res.status(404).send();
	},
	options: {
		methods: ['all'],
	},
	path: '/',
};