<p align="center">
  <a href="https://github.com/actions/typescript-action/actions"><img alt="typescript-action status" src="https://github.com/actions/typescript-action/workflows/build-test/badge.svg"></a>
</p>

# Slack notification action.
## Usage
### Example

```yaml
- name: Slack Notification
  uses: ry-itto/slack_notify_actions@1.0.1
  env:
    SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
    SLACK_ICON_URL: 'https://github.com/ry-itto.png'
    SLACK_USERNAME: 'Capicapi'
    SLACK_GITHUB_USER_PAIRS: ${{ secrets.SLACK_USER }}
    TITLE: ':tada: Success :tada:'
    BODY: 'ry-itto'
    COLOR: '#4D88C2'
```

![スクリーンショット 2020-05-19 16 34 42](https://user-images.githubusercontent.com/30540303/82301310-03518c00-99f3-11ea-966e-f12fee0c879a.png)

### Environment Variables
#### Required
- `SLACK_WEBHOOK_URL`
  Slack Incoming webhook URL.

#### Optional
- `SLACK_ICON_URL`
  User icon image URL.
- `SLACK_USERNAME`
  Username.
- `SLACK_GITHUB_USER_PAIRS`
  An environment variable to use when you want to connect a GitHub user to a Slack user.
  Save it in CSV format and replace it with a specific user name when it exists.

    Like this.
  ```csv
  ry-itto,UNJE44KPC
  ...
  ```

  ※ You need to specify a user ID when connecting Slack users.
  
  ![スクリーンショット 2020-05-19 16 46 02](https://user-images.githubusercontent.com/30540303/82301203-de5d1900-99f2-11ea-92ca-f23988c24650.png)
  
- `TITLE`
  Message Title.
- `BODY`
  Message Body.
- `COLOR`
  Attachment color. This will be shown left side of message.
