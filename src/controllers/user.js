import rules from '../validators/user';
import validutil from '../validators/util';
import moment from 'moment';

const user = {

   create:async(ctx)=>{

        // Validate
        await validutil.validate(ctx,rules.user);
       
        const data = ctx.request.body;
        const ModelUser = ctx.orm().user;
        let exist = await ModelUser.findOne({
            where: { email : data.email }
        });

        if (exist){
            ctx.throw(400,'Duplicate email '+ data.email);
        }

        try {
            await ModelUser.create({
                name: data.name,
                email: data.email,
                birthday: data.birthday
            });
        }catch(err){
            ctx.throw(500,'Cannot create User');
        }

        ctx.status = 200;
        ctx.body={
            success:true
        };
        
   },

   update:async(ctx)=>{

   }
}

export default user;