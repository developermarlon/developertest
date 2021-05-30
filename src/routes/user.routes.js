//import packages
import { Router } from 'express'
import passport from 'passport'

//config
const router = Router()

//controllers
import * as UserController from '../controllers/user.controller'
import validateRole from '../middlewares/validate-role'

//methods
router.post('/', passport.authenticate('jwt', {session: false}), validateRole(['admin', 'client']), UserController.getUsers)
router.post('/verifyToken', passport.authenticate('jwt', {session: false}), UserController.verifyToken)
router.post('/login', UserController.login)
router.post('/register', UserController.register)
router.post('/uploadPhoto', UserController.uploadPhoto)
router.put('/updateUser', passport.authenticate('jwt', {session: false}), validateRole(['admin']), UserController.updateUser)
router.put('/editProfile', passport.authenticate('jwt', {session: false}), UserController.editProfile)
router.post('/deleteUser', passport.authenticate('jwt', {session: false}), validateRole(['admin']), UserController.deleteUser)


export default router