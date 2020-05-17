import {replaceGitHubUsernameWithSlackUsername} from '../src/utils'

describe('utils test', () => {
  describe('replaceGitHubUsernameWithSlackUsername', () => {
    it('Success', () => {
      const slackUsernames = `ry-itto,ito ryoya`
      const body = '`@ry-itto`'
      const result = replaceGitHubUsernameWithSlackUsername(
        body,
        slackUsernames
      )
      expect(result).toBe('`@ito ryoya`')
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
