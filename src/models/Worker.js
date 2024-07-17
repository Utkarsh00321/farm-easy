import mongoose from 'mongoose';

const workerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true,
    unique: true
  },
  availabilityStatus: {
    type: Boolean,
    required: true,
    default: true
  },
  acceptedWorks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Work'
  }]
});

const Worker = mongoose.models.Worker || mongoose.model('Worker', workerSchema);

export default Worker;
