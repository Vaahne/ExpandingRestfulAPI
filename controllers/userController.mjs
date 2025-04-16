import users from '../data/user.mjs';
import postsController from './postsController.mjs';

function allUsers(req,res){
    res.json(users);
}
function specificUser(req,res,next){
    const user = users.find((u)=> u.id ==req.params.id)
    if (user)
        res.json(user);
    else
        next();
}
function createUser(req,res){
    if(req.body.name && req.body.username && req.body.email){
        if(users.find((u) =>u.username == req.body.username )){
            res.json({err:"Already found"});
            return;
        }
        const user = {
            id: users[users.length - 1].id + 1,
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
          };
          users.push(user); //pushing obj to DB
          res.json(users[users.length - 1]);
       
    }else{
        res.json({err:"Insuffiencent data"})
        return;
    }
}
function updateUser(req,res,next){
    const user = users.find((u,i)=>{
        if(u.id == req.params.id){
            for(const key in req.body){
                users[i][key] = req.body[key];
            }
            return true;
        }
    });
    if(user)
        res.json(user);
    else   
        next();

}
function deleteUser(req,res,next){
    const user = users.find((u,i)=>{
        if(u.id == req.params.id){
            users.splice(i,1);
            return true;
        }
    })
    if(user){
        res.json(user)
    }else
        next();
}

function getAllPosts(req,res){
    postsController.getPostsByUser(req,res);
}


export default {allUsers,deleteUser,updateUser,specificUser,createUser,getAllPosts};