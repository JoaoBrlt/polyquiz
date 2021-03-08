const { Router } = require('express');
const StatusRouter = require('./status');
const QuizRouter = require('./quizzes');
const GuestRouter = require('./guests');
const ThemeRouter = require('./themes');
const ImageRouter = require('./images');
const ResultRouter = require('./results');

const router = Router();

// Status routes.
router.use('/status', StatusRouter);

// Quiz routes.
router.use('/quizzes', QuizRouter);

// Guest routes.
router.use('/guests', GuestRouter);

// Theme routes.
router.use('/themes', ThemeRouter);

// Image routes.
router.use('/images', ImageRouter);

// Result routes.
router.use('/results', ResultRouter);

module.exports = router;
