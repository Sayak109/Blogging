const express = require ('express');
const router = express.Router();
const Post = require('../models/Post');


// get

router.get("/",async (req,res)=>{   
try{
    const locals = {
        title:"NodejsProject",
        description:"Simple blog created with NodeJs,ExpressJs &MongoDB"
    }
        let perPage = 5;
        let page = req.query.page || 1;

        const data = await Post.aggregate([ { $sort: { createdAt: -1 } } ])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();

        const count = await Post.countDocuments({});
        const nextPage = parseInt(page)+1;
        const hasNextPage = nextPage <= Math.ceil(count/perPage);

        res.render('index',{
            locals,
            data,
            current: page,
            nextPage: hasNextPage ? nextPage : null 
        });
}catch(error){
    console.log(error);
}
});
//post

router.get('/post/:id',async (req,res)=>{
    
try{
    let slug = req.params.id;
    const data = await Post.findById({_id: slug});
    const locals = {
        title:data.title,
        description:"Simple blog created with NodeJs,ExpressJs &MongoDB"
    }
    res.render("post.ejs",{locals,data});
}catch(error){
    console.log(error);
}
});

// search
router.post('/search', async (req,res)=>{
    try{
        const locals = {
            title:"Search",
            description:"Simple blog created with NodeJs,ExpressJs &MongoDB"
        }
        let searchTerm = req.body.searchTerm;
        const searchNoSpecialCharacters = searchTerm.replace(/[^a-zA-Z0-9]/g," ")
        const data = await Post.find({
            $or:[
                {title:{$regex: new RegExp(searchNoSpecialCharacters, 'i') }},
                {body:{$regex: new RegExp(searchNoSpecialCharacters,'i') }}
            ]
        });  
        res.render("search",{
            data,
            locals
        });

    }catch(error){
        console.log(error);
    }
    });



router.get("/about",(req,res)=>{
    res.render("about.ejs");
});

// function insertPostData(){
//     Post.insertMany([
//      {
//          title:"Building a blog",
//          body:"This is the body text"
//      },
//     ]) 
//  }
//  insertPostData();



module.exports = router;