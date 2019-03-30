const express = require('express');
const postDb = require('./../data/helpers/postDb.js');
const multer = require('multer');
const fs = require('fs');
const cloudinary = require('cloudinary');
const router = express.Router();
const dataUri = require('datauri');

const newUri = new dataUri();


// Multer Storage
const storage = multer.memoryStorage();
// Multer Filter
const imageFilter = (req, file, cb) => {

    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' ) {
        cb(null, true)
    } else {
        cb(new Error('Only jpeg, jpg, png files are allowed.'), false);
    }
}
// Multer Upload Config
const upload = multer({ 
    storage: storage, 
    limits: {
        fileSize: 1024 * 1024 * 5
        ,
        fileFilter: imageFilter
    }
});
// Cloudinary Config
cloudinary.config({
    cloud_name: 'htg1iqq1p',
    api_key: '915419188456665',
    api_secret: 'M7938KD1Akyo8XBTmf7jF68jiHA'
})


router.post('/', upload.single('postMainImg'),  async (req, res) => {
    const Post = req.body;
    // const host = req.hostname;
    console.log(req.file)
    // const filePath = req.protocol + "://" + host + '' + req.file.path;
    // Post.postMainImg = result.secure_url

    const newUri = req => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);
    // newUri(req);
    const file = newUri(req).content;

    cloudinary.uploader.upload(file, result => {
        Post.postMainImg = result.secure_url;
    })
    try {
        const added = await postDb.insert(Post);
        
        if (added) {
            console.log(process.cwd());
            console.log(req.file.path);
            fs.writeFile(process.cwd() + "/uploads/" + req.file.path, function(err) {
                if (err) console.log(err);
                
            });
            res.status(201).json('Item Added.');
        }
        else {
            res.json('Please enter title and body.');
        }
    }
    catch (e) {
        res.status(500).json(e);
    }
});


router.get('/', async (req, res) => {

    const posts = await postDb.get(req.query);

    try {
        if (posts) {
            res.status(200).json(posts);
        }
        else {
            res.status(404).json('There are no available posts.')
        }
    }
    catch (e) {
        res.status(500).json(e)
    }
})



router.get('/category/:id', async (req, res) => {

    const posts = await postDb.getByCategoryId(req.params.id);

    try {
        if (posts.length > 0) {
            res.status(200).json(posts);
        }
        else {
            res.status(404).json('Category Id is invalid.')
        }
    }
    catch (e) {
        res.status(500).json(e);
    }
})

router.get('/:id', async (req, res) => {
    const post = await postDb.getById(req.params.id);

    try {
        if (post) {
            res.status(200).json(post);
        }
        else {
            res.status(404).json('Post id is unavailable.')
        }
    }
    catch (e) {
        res.status(500).json(e);
    }

})

router.put('/:id', async (req, res) => {

    const id = req.params.id;
    const body = req.body;
    const newPost = await postDb.update(id, body);
    try {
        if (newPost) {
            res.status(201).json('Item updated.');
        }
        else {
            res.status(404).json('Post id is unavailable.')
        }
    }
    catch (e) {
        res.status(500).json(e);
    }
})

router.delete('/:id', async (req, res) => {

    const id = req.params.id;
    const deleted = await postDb.remove(id);

    try {
        if (deleted) {
            res.status(200).json('Post successfully deleted.');
        }
        else {
            req.status(400).json('Post id is unavailable.')
        }
    }
    catch (e) {
        res.status(500).json(e);
    }
});


module.exports = router;