import rules from '../validators/user';
import validutil from '../validators/util';

const User = {
    validpropety:(ctx)=>{
        if(ctx.state.user.id != ctx.params.id){
            //ctx.throw(400,"You dont have access to this user");
        }
    },
   create:async(ctx)=>{

        // Validate
        await validutil.validate(ctx,rules.user,"body");
       
        const data = ctx.request.body;
        const dUser = {
            name: data.name,
            email: data.email,
            birthday: data.birthday
        };
        const ModelUser = ctx.orm().user;
        
        try {
            await ModelUser.create(dUser);
        }catch(e){
            if (e.errors instanceof Array && e.errors[0])  ctx.throw(400,e.errors[0].message);
            ctx.throw(400,"Cannot save User");
        }

        ctx.status = 200;
        ctx.body={
            success:true,

        };
        
   },

   update:async(ctx)=>{

        // Validate
        await validutil.validate(ctx,rules.id,"params");
        await validutil.validate(ctx,rules.user,"body");

        const data = ctx.request.body;
        const dUser = {
            name: data.name,
            email: data.email,
            birthday: data.birthday
        };
        
        await User.validpropety(ctx);
        const ModelUser = ctx.orm().user;
        let user = await ModelUser.findOne({where: { id: parseInt( ctx.params.id ) }});

        if(user){

            try {
                await user.update(dUser);
            }catch(e){
                if (e.errors instanceof Array && e.errors[0])  ctx.throw(400,e.errors[0].message);
                ctx.throw(400,"Cannot update User");
            }
            
        }else{
            ctx.throw(400,'User dont exist');
        }

        ctx.status = 200;
        ctx.body={
            success:true,
            user: dUser
        }
   },
   delete:async(ctx)=>{

        await validutil.validate(ctx,rules.id,"params");
        const ModelUser = ctx.orm().user;
        let user = await ModelUser.findOne({where: { id: parseInt( ctx.params.id ) }});

        if(user){

            try {
                await user.destroy();
            }catch(e){
                if (e.errors instanceof Array && e.errors[0])  ctx.throw(400,e.errors[0].message);
                ctx.throw(400,"Cannot destroy User");
            }
            
        }else{
            ctx.throw(400,'User dont exist');
        }

        ctx.status = 200;
        ctx.body={
            success:true,
            message:"The user was deleted"
        }
   },
   detail:async(ctx)=>{

        await validutil.validate(ctx,rules.id,"params");
        await User.validpropety(ctx);
        const ModelUser = ctx.orm().user;
        let user = await ModelUser.findOne({
            attributes: ['id','name','birthday'],
            where: { id: parseInt( ctx.params.id )}
        });

        if(user){

            ctx.status = 200;
            ctx.body={
                success:true,
                user:user
            };
            
        }else{
            ctx.throw(400,'User dont exist');
        }        
   },
   listall:async(ctx)=>{
        const ModelUser = ctx.orm().user;
        let users = await ModelUser.findAll({
            order: [
                ['id', 'ASC']
            ]
        });

        if(users){
            ctx.status = 200;
            ctx.body=ctx.body={
                success:true,
                user:users
            };
        }else{
            ctx.throw(400,'User dont exist');
        }  
   }
}

export default User;