import React from 'react'
import ErrorLayout from 'layouts/ErrorLayout'
import { shallow } from 'enzyme'

describe('(Layout) Error', function () {
  let component

  beforeEach(() => {
    component = shallow(<ErrorLayout main={<div>main</div>} />)
  })

  it('should render a single div called container-wrapper', () => {
    expect(component.find('div.container-wrapper')).to.have.length(1)
  })

  it('should render <Grid>', () => {
    expect(component.find('Grid')).to.have.length(1)
  })

  it('should render main', () => {
    expect(component.find('main')).to.have.length(1)
  })

  it('should render logo image', () => {
    expect(component.find('img.error-layout__header-logo')).to.have.length(1)
  })

  it('should render a footer', () => {
    expect(component.find('Footer')).to.have.length(1)
  })
})
