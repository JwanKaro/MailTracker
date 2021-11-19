import { router } from '@src/types';


export const defualt: router.routeHanlder = {
  handler: async (req, res) => {
    console.log(req.body);

    if (req.middlewares == undefined) throw new Error('Middlewares not defined');
    const token = await req.middlewares.linkGenerator().generatetoken('awd', 'awdawwad');
    res.setHeader('Content-Type', 'application/json');
    res.send(token);
  },
  options: {
    methods: ['post'],
    cors: true,
    useMiddleware: true,
  },
  path: '/v1/link/',
};
