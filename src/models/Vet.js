import mongoose from 'mongoose';

const vetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  specialization: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  availabilityStatus: {
    type: Boolean,
    required: true,
    default: true
  },
  mobileNumber: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  farmers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Farmer'
  }]
});

const Vet = mongoose.models.Vet || mongoose.model('Vet', vetSchema);

export default Vet;
