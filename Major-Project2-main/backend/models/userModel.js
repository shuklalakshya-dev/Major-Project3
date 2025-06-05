const { model, Schema } = require('../connection');

const mySchema = new Schema({

  name: String,
  email: { type: String, unique: true },
  role: { type: String, default: "user" },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = model('users', mySchema); // users is collection name