import { Story, Meta } from '@storybook/react'
import CartList from '.'
import items from './mock'

export default {
  title: 'CartList',
  component: CartList,
  argTypes: {
    cartContextValue: {
      type: 'symbol'
    },
    items: {
      type: 'symbol'
    }
  },
  parameters: {
    backgrounds: {
      default: 'won-dark'
    }
  }
} as Meta

export const Default: Story = (args) => (
  <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
    <CartList {...args} />
  </div>
)

Default.args = {
  total: '$330,00',
  cartContextValue: { items }
}

export const WithButton: Story = (args) => (
  <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
    <CartList {...args} hasButton />
  </div>
)

WithButton.args = {
  total: '$330,00',
  cartContextValue: { items }
}

export const Empty: Story = () => (
  <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
    <CartList />
  </div>
)
