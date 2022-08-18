import {Request, Response} from "express";

import User from '../models/user.model';



export const readUser = async (req: Request, res: Response) => {
    const {id} = req.params;

    const user = await User.findByPk(id);
    const userStatus = user?.getDataValue("status");


    if(user && userStatus) {
        res.status(200).json( {
            msg: "GET User",
            user
        } );
    } else {
        res.status(400).json( {
            msg: "El usuario con el id especificado no existe"
        } );
    }
}

export const readUsers = async (req: Request, res: Response) => {
    const users = await User.findAll();
    
    
    res.status(200).json( {
        msg: "GET Users",
        users
    } );
}

export const crtUser = async (req: Request, res: Response) => {
    const {name, email} = req.body;
    

    try {
        const existEmail = await User.findOne( {
            where: {
                email
            }
        } );


        if(!existEmail) {
            const user = User.build( {name, email} );
    
    
            await user.save();
    
    
            res.status(200).json( {
                msg: "POST User",
                user
            } );
        } else {
            return res.status(400).json( {
                msg: "Este correo ya está registrado en la base de datos"
            } );
        }
    } catch(error) {
        console.log(error);


        res.status(500).json( {
            msg: "Algo salió mal"
        } );
    }
}

export const updUser = async (req: Request, res: Response) => {
    const {id} = req.params;
    const {name, email} = req.body;

    
    try {
        let existEmail;


        if(email) {
            existEmail = await User.findOne( {
                where: {
                    email
                }
            } );
        }


        if(!existEmail) {
            const user = await User.findByPk(id);
            const userStatus = user?.getDataValue("status");
        
        
            if(!user || !userStatus) {
                return res.status(404).json( {
                    msg: "No existe el usuario con el id especificado"
                } );
            }
        
        
            await user.update( {name, email} );
        
            
            res.status(200).json( {
                msg: "PUT User",
                id,
                user
            } );
        } else {
            return res.status(400).json( {
                msg: "El correo que está intentando modificar ya existe en la base de datos"
            } );
        }
    } catch (error) {
        console.log(error);


        res.status(500).json( {
            msg: "Algo salió mal"
        } );
    }
}

export const delUser = async (req: Request, res: Response) => {
    const {id} = req.params;


    try {
        const user = await User.findByPk(id);
        const userStatus = user?.getDataValue("status");


        if(user && userStatus) {
            await user.update( {
                status: false
            } );

            
            res.status(200).json( {
                msg: "DELETE User",
                id,
                user
            } );
        } else {
            res.status(400).json( {
                msg: "El usuario con el id especificado no existe"
            } );
        }
    } catch (error) {
        console.log(error);


        res.status(500).json( {
            msg: "Algo salió mal"
        } );
    }
}