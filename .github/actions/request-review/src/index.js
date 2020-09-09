const core = require("@actions/core");
const github = require("@actions/github");
const got = require("got");
const process = require("process");

const hyperjump_url = "http://github.aws.hlw3truzy4ls.com:6080/hyperjump/jump";

async function main() {
  try {
    const { owner, repo, number } = github.context.issue;
    const reviewers = core.getInput("add", {required: true});

    const reviewer_list = (reviewers || "")
          .split(",")
          .map(s => s.trim())
          .filter(s => s.length > 0);

    // trigger the hyperjump
    const body = {
      owner: owner,
      repo: repo,
      type: "request-review",
      args: {
        number: number,
        reviewers: reviewer_list,
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
