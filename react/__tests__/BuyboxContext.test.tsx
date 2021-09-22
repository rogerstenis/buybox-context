import React from 'react'
import { render } from '@vtex/test-tools/react'

import BuyboxApp from '../BuyboxApp'

test('BuyboxContext rendered', () => {
  const { container } = render(<BuyboxApp />)

  expect(container).toBeTruthy()
})
