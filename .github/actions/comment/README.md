# comment

This action adds a comment to an issue or pull request. The issue or pull
request is implied by where the action is triggered.

## Usage

Here's an example workflow using this action:

```yaml
  comment-on-issue:
    runs-on: ubuntu-latest
    name: comment on issue
    steps:
      - name: checkout
        uses: actions/checkout@v2
      - name: post comment
        uses: ./.github/actions/comment
        with:
          comment: "this is a comment"
```

## Inputs

### `comment`

The comment text.
