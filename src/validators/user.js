// Validators User

const rules = {
    id:{
        'id': {
            notEmpty: true,
            isInt: {
                errorMessage: 'ID should be a number integer'
            },
            isLength: {
                options: [{max: 11 }],
                errorMessage: 'Can not have more than 11 digits' 
            },
            errorMessage: 'ID is required'
        }
    },
    user:{
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
        },
        'birthday':{
            notEmpty: true,
            isDate: {
                errorMessage: 'Invalid Bithday format'
            },
            dateLess:{
                errorMessage: 'Bithday dont exist'
            },
            errorMessage: 'The name is required'
            }
        }
};

export default rules;