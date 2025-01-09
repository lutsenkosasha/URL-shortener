import Url from './models.js';
import { nanoid } from 'nanoid';

// Создание короткой ссылки
export const createShortUrl = async (req, res) => {
  const { originalUrl, alias, expiresAt } = req.body;
  let shortUrl = alias || nanoid(6);

  try {
    const existingUrl = await Url.findOne({ shortUrl });
    if (existingUrl) return res.status(400).json({ message: 'Alias or short URL already exists' });

    const newUrl = new Url({ originalUrl, shortUrl, alias, expiresAt });
    await newUrl.save();

    res.json({ shortUrl });
  } catch (error) {
    res.status(500).json({ error: 'Error creating short URL' });
  }
};

// Переадресация по короткой ссылке
export const redirectUrl = async (req, res) => {
  const { shortUrl } = req.params;

  try {
    const url = await Url.findOne({ shortUrl });

    if (!url) return res.status(404).json({ message: 'URL not found' });

    if (url.expiresAt && new Date() > url.expiresAt) {
      return res.status(410).json({ message: 'URL expired' });
    }

    url.clickCount += 1;
    url.analytics.push({ ip: req.ip });
    await url.save();

    res.redirect(url.originalUrl);
  } catch (error) {
    res.status(500).json({ error: 'Error redirecting to URL' });
  }
};

// Получение информации о ссылке
export const getUrlInfo = async (req, res) => {
  const { shortUrl } = req.params;

  try {
    const url = await Url.findOne({ shortUrl });

    if (!url) return res.status(404).json({ message: 'URL not found' });

    res.json({
      originalUrl: url.originalUrl,
      createdAt: url.createdAt,
      clickCount: url.clickCount,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching URL info' });
  }
};

// Удаление короткой ссылки
export const deleteShortUrl = async (req, res) => {
  const { shortUrl } = req.params;

  try {
    const url = await Url.findOneAndDelete({ shortUrl });

    if (!url) return res.status(404).json({ message: 'URL not found' });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting URL' });
  }
};

// Получение аналитики переходов
export const getAnalytics = async (req, res) => {
  const { shortUrl } = req.params;

  try {
    const url = await Url.findOne({ shortUrl });

    if (!url) return res.status(404).json({ message: 'URL not found' });

    res.json({
      clickCount: url.clickCount,
      recentIps: url.analytics.slice(-5).map(a => a.ip),
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching analytics' });
  }
};