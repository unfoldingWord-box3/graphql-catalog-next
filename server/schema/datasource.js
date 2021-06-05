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

  async getUserByName(name) {
    const qry = this.knex
      .select('*')
      .from('user')
      .where({"lower_name":name.toLowerCase()})
      .first()
      .cache(MINUTE)
    let res = await this.queryDB(qry)
    return camelcaseKeys(res, { deep: true })
  }

  async getReposByName(name) {
    const qry = this.knex
      .select('*')
      .from('repository')
      .where({"lower_name":name.toLowerCase()})
      .cache(MINUTE)
    let res = await this.queryDB(qry)
    return camelcaseKeys(res, { deep: true })

  }

  async getReposByNameAndOwner(repoName, userName) {
    const qry = this.knex
      .select('*')
      .from('repository')
      .join("user", "repository.owner_id", "=", "user.id")
      .where({"respository.lower_name":repoName.toLowerCase(), "user.lower_name":userName.toLowerCase()})
      .cache(MINUTE)
    let res = await this.queryDB(qry)
    return camelcaseKeys(res, { deep: true })

  }

  async getReposByOwner(ownerId) {
    const qry = this.knex
      .select('*')
      .from('repository')
      .where({"owner_id":ownerId})
      .cache(MINUTE)
    let res = await this.queryDB(qry)
    return camelcaseKeys(res, { deep: true })

  }

  async getUserById(userId) {
    const qry = this.knex
      .select('*')
      .from('user')
      .where({"id":userId})
      .first()
      .cache(MINUTE)
    let res = await this.queryDB(qry)
    return camelcaseKeys(res, { deep: true })

  }

}

module.exports.CatalogNext = CatalogNext
