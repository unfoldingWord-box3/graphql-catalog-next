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

  async searchUsers(name) {
    const qry = this.knex
      .select('*')
      .from('user')
      .where('lower_name', "LIKE", `%${name.toLowerCase()}%`)
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

  async getRepoByNameAndOwner(repoName, userName) {
    const qry = this.knex
      .select('*')
      .from('repository')
      .join("user", "repository.owner_id", "=", "user.id")
      .where({"repository.lower_name":repoName.toLowerCase(), "user.lower_name":userName.toLowerCase()})
      .first()
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

  async getRepoById(repoId) {
    const qry = this.knex
      .select('*')
      .from('repository')
      .where({"id":repoId})
      .first()
      .cache(MINUTE)
    let res = await this.queryDB(qry)
    return camelcaseKeys(res, { deep: true })

  }

  async getLangsOfRepo(repoId) {
    const qry = this.knex
      .select('*')
      .from('language_stat')
      .where({'repo_id': repoId})
      .cache(MINUTE)
    let res = await this.queryDB(qry)
    return camelcaseKeys(res, { deep: true })
  }

  async getRepoTopics(repoId) {
    const qry = this.knex
      .select('*')
      .from('topic')
      .join('repo_topic', "repo_topic.topic_id", "=", 'topic.id')
      .where({'repo_topic.repo_id': repoId})
      .cache(MINUTE)
    let res = await this.queryDB(qry)
    return camelcaseKeys(res, { deep: true })
  }

  async getRepoAccess(repoId) {
    const qry = this.knex
      .select('*')
      .from('access')
      // .join('repo_topic', "repo_topic.topic_id", "=", 'topic.id')
      .where({'repo_id': repoId})
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

  async getOrgUsers() {
    const qry = this.knex
      .select('*')
      .from('user')
      .where({"type":1})
      .cache(MINUTE)
    let res = await this.queryDB(qry)
    return camelcaseKeys(res, { deep: true })
  }

  async getOrgTeams(orgUserId) {
    const qry = this.knex
      .select('*')
      .from('team')
      .where({"org_id":orgUserId})
      .cache(MINUTE)
    let res = await this.queryDB(qry)
    return camelcaseKeys(res, { deep: true })
  }

  async getOrgMembers(orgUserId) {
    const qry = this.knex
      .select('*')
      .from('user')
      .join('org_user', 'user.id', "=", "org_user.uid")
      .where({"org_user.org_id":orgUserId})
      .cache(MINUTE)
    let res = await this.queryDB(qry)
    return camelcaseKeys(res, { deep: true })
  }

  async getTeamMembers(teamId) {
    const qry = this.knex
      .select('*')
      .from('user')
      .join('team_user', 'user.id', "=", "team_user.uid")
      .where({"team_user.team_id":teamId})
      .cache(MINUTE)
    let res = await this.queryDB(qry)
    return camelcaseKeys(res, { deep: true })
  }

  async getTeamRepos(teamId) {
    const qry = this.knex
      .select('*')
      .from('repository')
      .join('team_repo', 'repository.id', "=", "team_repo.repo_id")
      .where({"team_repo.team_id":teamId})
      .cache(MINUTE)
    let res = await this.queryDB(qry)
    return camelcaseKeys(res, { deep: true })
  }

  async getOrgsByname(name) {
    const qry = this.knex
      .select('*')
      .from('user')
      .where({"type":1, "name": name})
      .cache(MINUTE)
    let res = await this.queryDB(qry)
    return camelcaseKeys(res, { deep: true })
  }

  async getOneCatalog(repoName, userName, branchOrTag) {
    const qry = this.knex
    .select('*')
    .from('door43_metadata')
    .join('repository', 'door43_metadata.repo_id', '=', 'repository.id')
    .join('user', 'repository.owner_id', '=', 'user.id')
    .where({'user.lower_name': userName.toLowerCase, 
            'repository.lower_name': repoName.toLowerCase(),
            'door43_metadata.branch_or_tag': branchOrTag.toLowerCase()})
    .first()
    .cache(MINUTE)
    let res = await this.queryDB(qry)
    return camelcaseKeys(res, { deep: true })
  }

  async getCatalogsByRepo(repoName) {
    const qry = this.knex
    .select('*')
    .from('door43_metadata')
    .join('repository', 'door43_metadata.repo_id', '=', 'repository.id')
    .where({'repository.lower_name': repoName.toLowerCase()})
    .cache(MINUTE)
    let res = await this.queryDB(qry)
    return camelcaseKeys(res, { deep: true })
  }

  async getCatalogsByOwner(userName) {
    const qry = this.knex
    .select('*')
    .from('door43_metadata')
    .join('repository', 'door43_metadata.repo_id', '=', 'repository.id')
    .join('user', 'repository.owner_id', '=', 'user.id')
    .where({'user.lower_name': userName.toLowerCase()})
    .cache(MINUTE)
    let res = await this.queryDB(qry)
    return camelcaseKeys(res, { deep: true })
  }

  async getReleaseById(id){
    const qry = this.knex
      .select('*')
      .from('release')
      .where({"id":id})
      .first()
      .cache(MINUTE)
    let res = await this.queryDB(qry)
    return camelcaseKeys(res, { deep: true })
  }

  async searchCatalogs(searchWord) {
    const qry = this.knex
      .select('*')
      .from('door43_metadata')
      .join('repository', 'door43_metadata.repo_id', '=', 'repository.id')
      .where(this.knex.raw('CONCAT(??, ??, ??)', ["lower_name", "owner_name", "description"]),
        "LIKE", `%${searchWord}%`)
      .cache(MINUTE)
      let res = await this.queryDB(qry)
      return camelcaseKeys(res, { deep: true })
  }

}

module.exports.CatalogNext = CatalogNext
