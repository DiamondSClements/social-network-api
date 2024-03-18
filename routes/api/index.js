const router = require('express').Router();
const thoughtsRoutes = require('../api/thoughtsRoutes');
const userRoutes = require('../api/userRoutes');

router.use('/thoughts', thoughtsRoutes);
router.use('/user', userRoutes);

module.exports = router;