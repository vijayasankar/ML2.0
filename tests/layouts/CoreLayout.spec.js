import React from 'react'
import CoreLayout from 'layouts/CoreLayout'
import { shallow } from 'enzyme'

describe('(Layout) Core', function () {
  let component
  // let props
  // let child

  beforeEach(() => {
    // child = <h1 className='child'>Child</h1>
    // props = {
    //   children : child
    // }

    component = shallow(<CoreLayout header={<div>header</div>} main={<div>main</div>} />)
  })

  // TODO: Please check this Bobby - Michael
  it.skip('Should render as a <div>.', function () {
    // expect(_component.type).to.equal('[Function: Grid]')  // TODO do a proper test
    expect(component.type.toString().includes('Grid')).to.be.true
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

  it('should render a footer', () => {
    expect(component.find('Footer')).to.have.length(1)
  })
})
