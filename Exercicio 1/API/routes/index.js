var express = require('express');
var router = express.Router();
var axios = require('axios');
var gdb =require('../utils/graphdb')

const url = "http://localhost:7200/repositories/EMD?query="

const prefixes= `@prefix : <http://www.di.uminho.pt/prc2020/EMD#> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix xml: <http://www.w3.org/XML/1998/namespace> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .`




/* GET home page. */
router.get('/api/emd', async function(req, res, next) {
  if(req.query.res){
    if(req.query.res=='OK'){
      var query = `SELECT ?emd ?nome ?data WHERE { 
        ?emd a :EMD;
        :resultado "True";
        :realizadoPor ?nome;
        :data ?data
      }`;
    }
    else{
      var query = `SELECT ?emd ?nome ?data WHERE { 
        ?emd a :EMD;
        :resultado "False";
        :realizadoPor ?nome;
        :data ?data
      }`;
    }
  }
  else{
  var query = `SELECT ?emd ?resultado ?nome ?data WHERE { 
                  ?emd a :EMD;
                  :resultado ?resultado;
                  :realizadoPor ?nome;
                  :data ?data
              }`;}
  var result = await gdb.execQuery(query);
  var dados = result.results.bindings.map(c => {
    return {
          id: c.emd.value.split('#')[1],
          data: c.data.value,
          nome: c.nome.value.split('#')[1],
          resultado: c.resultado.value
    }
  })
    res.status(200).jsonp(dados);
});

/* GET home page. */
router.get('/api/emd/:id', async function(req, res, next) {
  var id = req.params.id
  var query = `SELECT ?resultado ?nome ?data WHERE { 
   :`+id+` a :EMD ;
:resultado ?resultado;
:realizadoPor ?nome;
 :data ?data
}`;
  var result = await gdb.execQuery(query);
  var dados = result.results.bindings.map(c => {
    return {
          id: id,
          data: c.data.value,
          nome: c.nome.value.split('#')[1],
          resultado: c.resultado.value
    }
  })
    res.status(200).jsonp(dados);
});

router.get('/api/modalidades', async function(req, res, next) {
  var query = `SELECT DISTINCT ?modalidades  WHERE {
    ?modalidades a :Modalidade
  }`;
  var result = await gdb.execQuery(query);
  var dados = result.results.bindings.map(c => {
    return {
          modalidade: c.modalidades.value.split('#')[1]
  }})
    res.status(200).jsonp(dados);
});

router.get('/api/modalidades/:id', async function(req, res, next) {
  id = req.params.id
  var query = `SELECT ?emd WHERE {
      ?emd a :EMD.
      ?emd :realizadoPor ?pessoa.
      ?pessoa :praticaModalidade :`+id+`.
}`;
  var result = await gdb.execQuery(query);
  var dados = result.results.bindings.map(c => {
    return {
          emd: c.emd.value.split('#')[1]
  }})
    res.status(200).jsonp(dados);
});

router.get('/api/atletas', async function(req, res, next) {
  if(req.query.gen){
    if(req.query.gen=="F"){
      var query = `SELECT ?atleta ?nome WHERE {
        ?atleta a :Atleta;
          :nome ?nome;
          :genero "F".
        }
        ORDER BY(?nome)`;
        var result = await gdb.execQuery(query);
        var dados = result.results.bindings.map(c => {
    return {
      nome: c.nome.value
  }})
    res.status(200).jsonp(dados);
    }
    else{
      var query = `SELECT ?atleta ?nome WHERE {
        ?atleta a :Atleta;
          :nome ?nome;
          :genero "M".
        }
        ORDER BY(?nome)`;
        var result = await gdb.execQuery(query);
  var dados = result.results.bindings.map(c => {
    return {
          
          nome: c.nome.value
  }})
    res.status(200).jsonp(dados);
    }
  }
  else{
    if(req.query.clube){
      clube = req.query.clube
      var query = `SELECT ?atleta ?nome WHERE {
        ?atleta a :Atleta;
          :nome ?nome;
        :pertence :`+clube+`.
      }
      ORDER BY(?nome)`;
        var result = await gdb.execQuery(query);
        var dados = result.results.bindings.map(c => {
        return {  
          nome: c.nome.value
        }})
    res.status(200).jsonp(dados);
    }
    else{
      var query = `SELECT ?atleta ?nome WHERE {
        ?atleta a :Atleta;
          :nome ?nome.
      }
      ORDER BY(?nome)`;
        var result = await gdb.execQuery(query);
        var dados = result.results.bindings.map(c => {
        return {  
          nome: c.nome.value
        }})
    res.status(200).jsonp(dados);
    }
    }
    
    }
  );




module.exports = router;
