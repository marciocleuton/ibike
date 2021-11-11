const express = require('express');
const PostController = require('./controllers/PostControllers');
const LikeControllers = require('./controllers/LikeControllers');
const UsuarioControllers = require('./controllers/UsuarioControllers');

const ProdutoControllers = require('./controllers/ProdutoControllers');
const BookControllers = require('./controllers/BookControllers');

const multer = require('multer');
const uploadConfi = require('./config/multer');

const routes = new express.Router();
const upload = multer(uploadConfi);

routes.get('/posts',  PostController.index);

routes.get('/book',  BookControllers.index);


routes.post('/user',   upload.single('image'), UsuarioControllers.store);
routes.get('/user',   UsuarioControllers.index);
routes.get('/user/:id',   UsuarioControllers.index2);
routes.delete('/user/:id',   UsuarioControllers.delete);
routes.put('/user',  upload.single('image'), UsuarioControllers.atualizar);
routes.post('/user/login',  upload.single('image'), UsuarioControllers.login);
routes.post('/user/checktoken',  UsuarioControllers.checkToken);

routes.get('/user/destroyToken',  UsuarioControllers.destroyToken);

routes.post('/posts', upload.single('image'), PostController.store);


routes.post('/book',   upload.single('image'), BookControllers.store);
routes.post('/posts/:id/like', LikeControllers.store);


routes.post('/produto',   upload.single('image'), ProdutoControllers.store);
routes.get('/produto',   ProdutoControllers.index);
routes.get('/produto/:id',   ProdutoControllers.index2);
routes.delete('/produto/:id',   ProdutoControllers.delete);
routes.put('/produto',  upload.single('image'), ProdutoControllers.atualizar);


module.exports = routes;
