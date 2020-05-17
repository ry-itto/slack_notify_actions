import * as core from '@actions/core'
import * as slack from '@slack/webhook'
import {MessageAttachment} from '@slack/types'
import {createAttachment} from './utils'

type Optional<T> = T | null | undefined
async function run(): Promise<void> {
  const webhookURL: string = process.env.SLACK_WEBHOOK_URL!

  const webhook = new slack.IncomingWebhook(webhookURL)
  const attachments: MessageAttachment = createAttachment({
    color: '#36a64f',
    authorName: 'ry-itto',
    authorLink: 'https://github.com/ry-itto',
    authorIcon: 'https://github.com/ry-itto.png',
    title: ':tada: Build Success! :tada:',
    fields: [
      {
        title: 'Branch',
        value: 'master',
        short: true
      },
      {
        title: 'Event',
        value: 'push',
        short: true
      },
      {
        title: 'Body',
        value:
          'Pull Request URL\nhttps://github.com/CA21engineer/Gotties-Client/pull/28\nReviewers\n `ho2ri2s`',
        short: false
      }
    ],
    imageUrl: 'https://github.com/ry-itto.png',
    thumbUrl: 'https://github.com/ry-itto.png',
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
