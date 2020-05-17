import * as core from '@actions/core'
import * as slack from '@slack/webhook'
import {MessageAttachment} from '@slack/types'
import {createAttachment, createIncomingWebhookSendArguments} from './utils'
import {readEnvVariables} from './env_variables'

async function run(): Promise<void> {
  const envVariables = readEnvVariables()

  const webhook = new slack.IncomingWebhook(envVariables.webhookURL)
  const attachments: MessageAttachment = createAttachment({
    color: envVariables.attachmentsColor,
    authorName: envVariables.githubActor,
    authorLink: `https://github.com/${envVariables.githubActor}`,
    authorIcon: `https://github.com/${envVariables.githubActor}.png`,
    title: envVariables.attachmentsTitle,
    titleLink: envVariables.attachmentsTitleURL,
    fields: [
      {
        title: 'Ref',
        value: envVariables.githubRef,
        short: true
      },
      {
        title: 'Event',
        value: envVariables.githubEvent,
        short: true
      },
      {
        title: '',
        value: envVariables.attachmentsBody ?? '',
        short: false
      }
    ]
  })
  const args = createIncomingWebhookSendArguments({
    iconUrl: envVariables.slackIconURL,
    username: envVariables.slackUsername,
    attachments: [attachments]
  })

  await webhook.send(args)

  try {
    core.info('done!')
  } catch (error) {
    core.setFailed(error.message)
  }
}

run().catch(err => {
  core.setFailed(err.message)
})
