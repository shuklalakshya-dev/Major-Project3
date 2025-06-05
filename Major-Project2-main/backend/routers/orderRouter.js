const express = require('express');
const Model = require('../models/orderModel');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middlewares/verifyToken');
require('dotenv').config();

const router = express.Router();

router.post('/add', (req, res) => {
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

router.get('/getall', (req, res) => {

    Model.find()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });

});
//name
router.get('/getbyname/:name', (req, res) => {
    Model.findOne({ name: req.params.name })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});
///version
router.get('/getbyversion/:version', (req, res) => {
    Model.find({ version: req.params.version })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

//author
router.get('/getbyauthor/:author', (req, res) => {
    Model.find({ author: req.params.author })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});
//image
router.get('/getbyimage/:image', (req, res) => {
    Model.find({ image: req.params.image })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});
//downloads
router.get('/getbydownloads/:downloads', (req, res) => {
    Model.find({ downloads: req.params.downloads })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

//updated
router.get('/getbyupdated/:updated', (req, res) => {
    Model.find({ updated: req.params.updated })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});
//price
router.get('/getbyprice/:price', (req, res) => {
    Model.find({ price: req.params.price })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});
//createdAt
router.get('/getbycreatedAt/:createdAt', (req, res) => {
    Model.find({ createdAt: req.params.createdAt })
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
router.post('/authenticate', (req, res) => {
    Model.findOne(req.body)
        .then((result) => {
            if (result) {

                const { _id, name, email, password, role } = result;

                const payload = { _id, name, email, password };



                // generate token
                jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    { expiresIn: '2 days' },
                    (err, token) => {
                        if (err) {
                            console.log(err);
                            res.status(500).json(err);
                        } else {
                            res.status(200).json({ token, role, name, email });
                        }
                    }
                )


            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);

        });
})
//userpurchase
module.exports = router;