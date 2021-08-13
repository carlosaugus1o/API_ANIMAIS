const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

module.exports = router

// RETORNA TODOS OS ANIMAIS DE RUA
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Buscando todos os bichos de estimação...'
    });
});

// INSERE ANIMAIS
router.post('/', (req, res, next) => {
     mysql.getConnection((error, conn) => {
         conn.query(
         'INSERT INTO animais (nome, especie, sexo, castrado, local) VALUES (?,?,?,?,?)',
         [req.body.nome, req.body.especie, req.body.sexo, req.body.castrado, req.body.local],
         (error, resultado, field) => {
             conn.release();
             if (error) {
                 return res.status(500).send({
                     error: error,
                     response: null
                 });
             }

             res.status(201).send({
                mensagem: 'Novo bicho de estimação adicionado!',
                animalInserido: animal
         } 
       )
     })    
    });
});

// RETORNA OS DADOS DE UM ANIMAL ESPECIFICO
router.get('/:id_animal', (req, res, next) => {
    const id = req.params.id_animal

    if (id === 'Cacazinho') {
        res.status(200).send({
            mensagem: 'Você encontrou o gato dourado!',
            id: id
        });
    } else {
        res.status(200).send({
            mensagem: 'Você buscou por um animal.'
        });
    }
});
    
// ALTERAÇÕES NOS DADOS DOS ANIMAIS
router.patch('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Fazendo patch nos animais de rua...'
    });
});

// REMOVENDO ANIMAIS
router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Fazendo delete nos animais de rua...'
    });
});


