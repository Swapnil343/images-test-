const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const mongo_key="mongodb+srv://yougankrajput0561:3OIZ2TzOrf0qi2kk@cluster0.0fxll5t.mongodb.net/"

mongoose.connect(mongo_key);
const app = express();
const PORT = 8080;

app.use(bodyParser.raw({ type: 'image/*' })); 

const UserSchema = new mongoose.Schema({
    image: String
});

const ImageModel = mongoose.model('Image', UserSchema); 
const imageDirectory="C:/Users/youga/OneDrive/Desktop/Test";

app.get('/data', (req, res) => {
    ImageModel.find({}).then(function(users){
        //res.send(imageName);
        res.send(users);
    }).catch(function(err){
        console.log(err)
    })
});

app.post('/upload', (req, res) => {
    const imageName =Date.now()+".jpeg";
    const imagePath=path.join(imageDirectory,imageName);
    const imageBuffer = req.body;
    fs.writeFile(imagePath, imageBuffer, (err) => {
        if (err) {
            res.send("Error saving image to disk");
        } else {
            const newImage = new ImageModel({ imageName: imageName });
            newImage.save()
                .then(image => {
                    res.send("Image uploaded and saved successfully");
                })
                .catch(err => {
                    console.error(err);
                    res.send("Error saving image to database");
                });
        }
    });
});

app.listen(process.env.PORT, () => {
    console.log("Server is running at port ", port);
});
