const core = require("@actions/core");
const github = require("@actions/github");
const got = require("got");
const process = require("process");

async function main() {
  try {
    const { owner, repo, number } = github.context.issue;
    const comment = core.getInput("comment", {required: true});

    // trigger the hyperjump
    const body = {
      owner: owner,
      repo: repo,
      type: "comment",
      args: {
        number: number,
        comment: comment,
      },
    };
    await got.post(process.env.HYPERJUMP_URL, {
      retry: 0,
      json: body,
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

main();
