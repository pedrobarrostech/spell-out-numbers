import express from 'express';
const router = express.Router();
import DigitsToWord from '../models/digits-to-word';

const digitsToWord = new DigitsToWord;

router.get('/', (req, res) => {
  res.render("index");
});

router.get('/convert', (req, res) => {
  res.send(JSON.stringify(digitsToWord.spellItOut(req.query.number)));
});

export default router;
