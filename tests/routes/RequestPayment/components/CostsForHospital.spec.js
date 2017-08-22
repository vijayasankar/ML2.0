import React from 'react'
import { expect } from 'chai'
import { shallow, mount, render } from 'enzyme'

import ReduxFormStub from '../../../ReduxFormStub'
import CostsForHospitalReduxForm, { CostsForHospital } from 'routes/RequestPayment/components/CostsForHospital'

describe('(Component) CostsForHospital - shallow', () => {
  let wrapper
  let props

  const spyRenderOtherCosts = sinon.spy(CostsForHospital.prototype, 'renderOtherCosts')

  beforeEach(() => {
    props = {
      cssName: 'request-payment__costs-for-hospitals',
      links: [
        {}
      ],
      list: [{}],
      dispatch: () => {},
      primaryProcedure: [{}],
      change: () => {},
      totalCost: ''
    }
    wrapper = shallow(<CostsForHospital {...props} />)
  })

  it('renders something', () => {
    expect(wrapper).to.exist
  })

  it('has otherCosts state and initially empty', () => {
    expect(wrapper.state().otherCosts).to.eql([])
  })

  it('has otherProcedures state and initially empty', () => {
    expect(wrapper.state().otherProcedures).to.eql([])
  })

  it('has 2 TypeaheadFields initially', () => {
    expect(wrapper.find('TypeaheadField')).to.have.length(2)
    expect(wrapper.find('TypeaheadField').get(0).props.fieldName).to.equal('primaryProcedure')
    expect(wrapper.find('TypeaheadField').get(1).props.fieldName).to.equal('prosthesisDescr')
  })

  it('has 7 DollarTextFields initially', () => {
    // TODO: Why can't we use 'DollarTextField' to find  it?
    // expect(wrapper.find({ placeholderText: '$ 0.00' })).to.have.length(7)

    expect(wrapper.find('DollarTextWithTwoDecimalField')).to.have.length(7)
    expect(wrapper.find('DollarTextWithTwoDecimalField').get(0).props.placeholderText).to.equal('$ 0.00')
    expect(wrapper.find('DollarTextWithTwoDecimalField').get(1).props.placeholderText).to.equal('$ 0.00')
    expect(wrapper.find('DollarTextWithTwoDecimalField').get(2).props.placeholderText).to.equal('$ 0.00')
    expect(wrapper.find('DollarTextWithTwoDecimalField').get(3).props.placeholderText).to.equal('$ 0.00')
    expect(wrapper.find('DollarTextWithTwoDecimalField').get(4).props.placeholderText).to.equal('$ 0.00')
    expect(wrapper.find('DollarTextWithTwoDecimalField').get(5).props.placeholderText).to.equal('$ 0.00')
    expect(wrapper.find('DollarTextWithTwoDecimalField').get(6).props.placeholderText).to.equal('$ 0.00')
  })

  it('has 2 FieldArray', () => {
    expect(wrapper.find('FieldArray')).to.have.length(2)
    expect(wrapper.find('FieldArray').get(0).props.name).to.equal('otherCosts')
    expect(wrapper.find('FieldArray').get(1).props.name).to.equal('otherProcedures')
  })

  it.skip('Upon clicking "Add another cost", more fields are rendered', () => {
    expect(wrapper.find({ placeholderText: '$ 0.00' })).to.have.length(7)
    // simulate('click') does not work as FieldArray is a Redux-Form wrapper
    wrapper.find({ name: 'otherCosts' }).simulate('click')
    expect(spyRenderOtherCosts.called).to.equal(true)
    expect(wrapper.find({ placeholderText: '$ 0.00' })).to.have.length(8)
  })
})

describe('(Component) CostsForHospital - mount', () => {
  let props
  let state
  const spyLoadRequestPaymentCostList = sinon.spy()

  beforeEach(() => {
    props = {
      cssName: 'request-payment__costs-for-hospitals',
      links: [],
      list: [],
      loadRequestPaymentCostList: spyLoadRequestPaymentCostList,
      dispatch: () => {},
      primaryProcedure: [],
      change: () => {},
      totalCost: ''
    }
  })

  it('calls componentDidMount', () => {
    const spyComponentDidMount = sinon.spy(CostsForHospital.prototype, 'componentDidMount')
    expect(spyComponentDidMount.callCount).to.equal(0)
    expect(spyLoadRequestPaymentCostList.callCount).to.equal(0)
    mount(<ReduxFormStub><CostsForHospitalReduxForm {...props} {...state} /></ReduxFormStub>)
    expect(spyComponentDidMount.callCount).to.equal(1)
    expect(spyLoadRequestPaymentCostList.callCount).to.equal(1)
  })
})

describe.skip('(Component) CostsForHospital - mount', () => {
  let props
  let state

  beforeEach(() => {
    props = {
      cssName: 'request-payment__costs-for-hospitals',
      links: [
        {}
      ],
      list: [{ id: 5, name: 'name' }],
      dispatch: () => {},
      primaryProcedure: [{}],
      change: () => {},
      totalCost: ''
    }

    state = {
      otherCosts: [{ claimCostTypeId: '5', key: 'name' }]
    }
  })

  it('calls componentDidMount', () => {
    const wrapper = shallow(<ReduxFormStub><CostsForHospitalReduxForm {...props} {...state} /></ReduxFormStub>)
    console.log('DEBUG: ', wrapper.html())
  })
})
