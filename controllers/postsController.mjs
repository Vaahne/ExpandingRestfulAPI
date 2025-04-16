import posts from '../data/posts.mjs';

function createPost(req,res){
    if(req.body.userId && req.body.title && req.body.content){
        if(posts.find((p)=>p.id == req.body.id)){
            res.json({err:"Already found"});
            return;
        }
        const post = {
            id: posts[posts.length-1].id + 1,
            userID : req.body.userID,
            title: req.body.title,
            content: req.body.content
        };
        posts.push(post);
        res.json(posts[posts.length - 1]);
    }
}

function allPosts(req,res){
    const {userId} = req.query;
    console.log(userId);
    if(userId){
        const userSpecificPosts = posts.filter((p)=>p.userId == userId);
        return res.json(userSpecificPosts);
    }

    res.json(posts);
}

function specificPost(req,res){
    const post = posts.find((p)=> p.id == req.params.id);
    if(post)
        res.json(post);
    else    
        res.status(400).json({err: "Post doesnot exist"});
}
function updatePost(req,res,next){
    const post = posts.find((p,i)=>{
        if(p.id == req.params.id){
            for(const key in req.body){
                posts[i][key] = req.body[key];
            }
            return true;
        }
    });
    if(post)
        res.json(post);
    else
        next();  
}
function deletePost(req,res,next){
    const post = posts.find((p,i)=>{
        if(p.id == req.params.id){
            posts.splice(i,1);
            return true;
        }
    });
    if(post)
        res.json(post);
    else    
        next();
}

function getPostsByUser(req,res,next){
    const userId = req.params.id;
    const post = posts.find((p) => p.userId == userId );
    if(post){
        res.json(post);
    }else
        next(error(404,'User not found'));
}

export default {allPosts,specificPost,updatePost,deletePost,createPost,getPostsByUser}