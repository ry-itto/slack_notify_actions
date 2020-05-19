import {replaceGitHubUsernameWithSlackUsername} from '../src/utils'

describe('utils test', () => {
  describe('replaceGitHubUsernameWithSlackUsername', () => {
    it('Only username', () => {
      const slackUsernames = `ry-itto,ito ryoya`
      const body = '`ry-itto`'
      const result = replaceGitHubUsernameWithSlackUsername(
        body,
        slackUsernames
      )
      expect(result).toBe('`<@ito ryoya>`')
    })

    it('Some usernames', () => {
      const slackUsernames = `ry-itto,ito ryoya`
      const body = '`ry-itto ry-itto`'
      const result = replaceGitHubUsernameWithSlackUsername(
        body,
        slackUsernames
      )
      expect(result).toBe('`<@ito ryoya> <@ito ryoya>`')
    })

    it('Start with <@', () => {
      const slackUsernames = `ry-itto,ito ryoya`
      const body = '<@ry-itto>'
      const result = replaceGitHubUsernameWithSlackUsername(
        body,
        slackUsernames
      )
      expect(result).toBe('<@ito ryoya>')
    })

    it('Start with @', () => {
      const slackUsernames = `ry-itto,ito ryoya`
      const body = '@ry-itto'
      const result = replaceGitHubUsernameWithSlackUsername(
        body,
        slackUsernames
      )
      expect(result).toBe('<@ito ryoya>')
    })

    it('no usernames', () => {
      const slackUsernames = ''
      const body = '`@ry-itto`'
      const result = replaceGitHubUsernameWithSlackUsername(
        body,
        slackUsernames
      )
      expect(result).toBe('`@ry-itto`')
    })
  })
})
