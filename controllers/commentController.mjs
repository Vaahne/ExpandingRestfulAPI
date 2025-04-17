import comments from '../data/comments.mjs';
import error from '../utiities/error.mjs';

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
    const postId = req.params.postId;
    const userId = req.params.userId;
    // checking any postId passes (/posts/:postId/comments)
    if(postId){
        const {userId} = req.query;
        // checking if any userId query is passed (/posts/:id/comments?userId=)
        if(userId){
            const commentByUserPost = comments.filter((c)=> c.postId == postId && c.userId == userId);
            if(commentByUserPost.length > 0)
                return res.json(commentByUserPost);
            return next(error(404,`user doesnt have any comments on post`));    
        }
        // if no query string userId is passed
        const commentByPost = comments.filter((c)=>c.postId == postId);
        if(commentByPost.length > 0)
            return res.json(commentByPost)
        return res.next(error(404,"No Comments found on the given post for specific user"));
    }

    // checking if any userid is passed (/users/:userId/comments)
    if(userId){
        const {postId} = req.query;
        // checking if any qeury string postId is set(/users/:userId/comments?postId=)
        if(postId){
            const commentsForuserSpecificPost = comments.filter((c)=>c.userId == userId && c.postId == postId);
            if(commentsForuserSpecificPost.length > 0)
                return res.json(commentsForuserSpecificPost);
            return next(error(404,`No comments found for the given user on specific post`))
        }

        // if no query string postId is passed
        const commentByUser = comments.filter((c)=>c.userId == userId);
        if(commentByUser.length > 0)
            return res.json(commentByUser)
        return res.next(error(404,"No Comments found on the given User"));
    }
    //This code for getting comments based on comment Id
    const comment = comments.find((c)=> c.id ==req.params.id)
    if (comment)
        return res.json(comment);
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
        next( error(404,"Comment not found"));
}

// function getAllComments(req,res){
//     postsController.getPostsByUser(req,res);
// }


export default {allComments,deleteComment,updateComment,specificComment,createComment};