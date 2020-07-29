const core = require("@actions/core");
const github = require("@actions/github");

async function main() {
  try {
    const github_token = core.getInput("github-token", {required: true});
    const comment = core.getInput("comment", {required: true});
    const number = core.getInput("number", {required: true});

    const client = new github.getOctokit(github_token);

    const repository = github.context.payload.repository;
    await client.issues.createComment({
      owner: repository.owner.login,
      repo: repository.name,
      issue_number: number,
      body: comment,
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

main();