import express from 'express';
import { createShortUrl, redirectUrl, getUrlInfo, deleteShortUrl, getAnalytics } from './controllers.js';
const router = express.Router();

// Создание короткой ссылки
router.post('/shorten', createShortUrl);

// Переадресация по короткой ссылке
router.get('/:shortUrl', redirectUrl);

// Получение информации о ссылке
router.get('/info/:shortUrl', getUrlInfo);

// Удаление короткой ссылки
router.delete('/delete/:shortUrl', deleteShortUrl);

// Получение аналитики переходов
router.get('/analytics/:shortUrl', getAnalytics);

export default router;