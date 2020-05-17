interface GitHubEnvVariables {
  githubActor: string
  githubRef: string
  githubEvent: string
}

interface ProcessEnvVariables {
  webhookURL: string
  slackUser?: string
  slackIconURL?: string
  slackUsername?: string
  attachmentsTitle?: string
  attachmentsTitleURL?: string
  attachmentsBody?: string
  attachmentsColor: string
}

export const readEnvVariables = (): EnvVariables => {
  const webhookURL = process.env.SLACK_WEBHOOK_URL
  const githubActor = process.env.GITHUB_ACTOR
  const githubRef = process.env.GITHUB_REF
  const githubEvent = process.env.GITHUB_EVENT_NAME

  if (!webhookURL) {
    throw Error(
      `Env variable SLACK_WEBHOOK_URL not found. Please specify this variable.`
    )
  }

  if (!(githubActor && githubRef && githubEvent)) {
    throw Error(`
      Variable(s) defined by GitHub are not found.
      GITHUB_ACTOR: ${githubActor},
      GITHUB_REF: ${githubRef},
      GITHUB_EVENT_NAME: ${githubEvent},
    `)
  }

  return {
    webhookURL,
    githubActor,
    githubRef,
    githubEvent,
    slackIconURL: process.env.SLACK_ICON_URL,
    slackUsername: process.env.SLACK_USERNAME,
    attachmentsTitle: process.env.TITLE ?? '',
    attachmentsTitleURL: process.env.TITLE_URL ?? '',
    attachmentsBody: process.env.BODY ?? '',
    attachmentsColor: process.env.COLOR ?? 'green'
  }
}

export type EnvVariables = GitHubEnvVariables & ProcessEnvVariables
