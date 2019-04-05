import jwt from 'jsonwebtoken';
import rules from '../validators/auth';
import config from '../config';

const auth = {
    session: (ctx,next)=>{
        let token = ctx.request.headers['authorization'];
        if (token.startsWith('Bearer ')) {
          token = token.slice(7, token.length);
        }
        if (token) {
          jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
              ctx.throw(401, 'Token is not valid');
            } else {
              ctx.state.user = user;
              next();
            }
          });
        } else {
            ctx.throw(401, 'Auth token is not supplied');
        }
    },
    authorized:async(ctx)=>{

        // Validate
        ctx.checkBody(rules.login);
        let errors = await ctx.validationErrors();
        if (errors) {
            ctx.body = { 
                success : "false",
                message : "The fields are invalid",
                validates: errors
            };
            ctx.status = 400;
            return;
        }

        // Login
        const data = ctx.request.body;
        const User = ctx.orm().user;
        const user = await User.findOne({
            where: { email : data.email }
        });

        if(user){

            if (user.name===data.name){

                let payload = {
                    id:user.id,
                    name:user.name,
                    email:user.email
                };

                let token = jwt.sign(payload,config.secret,{ expiresIn: config.tokenexpire });
            
                ctx.body={
                    success:true,
                    token:token,
                    user: payload
                };

            }else{
                ctx.throw(401, 'Unauthorized: The name is invalid');
            }
        
        }else{
            ctx.throw(401, 'Unauthorized: The email is invalid');
        }

    }
}

export default auth;