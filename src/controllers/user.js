import rules from '../validators/user';
import validutil from '../validators/util';
import moment from 'moment';

const user = {

   create:async(ctx)=>{

        // Validate
        await validutil.validate(ctx,rules.user);
       
        const data = ctx.request.body;
        const ModelUser = ctx.orm().user;
        
        try {
            await ModelUser.create({
                name: data.name,
                email: data.email,
                birthday: data.birthday
            });
        }catch(e){
            if (e.errors instanceof Array && e.errors[0])  ctx.throw(400,e.errors[0].message);
            ctx.throw(400,"Cannot save User");
        }

        ctx.status = 200;
        ctx.body={
            success:true
        };
        
   },

   update:async(ctx)=>{

    // Validate
    await validutil.validate(ctx,rules.user);
   
    const data = ctx.request.body;
    const ModelUser = ctx.orm().user;

    try {
        await ModelUser.create({
            name: data.name,
            email: data.email,
            birthday: data.birthday
        });
    }catch(err){
        console.log(err);
        ctx.throw(500,'Cannot create User');
    }

    ctx.status = 200;
    ctx.body={
        success:true
    };
    
}
}

export default user;