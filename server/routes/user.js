import express from 'express'
import { car_email_filter, cities, gender_phone_filter, income_car_filter, name_email_filter } from '../controllers/user.js';

const router = express.Router();

router.post('/income-car-filter', income_car_filter);
router.post('/gender-phone-filter', gender_phone_filter);
router.post('/name-email-filter', name_email_filter);
router.post('/car-email-filter', car_email_filter);
router.post('/cities', cities)

export default router;