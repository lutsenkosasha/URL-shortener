import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, unique: true },
  alias: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date }, // Время жизни ссылки
  clickCount: { type: Number, default: 0 },
  analytics: [
    {
      ip: String,
      date: { type: Date, default: Date.now },
    }
  ]
});

const Url = mongoose.model('Url', urlSchema);

export default Url;