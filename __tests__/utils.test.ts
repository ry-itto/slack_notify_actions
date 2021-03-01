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

    it('multiple slackUsernames', () => {
      const slackUsernames = `
      ry-itto,ito ryoya
      github,octocat
      `
      const body = 'ry-itto and github'
      const result = replaceGitHubUsernameWithSlackUsername(
        body,
        slackUsernames
      )
      expect(result).toBe('<@ito ryoya> and <@octocat>')
    })

    it('multiple newline types slackUsernames', () => {
      const slackUsernames = `
      ry-itto,ito ryoya\ngithub,octocat\r\ngitlab,fox
      `
      const body = 'ry-itto, github, gitlab'
      const result = replaceGitHubUsernameWithSlackUsername(
        body,
        slackUsernames
      )
      expect(result).toBe('<@ito ryoya>, <@octocat>, <@fox>')
    })
  })
})
