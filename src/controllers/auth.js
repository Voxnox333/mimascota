import jwt from 'jsonwebtoken';
import rules from '../validators/auth';
import validutil from '../validators/util';
import config from '../config';

const auth = {
    authorized:async(ctx)=>{

        // Validate
        await validutil.validate(ctx,rules.login);
        
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
                ctx.status = 200;
                ctx.body={
                    success:true,
                    token:token,
                    user: payload
                };

            }else{
                ctx.throw(401, 'The name is invalid');
            }
        
        }else{
            ctx.throw(401, 'The email is invalid');
        }

    }
}

export default auth;