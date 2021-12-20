import { IRouter } from '@type';
import { Tracker } from '@logic/app/tracker';


export const defualt: IRouter.Endpoint = {
	handler: Tracker.track,
	options: {
		methods: ['post'],
		cors: true,
    requireAuth: true,
	},
	path: '/api/v1/link/',
};
