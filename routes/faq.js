const faqRouter = require('express').Router();
const asyncHandler = require('express-async-handler');
const {handleAllQuestions, handleOneQuestion, handleCreateQuestion, handleUpdateQuestion, handleDeleteQuestion} = require('../controllers/faq.js');
// const requireAdmin = require('../middlewares/requireAdmin.js');
const requireRequestBody = require('../middlewares/requireRequestBody.js');


faqRouter.get('/', asyncHandler(handleAllQuestions));
faqRouter.get('/:id', asyncHandler(handleOneQuestion));
faqRouter.post('/',requireRequestBody, asyncHandler(handleCreateQuestion));
faqRouter.put('/:id', requireRequestBody, asyncHandler(handleUpdateQuestion));
faqRouter.delete('/:id', asyncHandler(handleDeleteQuestion));

module.exports = faqRouter;
