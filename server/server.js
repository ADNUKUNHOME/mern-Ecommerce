const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path')
const cors = require('cors');
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//DATABASE CONNECTION WITH MONGODB

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.log("❌ MongoDB Connection Error:", err));


// API Creation

app.get("/", (req, res) => {
    res.send("Express app is Running...")
})

//image storage engine

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage: storage });

//Creating Upload endpoint 

app.use('/images', express.static('upload/images'))
app.post('/upload', upload.single("product"), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${PORT}/images/${req.file.filename}`
    })
})


//Schema for creating products

const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    },
})


app.post('/addproduct', async (req, res) => {

    const productData = req.body;
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    } else {
        id = 1;
    }

    const product = new Product({
        id: id,
        name: productData.name,
        image: productData.image,
        category: productData.category,
        new_price: productData.new_price,
        old_price: productData.old_price,
    })
    console.log('produuct : ', product)
    await product.save()
    console.log('saved.');

    res.json({
        success: true,
        name: productData.name,
    })
})


app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log('Removed the product');
    res.json({
        success: true,
        name: req.body.name
    })
})

app.get('/allproducts', async (req, res) => {
    let products = await Product.find({});
    console.log('fetched all products');
    res.send(products);
})


//Users schema creation

const Users = mongoose.model('Users', {
    name: {
        type: String,
    },

    email: {
        type: String,
        unique: true
    },

    password: {
        type: String
    },

    cartData: {
        type: Object
    },

    date: {
        type: Date,
        default: Date.now
    }
})

//Creating Endpoint for registering User

app.post('/signup', async (req, res) => {

    const check = await Users.findOne({ email: req.body.email })

    if (check) {
        return res.status(400).json({
            success: false,
            message: 'User is already exist!'
        })
    }

    let cart = {}
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }

    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart
    })

    await user.save();

    const data = {
        user: {
            id: user.id
        }
    }

    const token = jwt.sign(data, 'secret_mern');
    res.json({
        success: true,
        token
    })
})

//creating endpoint for user login

app.post('/login', async (req, res) => {
    const user = await Users.findOne({ email: req.body.email });

    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user: {
                    id: user.id

                }
            }
            const token = jwt.sign(data, 'secret_mern');
            res.json({
                success: true,
                token
            })
        } else {
            res.json({
                success: false,
                message: 'Password is incurrect!'
            })
        }
    } else {
        res.json({
            success: false,
            message: 'The user is not Exist!'
        })
    }
})

//Creating Endpoint for new collections

app.get('/newcollections', async (req, res) => {
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8)
    console.log("new collections fetched.");
    res.send(newcollection);
})

//creating endpoint for popular in women section

app.get('/popularinwomen', async (req, res) => {
    let products  = await Product.find({category: "women"});
    let popular_in_women = products.slice(0, 4);
    console.log('popular women products are fetched');
    res.send(popular_in_women);
})

//Ceating middleware to fetch user

 const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if(!token) {
        res.status(401).send({
            message: "Please Authenticate with a valid token"
        })
    } else {
        try {
            const data = jwt.verify(token, 'secret-mern');            
            req.user = data.user
            next();
        } catch (error) {
            res.status(401).send({
                message:'please authenticate with a valid email id'
            })
        }
    }
 }

//Creating Endpoint for adding products in cart data

app.post('/addtocart', fetchUser, async (req, res) => {
    let userData = await Users.findOne({_id: req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id: req.user.id}, {cartData: userData.cartData});
    res.send('Added...')
})

// Creating Endpoint for remove products from cartData

app.post('/removefromcart', fetchUser, async (req, res) => {
    let userData = await Users.findOne({_id: req.user.id});
    if(userData.cartData[req.body.itemId] > 0)
    userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({_id: req.user.id}, {cartData: userData.cartData});
    res.send('Added...')
})

//Creating Endpoint for get cart Items

app.get('/getcart', fetchUser, async (req, res) => {
    const userData  = await Users.findOne({_id: req.user.id});
    res.json(userData.cartData);
})

app.listen(PORT, (error) => {
    if (!error) {
        console.log('Server Running on Port ' + PORT);
    }
    else {
        console.log('Error: ' + error);
    }
})