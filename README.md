# zlinks

A small Nest.js app that automatically provides a link to the migrated issue in GitHub using data collected by zindexer during the GitHub Import process.

Calling an url such as http://my.previous.jira.url/browse/PIPELINE-22 will redirect display the following content:

```html
<html>
  <head><title>Ticket moved</title></head>
  <body>
    <p><a href="https://jira.jahia.org/browse/PIPELINE-22">PIPELINE-22</a> has moved to a new home at: <a href="https://github.com/my-org/jira-pipeline/issues/129">https://github.com/my-org/jira-pipeline/issues/129</a></p>
  </body>
</html>
```

### Generate the database

Using zindexer, once all your issues have been migrated and checked, call the build-linkdb action

```bash 
zindexer github:import -a build-linkdb
```

You'll find in the logs the path to the generated sqlite3 database

### Start zlinks

```bash 
yarn install
DATABASE_FILEPATH=/Users/username/.config/zindexer/jira-export.db yarn run start
```

Or best, use the zencrepes/zlinks docker image