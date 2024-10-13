const mongoose = require('mongoose');

const GossipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Gossip = mongoose.model('Gossip', GossipSchema);
module.exports = Gossip;
