const core = require("@actions/core");
const github = require("@actions/github");

async function main() {
  try {
    const github_token = core.getInput("github-token", {required: true});
    const comment = core.getInput("comment", {required: true});
    const number = core.getInput("number", {required: true});
    const tag = core.getInput("tag", {required: true});
    const delete_older = core.getInput("delete-older", {required: true});

    const client = new github.getOctokit(github_token);

    const metadata = {
      "tag": tag,
    };
    const metadata_html_comment = `<!-- metadata: ${JSON.stringify(metadata)} -->`
    const comment_with_metadata = `${comment}\n${metadata_html_comment}`;

    const repository = github.context.payload.repository;

    if (delete_older) {
      // search for comments with the same tag and delete them
      const comments = await client.issues.listComments({
        owner: repository.owner.login,
        repo: repository.name,
        issue_number: number,
      });
      for (let c of comments.data) {
        if (c.user.login == "github-actions[bot]") {
          const m = extract_metadata(c.body);
          console.log("extracted metadata");
          console.log(m);
          if ("tag" in m && m["tag"] == tag) {
            await client.issues.deleteComment({
              owner: repository.owner.login,
              repo: repository.name,
              comment_id: c.id,
            });
          }
        }
      }
    }
    
    await client.issues.createComment({
      owner: repository.owner.login,
      repo: repository.name,
      issue_number: number,
      body: comment_with_metadata,
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

function extract_metadata(text) {
  const re = /<!-- metadata: (.*?) -->/;
  const metadata_text = re.match(text);
  if (re) {
    return JSON.parse(metdata_text);
  }
  return {};
}

main();
