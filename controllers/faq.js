const {
 getAllQuestions,
 findQuestionById,
 postOneQuestion,
 putOneQuestion,
 deleteOneQuestion,
} = require('../models/faq');

module.exports.handleAllQuestions = async (req, res) => {
 const rawData = await getAllQuestions();
 res.send(rawData);
};

module.exports.handleOneQuestion = async (req, res) => {
 res.send(await findQuestionById(req.params.id));
};

module.exports.handleCreateQuestion = async (req, res) => {
 const {
   name,
   vigneron,
   cepage,
   arome,
   price,
   sommelier,
   image,
   website,
   specificities,
   producteur,
 } = req.body;
 const data = await postOneQuestion({
   name,
   vigneron,
   cepage,
   arome,
   price,
   sommelier,
   image,
   website,
   specificities,
   producteur,
 });
 return res.status(201).send(data);
};

module.exports.handlePutOneQuestion = async (req, res) => {
 const {
   name,
   vigneron,
   cepage,
   arome,
   price,
   sommelier,
   image,
   website,
   specificities,
   producteur,
 } = req.body;
 const attribute = {
   name,
   vigneron,
   cepage,
   arome,
   price,
   sommelier,
   image,
   website,
   specificities,
   producteur,
 };
 const data = await putOneQuestion(req.params.id, attribute);
 res.send(data);
};

module.exports.handleDeleteOneQuestion = async (req, res) => {
 await deleteOneQuestion(req.params.id);
 res.sendStatus(204);
};
