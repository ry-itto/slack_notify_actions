/* eslint-disable @typescript-eslint/camelcase */
import {
  AttachmentAction,
  MessageAttachment,
  KnownBlock,
  Block
} from '@slack/types'

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
