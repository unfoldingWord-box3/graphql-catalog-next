const { RESTDataSource } = require('apollo-datasource-rest');
const { SQLDataSource } = require("datasource-sql");
const camelcaseKeys = require('camelcase-keys');

const MINUTE = 60;

class CatalogNext extends SQLDataSource {

  queryDB(query){
    return query.then(function(rows){
            return rows;
        })
  }

}

module.exports.CatalogNext = CatalogNext
