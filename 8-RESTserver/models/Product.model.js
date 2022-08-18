const {Schema, model} = require('mongoose');



const ProductSchema = Schema( {
    name: {
        type: String,
        unique: true,
        required: [true, "El nombre de el producto es obligatorio"]
    },
    price: {
        type: Number,
        default: 0
    },
    description: {
        type: String
    },
    img: {
        type: String,
    },
    available: {
        type: Boolean,
        default: true,
        required: [true, "La disponibilidad del producto es obligatoria"]
    },
    status: {
        type: Boolean,
        default: true,
        required: [true, "El estado de el producto es obligatorio"]
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "La categoría del producto debe ser especificada"]
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "El usuario que creó el producto debe ser especificado"]
    }
} );


ProductSchema.methods.toJSON = function () {
    const {__v, ...product} = this.toObject();


    return product;
}



module.exports = model("Product", ProductSchema);