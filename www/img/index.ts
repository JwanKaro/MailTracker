
import { IRouter } from "@type";
import { Tracker } from '@logic/app/tracker';

export const defualt: IRouter.Endpoint = {
	handler: Tracker.confirm,
	options: {
		methods: ['get'],
		cors: true
	},
	path: '/img/' + Tracker.parameters.token + '.png'
};