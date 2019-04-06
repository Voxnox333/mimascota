import rules from '../validators/user';
import validutil from '../validators/util';
import moment from 'moment';
import { AsyncResource } from 'async_hooks';

const user = {

   create:async(ctx)=>{

        // Validate
        await validutil.validate(ctx,rules.user);
       
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
        await validutil.validate(ctx,rules.user);
        const data = ctx.request.body;
        const dUser = {
            name: data.name,
            email: data.email,
            birthday: data.birthday
        };
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
   delete:async()=>{},
   viewall:async()=>{},
   view:async()=>{}
}

export default user;