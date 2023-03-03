import { Story, Meta } from '@storybook/react'
import Empty, { EmptyProps } from '.'

export default {
  title: 'Empty',
  component: Empty,
  args: {
    title: 'Your wishlist is empty',
    description: `Unfortunately we couldn't find any results for your search.`,
    hasLink: true
  },
  parameters: {
    backgrounds: {
      default: 'won-dark'
    }
  }
} as Meta

export const Default: Story<EmptyProps> = (args) => (
  <div style={{ maxWidth: '50rem', margin: '0 auto' }}>
    <Empty {...args} />
  </div>
)
