const {Schema, model} = require('mongoose');



const UserSchema = Schema( {
    name: {
        type: String,
        required: [true, 'El nombre es un campo obligatorio']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El e-mail es un campo obligatorio']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es un campo obligatorio']
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        default: "USER_ROLE",
        required: [true, 'El rol es un campo obligatorio'],
        emun: ["ADMIN_ROLE", "USER_ROLE"]
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
} );


UserSchema.methods.toJSON = function () {
    const {_id, __v, ...user} = this.toObject();
    user.uid = _id;


    return user;
}



module.exports = model("User", UserSchema);