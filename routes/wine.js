const asyncHandler = require('express-async-handler');
const wineRoute = require('express').Router();
const protectByApikey = require('../middlewares/protectByEnvApiKey');

const {
  handleWineGetAll,
  handleWineGetOne,
  handleWinePost,
  handleWinePutOne,
  handleWineDeleteOne,
} = require('../controllers/wine');

wineRoute.get('/', protectByApikey, asyncHandler(handleWineGetAll));
wineRoute.get('/:id', protectByApikey, asyncHandler(handleWineGetOne));
wineRoute.post('/', protectByApikey, asyncHandler(handleWinePost));
wineRoute.put('/:id', protectByApikey, asyncHandler(handleWinePutOne));
wineRoute.delete('/:id', protectByApikey, asyncHandler(handleWineDeleteOne));

module.exports = wineRoute;
