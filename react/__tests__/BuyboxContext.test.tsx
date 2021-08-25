import React from 'react'
import { render } from '@vtex/test-tools/react'

import BuyboxContext from '../BuyboxContext'

test('BuyboxContext rendered', () => {
  const { container } = render(<BuyboxContext />)

  expect(container).toBeTruthy()
})
