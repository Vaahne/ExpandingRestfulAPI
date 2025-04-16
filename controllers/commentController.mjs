import comments from '../data/comments.mjs';


function allComments(req,res){
    const {userId } = req.query;
    const {postId } = req.query;
    if(userId){
        const specificComments = comments.filter((c)=>c.userId == userId);
        return res.json(specificComments);
    }
    if(postId){
        const specificComments = comments.filter((c)=>c.postId == postId);
        return res.json(specificComments);
    }
    res.json(comments);
}
function specificComment(req,res,next){
    const user = comments.find((c)=> c.id ==req.params.id)
    if (user)
        res.json(user);
    else
        next();
}
function createComment(req,res){
    if(req.body.id && req.body.userId && req.body.postId && req.body.body ){
        if(comments.find((c) =>c.id == req.body.id )){
            res.json({err:"Already found"});
            return;
        }
        const comment = {
            id: comments[comments.length - 1].id + 1,
            userId: req.body.userId,
            postId: req.body.postId,
            body: req.body.body,
          };
          comments.push(comment); //pushing obj to DB
          res.json(comments[comments.length - 1]);
       
    }else{
        res.json({err:"Insuffiencent data"})
        return;
    }
}
function updateComment(req,res,next){
    const comment = comments.find((u,i)=>{
        if(u.id == req.params.id){
            for(const key in req.body){
                comments[i][key] = req.body[key];
            }
            return true;
        }
    });
    if(comment)
        res.json(comment);
    else   
        next(error(404,"Comment not found"));

}
function deleteComment(req,res,next){
    const comment = comments.find((u,i)=>{
        if(u.id == req.params.id){
            comments.splice(i,1);
            return true;
        }
    })
    if(comment){
        res.json(comment)
    }else
        next(error(404,"Comment not found"));
}

// function getAllComments(req,res){
//     postsController.getPostsByUser(req,res);
// }


export default {allComments,deleteComment,updateComment,specificComment,createComment};