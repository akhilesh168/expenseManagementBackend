const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
let cors = require('cors');
const app = express();

const port = 5000;
let trips, expenses;
app.listen(process.env.PORT || port, () => {
  console.log('server ready');
});
app.use(express.json());
app.use(cors());
const uri =
  'mongodb+srv://Akhil:1234@cluster0.mgkcy.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  connectTimeoutMS: 30000,
  keepAlive: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function insert(client) {
  try {
    console.log('1');
    await client.connect();
    console.log('2');
    trips = client.db('tripcost').collection('trips');
    // perform actions on the collection object
    expenses = client.db('tripcost').collection('expenses');
    console.log('Done');
  } finally {
    // await client.close();
  }
}

app.post('/trip', async (req, res) => {
  await client.connect();
    trips = client.db('tripcost').collection('trips');
    expenses = client.db('tripcost').collection('expenses');
  const name = req.body.name;
  await trips.insertOne({ name: name }, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ err: err });
      return;
    }
    console.log(result);
    res.status(200).json({ ok: true });
  });
});
app.get('/trips', async (req, res) => {
 await client.connect();
    trips = client.db('tripcost').collection('trips');
    expenses = client.db('tripcost').collection('expenses');
  trips.find().toArray((err, items) => {
    if (err) {
      res.status(500).json({ err: err });
      return;
    }
    console.log(items);
    res.status(200).json({ trips: items });
    return;
  });
});

app.post('/expense', async (req, res) => {
   await client.connect();
    trips = client.db('tripcost').collection('trips');
    expenses = client.db('tripcost').collection('expenses');
  await expenses.insertOne(
    {
      trip: req.body.trip,
      category: req.body.category,
      amount: req.body.amount,
      date: req.body.date,
      description: req.body.description,
    },
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ err: err });
        return;
      }
      console.log(result);
      res.status(200).json({ ok: true });
    }
  );
});
app.get('/expenses', (req, res) => {
   await client.connect();
    trips = client.db('tripcost').collection('trips');
    expenses = client.db('tripcost').collection('expenses');
  expenses.find().toArray((err, items) => {
    if (err) {
      console.log(err);
      res.status(500).json({ err: err });
      return;
    }
    console.log(items);
    res.status(200).json({ expenses: items });
    return;
  });
});
app.get('/expenses/:id', (req, res) => {
  await client.connect();
    trips = client.db('tripcost').collection('trips');
    expenses = client.db('tripcost').collection('expenses');
  expenses.find({ trip: req.params.id }).toArray((err, items) => {
    if (err) {
      console.log(err);
      res.status(500).json({ err: err });
      return;
    }
    console.log(items);
    res.status(200).json({ expenses: items });
    return;
  });
});

module.exports = app;
