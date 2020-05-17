import * as core from '@actions/core'
import * as slack from '@slack/webhook'
import {MessageAttachment} from '@slack/types'
import {createAttachment} from './utils'

type Optional<T> = T | null | undefined
async function run(): Promise<void> {
  const webhookURL: string = process.env.SLACK_WEBHOOK_URL!
  const githubActor: string = process.env.GITHUB_ACTOR!
  const githubRef: string = process.env.GITHUB_REF!
  const githubEvent: string = process.env.GITHUB_EVENT_NAME!

  const webhook = new slack.IncomingWebhook(webhookURL)
  const attachments: MessageAttachment = createAttachment({
    color: '#36a64f',
    authorName: githubActor,
    authorLink: `https://github.com/${githubActor}`,
    authorIcon: `https://github.com/${githubActor}.png`,
    title: ':tada: Build Success! :tada:',
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
        value:
          'Pull Request URL\nhttps://github.com/CA21engineer/Gotties-Client/pull/28\nReviewers\n `ho2ri2s`',
        short: false
      }
    ],
    footer: 'Slack API',
    footerIcon:
      'https://platform.slack-edge.com/img/default_application_icon.png',
    ts: '123456789'
  })
  const args: slack.IncomingWebhookSendArguments = {
    attachments: [attachments]
  }

  await webhook.send(args)

  try {
    core.info('done!')
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
