const { Command } = require('commander')
const { Octokit } = require('@octokit/rest')

const ghToken = process.env.GITHUB_TOKEN

function usage() {
  const program = new Command()
  program
    .requiredOption('-o, --org <string>', 'Organization name (owner)')
    .requiredOption(
      '-r --repo <string>',
      'Repository Name (without organization name)'
    )
    .option(
      '-s --state <"open" | "closed" | "all">',
      'Either open, closed, or all to filter by state',
      'open'
    )
  program.parse()

  return program
}

function createClient(token) {
  return new Octokit({
    auth: token,
  })
}

async function findPullRequests(org, repo, state) {
  const octokit = createClient(ghToken)
  let data = []
  try {
    const result = await octokit.rest.pulls.list({
      owner: org,
      repo: repo,
      state: state,
    })
    if (result) {
      data = result.data
    }
  } catch (e) {
    console.log(e)
  }

  return data
}

function formatPullRequests(pullRequests) {
  return pullRequests.reduce(
    (acc, { html_url, user }) => acc.concat(`${user.login} ${html_url}`),
    []
  )
}

async function main() {
  const pg = usage()
  const { org, repo, state } = pg.opts()
  const pullRequests = await findPullRequests(org, repo, state)
  const rows = formatPullRequests(pullRequests)
  console.log(repo)
  console.log(rows.join('\n'))
}

main()
