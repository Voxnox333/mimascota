import jwt from 'jsonwebtoken';
import config from '../config';

const auth = {
    session:async (ctx,next)=>{
        let token = ctx.req.headers['authorization'];
        if(!token){
            ctx.throw(401, 'Auth token is required');
        }
        if (token.startsWith('Bearer ')) {
          token = token.slice(7, token.length);
        }
        if (token) {
            const decoded = await jwt.verify(token, config.secret);
            ctx.state.user = decoded;
            if(decoded){
                await next();
            }else{
                ctx.throw(401, 'Token is not valid');
            }
        } else {
            ctx.throw(401, 'Auth token is not supplied');
        }
    },
    isauthorized:async(ctx,next)=>{
        const User = ctx.orm().user;
        const user = await User.findOne({
            where: { email : ctx.state.user.email, name: ctx.state.user.name }
        });
        if(user){
            // exist user and is auth
            await next();
        }else{
            ctx.throw(401, 'The user dont exist or is invalid');
        }
    }
}

export default auth;