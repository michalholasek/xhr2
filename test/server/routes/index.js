import express from 'express';

import get from './get';

export default (app) => {
  app.use('/', express.static(`${__dirname}/../public`));

  app.use('/', get);

  app.get('/test', (req, res) => {
    res.status(200).send('OK');
  });
};
