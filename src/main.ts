import * as core from '@actions/core'
import * as slack from '@slack/webhook'

type Optional<T> = T | null | undefined
async function run(): Promise<void> {
  const webhookURL: string = process.env.SLACK_WEBHOOK_URL!

  const webhook = new slack.IncomingWebhook(webhookURL)
  const args: slack.IncomingWebhookSendArguments = {
    text: 'testtest'
  }

  await webhook.send(args)

  try {
    core.info('done!')
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
