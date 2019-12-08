const express = require('express');
const router = express.Router();
const modelTask = require("../models/task");

router.get('/', async (request, response) => {
  try {
    response.json(await modelTask.find());
  } catch (e) {
    console.error("router.get(/) =>", e);
  }
});

router.post('/', async (request, response) => {
  try {
    objTask = {
      title: request.body.title,
      description: request.body.description
    }
    response.json(await new modelTask(objTask).save());
  } catch (e) {
    console.error("router.post(/) =>", e);
  }
});

router.get('/:id', async (request, response) => {
  try {
    response.json(await modelTask.findById(request.params.id));
  } catch (e) {
    console.error("router.get(/:id) =>", e);
  }
});

router.put('/:id', async (request, response) => {
  try {
    objTask = {
      title: request.body.title,
      description: request.body.description
    }
    response.json(await modelTask.findOneAndUpdate(request.params.id,objTask));
  } catch (e) {
    console.error("router.put(/:id) =>", e);
  }
});

router.delete('/:id', async (request, response) => {
  try {
    response.json(await modelTask.findOneAndRemove(request.param.id));
  } catch (e) {
    console.error("router.delete(/:id) =>", e);
  }
});

module.exports = router;