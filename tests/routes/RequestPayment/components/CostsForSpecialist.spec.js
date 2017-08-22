import React from 'react'
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'

import ReduxFormStub from '../../../ReduxFormStub'
import CostsForSpecialistReduxForm, { CostsForSpecialist } from 'routes/RequestPayment/components/CostsForSpecialist'

describe('(Component) CostsForSpecialist - shallow', () => {
  let wrapper
  let props

  beforeEach(() => {
    props = {
      cssName: 'request-payment__costs-for-specialists',
      links: [
        {}
      ],
      list: [{}],
      primaryProcedure: {},
      currentProvider: {
        name: ''
      },
      dispatch: () => {},
      change: () => {},
      totalCost: ''
    }
    wrapper = shallow(<CostsForSpecialist {...props} />)
  })

  it('renders something', () => {
    expect(wrapper).to.exist
  })

  it('has an empty state called otherCosts', () => {
    expect(wrapper.state().otherCosts).to.eql([])
  })

  it('has an empty state called otherProcedures', () => {
    expect(wrapper.state().otherProcedures).to.eql([])
  })

  it('renders 2 TypeaheadField upon initial render', () => {
    expect(wrapper.find('TypeaheadField')).to.have.length(2)
  })

  it('renders 2 FieldArray upon initial render', () => {
    expect(wrapper.find('FieldArray')).to.have.length(2)
  })

  it('renders single RadioGroupField upon initial render', () => {
    expect(wrapper.find('RadioGroupField')).to.have.length(1)
  })

  // it('renders 3 DollarTextField upon initial render', () => {
  //   // TODO: Why can't we use 'DollarTextField' to find  it?
  //   expect(wrapper.find({ placeholderText: '$ 0.00' })).to.exist
  // })

  it('renders 3 DollarTextFieldWithTwoDecimalField upon initial render', () => {
    expect(wrapper.find('DollarTextWithTwoDecimalField')).to.have.length(3)
    expect(wrapper.find('DollarTextWithTwoDecimalField').get(0).props.placeholderText).to.equal('$ 0.00')
    expect(wrapper.find('DollarTextWithTwoDecimalField').get(1).props.placeholderText).to.equal('$ 0.00')
    expect(wrapper.find('DollarTextWithTwoDecimalField').get(2).props.placeholderText).to.equal('$ 0.00')
  })
})

describe('(Component) CostsForSpecialist - mount', () => {
  let wrapper
  let props
  let state
  const spyLoadRequestPaymentCostList = sinon.spy()

  beforeEach(() => {
    props = {
      cssName: 'request-payment__costs-for-specialists',
      links: [],
      list: [],
      loadRequestPaymentCostList: spyLoadRequestPaymentCostList,
      primaryProcedure: {},
      currentProvider: {},
      dispatch: () => {},
      change: () => {},
      totalCost: ''
    }
    state = {
      otherCosts: [],
      otherProcedures: []
    }
  })

  it('calls componentDidMount', () => {
    const spyComponentDidMount = sinon.spy(CostsForSpecialist.prototype, 'componentDidMount')
    expect(spyComponentDidMount.callCount).to.equal(0)
    expect(spyLoadRequestPaymentCostList.callCount).to.equal(0)
    wrapper = mount(
      <ReduxFormStub><CostsForSpecialistReduxForm {...props} {...state} /></ReduxFormStub>
    )
    expect(spyComponentDidMount.callCount).to.equal(1)
    expect(spyLoadRequestPaymentCostList.callCount).to.equal(1)
  })
})
