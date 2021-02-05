const {
  getAllQuestions,
  findQuestionById,
  postOneQuestion,
  putOneQuestion,
  deleteOneQuestion,
} = require("../models/faq");

module.exports.handleAllQuestions = async (req, res) => {
  const rawData = await getAllQuestions(req);
  const allQuestionsLength = await getAllQuestions();
  res.set("X-Total-Count", allQuestionsLength.length);
  res.send(rawData);
};

module.exports.handleOneQuestion = async (req, res) => {
  res.send(await findQuestionById(req.params.id));
};

module.exports.handleCreateQuestion = async (req, res) => {
  const { faq_title, faq_content } = req.body;
  const data = await postOneQuestion({
    faq_title,
    faq_content,
  });
  return res.status(201).send(data);
};

module.exports.handleUpdateQuestion = async (req, res) => {
  const { faq_title, faq_content } = req.body;
  const attribute = {
    faq_title,
    faq_content,
  };
  const data = await putOneQuestion(req.params.id, attribute);
  res.send(data);
};

module.exports.handleDeleteQuestion = async (req, res) => {
  await deleteOneQuestion(req.params.id);
  res.sendStatus(204);
};
