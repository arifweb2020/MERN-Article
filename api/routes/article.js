const express = require("express");
const router = express.Router();
const Articles = require("../models/article");
const multer = require("multer");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./images/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });


// Get All Articles

router.get("/", (req, res) => {
    Articles.find()
        .then(x => res.json(x))
        .catch(err => res.status(400).json(`Error: ${err}`))
})


// Create Articles

router.post("/add", upload.single("articleImage"), async (req, res) => {
    const newArticle = new Articles({
        title: req.body.title,
        article: req.body.article,
        authorname: req.body.authorname,
        articleImage: req.file.originalname
    });
    newArticle.save().then(() => res.json("article added successfully"))
        .catch(err => res.status(400).json(`Error: ${err}`))

});

// Single Article find by id

router.get("/:id", async (req, res) => {
    Articles.findById(req.params.id)
        .then(article => res.json(article))
        .catch(err => res.status(400).json(`Error: ${err}`))

});

// Upadate single article by its id

router.put("/update/:id", upload.single("articleImage"), async (req, res) => {
    Articles.findById(req.params.id)
        .then(article => {
            article.title = req.body.title;
            article.article = req.body.article;
            article.authorname = req.body.authorname;
            article.articleImage = req.file.originalname

            article.save()
                .then(() => res.json("article updated successfully"))
                .catch(err => res.status(400).json(`Error: ${err}`))
        })
        .catch(err => res.status(400).json(`Error: ${err}`))


});

// Delte single article with id

router.delete("/:id", async (req, res) => {
    Articles.findByIdAndDelete(req.params.id)
        .then(() => res.json("Article is deleted successfully"))
        .catch(err => res.status(400).json(`Error: ${err}`))

});


module.exports = router;