const {Schema, model} = require('mongoose');



const CategorySchema = Schema( {
    name: {
        type: String,
        unique: true,
        required: [true, "El nombre de la categoría es obligatorio"]
    },
    status: {
        type: Boolean,
        default: true,
        required: [true, "El estado de la categoría es obligatoriio"]
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "El ususario que creó la categoría debe ser especificado"]
    }
} );


CategorySchema.methods.toJSON = function () {
    const {__v, ...category} = this.toObject();


    return category;
}



module.exports = model("Category", CategorySchema);