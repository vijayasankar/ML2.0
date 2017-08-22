import Moment from 'moment'
import React from 'react'
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import * as helpers from 'utils/helpers.js'

import ReduxFormStub from '../../../ReduxFormStub'
import RequestPreApprovalProcedureCostReduxForm, { RequestPreApprovalProcedureCost } from 'routes/RequestPreApproval/components/ProcedureCost'

const spyRenderOtherProcedures = sinon.spy(RequestPreApprovalProcedureCost.prototype, 'renderOtherProcedures')
const spyComponentDidMount = sinon.spy(RequestPreApprovalProcedureCost.prototype, 'componentDidMount')
const spyHandleClick = sinon.spy(RequestPreApprovalProcedureCost.prototype, 'handleClick')
const spyChange = sinon.spy()
const spyDispatch = sinon.spy()

describe('(Component) RequestPreApproval/ProcedureCost - shallow', () => {
  let wrapper
  let props

  beforeEach(() => {
    props = {
      change: spyChange,
      cssName: '',
      currentProvider: {},
      dispatch: spyDispatch,
      links: [],
      primaryProcedure: []
    }
    wrapper = shallow(<RequestPreApprovalProcedureCost {...props} />)
  })

  afterEach(() => {
    spyChange.reset()
    spyDispatch.reset()
    spyHandleClick.reset()
    spyRenderOtherProcedures.reset()
    spyComponentDidMount.reset()
  })

  it('has otherProcedures as a local variable', () => {
    expect(wrapper.instance().otherProcedures).to.exist
    expect(wrapper.instance().otherProcedures).to.deep.equal([])
  })

  it('has specialistNames as a local variable', () => {
    expect(wrapper.instance().specialistNames).to.exist
    expect(wrapper.instance().specialistNames).to.deep.equal([])
  })

  it('has shouldDefaultNameOfSpecialist as a local variable', () => {
    expect(wrapper.instance().shouldDefaultNameOfSpecialist).to.exist
    expect(wrapper.instance().shouldDefaultNameOfSpecialist).to.equal(true)
  })

  it('has hospitalTime as a state', () => {
    expect(wrapper.state('hospitalTime')).to.exist
    expect(wrapper.state('hospitalTime')).to.equal('')
  })

  it('has theatreTime as a state', () => {
    expect(wrapper.state('theatreTime')).to.exist
    expect(wrapper.state('theatreTime')).to.equal('')
  })

  it('has removingOtherProceduresRow as a state', () => {
    expect(wrapper.state('removingOtherProceduresRow')).to.exist
    expect(wrapper.state('removingOtherProceduresRow')).to.equal(false)
  })

  it('has otherProceduresFocusIdx as a state', () => {
    expect(wrapper.state('otherProceduresFocusIdx')).to.exist
    expect(wrapper.state('otherProceduresFocusIdx')).to.equal(-1)
  })

  it('has specialistNamesFocusIdx as a state', () => {
    expect(wrapper.state('specialistNamesFocusIdx')).to.exist
    expect(wrapper.state('specialistNamesFocusIdx')).to.equal(-1)
  })

  it('has componentDidMount', () => {
    expect(spyChange.callCount).to.equal(0)
    wrapper.instance().componentDidMount()
    expect(spyChange.callCount).to.equal(1)
  })

  it('renders correct title', () => {
    expect(wrapper.find('h3').text()).to.equal('Procedure cost')
  })

  it('renders 3 unique TypeaheadFields upon initial render', () => {
    expect(wrapper.find('TypeaheadField').get(0).props.fieldName).to.equal('primaryProcedure')
    expect(wrapper.find('TypeaheadField').get(0).props.name).to.equal('primary-procedure')
    expect(wrapper.find('TypeaheadField').get(0).props.placeholderText).to.equal('Primary procedure')
    expect(wrapper.find('TypeaheadField').get(0).props.section).to.equal('primaryProcedure')
    expect(wrapper.find('TypeaheadField').get(1).props.fieldName).to.equal('nameOfSpecialist')
    expect(wrapper.find('TypeaheadField').get(1).props.name).to.equal('name-of-specialist')
    expect(wrapper.find('TypeaheadField').get(1).props.placeholderText).to.equal('Name of specialist')
    expect(wrapper.find('TypeaheadField').get(1).props.section).to.equal('nameOfSpecialist')
    expect(wrapper.find('TypeaheadField').get(2).props.fieldName).to.equal('nameOfHospital')
    expect(wrapper.find('TypeaheadField').get(2).props.name).to.equal('name-of-hospital')
    expect(wrapper.find('TypeaheadField').get(2).props.placeholderText).to.equal('Hospital name')
    expect(wrapper.find('TypeaheadField').get(2).props.section).to.equal('nameOfHospital')
    expect(wrapper.find('TypeaheadField')).to.have.length(3)
  })

  it('renders 3 unique RadioGroupFields upon initial render', () => {
    expect(wrapper.find('RadioGroupField').get(0).props.fieldName).to.equal('location')
    expect(wrapper.find('RadioGroupField').get(0).props.name).to.equal('location')
    expect(wrapper.find('RadioGroupField').get(1).props.fieldName).to.equal('sharedRoom')
    expect(wrapper.find('RadioGroupField').get(1).props.name).to.equal('shared-room')
    expect(wrapper.find('RadioGroupField').get(2).props.fieldName).to.equal('accRelated')
    expect(wrapper.find('RadioGroupField').get(2).props.name).to.equal('acc-related')
    expect(wrapper.find('RadioGroupField')).to.have.length(3)
  })

  it('renders single DollarTextField upon initial render', () => {
    expect(wrapper.find('DollarTextField').get(0).props.fieldName).to.equal('specialistCost')
    expect(wrapper.find('DollarTextField').get(0).props.name).to.equal('specialist-cost')
    expect(wrapper.find('DollarTextField')).to.have.length(1)
  })

  it('renders two unique DateTimePickerFields upon initial render', () => {
    expect(wrapper.find('DateTimePickerField').get(0).props.fieldName).to.equal('proposedDateOfProcedure')
    expect(wrapper.find('DateTimePickerField').get(0).props.name).to.equal('proposed-date-of-procedure')
    expect(wrapper.find('DateTimePickerField').get(1).props.fieldName).to.equal('dateOfOnset')
    expect(wrapper.find('DateTimePickerField').get(1).props.name).to.equal('date-of-onset')
    expect(wrapper.find('DateTimePickerField')).to.have.length(2)
  })

  it('renders two unique NumberDialFields upon initial render', () => {
    expect(wrapper.find('NumberDialField').get(0).props.fieldName).to.equal('hospitalTime')
    expect(wrapper.find('NumberDialField').get(0).props.name).to.equal('hospital-time')
    expect(wrapper.find('NumberDialField').get(1).props.fieldName).to.equal('theatreTime')
    expect(wrapper.find('NumberDialField').get(1).props.name).to.equal('theatre-time')
    expect(wrapper.find('NumberDialField')).to.have.length(2)
  })

  it('renders single FieldArray upon initial render', () => {
    expect(wrapper.find('FieldArray').get(0).props.name).to.equal('otherProcedures')
    expect(wrapper.find('FieldArray')).to.have.length(1)
  })

  it('handleClick increments hospitalTime', () => {
    const spyHelper = sinon.spy(helpers, 'stepCounter')
    expect(spyHelper.callCount).to.equal(0)
    expect(wrapper.state('hospitalTime')).to.equal('')
    wrapper.instance().handleClick('hospital', '+', 10)
    expect(spyHelper.callCount).to.equal(1)
    expect(wrapper.state('hospitalTime')).to.equal(10)
    helpers.stepCounter.restore()
    // console.log(wrapper.debug())
  })

  it('handleClick fails to decrement hospitalTime when its "" initially', () => {
    const spyHelper = sinon.spy(helpers, 'stepCounter')
    expect(spyHelper.callCount).to.equal(0)
    expect(wrapper.state('hospitalTime')).to.equal('')
    wrapper.instance().handleClick('hospital', '-', 10)
    expect(spyHelper.callCount).to.equal(0)
    expect(wrapper.state('hospitalTime')).to.equal('')
    helpers.stepCounter.restore()
  })

  it('handleClick fails to decrement hospitalTime when its 0 initially', () => {
    const spyHelper = sinon.spy(helpers, 'stepCounter')
    expect(spyHelper.callCount).to.equal(0)
    expect(wrapper.state('hospitalTime')).to.equal('')
    wrapper.setState({ hospitalTime: 0 })
    wrapper.instance().handleClick('hospital', '-', 10)
    expect(spyHelper.callCount).to.equal(0)
    expect(wrapper.state('hospitalTime')).to.equal('')
    helpers.stepCounter.restore()
  })

  it('handleClick fails to decrement hospitalTime when its 1 initially', () => {
    const spyHelper = sinon.spy(helpers, 'stepCounter')
    expect(spyHelper.callCount).to.equal(0)
    expect(wrapper.state('hospitalTime')).to.equal('')
    wrapper.setState({ hospitalTime: 1 })
    wrapper.instance().handleClick('hospital', '-', 10)
    expect(spyHelper.callCount).to.equal(0)
    expect(wrapper.state('hospitalTime')).to.equal('')
    helpers.stepCounter.restore()
  })

  it('handleClick fails to decrement hospitalTime when its "0"', () => {
    const spyHelper = sinon.spy(helpers, 'stepCounter')
    expect(spyHelper.callCount).to.equal(0)
    expect(wrapper.state('hospitalTime')).to.equal('')
    wrapper.setState({ hospitalTime: '0' })
    wrapper.instance().handleClick('hospital', '-', 10)
    expect(spyHelper.callCount).to.equal(0)
    expect(wrapper.state('hospitalTime')).to.equal('')
    helpers.stepCounter.restore()
  })

  it('handleClick fails to decrement hospitalTime when its "1"', () => {
    const spyHelper = sinon.spy(helpers, 'stepCounter')
    expect(spyHelper.callCount).to.equal(0)
    expect(wrapper.state('hospitalTime')).to.equal('')
    wrapper.setState({ hospitalTime: '1' })
    wrapper.instance().handleClick('hospital', '-', 10)
    expect(spyHelper.callCount).to.equal(0)
    expect(wrapper.state('hospitalTime')).to.equal('')
    helpers.stepCounter.restore()
  })

  it('handleClick decrements hospitalTime', () => {
    const spyHelper = sinon.spy(helpers, 'stepCounter')
    expect(spyHelper.callCount).to.equal(0)
    expect(wrapper.state('hospitalTime')).to.equal('')
    wrapper.setState({ hospitalTime: 10 })
    expect(wrapper.state('hospitalTime')).to.equal(10)
    wrapper.instance().handleClick('hospital', '-', 5)
    expect(spyHelper.callCount).to.equal(1)
    expect(wrapper.state('hospitalTime')).to.equal(5)
    helpers.stepCounter.restore()
  })

  it('handleClick increments theatreTime', () => {
    const spyHelper = sinon.spy(helpers, 'roundToNearest')
    expect(spyHelper.callCount).to.equal(0)
    expect(wrapper.state('theatreTime')).to.equal('')
    wrapper.instance().handleClick('theatre', '+', 10)
    expect(spyHelper.callCount).to.equal(1)
    expect(wrapper.state('theatreTime')).to.equal(10)
    helpers.roundToNearest.restore()
  })

  it('handleClick fails to decrement theatreTime when its "" initially', () => {
    const spyHelper = sinon.spy(helpers, 'roundToNearest')
    expect(spyHelper.callCount).to.equal(0)
    expect(wrapper.state('theatreTime')).to.equal('')
    wrapper.instance().handleClick('theatre', '-', 10)
    expect(spyHelper.callCount).to.equal(0)
    expect(wrapper.state('theatreTime')).to.equal('')
    helpers.roundToNearest.restore()
  })

  it('handleClick fails to decrement theatreTime when its 0 initially', () => {
    const spyHelper = sinon.spy(helpers, 'roundToNearest')
    expect(spyHelper.callCount).to.equal(0)
    expect(wrapper.state('theatreTime')).to.equal('')
    wrapper.setState({ theatreTime: 0 })
    wrapper.instance().handleClick('theatre', '-', 10)
    expect(spyHelper.callCount).to.equal(0)
    expect(wrapper.state('theatreTime')).to.equal('')
    helpers.roundToNearest.restore()
  })

  it('handleClick fails to decrement theatreTime when its 1 initially', () => {
    const spyHelper = sinon.spy(helpers, 'roundToNearest')
    expect(spyHelper.callCount).to.equal(0)
    expect(wrapper.state('theatreTime')).to.equal('')
    wrapper.setState({ theatreTime: 1 })
    wrapper.instance().handleClick('theatre', '-', 10)
    expect(spyHelper.callCount).to.equal(0)
    expect(wrapper.state('theatreTime')).to.equal('')
    helpers.roundToNearest.restore()
  })

  it('handleClick fails to decrement theatreTime when its less than step', () => {
    const spyHelper = sinon.spy(helpers, 'roundToNearest')
    expect(spyHelper.callCount).to.equal(0)
    expect(wrapper.state('theatreTime')).to.equal('')
    wrapper.setState({ theatreTime: 9 })
    wrapper.instance().handleClick('theatre', '-', 10)
    expect(spyHelper.callCount).to.equal(0)
    expect(wrapper.state('theatreTime')).to.equal('')
    helpers.roundToNearest.restore()
  })

  it('handleClick fails to decrement theatreTime when its "0"', () => {
    const spyHelper = sinon.spy(helpers, 'roundToNearest')
    expect(spyHelper.callCount).to.equal(0)
    expect(wrapper.state('theatreTime')).to.equal('')
    wrapper.setState({ theatreTime: '0' })
    wrapper.instance().handleClick('theatre', '-', 10)
    expect(spyHelper.callCount).to.equal(0)
    expect(wrapper.state('theatreTime')).to.equal('')
    helpers.roundToNearest.restore()
  })

  it('handleClick fails to decrement theatreTime when its "1"', () => {
    const spyHelper = sinon.spy(helpers, 'roundToNearest')
    expect(spyHelper.callCount).to.equal(0)
    expect(wrapper.state('theatreTime')).to.equal('')
    wrapper.setState({ theatreTime: '1' })
    wrapper.instance().handleClick('theatre', '-', 10)
    expect(spyHelper.callCount).to.equal(0)
    expect(wrapper.state('theatreTime')).to.equal('')
    helpers.roundToNearest.restore()
  })

  it('handleClick decrements theatreTime', () => {
    const spyHelper = sinon.spy(helpers, 'roundToNearest')
    expect(spyHelper.callCount).to.equal(0)
    expect(wrapper.state('theatreTime')).to.equal('')
    wrapper.setState({ theatreTime: 10 })
    expect(wrapper.state('theatreTime')).to.equal(10)
    wrapper.instance().handleClick('theatre', '-', 5)
    expect(spyHelper.callCount).to.equal(1)
    expect(wrapper.state('theatreTime')).to.equal(5)
  })

  it('textChange sets hospitalTime', () => {
    expect(wrapper.state('hospitalTime')).to.equal('')
    wrapper.instance().textChange({ target: { value: '2' } }, 'hospital')
    expect(wrapper.state('hospitalTime')).to.equal('2')
  })

  it('textChange sets theatreTime', () => {
    expect(wrapper.state('theatreTime')).to.equal('')
    wrapper.instance().textChange({ target: { value: '3' } }, 'theatre')
    expect(wrapper.state('theatreTime')).to.equal('3')
  })

  it('textChange returns nothing', () => {
    expect(wrapper.state('theatreTime')).to.equal('')
    wrapper.instance().textChange({ target: { value: '-15S' } }, 'theatre')
    expect(wrapper.state('theatreTime')).to.equal('')
  })

  // TODO: renderOtherProcedures
})

describe('(Component) RequestPreApproval/ProcedureCost - mount', () => {
  let wrapper
  let props
  let state

  const spyChange = sinon.spy()

  beforeEach(() => {
    props = {
      change: spyChange,
      cssName: '',
      currentProvider: {},
      dispatch: spyDispatch,
      links: [],
      primaryProcedure: []
    }
    wrapper = mount(<ReduxFormStub><RequestPreApprovalProcedureCostReduxForm {...props} {...state} /></ReduxFormStub>)
  })

  afterEach(() => {
    spyChange.reset()
    spyDispatch.reset()
    spyHandleClick.reset()
    spyRenderOtherProcedures.reset()
    spyComponentDidMount.reset()
  })

  it('renders something', () => {
    expect(wrapper).to.exist
  })

  it('componentDidMount was triggered', () => {
    expect(spyComponentDidMount.called).to.equal(true)
  })

  it('renderOtherProcedures was triggered upon initial render', () => {
    expect(spyRenderOtherProcedures.called).to.equal(true)
  })
})
