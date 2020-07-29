const core = require("@actions/core");
const github = require("@actions/github");
const got = require("got");
const process = require("process");

const hyperjump_url = "http://github.aws.hlw3truzy4ls.com:6080/hyperjump/jump";

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
    await got.post(hyperjump_url, {
      retry: 0,
      json: body,
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

main();
