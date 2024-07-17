import mongoose from 'mongoose';

const farmerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  vets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vet'
  }]
});

const Farmer = mongoose.models.Farmer || mongoose.model('Farmer', farmerSchema);

export default Farmer;
