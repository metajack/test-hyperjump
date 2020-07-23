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
    const server = "http://metajack.im:9898/hyperjump/jump"; //process.env.HYPERJUMP_URL;
    await got.post(server, {
      retry: 0,
      json: body,
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

main();
