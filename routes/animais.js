const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

module.exports = router

// RETORNA TODOS OS ANIMAIS DE RUA
router.get('/', (req, res, next) => {
   mysql.getConnection((error, conn) => {
      if (error) { return res.status(500).send({ error: error})}
      conn.query(
          'SELECT * FROM animaistable',
          (error, resultado, fields) => {
            if (error) { return res.status(500).send({ error: error})}
            return res.status(200).send({response: resultado})
          }
      )
  })


});

// INSERE ANIMAIS
router.post('/', (req, res, next) => {
     mysql.getConnection((error, conn) => {
         if (error) { return res.status(500).send({ error: error})}
         conn.query(
         'INSERT INTO animaistable (nome, especie, sexo, castrado, local) VALUES (?,?,?,?,?)',
         [req.body.nome, req.body.especie, req.body.sexo, req.body.castrado, req.body.local],
         (error, resultado, field) => {
             conn.release();
             if (error) { return res.status(500).send({ error: error, response: null });
             }

             res.status(201).send({
                mensagem: 'Novo bicho de estimação adicionado!',
                id_animal: resultado.insertId,
                nomeanimal: req.body.nome
         } 
       )
     })    
    });
});

// RETORNA OS DADOS DE UM ANIMAL ESPECIFICO
router.get('/:id_animal', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error})}
        conn.query(
            'SELECT * FROM animaistable WHERE idanimaistable = ?;',
            [req.params.id_animal],
            (error, resultado, fields) => {
              if (error) { return res.status(500).send({ error: error})}
              return res.status(200).send({response: resultado})
        }
        );
    })
});
    
// ALTERAÇÕES NOS DADOS DOS ANIMAIS
router.patch('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error})}
        conn.query(
            `UPDATE animaistable
                SET nome = ?,
                    especie = ?,
                    sexo = ?,
                    castrado = ?,
                    local = ?
                    WHERE idanimaistable = ?`,
        [
            req.body.nome, 
            req.body.especie, 
            req.body.sexo, 
            req.body.castrado, 
            req.body.local, 
            req.body.idanimaistable
        ],
        (error, resultado, field) => {
            conn.release();
            if (error) { return res.status(500).send({ error: error, response: null });
            }

            res.status(202).send({
               mensagem: 'Dados do bicho de estimação alterados!',
               id_animal: req.body.idanimaistable,
               nomeanimal: req.body.nome
        } 
      )
    })    
   });
});

// REMOVENDO ANIMAIS
router.delete('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error})}
        conn.query(
            `DELETE FROM animaistable WHERE idanimaistable = ?`,
        [
            req.body.idanimaistable
        ],
        (error, resultado, field) => {
            conn.release();
            if (error) { return res.status(500).send({ error: error, response: null });
            }

            res.status(202).send({
               mensagem: 'Dados do bicho de estimação excluídos!',
               id_animal: req.body.idanimaistable,
               nomeanimal: req.body.nome
        } 
      )
    })    
   });
});


