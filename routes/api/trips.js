const router = require('express').Router();
const trips = require('../../models/Trips');

router.post('/trip', (req, res) => {
  const name = req.body.name;
  const newTrips = new trips({ name: name });
  newTrips
    .save()
    .then((err, result) => {
      return res.status(200).json({ ok: true });
    })
    .catch((err) => {
      if (err) {
        return res.status(500).json({ err: err });
      }
    });
});
router.get('/trips', (req, res) => {
  trips
    .find({})
    .then((items) => {
      return res.status(200).json({ trips: items });
    })
    .catch((err) => {
      if (err) {
        return res.status(500).json({ err: err });
      }
    });
});

module.exports = router;
