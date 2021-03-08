const { Router } = require('express');
const ThemeController = require('../../controllers/theme.controller');

const router = Router();

// Find all the themes.
router.get('/', ThemeController.printFindAll);

// Create a theme.
router.post('/', ThemeController.printCreate);

// Find a theme by id.
router.get('/:themeId([0-9]+)', ThemeController.printFind);

// Update a theme by id.
router.put('/:themeId([0-9]+)', ThemeController.printUpdate);

// Delete a theme by id.
router.delete('/:themeId([0-9]+)', ThemeController.printDestroy);

module.exports = router;
