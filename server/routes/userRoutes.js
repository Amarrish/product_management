import express from 'express';
import { userController, userloginController } from '../controller/userController.js';
import jwtmiddleware from '../middleware/jwtmiddleware.js'
import { deleteproductcontroller, getallproductcontroller, productaddcontroller, updateproductcontroller } from '../controller/productController.js';
import multerConfig from '../middleware/multermiddleware.js';

const router = express.Router();

router.post('/user/register', userController.register);

router.post('/user/login',userloginController.login);


router.post('/user/addproduct', jwtmiddleware, multerConfig.single('imageUrl'), productaddcontroller.addproduct)

router.get('/user/getall', jwtmiddleware, getallproductcontroller.getallproduct)

router.put('/product/edit/:id',jwtmiddleware,multerConfig.single('imageUrl'), updateproductcontroller.updateproduct)

router.delete('/product/delete/:id', jwtmiddleware, deleteproductcontroller.deleteproduct);


export default router;