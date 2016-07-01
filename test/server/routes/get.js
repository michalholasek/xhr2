import express from 'express';

const router = express.Router();

router.get('/json', (req, res) => {
  res.status(200).json({
    payload: {
      message: 'OK',
      status: 200
    }
  });
});

export default router;
