const { Router } = require('express');
const authController = require('../controllers/authControllers');
const { requireAuth } = require('../middleware/authMiddleware');
const router = Router();

router.post('/add-user', authController.addUser);
router.post('/login-user', authController.loginUser);
router.post('/add-order', authController.addOrder);
router.get('/get-order',requireAuth, authController.getOrder);
router.get('/login',authController.getLogin);
module.exports = router;