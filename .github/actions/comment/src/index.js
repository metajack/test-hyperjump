const core = require("@actions/core");
const github = require("@actions/github");

async function main() {
  try {
    const github_token = core.getInput("github-token", {required: true});
    const comment = core.getInput("comment", {required: true});

    const client = new github.getOctokit(github_token);
    const context = github.context;
    console.log("CONTEXT:");
    console.log(context);
    const issue = context.issue;

    await client.issues.createComment({
      owner: issue.owner,
      repo: issue.repo,
      issue_number: issue.number,
      body: comment,
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

main();
