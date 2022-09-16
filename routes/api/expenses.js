const router = require('express').Router();
const expenses = require('../../models/Expenses');

router.post('/expense', (req, res) => {
  const newExpense = new expenses({
    trip: req.body.trip,
    category: req.body.category,
    amount: req.body.amount,
    date: req.body.date,
    description: req.body.description,
  });
  newExpense
    .save()
    .then((result) => {
      if (result) return res.status(200).json({ ok: true });
    })
    .catch((err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ err: err });
      }
    });
});
router.get('/expenses', (req, res) => {
  expenses
    .find({})
    .then((items) => {
      return res.status(200).json({ expenses: items });
    })
    .catch((err) => {
      if (err) {
        return res.status(500).json({ err: err });
      }
    });
});

router.get('/expenses/:id', (req, res) => {
  expenses
    .find({ trip: req.params.id })
    .then((items) => {
      return res.status(200).json({ expenses: items });
    })
    .catch((err) => {
      if (err) {
        return res.status(500).json({ err: err });
      }
    });
});

module.exports = router;
