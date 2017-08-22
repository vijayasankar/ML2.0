import React from 'react'
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'

import ReduxFormStub from '../../../ReduxFormStub'
import CostsForAnaesthetistReduxForm, { CostsForAnaesthetist } from 'routes/RequestPayment/components/CostsForAnaesthetist'

describe('(Component) CostsForAnaesthetist - shallow', () => {
  let wrapper
  let props

  beforeEach(() => {
    props = {
      cssName: 'request-payment__costs-for-anaesthetists',
      links: [
        {}
      ],
      change: () => {},
      totalCost: ''
    }
    wrapper = shallow(<CostsForAnaesthetist {...props} />)
  })

  it('renders something', () => {
    expect(wrapper).to.exist
  })

  it('has timeBaseUnitsTime state and initially empty', () => {
    expect(wrapper.state().timeBaseUnitsTime).to.equal('')
  })

  it('has timeUnitsTime state and initially empty', () => {
    expect(wrapper.state().timeUnitsTime).to.equal('')
  })

  it('has modifyingUnitsTime state and initially empty', () => {
    expect(wrapper.state().modifyingUnitsTime).to.equal('')
  })

  it('handleMinusClick on timeBaseUnitsTime triggers minusClick', () => {
    wrapper.find('NumberDialField').get(0).props.handleMinusClick()
    expect(wrapper.state().timeBaseUnitsTime).to.equal(0)
  })

  it('handlePlusClick on timeBaseUnitsTime triggers minusClick', () => {
    wrapper.find('NumberDialField').get(0).props.handlePlusClick()
    expect(wrapper.state().timeBaseUnitsTime).to.equal(15)
  })

  it('handleTextChange on timeBaseUnitsTime triggers minusClick', () => {
    wrapper.find('NumberDialField').get(0).props.handleTextChange({ target: { value: 15 } })
    expect(wrapper.state().timeBaseUnitsTime).to.equal(15)
  })

  it('handleMinusClick on timeUnitsTime triggers minusClick', () => {
    wrapper.find('NumberDialField').get(1).props.handleMinusClick()
    expect(wrapper.state().timeUnitsTime).to.equal(0)
  })

  it('handlePlusClick on timeUnitsTime triggers minusClick', () => {
    wrapper.find('NumberDialField').get(1).props.handlePlusClick()
    expect(wrapper.state().timeUnitsTime).to.equal(15)
  })

  it('handleTextChange on timeUnitsTime triggers minusClick', () => {
    wrapper.find('NumberDialField').get(1).props.handleTextChange({ target: { value: 15 } })
    expect(wrapper.state().timeUnitsTime).to.equal(15)
  })

  it('handleMinusClick on modifyingUnitsTime triggers minusClick', () => {
    wrapper.find('NumberDialField').get(2).props.handleMinusClick()
    expect(wrapper.state().modifyingUnitsTime).to.equal(0)
  })

  it('handlePlusClick on modifyingUnitsTime triggers minusClick', () => {
    wrapper.find('NumberDialField').get(2).props.handlePlusClick()
    expect(wrapper.state().modifyingUnitsTime).to.equal(15)
  })

  it('handleTextChange on modifyingUnitsTime triggers minusClick', () => {
    wrapper.find('NumberDialField').get(2).props.handleTextChange({ target: { value: 15 } })
    expect(wrapper.state().modifyingUnitsTime).to.equal(15)
  })

  it('renders TypeaheadField', () => {
    expect(wrapper.find('TypeaheadField')).to.have.length(1)
  })

  it('renders RadioGroupField', () => {
    expect(wrapper.find('RadioGroupField')).to.have.length(1)
  })

  it('renders NumberDialField', () => {
    // TODO: wrapper.find('').find({ props }) to check for unique wrapper.
    expect(wrapper.find('NumberDialField').find({ fieldName: 'timeBaseUnitsTime' })).to.have.length(1)
    expect(wrapper.find('NumberDialField').find({ fieldName: 'timeUnitsTime' })).to.have.length(1)
    expect(wrapper.find('NumberDialField').find({ fieldName: 'modifyingUnitsTime' })).to.have.length(1)
    expect(wrapper.find('NumberDialField')).to.have.length(3)
  })

  it('renders 3 DollarTextFieldWithTwoDecimalField upon initial render', () => {
    // TODO: try to get find work with 'DollarTextField'
    // expect(wrapper.find({ placeholderText: '$ 0.00' })).to.have.length(3)
    expect(wrapper.find('DollarTextWithTwoDecimalField')).to.have.length(3)
    expect(wrapper.find('DollarTextWithTwoDecimalField').get(0).props.placeholderText).to.equal('$ 0.00')
    expect(wrapper.find('DollarTextWithTwoDecimalField').get(1).props.placeholderText).to.equal('$ 0.00')
    expect(wrapper.find('DollarTextWithTwoDecimalField').get(2).props.placeholderText).to.equal('$ 0.00')
  })

  it('renders Field', () => {
    expect(wrapper.find('Field')).to.have.length(1)
  })
})

describe('(Component) CostsForAnaesthetist - mount', () => {
  let wrapper
  let props

  const state = {
    timeBaseUnitsTime: '',
    timeUnitsTime: '',
    modifyingUnitsTime: ''
  }

  const spyChange = sinon.spy()

  beforeEach(() => {
    props = {
      cssName: 'request-payment__costs-for-anaesthetists',
      links: [
        {}
      ],
      change: spyChange,
      totalCost: ''
    }
  })

  afterEach(() => {
    spyChange.reset()
  })

  it('calls componentDidMount', () => {
    const spyComponentDidMount = sinon.spy(CostsForAnaesthetist.prototype, 'componentDidMount')
    expect(spyComponentDidMount.callCount).to.equal(0)
    mount(<ReduxFormStub><CostsForAnaesthetistReduxForm {...props} {...state} /></ReduxFormStub>)
    expect(spyComponentDidMount.callCount).to.equal(1)
    spyComponentDidMount.restore()
  })
})
