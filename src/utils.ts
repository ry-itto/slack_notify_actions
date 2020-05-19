/* eslint-disable @typescript-eslint/camelcase */
import {
  AttachmentAction,
  MessageAttachment,
  KnownBlock,
  Block
} from '@slack/types'
import {IncomingWebhookSendArguments} from '@slack/webhook'
import {Agent} from 'http'

interface CreateAttachmentArgumentType {
  blocks?: (KnownBlock | Block)[]
  fallback?: string
  color?: 'good' | 'warning' | 'danger' | string
  pretext?: string
  authorName?: string
  authorLink?: string
  authorIcon?: string
  title?: string
  titleLink?: string
  text?: string
  fields?: {
    title: string
    value: string
    short?: boolean
  }[]
  imageUrl?: string
  thumbUrl?: string
  footer?: string
  footerIcon?: string
  ts?: string
  actions?: AttachmentAction[]
  callbackId?: string
  mrkdwnIn?: ('pretext' | 'text' | 'fields')[]
}

export const createAttachment = (
  args: CreateAttachmentArgumentType
): MessageAttachment => {
  return {
    blocks: args.blocks,
    fallback: args.fallback,
    color: args.color,
    pretext: args.pretext,
    author_name: args.authorName,
    author_link: args.authorLink,
    author_icon: args.authorIcon,
    title: args.title,
    title_link: args.titleLink,
    text: args.text,
    fields: args.fields,
    image_url: args.imageUrl,
    thumb_url: args.thumbUrl,
    footer: args.footer,
    footer_icon: args.footerIcon,
    ts: args.ts,
    actions: args.actions,
    callback_id: args.callbackId,
    mrkdwn_in: args.mrkdwnIn
  }
}

interface IncomingWebhookDefaultArgumentsCamel {
  username?: string
  iconEmoji?: string
  iconUrl?: string
  channel?: string
  text?: string
  linkNames?: boolean
  agent?: Agent
}

interface CreateIncomingWebhookSendArgumentsArgumentType
  extends IncomingWebhookDefaultArgumentsCamel {
  attachments?: MessageAttachment[]
  blocks?: (KnownBlock | Block)[]
  unfurlLinks?: boolean
  unfurlMedia?: boolean
}

export const createIncomingWebhookSendArguments = (
  args: CreateIncomingWebhookSendArgumentsArgumentType
): IncomingWebhookSendArguments => {
  return {
    attachments: args.attachments,
    blocks: args.blocks,
    unfurl_links: args.unfurlLinks,
    unfurl_media: args.unfurlMedia,
    username: args.username,
    icon_emoji: args.iconEmoji,
    icon_url: args.iconUrl,
    channel: args.channel,
    text: args.text,
    link_names: args.linkNames,
    agent: args.agent
  }
}

export const replaceGitHubUsernameWithSlackUsername = (
  text: string,
  usernames: string
): string => {
  const githubToSlack =
    usernames.split('\n').reduce<{[key: string]: string}>((result, row) => {
      const res = row.split(',')
      const key: string = res[0]
      const value: string | undefined = res[1]
      if (!value) {
        return result
      }
      result[key] = value
      return result
    }, {}) ?? {}
  for (const [key, value] of Object.entries(githubToSlack)) {
    const regExpKeyWithToken = `<@${key}>`
    const regExpKeyWithMention = `(?!<)@${key}`
    const regExpOnlyKey = key
    text = text.replace(
      new RegExp(
        `${regExpKeyWithToken}|${regExpKeyWithMention}|${regExpOnlyKey}`,
        'g'
      ),
      `<@${value}>`
    )
  }
  return text
}
