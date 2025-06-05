const express = require('express');
const Model = require('../models/reviewModel');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();

router.post('/add', verifyToken, (req, res) => {
    req.body.user = req.user._id;
    console.log(req.body);

    new Model(req.body).save()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            if (err.code === 11000) {
                res.status(200).json({ message: 'Email already exists' });
            } else {
                res.status(500).json(err); ({ message: 'something went wrong' });
            }
        });

});


// Get all reviews
router.get('/getall', async (req, res) => {
    try {
        const reviews = await Model.find();
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/getbytemplate/:id', async (req, res) => {
    try {
        const reviews = await Model.find({ template: req.params.id }).populate('user');
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get('/getall', (req, res) => {

    Model.find()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });

});
//createdAt
router.get('/getbycreatedAt/:createdAt', (req, res) => {
    Model.find({ city: req.params.createdAt })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});
// : denotes url parameter
router.get('/getbyid/:id', (req, res) => {
    Model.findById(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/update/:id', (req, res) => {
    Model.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/delete/:id', (req, res) => {
    Model.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);

        });
});

module.exports = router;