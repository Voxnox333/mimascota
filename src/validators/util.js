
const util = {
    validate:async(ctx,rules)=>{
        ctx.checkBody(rules);
        let errors = await ctx.validationErrors();
        if (errors) {
            const err = { 
                success : "false",
                message : "The fields are invalid",
                validates: errors
            };
            ctx.throw(400,JSON.stringify(err));
         }
    }
}

export default util;