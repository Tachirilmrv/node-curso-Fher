const {Schema, model} = require('mongoose');



const RoleSchema = Schema( {
    role: {
        type: String,
        required: [true, "El rol es obligatorio"]
    }
} );


RoleSchema.methods.toJSON = function () {
    const {__v, ...role} = this.toObject();


    return role;
}



module.exports = model("Role", RoleSchema);