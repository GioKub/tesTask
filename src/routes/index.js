const express = require('express');
const router = express.Router();

const model = require('../model/schema')();

// homepage
router.get('/', (req, res)=>{
    model.find({}, (err, schema)=>{
        if(err){console.log(err);}

        res.render('index', {
            title: 'CRUD MongoDB',
            schema: schema
        });

    });
});

// analytics page
router.get('/analytics', (req, res)=>{
    const {completed_from, completed_till}=req.query
        const from=(new Date(completed_from)).toUTCString()
        const till=(new Date(completed_till)).toUTCString()

        let items;

    //get the count of items
    model.find({}, (err, schema)=>{
        if(err){console.log(err);}

        items = schema.length

        res.render('analytics', {
            items: items
        });
    });

    /* incomplete
    model.find({completed_at : {$gt:from, $lt:till}}, (err, schema)=>{
        if(err){console.log(err);}
        
    });
    */
});

// add button clicked
router.post('/add', (req, res)=>{
    let body = req.body;
    body.status = false;
    body.created_at = (new Date()).toUTCString(),

    model.create(body, (err, schema)=>{
        if(err){console.log(err);}
        res.redirect('/');
    });
});

// done button clicked
router.get('/done/:id', (req,res)=>{
    let id = req.params.id;
    model.findById(id, (err, schema)=>{
        if(err){console.log(err);}
        schema.status=!schema.status;
        schema.completed_at=(new Date()).toUTCString(),
        schema.save()
    });
});

// delete button clicked
router.get('/delete/:id', (req,res)=>{
    let id = req.params.id;
    model.remove({_id: id}, (err, schema)=>{
        if(err){console.log(err);}
        res.redirect('/');
    });
});

module.exports = router;