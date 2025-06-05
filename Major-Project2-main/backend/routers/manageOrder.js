const express = require('express');
const Model = require('./orderRouter');

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

//user manage order

const express = require("express");
//const router = express.Router();
const Order = require("../models/orderModel");

//  1. Create a New Order
router.post("/create", async (req, res) => {
  try {
    const { userId, product, price } = req.body;
    const newOrder = new Order({ userId, product, price });
    await newOrder.save();
    res.status(201).json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ error: "Error creating order" });
  }
});

//  2. Get Orders for a Specific User
router.get("/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Error fetching orders" });
  }
});

//  3. Cancel an Order (Only if Pending)
router.put("/cancel/:orderId", async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    if (order.status !== "Pending") {
      return res.status(400).json({ error: "Only pending orders can be cancelled" });
    }
    order.status = "Cancelled";
    await order.save();
    res.json({ message: "Order cancelled successfully", order });
  } catch (error) {
    res.status(500).json({ error: "Error cancelling order" });
  }
});

//  4. Update Order Status (Admin Use)
router.put("/update/:orderId", async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    order.status = status;
    await order.save();
    res.json({ message: "Order status updated successfully", order });
  } catch (error) {
    res.status(500).json({ error: "Error updating order" });
  }
});

//  5. Delete an Order
router.delete("/delete/:orderId", async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting order" });
  }
});

module.exports = router;






