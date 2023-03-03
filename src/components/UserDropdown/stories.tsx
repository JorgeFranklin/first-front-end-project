import { Story, Meta } from '@storybook/react'
import UserDropdown, { UserDropdownProps } from '.'

export default {
  title: 'UserDropdown',
  component: UserDropdown,
  args: {
    username: 'John'
  },
  parameters: {
    backgrounds: {
      default: 'won-dark'
    }
  }
} as Meta

export const Default: Story<UserDropdownProps> = (args) => (
  <div
    style={{
      maxWidth: '98%',
      display: 'flex',
      justifyContent: 'end',
      margin: 'auto'
    }}
  >
    <UserDropdown {...args} />
  </div>
)
