const express = require('express');
const router = express.Router();

const Task = require('../models/task')

router.get('/', async(req, res) => {
    const tasks = await Task.find();
    res.render('index', {
        tasks
    });
    console.log(tasks)
});

router.get('/done/:id', async(req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    task.status = !task.status;
    await task.save();
    res.redirect('/');
});

router.get('/delete/:id', async(req, res) => {
    const { id } = req.params;
    await Task.remove({_id: id});
    res.redirect('/');
});

router.get('/edit/:id', async(req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    res.render('edit', {
        task
    });
});

//Post methods

router.post('/add', async(req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.redirect('/')
});

router.post('/update/:id', async(req, res) => {
    const { id } = req.params;
    await Task.update({_id: id}, req.body);
    res.redirect('/')
});

module.exports = router;