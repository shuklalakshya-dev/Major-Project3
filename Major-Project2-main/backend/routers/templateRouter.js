const express = require('express');
const Model = require('../models/templateModel');

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
    Model.findOne({ email: req.params.name })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});
///version
router.get('/getbyversion/:version', (req, res) => {
    Model.find({ city: req.params.version })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

//author
router.get('/getbyauthor/:author', (req, res) => {
    Model.find({ city: req.params.author })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});
//image
router.get('/getbyimage/:image', (req, res) => {
    Model.find({ city: req.params.image })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});
//downloads
router.get('/getbydownloads/:downloads', (req, res) => {
    Model.find({ city: req.params.downloads })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

//updated
router.get('/getbyupdated/:updated', (req, res) => {
    Model.find({ city: req.params.updated })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});
//price
router.get('/getbyprice/:price', (req, res) => {
    Model.find({ city: req.params.price })
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

// : preview

router.get('/preview/:id' , async (req, res) => {
try{
  const template = await Template.findByid(req.params.id);
  res.json(template);
}
catch (error) {
    res.status(500).json({error: 'Template not found'});

}
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