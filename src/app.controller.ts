import { Logger, Controller, Get, Param } from '@nestjs/common';
import * as sqlite3 from 'sqlite3';
import * as fs from 'fs';

export const getIssue = async (db, jiraKey) => {
  const sql = `SELECT * FROM issues WHERE jira_key = ?`;

  return new Promise((resolve, reject) => {
    db.get(sql, [jiraKey], (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
};

@Controller('browse')
export class AppController {
  private readonly logger = new Logger(AppController.name);

  @Get(':id')
  async getHello(@Param('id') id: string) {
    let databaseFilepath = process.env.DATABASE_FILEPATH;

    if (databaseFilepath === undefined || databaseFilepath === '') {
      databaseFilepath = '/tmp/jira-export.db';
    }

    this.logger.log(`Accessing database at: ${databaseFilepath}`);
    if (!fs.existsSync(databaseFilepath)) {
      this.logger.error(`Unable to detect database file: ${databaseFilepath}`);
    }

    const db = new sqlite3.Database(databaseFilepath, (err) => {
      if (err) {
        this.logger.error('Getting error ' + err);
      }
    });

    const sanitizedId = id.replace(/[^a-zA-Z0-9-]/g, '');
    const issue: any = await getIssue(db, sanitizedId);

    if (issue === undefined) {
      return 'Issue not found';
    }
    return `<html><head><title>Ticket moved</title></head><body><p><a href="${issue.jira_url}">${issue.jira_key}</a> has moved to a new home at: <a href="${issue.github_url}">${issue.github_url}</a></p></body></html>`;
  }
}
