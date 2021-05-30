import passport from 'passport'
import jwt from 'jsonwebtoken'
import User from '../database/models/user'
import UserRole from '../database/models/user-role'
import bcrypt from 'bcrypt'
import multer from 'multer'
import path from 'path'
import cloudinary from 'cloudinary'
import { v4 as uuidv4 } from 'uuid'

export const getUsers = async (req, res) => {
    try {
        const _res = await User.findAll({
            where: {},
            include: [
                {
                    attributes: ['name'],
                    model: UserRole,
                    required: true,
                    where: {
                        name: 'client'
                    }
                }
            ]
        })

        res.status(200).json(_res)
    }catch(error) {
        console.log(error)
    }
}

export const deleteUser = async (req, res) => {
    try {
        const {id_user} = req.body
        const io = req.app.get('io')

        await User.destroy({
            where: {
                id_user
            }
        })
        io.emit('updateUsers')
        res.status(200).json({message: 'User deleted successfully'})
    }catch(error) {
        console.log(error)
        res.status(400).json({message: 'Sorry, the user was not deleted'})
    }
}

export const verifyToken = async (req, res) => {
    res.status(200).json({message: 'token verified'})
}

export const login = async (req, res) => {
    try {
        passport.authenticate('local', {session: false}, (err, user, info) => {
            if (err || !user) {
                console.log(err)
                return res.status(400).json({
                    message: 'Something is not right',
                    user   : user
                });
            }
           req.login(user, {session: false}, (err) => {
               if (err) {
                   res.status(400).send(err);
               }
               const token = jwt.sign({ id_user: user.id_user }, process.env.JWT_SECRET, { expiresIn: "1d" });
               return res.status(200).json({user, token: `Bearer ${token}`});
            })
        })(req, res)
    }catch(error) {
        // console.log(error)
    }
}

const upload = multer({ 
    storage: multer.diskStorage({
        destination: path.join(__dirname, '../public/uploads/profile'),
        filename: (res, file, cb) => {
            cb(null, uuidv4()+path.extname(file.originalname).toLocaleLowerCase())
        }
    }),
    limits: {
        fileSize: 10000000,
    },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/
        const mimetype = filetypes.test(file.mimetype)
        const extname = filetypes.test(path.extname(file.originalname))

        if(mimetype && extname) {
            return cb(null, true)
        }
        cb("Error: The file must be an image")
    }
}).single('photo')

export const uploadPhoto = async (req, res, next) => {
    await upload(req, res, async (err, result) => {
        if(err){
            return res.status(400).json({
                message: err.message
            })
        }
        await cloudinary.v2.uploader.upload(req.file.path, 
            { 
                folder: "example/profile",
                gravity: "face",
                crop: "thumb",
                public_id: req.file.filename,
                width: 200 
            }, 
        (err, result) => {
            if(err) {
                console.log(err)
            }
            if(result){
                res.status(200).json({
                    message: 'Photo uploaded successfully',
                    routeImage: result.secure_url
                })
            }
        })
    })
}

export const register = async (req, res) => {
    try {
        const {name, email, password, photo} = req.body
        const io = req.app.get('io')
        const role = await UserRole.findOne({
            attributes: ['id_role'],
            where: {
                name: 'client'
            }
        })
        const encryptPassword = await bcrypt.hash(password, 10)
        await User.create({name, email, password: encryptPassword, role: role.dataValues.id_role, photo})
        io.emit('updateUsers')
        res.status(200).json({message: 'User created successfully'})
    }catch(error) {
        // console.log(error)
        res.status(400).json({message: 'Sorry, the user already exist'})
    }
}

export const editProfile = async (req, res) => {
    try {
        const {name, email, photo} = req.body

        await User.update(
            {
                name,
                email,
                photo
            }, {
                where: {
                    id_user: req.user.dataValues.id_user
                }
            }
        )

        res.status(200).json({message: 'User updated successfully'})
    }catch(error) {
        // console.log(error)
        res.status(400).json({message: 'Sorry, the user was not updated'})
    }
}

export const updateUser = async (req, res) => {
    try {
        const {id_user, name, email, photo} = req.body
        const io = req.app.get('io')
        await User.update(
            {
                name,
                email,
                photo
            }, {
                where: {
                    id_user
                }
            }
        )
        io.emit('updateUsers')
        res.status(200).json({message: 'User updated successfully'})
    }catch(error) {
        // console.log(error)
        res.status(400).json({message: 'Sorry, the user was not updated'})
    }
}