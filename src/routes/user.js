const express = require('express');
const router = express.Router();

const pool = require('../database');
const {
    isLoggedIn
} = require('../lib/auth');


router.get('/add', (req, res) => {
    res.render('links/add');
});

router.post('/links/add', async (req, res) => {
    const {
        concept,
        type,
        amount,
        category,
        description
    } = req.body;
    const newLink = {
        concept,
        type,
        amount,
        category,
        description,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO links set ?', [newLink]);
    req.flash('success', 'Link Saved Successfully');
    res.redirect('/home');
});


router.get('/delete/:id', async (req, res) => {
    const {
        id
    } = req.params;
    await pool.query('DELETE FROM links WHERE ID = ?', [id]);
    req.flash('success', 'Link Removed Successfully');
    res.redirect('/home');
});

router.get('/edit/:id', async (req, res) => {
    const {
        id
    } = req.params;
    const links = await pool.query('SELECT * FROM links WHERE id = ?', [id]);
    const link = links[0]
    res.render('links/edit', {
        link
    });
});

router.post('/edit/:id', async (req, res) => {
    const {
        id
    } = req.params;
    const {
        concept,
        type,
        amount,
        category,
        description
    } = req.body;
    const newLink = {
        concept,
        type,
        amount,
        category,
        description,
        user_id: req.user.id
    };
    await pool.query('UPDATE links set ? WHERE id = ?', [newLink, id]);
    req.flash('success', 'Link Updated Successfully');
    res.redirect('/home');
});

router.get('/home/:id', async (req, res) => {
    const {
        id
    } = req.params;
   console.log(req.body)
});

module.exports = router;