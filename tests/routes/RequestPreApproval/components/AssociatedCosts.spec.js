import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import { AssociatedCosts } from 'routes/RequestPreApproval/components/AssociatedCosts'

const spyMenuItem = sinon.spy(AssociatedCosts.prototype, 'renderMenuItemChildren')
const spyHandleSearch = sinon.spy(AssociatedCosts.prototype, 'handleSearch')
const spySearchProstheses = sinon.spy()

describe('(Component) AssociatedCosts - shallow', () => {
  let wrapper
  let props

  beforeEach(() => {
    props = {
      change: () => {},
      cssName: '',
      prosthesesOPtions: [{}],
      links: [{}],
      meta: [],
      searchProstheses: spySearchProstheses,
      totalCost: 0
    }
    wrapper = shallow(<AssociatedCosts {...props} />)
  })

  afterEach(() => {
    spyMenuItem.reset()
    spySearchProstheses.reset()
    spyHandleSearch.reset()
  })

  it('renders correct heading', () => {
    expect(wrapper.find('h3').text()).to.equal('Associated costs')
  })

  it('renders 7 DollarTextField', () => {
    expect(wrapper.find('DollarTextField')).to.have.length(7)
  })

  it('DollarTextFields are all unique', () => {
    expect(wrapper.find('DollarTextField').get(0).props.fieldName).to.equal('operatingTheatreCost')
    expect(wrapper.find('DollarTextField').get(0).props.name).to.equal('operating-theatre-cost')
    expect(wrapper.find('DollarTextField').get(1).props.fieldName).to.equal('radiologyCost')
    expect(wrapper.find('DollarTextField').get(1).props.name).to.equal('radiology-cost')
    expect(wrapper.find('DollarTextField').get(2).props.fieldName).to.equal('hospitalCost')
    expect(wrapper.find('DollarTextField').get(2).props.name).to.equal('hospital-cost')
    expect(wrapper.find('DollarTextField').get(3).props.fieldName).to.equal('prosthesisCost')
    expect(wrapper.find('DollarTextField').get(3).props.name).to.equal('prosthesis-cost')
    expect(wrapper.find('DollarTextField').get(4).props.fieldName).to.equal('consultationCost')
    expect(wrapper.find('DollarTextField').get(4).props.name).to.equal('consultation-cost')
    expect(wrapper.find('DollarTextField').get(5).props.fieldName).to.equal('sundryCost')
    expect(wrapper.find('DollarTextField').get(5).props.name).to.equal('sundryCost')
    expect(wrapper.find('DollarTextField').get(6).props.fieldName).to.equal('anaesthetistCost')
    expect(wrapper.find('DollarTextField').get(6).props.name).to.equal('anaesthetistCost')
  })

  it('renders two unique Field', () => {
    expect(wrapper.find('Field').get(0).props.name).to.equal('prosthesisDescr')
    expect(wrapper.find('Field').get(1).props.name).to.equal('totalCostErr')
    expect(wrapper.find('Field')).to.have.length(2)
  })

  it('renders a single TextField', () => {
    expect(wrapper.find('TextField').get(0).props.fieldName).to.equal('anaesthetistName')
    expect(wrapper.find('TextField').get(0).props.name).to.equal('anaesthetist-name')
    expect(wrapper.find('TextField')).to.have.length(1)
  })

  it('handleSearch returns undefined', () => {
    expect(spyHandleSearch.callCount).to.equal(0)
    expect(wrapper.instance().handleSearch()).to.equal(undefined)
    expect(spyHandleSearch.callCount).to.equal(1)
  })

  it('handleSearch triggers searchProstheses', () => {
    expect(spyHandleSearch.callCount).to.equal(0)
    expect(spySearchProstheses.callCount).to.equal(0)
    wrapper.instance().handleSearch('aaa')
    expect(spyHandleSearch.callCount).to.equal(1)
    expect(spySearchProstheses.callCount).to.equal(1)
  })
})
