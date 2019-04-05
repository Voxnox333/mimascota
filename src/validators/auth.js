// Validators Auth

const rules = {
    login:{
        'email': {
            notEmpty: true,
            isEmail: {
                errorMessage: 'Invalid Email'
            },
            errorMessage: 'The email is required'
        },
        'name': {
            notEmpty: true,
            isLength: {
                options: [{ min: 3 }],
                errorMessage: 'The name must have at least 3 characters'
            },
            errorMessage: 'The name is required'
            }
        }
};


export default rules;