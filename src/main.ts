import * as core from '@actions/core'
import * as slack from '@slack/webhook'
import {MessageAttachment} from '@slack/types'
import {createAttachment, createIncomingWebhookSendArguments} from './utils'

type Optional<T> = T | null | undefined
async function run(): Promise<void> {
  const webhookURL: string = process.env.SLACK_WEBHOOK_URL!
  const githubActor: string = process.env.GITHUB_ACTOR!
  const githubRef: string = process.env.GITHUB_REF!
  const githubEvent: string = process.env.GITHUB_EVENT_NAME!
  const slackIconURL: Optional<string> = process.env.SLACK_ICON_URL
  const slackUsername: Optional<string> = process.env.SLACK_USERNAME
  const attachmentsTitle: string = process.env.TITLE ?? ''
  const attachmentsTitleURL: Optional<string> = process.env.TITLE_URL ?? ''
  const attachmentsBody: string = process.env.BODY ?? ''
  const attachmentsColor: string = process.env.COLOR ?? 'green'

  const webhook = new slack.IncomingWebhook(webhookURL)
  const attachments: MessageAttachment = createAttachment({
    color: attachmentsColor,
    authorName: githubActor,
    authorLink: `https://github.com/${githubActor}`,
    authorIcon: `https://github.com/${githubActor}.png`,
    title: attachmentsTitle,
    titleLink: attachmentsTitleURL,
    fields: [
      {
        title: 'Ref',
        value: githubRef,
        short: true
      },
      {
        title: 'Event',
        value: githubEvent,
        short: true
      },
      {
        title: '',
        value: attachmentsBody,
        short: false
      }
    ]
  })
  const args = createIncomingWebhookSendArguments({
    iconUrl: slackIconURL,
    username: slackUsername,
    attachments: [attachments]
  })

  await webhook.send(args)

  try {
    core.info('done!')
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
