import { IRouter } from '@type';
import { Tracker } from '@logic/app/tracker';


export const defualt: IRouter.Endpoint = {
	handler: Tracker.getTrackStatusByToken,
	options: {
		methods: ['get'],
		cors: true,
    requireAuth: true,
	},
	path: '/api/v1/link/'+Tracker.parameters.token,
};
