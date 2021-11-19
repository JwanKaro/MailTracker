import {router} from '../types';
export const defualt: router.routeHanlder = {
  handler: (req, res) => {
    res.send('Hello world');
  },
  options: {
    methods: ['get'],

  },
  path: '/',
};