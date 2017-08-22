// ----------------------------------------------------------------------------
// Note: ModuleStub needs to be defined before the Component, remember to
//       .reset() and .restore() in afterEach()
// ----------------------------------------------------------------------------
import * as ModuleStub from '../../../ModuleStub'
// ----------------------------------------------------------------------------

// import * as apiRequest from 'utils/request'
// import * as find from 'ramda/src/find'
// import * as utilsHelpers from 'utils/helpers'
import * as request from 'utils/request'
import Moment from 'moment'
import React from 'react'
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'

import ReduxFormStub from '../../../ReduxFormStub'
import RequestPaymentReduxForm, { RequestPayment } from 'routes/RequestPayment/components/index'

describe('(View) RequestPayment - shallow', () => {
  let wrapper
  let props

  const spyValidateOtherProcedures = sinon.spy(RequestPayment.prototype, 'validateOtherProcedures')
  const spyValidateOtherCosts = sinon.spy(RequestPayment.prototype, 'validateOtherCosts')
  const spyGetFormData = sinon.spy(RequestPayment.prototype, 'getFormData')
  const spyGetPrimary = sinon.spy(RequestPayment.prototype, 'getPrimaryPerformedIntervention')
  const spyGetAdditional = sinon.spy(RequestPayment.prototype, 'getAdditionalPerformedIntervention')
  const spyGetOtherCosts = sinon.spy(RequestPayment.prototype, 'getOtherCosts')
  const spyFindDuplicates = sinon.spy(RequestPayment.prototype, 'findDuplicates')

  beforeEach(() => {
    props = {
      cssName: 'request-payment',
      currentProviderName: undefined,
      requestPayment: {
        currentProviderServiceType: '',
        docBundle: {},
        isValid: undefined
      },
      currentProviderLinks: [],
      requestPayment_preApproval: {
        isValid: undefined
      },
      handleSubmit: () => {},
      requestPayment_costsForAnaesthetist: {
        totalCost: 0
      },
      requestPayment_costsForHospital: {
        totalCost: 0
      },
      requestPayment_costsForSpecialist: {
        totalCost: 0
      }
    }
    wrapper = shallow(<RequestPayment {...props} />)
  })

  afterEach(() => {
    spyValidateOtherProcedures.reset()
    spyValidateOtherCosts.reset()
    spyFindDuplicates.reset()
  })

  describe('render', () => {
    it('has hasError as state', () => {
      expect(wrapper.state('hasError')).to.exist
      expect(wrapper.state('hasError')).to.deep.equal(false)
    })

    it('renders component index', () => {
      expect(wrapper).to.exist
    })

    it('renders current provider name', () => {
      wrapper.setProps({ currentProviderName: 'some name' })
      const h2 = wrapper.find('h2')
      expect(h2).to.exist
      expect(h2.text()).to.equal('some name')
    })

    it('renders preApproval component', () => {
      wrapper.setProps({
        requestPayment: { isValid: false },
        requestPayment_preApproval: { isValid: false }
      })
      const preApproval = wrapper.find({ cssName: `${props.cssName}__pre-approval` })
      expect(preApproval).to.exist
    })

    it('renders preApproval component when verify policy has been verified', () => {
      wrapper.setProps({
        requestPayment: { isValid: false },
        requestPayment_preApproval: { isValid: true }
      })
      const preApproval = wrapper.find({ cssName: `${props.cssName}__pre-approval` })
      expect(preApproval).to.exist
    })

    it('renders InvoiceDetails component when verify policy has been verified for Anaesthetist', () => {
      wrapper.setProps({
        requestPayment: { isValid: false, currentProviderServiceType: 'Anaesthetist' },
        requestPayment_preApproval: { isValid: true }
      })
      const invoice = wrapper.find({ cssName: `${props.cssName}__invoice-details` })
      expect(invoice).to.exist
    })

    it('renders InvoiceDetails component when verify policy has been verified for Hospital', () => {
      wrapper.setProps({
        requestPayment: { isValid: false, currentProviderServiceType: 'Hospital' },
        requestPayment_preApproval: { isValid: true }
      })
      const invoice = wrapper.find({ cssName: `${props.cssName}__invoice-details` })
      expect(invoice).to.exist
    })

    it('renders InvoiceDetails component when verify policy has been verified for Specialist', () => {
      wrapper.setProps({
        requestPayment: { isValid: false, currentProviderServiceType: 'Specialist' },
        requestPayment_preApproval: { isValid: true }
      })
      const invoice = wrapper.find({ cssName: `${props.cssName}__invoice-details` })
      expect(invoice).to.exist
    })

    it('renders costs component when verify policy has been verified for Anaesthetist', () => {
      wrapper.setProps({
        requestPayment: { isValid: false, currentProviderServiceType: 'Anaesthetist' },
        requestPayment_preApproval: { isValid: true }
      })
      const cost = wrapper.find({ cssName: `${props.cssName}__costs-for-anaesthetists` })
      expect(cost).to.exist
    })

    it('renders attach document component when verify policy has been verified for Anaethetist', () => {
      wrapper.setProps({
        requestPayment: { isValid: false, currentProviderServiceType: 'Anaesthetist' },
        requestPayment_preApproval: { isValid: true }
      })
      const attachDocuments = wrapper.find({ cssName: `${props.cssName}__attach-documents` })
      expect(attachDocuments).to.exist
    })

    it('renders costs component when verify policy has been verified for Hospital', () => {
      wrapper.setProps({
        requestPayment: { isValid: false, currentProviderServiceType: 'Hospital' },
        requestPayment_preApproval: { isValid: true }
      })
      const cost = wrapper.find({ cssName: `${props.cssName}__costs-for-hospitals` })
      expect(cost).to.exist
    })

    it('renders attach document component when verify policy has been verified for Hospital', () => {
      wrapper.setProps({
        requestPayment: { isValid: false, currentProviderServiceType: 'Hospital' },
        requestPayment_preApproval: { isValid: true }
      })
      const attachDocuments = wrapper.find({ cssName: `${props.cssName}__attach-documents` })
      expect(attachDocuments).to.exist
    })

    it('renders costs component when verify policy has been verified for Specialist', () => {
      wrapper.setProps({
        requestPayment: { isValid: false, currentProviderServiceType: 'Specialist' },
        requestPayment_preApproval: { isValid: true }
      })
      const cost = wrapper.find({ cssName: `${props.cssName}__costs-for-specialists` })
      expect(cost).to.exist
    })

    it('renders attach document component when verify policy has been verified for Specialist', () => {
      wrapper.setProps({
        requestPayment: { isValid: false, currentProviderServiceType: 'Specialist' },
        requestPayment_preApproval: { isValid: true }
      })
      const attachDocuments = wrapper.find({ cssName: `${props.cssName}__attach-documents` })
      expect(attachDocuments).to.exist
    })

    it('renders declaration component when verify policy has been verified', () => {
      wrapper.setProps({
        requestPayment: { isValid: false },
        requestPayment_preApproval: { isValid: true }
      })
      const declaration = wrapper.find({ cssName: `${props.cssName}__declaration` })
      expect(declaration).to.exist
    })

    it('renders submitted component when form has been submitted', () => {
      wrapper.setProps({
        requestPayment: { isValid: true },
        requestPayment_preApproval: { isValid: true }
      })
      expect(wrapper.find('RequestPaymentSubmitted')).to.exist
    })
  })

  describe('findDuplicates', () => {
    it('returns false if there are no match', () => {
      const values = {
        otherProcedure: [{ id: 'procedure' }]
      }
      const blacklist = [
        { otherProcedureId: 'blacklist' }
      ]
      expect(wrapper.instance().findDuplicates(values, blacklist)).to.equal(false)
    })

    it('returns true if they both match', () => {
      const values = {
        otherProcedure: [{ id: 'blacklist' }]
      }
      const blacklist = [
        { otherProcedureId: 'blacklist' }
      ]
      expect(wrapper.instance().findDuplicates(values, blacklist)).to.equal(true)
    })
  })

  // +todo: add describe block for validateFormValues with unit tests for this function beneath this block
  describe('validateFormValues for Anaesthetist', () => {

    // +todo: function to return expected object with default properties.  Use these in the validateFormValues tests.
    //       Make this object readable ie maintain the order of properties -> code under test
    // +todo: Cleanup the tests below using before each function to set default valid values then adding/deleting properties,
    //       more precise test names, etc.  Examples given above
    const initialRequiredValidation = {
      dateOfProcedure: 'Please enter date of procedure.',
      declarationAgree: 'Please tick to confirm that you have read and agreed to the terms in the declaration above.',
      invoiceNumber: 'Please enter invoice number.',
      primaryProcedure: 'Please select primary procedure.',
      totalCostErr: 'Anaesthetist costs not specified',
      SurgicalNotesCounts: 'Please attach surgical notes.'
    }

    const initialValues = {
      SurgicalNotesCounts: 0
    }

    it('returns requirement properties for all properties that are required by default', () => {
      wrapper.setProps({
        requestPayment: {
          currentProviderServiceType: 'Anaesthetist'
        }
      })
      const values = { ...initialValues }
      expect(wrapper.instance().validateFormValues(values)).to.deep.equal(initialRequiredValidation)
    })

    it('does not return a requirement property for primaryProcedure', () => {
      wrapper.setProps({
        requestPayment: {
          currentProviderServiceType: 'Anaesthetist'
        }
      })
      const values = { ...initialValues, primaryProcedure: [{ id: 'some id' }] }
      const requiredValidation = { ...initialRequiredValidation }
      delete requiredValidation.primaryProcedure
      expect(wrapper.instance().validateFormValues(values)).to.deep.equal(requiredValidation)
    })

    it('does not return a requirement property for dateOfProcedure', () => {
      wrapper.setProps({
        requestPayment: {
          currentProviderServiceType: 'Anaesthetist'
        }
      })
      const values = { ...initialValues, dateOfProcedure: '11/11/1111' }
      const requiredValidation = { ...initialRequiredValidation }
      delete requiredValidation.dateOfProcedure
      expect(wrapper.instance().validateFormValues(values)).to.deep.equal(requiredValidation)
    })

    it('does not return a requirement property for invoiceNumber', () => {
      wrapper.setProps({
        requestPayment: {
          currentProviderServiceType: 'Anaesthetist'
        }
      })
      const values = { ...initialValues, invoiceNumber: 'number' }
      const requiredValidation = { ...initialRequiredValidation }
      delete requiredValidation.invoiceNumber
      expect(wrapper.instance().validateFormValues(values)).to.deep.equal(requiredValidation)
    })

    it('does not return a requirement property for declarationAgree', () => {
      wrapper.setProps({
        requestPayment: {
          currentProviderServiceType: 'Anaesthetist'
        }
      })
      const values = { ...initialValues, declarationAgree: true }
      const requiredValidation = { ...initialRequiredValidation }
      delete requiredValidation.declarationAgree
      expect(wrapper.instance().validateFormValues(values)).to.deep.equal(requiredValidation)
    })

    it('does not return a requirement property for totalCost', () => {
      wrapper.setProps({
        requestPayment: {
          currentProviderServiceType: 'Anaesthetist'
        },
        requestPayment_costsForAnaesthetist: {
          totalCost: 10
        }
      })
      const values = { ...initialValues }
      const requiredValidation = { ...initialRequiredValidation }
      delete requiredValidation.totalCostErr
      expect(wrapper.instance().validateFormValues(values)).to.deep.equal(requiredValidation)
    })

    it('does not return a requirement property for SurgicalNotesCounts if it is more than 0', () => {
      wrapper.setProps({
        requestPayment: {
          currentProviderServiceType: 'Anaesthetist'
        }
      })
      const values = { ...initialValues, SurgicalNotesCounts: 1 }
      const requiredValidation = { ...initialRequiredValidation }
      delete requiredValidation.SurgicalNotesCounts
      expect(wrapper.instance().validateFormValues(values)).to.deep.equal(requiredValidation)
    })

    it('does not call validateOtherCosts if otherCosts is empty', () => {
      const values = { ...initialValues, otherCosts: [] }
      expect(spyValidateOtherCosts.callCount).to.equal(0)
      wrapper.instance().validateFormValues(values)
      expect(spyValidateOtherCosts.callCount).to.equal(0)
    })

    it('calls validateOtherCosts without otherCosts properties', () => {
      const values = { ...initialValues, otherCosts: [{}] }
      expect(spyValidateOtherCosts.callCount).to.equal(0)
      wrapper.instance().validateFormValues(values)
      expect(spyValidateOtherCosts.callCount).to.equal(1)
    })

    it('calls validateOtherCosts without otherCosts.key', () => {
      const values = { ...initialValues, otherCosts: [{ claimCostTypeId: 'some id' }] }
      expect(spyValidateOtherCosts.callCount).to.equal(0)
      wrapper.instance().validateFormValues(values)
      expect(spyValidateOtherCosts.callCount).to.equal(1)
    })

    it('calls validateOtherCosts without otherCosts.claimCostTypeId', () => {
      const values = { ...initialValues, otherCosts: [{ key: 'key' }] }
      expect(spyValidateOtherCosts.callCount).to.equal(0)
      wrapper.instance().validateFormValues(values)
      expect(spyValidateOtherCosts.callCount).to.equal(1)
    })

    it('calls validateOtherCosts without otherCosts.otherCost', () => {
      const values = { ...initialValues, otherCosts: [{ key: 'key', claimCostTypeId: 'some id' }] }
      expect(spyValidateOtherCosts.callCount).to.equal(0)
      wrapper.instance().validateFormValues(values)
      expect(spyValidateOtherCosts.callCount).to.equal(1)
    })

    it('calls validateOtherProcedures without otherProcedures.otherProcedure', () => {
      const values = { ...initialValues, otherProcedures: [{}] }
      expect(spyValidateOtherProcedures.callCount).to.equal(0)
      wrapper.instance().validateFormValues(values)
      expect(spyValidateOtherProcedures.callCount).to.equal(1)
    })

    it('calls validateOtherProcedures without otherProcedures.specialistCost', () => {
      const values = { ...initialValues, otherProcedures: [{ otherProcedure: [] }] }
      expect(spyValidateOtherProcedures.callCount).to.equal(0)
      wrapper.instance().validateFormValues(values)
      expect(spyValidateOtherProcedures.callCount).to.equal(1)
    })
  })

  describe('validateFormValues for Hospital', () => {

    // +todo: function to return expected object with default properties.  Use these in the validateFormValues tests.
    //       Make this object readable ie maintain the order of properties -> code under test
    // +todo: Cleanup the tests below using before each function to set default valid values then adding/deleting properties,
    //       more precise test names, etc.  Examples given above
    const initialRequiredValidation = {
      dateOfProcedure: 'Please enter date of procedure.',
      declarationAgree: 'Please tick to confirm that you have read and agreed to the terms in the declaration above.',
      invoiceNumber: 'Please enter invoice number.',
      primaryProcedure: 'Please select primary procedure.',
      accRelated: 'Please select is this ACC related.',
      totalCostErr: 'Please enter hospital cost.',
      SurgicalNotesCounts: 'Please attach surgical notes.'
    }

    const initialValues = { SurgicalNotesCounts: 0 }

    it('returns requirement properties for all properties that are required by default', () => {
      wrapper.setProps({
        requestPayment: {
          currentProviderServiceType: 'Hospital'
        }
      })
      const values = { ...initialValues, SurgicalNotesCounts: 0 }
      expect(wrapper.instance().validateFormValues(values)).to.deep.equal(initialRequiredValidation)
    })

    it('does not return a requirement property for primaryProcedure', () => {
      wrapper.setProps({
        requestPayment: {
          currentProviderServiceType: 'Hospital'
        }
      })
      const values = { ...initialValues, primaryProcedure: [{ id: 'some id' }] }
      const requiredValidation = { ...initialRequiredValidation }
      delete requiredValidation.primaryProcedure
      expect(wrapper.instance().validateFormValues(values)).to.deep.equal(requiredValidation)
    })

    it('does not return a requirement property for dateOfProcedure', () => {
      wrapper.setProps({
        requestPayment: {
          currentProviderServiceType: 'Hospital'
        }
      })
      const values = { ...initialValues, dateOfProcedure: '11/11/1111' }
      const requiredValidation = { ...initialRequiredValidation }
      delete requiredValidation.dateOfProcedure
      expect(wrapper.instance().validateFormValues(values)).to.deep.equal(requiredValidation)
    })

    it('does not return a requirement property for invoiceNumber', () => {
      wrapper.setProps({
        requestPayment: {
          currentProviderServiceType: 'Hospital'
        }
      })
      const values = { ...initialValues, invoiceNumber: 'number' }
      const requiredValidation = { ...initialRequiredValidation }
      delete requiredValidation.invoiceNumber
      expect(wrapper.instance().validateFormValues(values)).to.deep.equal(requiredValidation)
    })

    it('does not return a requirement property for sharedRoom without the hospitalTime', () => {
      wrapper.setProps({
        requestPayment: {
          currentProviderServiceType: 'Hospital'
        }
      })
      const values = { ...initialValues }
      const requiredValidation = { ...initialRequiredValidation }
      expect(wrapper.instance().validateFormValues(values)).to.deep.equal(requiredValidation)
    })

    it('does return a requirement property for sharedRoom with the hospitalTime', () => {
      wrapper.setProps({
        requestPayment: {
          currentProviderServiceType: 'Hospital'
        }
      })
      const values = { ...initialValues, hospitalTime: 2 }
      const requiredValidation = { ...initialRequiredValidation, sharedRoom: 'Please select shared room.' }
      delete requiredValidation.hospitalTime
      delete requiredValidation.theatreTime
      expect(wrapper.instance().validateFormValues(values)).to.deep.equal(requiredValidation)
    })

    it('does return a requirement property for accLetterCounts with the accRelated', () => {
      wrapper.setProps({
        requestPayment: {
          currentProviderServiceType: 'Hospital'
        }
      })
      const values = { ...initialValues, accRelated: 'Yes' }
      const requiredValidation = { ...initialRequiredValidation }
      delete requiredValidation.accRelated
      expect(wrapper.instance().validateFormValues(values)).to.deep.equal(requiredValidation)
    })

    it('does return a requirement property for AccLetterCounts with accRelated', () => {
      wrapper.setProps({
        requestPayment: {
          currentProviderServiceType: 'Hospital'
        }
      })
      const values = { ...initialValues, accRelated: 'Yes', AccLetterCounts: 0 }
      const requiredValidation = { ...initialRequiredValidation, AccLetterCounts: 'Please attach ACC letter.' }
      delete requiredValidation.accRelated
      expect(wrapper.instance().validateFormValues(values)).to.deep.equal(requiredValidation)
    })

    it('does not return a requirement property for AccLetterCounts with accRelated', () => {
      wrapper.setProps({
        requestPayment: {
          currentProviderServiceType: 'Hospital'
        }
      })
      const values = { ...initialValues, accRelated: 'Yes', AccLetterCounts: 1 }
      const requiredValidation = { ...initialRequiredValidation }
      delete requiredValidation.accRelated
      expect(wrapper.instance().validateFormValues(values)).to.deep.equal(requiredValidation)
    })

    it('does not return a requirement property for declarationAgree', () => {
      wrapper.setProps({
        requestPayment: {
          currentProviderServiceType: 'Hospital'
        }
      })
      const values = { ...initialValues, declarationAgree: true }
      const requiredValidation = { ...initialRequiredValidation }
      delete requiredValidation.declarationAgree
      expect(wrapper.instance().validateFormValues(values)).to.deep.equal(requiredValidation)
    })

    it('does not return a requirement property for totalCost', () => {
      wrapper.setProps({
        requestPayment: {
          currentProviderServiceType: 'Hospital'
        },
        requestPayment_costsForHospital: {
          totalCost: 10
        }
      })
      const values = { ...initialValues, hospitalTime: 15, sharedRoom: 'No' }
      const requiredValidation = { ...initialRequiredValidation, totalCostErr: 'Please enter hospital cost.' }
      delete requiredValidation.hospitalTime
      delete requiredValidation.theatreTime
      expect(wrapper.instance().validateFormValues(values)).to.deep.equal(requiredValidation)
    })

    it('does not return a requirement property for SurgicalNotesCounts if it is more than 0', () => {
      wrapper.setProps({
        requestPayment: {
          currentProviderServiceType: 'Hospital'
        }
      })
      const values = { ...initialValues, SurgicalNotesCounts: 1 }
      const requiredValidation = { ...initialRequiredValidation }
      delete requiredValidation.SurgicalNotesCounts
      expect(wrapper.instance().validateFormValues(values)).to.deep.equal(requiredValidation)
    })

    it('hospital time is required when sharedRoom exists', () => {
      wrapper.setProps({
        requestPayment: {
          currentProviderServiceType: 'Hospital'
        }
      })
      const values = { ...initialValues, sharedRoom: 'Yes' }
      const requiredValidation = { ...initialRequiredValidation, hospitalTime: 'Please enter hospital time.' }
      expect(wrapper.instance().validateFormValues(values)).to.deep.equal(requiredValidation)
    })

    it('calls findDuplicates if there are nameOfSpecialist and otherProcedure', () => {
      const values = {
        otherProcedures: [{
          otherProcedure: [{ id: 'procedure' }]
        }]
      }
      expect(spyFindDuplicates.callCount).to.equal(0)
      wrapper.instance().validateFormValues(values)
      expect(spyFindDuplicates.callCount).to.equal(1)
    })
  })

  describe('validateFormValues for Specialist', () => {
    // +todo: function to return expected object with default properties.  Use these in the validateFormValues tests.
    //       Make this object readable ie maintain the order of properties -> code under test
    // +todo: Cleanup the tests below using before each function to set default valid values then adding/deleting properties,
    //       more precise test names, etc.  Examples given above
    const initialRequiredValidation = {
      dateOfProcedure: 'Please enter date of procedure.',
      declarationAgree: 'Please tick to confirm that you have read and agreed to the terms in the declaration above.',
      invoiceNumber: 'Please enter invoice number.',
      primaryProcedure: 'Please select primary procedure.',
      accRelated: 'Please select is this ACC related.',
      totalCostErr: 'Specialist costs not specified.',
      // SurgicalNotesCounts: 'Please attach surgical notes.'
    }

    it('returns requirement properties for all properties that are required by default', () => {
      console.log(Boolean(0))
      wrapper.setProps({
        requestPayment: {
          currentProviderServiceType: 'Specialist'
        }
      })
      const values = {}
      expect(wrapper.instance().validateFormValues(values)).to.deep.equal(initialRequiredValidation)
    })

    it('does not return a requirement property for primaryProcedure', () => {
      wrapper.setProps({
        requestPayment: {
          currentProviderServiceType: 'Specialist'
        }
      })
      const values = { primaryProcedure: [{ id: 'some id' }] }
      const requiredValidation = { ...initialRequiredValidation }
      delete requiredValidation.primaryProcedure
      expect(wrapper.instance().validateFormValues(values)).to.deep.equal(requiredValidation)
    })

    it('does not return a requirement property for dateOfProcedure', () => {
      wrapper.setProps({
        requestPayment: {
          currentProviderServiceType: 'Specialist'
        }
      })
      const values = { dateOfProcedure: '11/11/1111' }
      const requiredValidation = { ...initialRequiredValidation }
      delete requiredValidation.dateOfProcedure
      expect(wrapper.instance().validateFormValues(values)).to.deep.equal(requiredValidation)
    })

    it('does not return a requirement property for invoiceNumber', () => {
      wrapper.setProps({
        requestPayment: {
          currentProviderServiceType: 'Specialist'
        }
      })
      const values = { invoiceNumber: 'number' }
      const requiredValidation = { ...initialRequiredValidation }
      delete requiredValidation.invoiceNumber
      expect(wrapper.instance().validateFormValues(values)).to.deep.equal(requiredValidation)
    })

    it('does not return a requirement property for declarationAgree', () => {
      wrapper.setProps({
        requestPayment: {
          currentProviderServiceType: 'Specialist'
        }
      })
      const values = { declarationAgree: true }
      const requiredValidation = { ...initialRequiredValidation }
      delete requiredValidation.declarationAgree
      expect(wrapper.instance().validateFormValues(values)).to.deep.equal(requiredValidation)
    })

    it('does not return a requirement property for totalCost', () => {
      wrapper.setProps({
        requestPayment: {
          currentProviderServiceType: 'Specialist'
        },
        requestPayment_costsForSpecialist: {
          totalCost: 10
        }
      })
      const values = {}
      const requiredValidation = { ...initialRequiredValidation }
      delete requiredValidation.totalCostErr
      expect(wrapper.instance().validateFormValues(values)).to.deep.equal(requiredValidation)
    })
  })

  // -todo: Missing tests for not returning requirement properties for documentBundleId, accRelated, policyMemberDetails,
  //       policyMemberDetails.PolicyId, policyMemberDetails.dateOfBirth, location, associatedCosts, associatedCosts.Cost,
  //       associatedCosts.serviceProviderId(one of hospital/ service / etc will be required)
  //       (NOTE: These are missing validations in the code under test)
  // --------------------------------------------------------------------------
  // Confirm this with Tom: associatedCosts.serviceProviderId(one of hospital/ service / etc will be required)
  // --------------------------------------------------------------------------

  // +todo: add describe block for validateOtherProcedures with unit tests for this function
  describe('validateOtherProcedures', () => {

  // +NB: a lot of this code is written without regard to inversion of control
  // and should probably be refactored so the duplicates/blacklist
  // functionality can be properly tested

    // +todo: test for case when no 'otherProcedure's exist

    it('validates otherProcedures is optional', () => {
      let values = {}
      expect(wrapper.instance().validateOtherProcedures(values)).to.deep.equal({
        otherProcedures: []
      })
    })

    it('requires otherProcedures for each other procedure', () => {
      let values = {
        otherProcedures: [{}]
      }
      expect(wrapper.instance().validateOtherProcedures(values)).to.deep.equal({
        otherProcedures: [
          {
            otherProcedure: 'Please select other procedure.',
            specialistCost: 'Please enter specialist cost.'
          }
        ]
      })
    })

    // +todo: test empty string for nameOfSpecialist
    it('requires cost for each other procedures', () => {
      let values = {
        otherProcedures: [{
          otherProcedure: [{ id: '111' }]
        }]
      }
      expect(wrapper.instance().validateOtherProcedures(values)).to.deep.equal({
        otherProcedures: [{
          specialistCost: 'Please enter specialist cost.'
        }]
      })
    })

    it('requires specialistCost cannot be a zero for each other procedure', () => {
      let values = {
        otherProcedures: [
          {
            otherProcedure: [{ id: '111' }],
            specialistCost: 1
          },
          {
            otherProcedure: [{ id: '222' }],
            specialistCost: 234
          },
          {
            otherProcedure: [{ id: '333' }],
            specialistCost: 0
          },
          {
            otherProcedure: [{ id: '444' }],
            specialistCost: 1
          },
          {
            otherProcedure: [{ id: '555' }],
            specialistCost: 0
          }
        ]
      }
      expect(wrapper.instance().validateOtherProcedures(values)).to.deep.equal({
        otherProcedures: [
          {},
          {},
          { specialistCost: 'Please enter specialist cost.' },
          {},
          { specialistCost: 'Please enter specialist cost.' }
        ]
      })

      values = {
        otherProcedures: [
          {
            otherProcedure: [{ id: '222' }]
          },
          {
            otherProcedure: [{ id: '444' }]
          }
        ]
      }
      expect(wrapper.instance().validateOtherProcedures(values)).to.deep.equal({
        otherProcedures: [
          {
            specialistCost: 'Please enter specialist cost.'
          },
          {
            specialistCost: 'Please enter specialist cost.'
          }
        ]
      })
    })

    it('validates that otherProcedures does not have the dupliated procedure & specialist', () => {
      let values = {
        otherProcedures: [
          {
            otherProcedure: [{ id: '222' }],
            specialistCost: 1
          },
          {
            otherProcedure: [{ id: '999' }],
            specialistCost: 1
          },
          {
            otherProcedure: [{ id: '999' }],
            specialistCost: 1
          },
          {
            otherProcedure: [{ id: '222' }],
            specialistCost: 1
          }
        ]
      }
      expect(wrapper.instance().validateOtherProcedures(values)).to.deep.equal({
        otherProcedures: [
          {},
          {},
          {
            otherProcedure: 'This procedure already exist.'
          },
          {
            otherProcedure: 'This procedure already exist.'
          }
        ]
      })
    })

    // +todo: the name of this test is misleading because specialistCost has no bearing on findDuplicates
    // ------------------------------------------------------------------------
    // See below for a better test description
    // ------------------------------------------------------------------------
    // it('checks primary procedure can be duplicated with a different provider and specialistCost can be zero in other procedures', () => {
    //   const values = {
    //     ReferralLetterCounts: 1,
    //     SpecialistReportCounts: 1,
    //     dateOfOnset: 'aaa',
    //     declarationAgree: true,
    //     nameOfHospital: 'xyz',
    //     nameOfSpecialist: [{
    //       id: '5989cf76-ab1b-486b-8b5e-956a119aa9b4'
    //     }],
    //     proposedDateOfProcedure: '31/12/2000',
    //     specialistCost: 123,
    //     primaryProcedure: [{
    //       id: '1f5a2fe5-335e-4b91-82a9-709445176fbf'
    //     }],
    //     otherProcedures: [
    //       {
    //         nameOfSpecialist: [
    //           {
    //             id: 'aaa'
    //           }
    //         ],
    //         otherProcedure: [
    //           {
    //             id: '1f5a2fe5-335e-4b91-82a9-709445176fbf'
    //           }
    //         ],
    //         specialistCost: '0'
    //       }
    //     ]
    //   }
    //   expect(wrapper.instance().validateOther(values)).to.deep.equal({
    //     otherProcedures: [{}],
    //     accRelated: 'Please select is this ACC related.'
    //   })
    // })

    it('validates that otherProcedures that has the same procedure as primary procedure but different nameOfSpecialist can have zero specialistCost', () => {
      let values = {
        primaryProcedure: [{ id: '222' }],
        otherProcedures: [
          {
            otherProcedure: [{ id: '222' }]
          },
          {
            otherProcedure: [{ id: '222' }],
            specialistCost: 0
          },
          {
            otherProcedure: [{ id: '222' }],
            specialistCost: 1
          },
          {
            otherProcedure: [{ id: '888' }],
            specialistCost: 0
          },
          {
            otherProcedure: [{ id: '999' }],
            specialistCost: 1
          }
        ]
      }
      expect(wrapper.instance().validateOtherProcedures(values)).to.deep.equal({
        otherProcedures: [
          {
            otherProcedure: 'This procedure already exist.'
          },
          {
            otherProcedure: 'This procedure already exist.'
          },
          {
            otherProcedure: 'This procedure already exist.'
          },
          {
            specialistCost: 'Please enter specialist cost.'
          },
          {}
        ]
      })
    })
    // +todo: duplicate test with the one above?
    // ------------------------------------------------------------------------
    // #removed
    // ------------------------------------------------------------------------
  })

  describe('validateOtherCosts', () => {
    it('validates otherCosts is optional', () => {
      let values = {}
      expect(wrapper.instance().validateOtherCosts(values)).to.deep.equal({
        otherCosts: []
      })
    })

    it('requires otherCosts for each other costs', () => {
      let values = {
        otherCosts: [{}]
      }
      expect(wrapper.instance().validateOtherCosts(values)).to.deep.equal({
        otherCosts: [
          {
            otherCost: 'Please enter other cost.'
          }
        ]
      })
    })
  })

  // +todo: unit tests to check 'formSubmit' function
  // +todo: separate concerns in formSubmit to facilitate unit tests - highly recommended

  describe('formSubmit', () => {
    const sandbox = sinon.sandbox.create()
    const spyFormSubmit = sinon.spy(RequestPayment.prototype, 'formSubmit')
    const spyValidateFormValues = sinon.spy(RequestPayment.prototype, 'validateFormValues')
    const spyFormSubmitSuccess = sinon.spy()
    const spyFormSubmitError = sinon.spy()
    let stub

    beforeEach(() => {
      stub = sandbox.stub(request, 'default')
      props = {
        cssName: 'request-payment',
        currentProviderName: undefined,
        requestPayment: {
          currentProviderServiceType: '',
          docBundle: {},
          isValid: undefined
        },
        currentProviderLinks: [],
        requestPayment_preApproval: {},
        formSubmitSuccess: spyFormSubmitSuccess,
        formSubmitError: spyFormSubmitError
      }
      wrapper = shallow(<RequestPayment {...props} />)
    })

    afterEach(() => {
      spyFormSubmit.reset()
      spyValidateFormValues.reset()
      spyFormSubmitSuccess.reset()
      spyFormSubmitError.reset()
      spyGetFormData.reset()
      sandbox.restore()
    })

    it('renders something', () => {
      expect(wrapper).to.exist
    })

    // +todo: check that validateFormValues is called

    it('formSubmit triggers validateFormValues', () => {
      const values = {
        specialistCost: '123',
        dateOfProcedure: '11/11/1111',
        accRelated: 'No',
        ReferralLetterCounts: 1,
        SpecialistReportCounts: 1,
        declarationAgree: true,
        primaryProcedure: [{ id: 'some id' }],
        invoiceNumber: 'invoice'
      }
      stub.resolves({})().then((value) => {})
      expect(spyFormSubmit.callCount).to.equal(0)
      expect(spyValidateFormValues.callCount).to.equal(0)
      wrapper.instance().formSubmit(values)
      expect(spyFormSubmit.callCount).to.equal(1)
      expect(spyValidateFormValues.callCount).to.equal(1)
    })

    // +todo: check that state is set and error thrown when validateFormValues returns non-empty object (ie an error)
    // ------------------------------------------------------------------------
    // throw new SubmissionError(err)
    // ------------------------------------------------------------------------

    it('formSubmit throws an error', () => {
      const values = {
        specialistCost: '123',
        dateOfProcedure: '11/11/1111',
        accRelated: 'No',
        ReferralLetterCounts: 1,
        SpecialistReportCounts: 1,
        declarationAgree: true,
        primaryProcedure: [{ id: 'some id' }]
      }
      expect(() => wrapper.instance().formSubmit(values)).to.throw()
      expect(wrapper.state().hasError).to.equal(true)
    })

    // +todo: check that getFormData is called

    it('formSubmit triggers getFormData', () => {
      const values = {
        specialistCost: '123',
        dateOfProcedure: '11/11/1111',
        accRelated: 'No',
        ReferralLetterCounts: 1,
        SpecialistReportCounts: 1,
        declarationAgree: true,
        primaryProcedure: [{ id: 'some id' }],
        invoiceNumber: 'invoice'
      }
      stub.resolves({ primaryProcedure: 'values' })().then((value) => {})
      expect(spyFormSubmit.callCount).to.equal(0)
      expect(spyGetFormData.callCount).to.equal(0)
      wrapper.instance().formSubmit(values)
      expect(spyFormSubmit.callCount).to.equal(1)
      expect(spyGetFormData.callCount).to.equal(1)
    })

    // +todo: check that link is generated correctly using the create-preapproval rel in this.props.currentProviderLinks

    it('formSubmit creates a link', () => {
      wrapper.setProps({
        currentProviderLinks: [{
          rel: 'create-cleared-claim-as-provider',
          url: 'this is a link'
        }]
      })
      const values = {
        specialistCost: '123',
        dateOfProcedure: '11/11/1111',
        accRelated: 'No',
        ReferralLetterCounts: 1,
        SpecialistReportCounts: 1,
        declarationAgree: true,
        primaryProcedure: [{ id: 'some id' }],
        invoiceNumber: 'invoice'
      }
      stub.resolves('this is a link')().then((value) => {})
      expect(spyFormSubmit.callCount).to.equal(0)
      wrapper.instance().formSubmit(values)
      expect(spyFormSubmit.callCount).to.equal(1)
    })

    // +todo: check that if no link found returns

    it('formSubmit returns null if link doesn\'t exist', () => {
      const values = {
        specialistCost: '123',
        dateOfProcedure: '11/11/1111',
        accRelated: 'No',
        ReferralLetterCounts: 1,
        SpecialistReportCounts: 1,
        declarationAgree: true,
        primaryProcedure: [{ id: 'some id' }],
        invoiceNumber: 'invoice'
      }
      stub.resolves({})().then((value) => {})
      expect(wrapper.instance().formSubmit(values)).to.equal(undefined)
    })

    // +todo: check apiRequest is called with correct data

    it('apiREquest is called with correct data', () => {
      wrapper.setProps({
        currentProviderLinks: [{
          rel: 'create-cleared-claim-as-provider',
          url: 'this is a link'
        }]
      })
      const values = {
        specialistCost: '123',
        dateOfProcedure: '11/11/1111',
        accRelated: 'No',
        ReferralLetterCounts: 1,
        SpecialistReportCounts: 1,
        declarationAgree: true,
        primaryProcedure: [{ id: 'some id' }],
        invoiceNumber: 'invoice'
      }
      stub.resolves({ data: 'result' })().then((value) => {})
      wrapper.instance().formSubmit(values).then((value) => {
        expect(value).to.eql({ data: 'result' })
      })
    })

    it('apiRequest can cause an error', () => {
      wrapper.setProps({
        currentProviderLinks: [{
          rel: 'create-cleared-claim-as-provider',
          url: 'this is a link'
        }]
      })
      const values = {
        specialistCost: '123',
        dateOfProcedure: '11/11/1111',
        nameOfSpecialist: [{ id: 'some id' }],
        accRelated: 'No',
        ReferralLetterCounts: 1,
        SpecialistReportCounts: 1,
        declarationAgree: true,
        primaryProcedure: [{ id: 'some id' }],
        invoiceNumber: 'asd'
      }
      stub.resolves('')().then((value) => {
        expect(wrapper.instance().formSubmit(values)).to.throw
      })
    })

    // +todo: check this.props.formSubmitSuccess is called with 'RequestPayment'

    it('formSubmit triggers formSubmitSuccess', () => {
      wrapper.setProps({
        currentProviderLinks: [{
          rel: 'create-cleared-claim-as-provider',
          url: 'this is a link'
        }]
      })
      const values = {
        specialistCost: '123',
        dateOfProcedure: '11/11/1111',
        accRelated: 'No',
        ReferralLetterCounts: 1,
        SpecialistReportCounts: 1,
        declarationAgree: true,
        primaryProcedure: [{ id: 'some id' }],
        invoiceNumber: 'invoice'
      }
      stub.resolves({ data: 'result' })().then((value) => {})
      expect(spyFormSubmitSuccess.callCount).to.equal(0)
      wrapper.instance().formSubmit(values).then((value) => {
        expect(spyFormSubmitSuccess.callCount).to.equal(1)
      })
    })

    it('formSubmit throws error if no data is received from apiRequest', () => {
      wrapper.setProps({
        currentProviderLinks: [{
          rel: 'create-cleared-claim-as-provider',
          url: 'this is a link'
        }]
      })
      const values = {
        specialistCost: '123',
        dateOfProcedure: '11/11/1111',
        accRelated: 'No',
        ReferralLetterCounts: 1,
        SpecialistReportCounts: 1,
        declarationAgree: true,
        primaryProcedure: [{ id: 'some id' }],
        invoiceNumber: 'invoice'
      }
      stub.resolves({ data: false })().then((value) => {
        return value
      })
      wrapper.instance().formSubmit(values).then((value) => {
        expect(wrapper.instance().formSubmit(values)).to.throw
      })
    })

    // +todo: check that if apiRequest throws any error then this.props.formSubmitError is called with 'RequestPayment'

    it('formSubmit triggers formSubmitError upon catching the thrown error', () => {
      wrapper.setProps({
        currentProviderLinks: [{
          rel: 'create-cleared-claim-as-provider',
          url: 'this is a link'
        }]
      })
      const values = {
        specialistCost: '123',
        dateOfProcedure: '11/11/1111',
        accRelated: 'No',
        ReferralLetterCounts: 1,
        SpecialistReportCounts: 1,
        declarationAgree: true,
        primaryProcedure: [{ id: 'some id' }],
        invoiceNumber: 'invoice'
      }
      stub.rejects({})().catch((value) => {})
      expect(spyFormSubmitError.callCount).to.equal(0)
      wrapper.instance().formSubmit(values).catch((value) => {
        expect(spyFormSubmitError.callCount).to.equal(1)
      })
    })
  })

  describe('getFormData', () => {
    const spyFormSubmitSuccess = sinon.spy()
    const spyFormSubmitError = sinon.spy()

    let values

    beforeEach(() => {
      values = {
        specialistCost: '123',
        dateOfProcedure: '11/11/1111',
        accRelated: 'No',
        ReferralLetterCounts: 1,
        SpecialistReportCounts: 1,
        declarationAgree: true,
        primaryProcedure: [{ id: 'some id' }],
        invoiceNumber: 'invoice'
      }
      props = {
        cssName: 'request-payment',
        currentProviderName: undefined,
        requestPayment: {
          currentProviderServiceType: '',
          docBundle: {},
          isValid: undefined
        },
        currentProviderLinks: [],
        requestPayment_preApproval: {},
        formSubmitSuccess: spyFormSubmitSuccess,
        formSubmitError: spyFormSubmitError
      }
      wrapper = shallow(<RequestPayment {...props} />)
    })

    afterEach(() => {
      spyGetFormData.reset()
      spyGetPrimary.reset()
      spyGetAdditional.reset()
      spyGetOtherCosts.reset()
      spyFormSubmitSuccess.reset()
      spyFormSubmitError.reset()
    })

    it('renders something', () => {
      expect(wrapper).to.exist
    })

    it('triggers getPrimaryPerformedIntervention', () => {
      expect(spyGetFormData.callCount).to.equal(0)
      expect(spyGetPrimary.callCount).to.equal(0)
      wrapper.instance().getFormData(values)
      expect(spyGetFormData.callCount).to.equal(1)
      expect(spyGetPrimary.callCount).to.equal(1)
    })

    it('triggers getAdditionalPerformedIntervention', () => {
      values = { ...values, otherProcedures: [1, 2] }
      expect(spyGetFormData.callCount).to.equal(0)
      expect(spyGetAdditional.callCount).to.equal(0)
      wrapper.instance().getFormData(values)
      expect(spyGetFormData.callCount).to.equal(1)
      expect(spyGetAdditional.callCount).to.equal(1)
    })

    it('triggers getOtherCosts', () => {
      values = { ...values, otherCosts: [1, 2] }
      expect(spyGetFormData.callCount).to.equal(0)
      expect(spyGetOtherCosts.callCount).to.equal(0)
      wrapper.instance().getFormData(values)
      expect(spyGetFormData.callCount).to.equal(1)
      expect(spyGetOtherCosts.callCount).to.equal(1)
    })
  })

  describe('getPrimaryPerformedIntervention', () => {
    const spyFormSubmitSuccess = sinon.spy()
    const spyFormSubmitError = sinon.spy()

    let values

    beforeEach(() => {
      values = {
        specialistCost: '123',
        dateOfProcedure: '11/11/1111',
        accRelated: 'No',
        ReferralLetterCounts: 1,
        SpecialistReportCounts: 1,
        declarationAgree: true,
        primaryProcedure: [{ id: 'some id' }],
        invoiceNumber: 'invoice'
      }
      props = {
        cssName: 'request-payment',
        currentProviderName: undefined,
        requestPayment: {
          currentProviderServiceType: '',
          docBundle: {},
          isValid: undefined
        },
        currentProviderLinks: [],
        requestPayment_preApproval: {},
        formSubmitSuccess: spyFormSubmitSuccess,
        formSubmitError: spyFormSubmitError
      }
      wrapper = shallow(<RequestPayment {...props} />)
    })

    afterEach(() => {
      spyGetFormData.reset()
      spyGetPrimary.reset()
      spyGetAdditional.reset()
      spyGetOtherCosts.reset()
      spyFormSubmitSuccess.reset()
      spyFormSubmitError.reset()
    })

    it('returns an empty claimLineItems without correct values', () => {
      expect(wrapper.instance().getPrimaryPerformedIntervention(values)).to.deep.equal({
        claimLineItems: [],
        interventionId: 'some id',
        location: undefined
      })
    })

    it('returns correct array for Anaesthetist', () => {
      wrapper.setProps({
        requestPayment: {
          currentProviderServiceType: 'Anaesthetist'
        },
        requestPayment_costsForAnaesthetist: {
          totalCost: 123
        }
      })
      values = { ...values, timeBaseUnitsTime: '15', timeBaseUnitsCost: '15', timeUnitsTime: '15', timeUnitsCost: '15', modifyingUnitsTime: '15', modifyingUnitsCost: '15' }
      expect(wrapper.instance().getPrimaryPerformedIntervention(values)).to.deep.equal({
        claimLineItems: [{
          type: 'Anaesthetist',
          claimCostTypeId: 6,
          cost: 123 * 1.15,
          TimeBaseUnits: 15,
          TimeBaseUnitsCost: 15 * 1.15,
          TimeUnits: 15,
          TimeUnitsCost: 15 * 1.15,
          ModifyingUnits: 15,
          ModifyingUnitsCost: 15 * 1.15
        }],
        interventionId: 'some id',
        location: undefined
      })
    })

    it('returns correct array for anaesthetist with type operating theatre', () => {
      wrapper.setProps({
        requestPayment: {
          currentProviderServiceType: 'Anaesthetist'
        },
        requestPayment_costsForAnaesthetist: {
          totalCost: 123
        }
      })
      values = { ...values, theatreTime: 'abc' }
      expect(wrapper.instance().getPrimaryPerformedIntervention(values)).to.deep.equal({
        claimLineItems: [{
          type: 'Anaesthetist',
          claimCostTypeId: 6,
          cost: 123 * 1.15,
          TimeBaseUnits: 0,
          TimeBaseUnitsCost: 0,
          TimeUnits: 0,
          TimeUnitsCost: 0,
          ModifyingUnits: 0,
          ModifyingUnitsCost: 0
        }, {
          type: 'OperatingTheatre',
          claimCostTypeId: 2,
          cost: 0,
          TimeInMinutes: 0
        }],
        interventionId: 'some id',
        location: undefined
      })
    })

    it('returns correct array for Hospital with type operating theatre', () => {
      wrapper.setProps({
        requestPayment: {
          currentProviderServiceType: 'Hospital'
        }
      })
      values = { ...values, operatingTheatreCost: '123', theatreTime: '123' }
      expect(wrapper.instance().getPrimaryPerformedIntervention(values)).to.deep.equal({
        claimLineItems: [{
          type: 'OperatingTheatre',
          claimCostTypeId: 2,
          cost: 123 * 1.15,
          TimeInMinutes: 123
        }, {
          type: 'Default',
          claimCostTypeId: 1,
          cost: 123 * 1.15
        }],
        interventionId: 'some id',
        location: undefined
      })
      values = { ...values, operatingTheatreCost: 'abc', theatreTime: 'abc' }
      expect(wrapper.instance().getPrimaryPerformedIntervention(values)).to.deep.equal({
        claimLineItems: [{
          type: 'OperatingTheatre',
          claimCostTypeId: 2,
          cost: 0,
          TimeInMinutes: 0
        }, {
          type: 'Default',
          claimCostTypeId: 1,
          cost: 123 * 1.15
        }],
        interventionId: 'some id',
        location: undefined
      })
    })

    it('returns correct array for Hospital with type radiology', () => {
      wrapper.setProps({
        requestPayment: {
          currentProviderServiceType: 'Hospital'
        }
      })
      values = { ...values, radiologyCost: '123' }
      expect(wrapper.instance().getPrimaryPerformedIntervention(values)).to.deep.equal({
        claimLineItems: [{
          type: 'Default',
          claimCostTypeId: 3,
          cost: 123 * 1.15
        }, {
          type: 'Default',
          claimCostTypeId: 1,
          cost: 123 * 1.15
        }],
        interventionId: 'some id',
        location: undefined
      })
      values = { ...values, radiologyCost: 'abc' }
      expect(wrapper.instance().getPrimaryPerformedIntervention(values)).to.deep.equal({
        claimLineItems: [{
          type: 'Default',
          claimCostTypeId: 3,
          cost: 0
        }, {
          type: 'Default',
          claimCostTypeId: 1,
          cost: 123 * 1.15
        }],
        interventionId: 'some id',
        location: undefined
      })
    })

    it('returns correct array for Hospital with type hospital', () => {
      wrapper.setProps({
        requestPayment: {
          currentProviderServiceType: 'Hospital'
        }
      })
      values = { ...values, hospitalCost: '123', hospitalTime: '123', sharedRoom: 'No' }
      expect(wrapper.instance().getPrimaryPerformedIntervention(values)).to.deep.equal({
        claimLineItems: [{
          type: 'Hospital',
          claimCostTypeId: 4,
          cost: 123 * 1.15,
          NightsStayed: 123,
          isSharedRoom: false
        }, {
          type: 'Default',
          claimCostTypeId: 1,
          cost: 123 * 1.15
        }],
        interventionId: 'some id',
        location: undefined
      })
      values = { ...values, hospitalCost: 'abc', hospitalTime: '1', sharedRoom: 'Yes' }
      expect(wrapper.instance().getPrimaryPerformedIntervention(values)).to.deep.equal({
        claimLineItems: [{
          type: 'Hospital',
          claimCostTypeId: 4,
          cost: 0,
          NightsStayed: 1,
          isSharedRoom: true
        }, {
          type: 'Default',
          claimCostTypeId: 1,
          cost: 123 * 1.15
        }],
        interventionId: 'some id',
        location: undefined
      })
    })

    it('returns correct array for Hospital with type specialist', () => {
      wrapper.setProps({
        requestPayment: {
          currentProviderServiceType: 'Hospital'
        }
      })
      values = { ...values }
      expect(wrapper.instance().getPrimaryPerformedIntervention(values)).to.deep.equal({
        claimLineItems: [{
          type: 'Default',
          claimCostTypeId: 1,
          cost: 123 * 1.15
        }],
        interventionId: 'some id',
        location: undefined
      })
      values = { ...values, specialistCost: 'abc' }
      expect(wrapper.instance().getPrimaryPerformedIntervention(values)).to.deep.equal({
        claimLineItems: [{
          type: 'Default',
          claimCostTypeId: 1,
          cost: 0
        }],
        interventionId: 'some id',
        location: undefined
      })
    })

    it('returns correct array for Hospital with type consultation', () => {
      wrapper.setProps({
        requestPayment: {
          currentProviderServiceType: 'Hospital'
        }
      })
      values = { ...values, consultationCost: '123' }
      expect(wrapper.instance().getPrimaryPerformedIntervention(values)).to.deep.equal({
        claimLineItems: [{
          type: 'Default',
          claimCostTypeId: 1,
          cost: 123 * 1.15
        }, {
          type: 'Default',
          claimCostTypeId: 8,
          cost: 123 * 1.15
        }],
        interventionId: 'some id',
        location: undefined
      })
      values = { ...values, consultationCost: 'abc' }
      expect(wrapper.instance().getPrimaryPerformedIntervention(values)).to.deep.equal({
        claimLineItems: [{
          type: 'Default',
          claimCostTypeId: 1,
          cost: 123 * 1.15
        }, {
          type: 'Default',
          claimCostTypeId: 8,
          cost: 0
        }],
        interventionId: 'some id',
        location: undefined
      })
    })

    it('returns correct array for Hospital with type anaesthetist', () => {
      wrapper.setProps({
        requestPayment: {
          currentProviderServiceType: 'Hospital'
        }
      })
      values = { ...values, anaesthetistCost: '123' }
      expect(wrapper.instance().getPrimaryPerformedIntervention(values)).to.deep.equal({
        claimLineItems: [{
          type: 'Default',
          claimCostTypeId: 1,
          cost: 123 * 1.15
        }, {
          type: 'Default',
          claimCostTypeId: 6,
          cost: 123 * 1.15
        }],
        interventionId: 'some id',
        location: undefined
      })
      values = { ...values, anaesthetistCost: 'abc' }
      expect(wrapper.instance().getPrimaryPerformedIntervention(values)).to.deep.equal({
        claimLineItems: [{
          type: 'Default',
          claimCostTypeId: 1,
          cost: 123 * 1.15
        }, {
          type: 'Default',
          claimCostTypeId: 6,
          cost: 0
        }],
        interventionId: 'some id',
        location: undefined
      })
    })

    it('returns correct array for Hospital with type prosthesis', () => {
      wrapper.setProps({
        requestPayment: {
          currentProviderServiceType: 'Hospital'
        }
      })
      values = { ...values, prosthesisCost: '123', prosthesisDescr: 'some description' }
      expect(wrapper.instance().getPrimaryPerformedIntervention(values)).to.deep.equal({
        claimLineItems: [{
          type: 'Default',
          claimCostTypeId: 1,
          cost: 123 * 1.15
        }, {
          type: 'Prosthesis',
          claimCostTypeId: 5,
          cost: 123 * 1.15,
          ProsthesisId: undefined
        }],
        interventionId: 'some id',
        location: undefined
      })
      values = { ...values, prosthesisCost: 'abc', prosthesisDescr: 'some description' }
      expect(wrapper.instance().getPrimaryPerformedIntervention(values)).to.deep.equal({
        claimLineItems: [{
          type: 'Default',
          claimCostTypeId: 1,
          cost: 123 * 1.15
        }, {
          type: 'Prosthesis',
          claimCostTypeId: 5,
          cost: 0,
          ProsthesisId: undefined
        }],
        interventionId: 'some id',
        location: undefined
      })
    })

    it('returns correct array for Specialist with type operating theatre', () => {
      wrapper.setProps({
        requestPayment: {
          currentProviderServiceType: 'Specialist'
        }
      })
      values = { ...values, theatreTime: '123' }
      expect(wrapper.instance().getPrimaryPerformedIntervention(values)).to.deep.equal({
        claimLineItems: [{
          type: 'OperatingTheatre',
          claimCostTypeId: 2,
          cost: 0,
          TimeInMinutes: 123
        }, {
          type: 'Default',
          claimCostTypeId: 1,
          cost: 123 * 1.15
        }],
        interventionId: 'some id',
        location: undefined
      })
      values = { ...values, theatreTime: 'abc' }
      expect(wrapper.instance().getPrimaryPerformedIntervention(values)).to.deep.equal({
        claimLineItems: [{
          type: 'OperatingTheatre',
          claimCostTypeId: 2,
          cost: 0,
          TimeInMinutes: 0
        }, {
          type: 'Default',
          claimCostTypeId: 1,
          cost: 123 * 1.15
        }],
        interventionId: 'some id',
        location: undefined
      })
    })

    it('returns correct array for Specialist with type specialist', () => {
      wrapper.setProps({
        requestPayment: {
          currentProviderServiceType: 'Specialist'
        }
      })
      values = { ...values }
      expect(wrapper.instance().getPrimaryPerformedIntervention(values)).to.deep.equal({
        claimLineItems: [{
          type: 'Default',
          claimCostTypeId: 1,
          cost: 123 * 1.15
        }],
        interventionId: 'some id',
        location: undefined
      })
      values = { ...values, specialistCost: 'abc' }
      expect(wrapper.instance().getPrimaryPerformedIntervention(values)).to.deep.equal({
        claimLineItems: [{
          type: 'Default',
          claimCostTypeId: 1,
          cost: 0
        }],
        interventionId: 'some id',
        location: undefined
      })
    })

    it('returns correct array for Specialist with type consultation', () => {
      wrapper.setProps({
        requestPayment: {
          currentProviderServiceType: 'Specialist'
        }
      })
      values = { ...values, consultationCost: '123' }
      expect(wrapper.instance().getPrimaryPerformedIntervention(values)).to.deep.equal({
        claimLineItems: [{
          type: 'Default',
          claimCostTypeId: 1,
          cost: 123 * 1.15
        }, {
          type: 'Default',
          claimCostTypeId: 8,
          cost: 123 * 1.15
        }],
        interventionId: 'some id',
        location: undefined
      })
      values = { ...values, consultationCost: 'abc' }
      expect(wrapper.instance().getPrimaryPerformedIntervention(values)).to.deep.equal({
        claimLineItems: [{
          type: 'Default',
          claimCostTypeId: 1,
          cost: 123 * 1.15
        }, {
          type: 'Default',
          claimCostTypeId: 8,
          cost: 0
        }],
        interventionId: 'some id',
        location: undefined
      })
    })

    it('returns correct array for Specialist with type prosthesis', () => {
      wrapper.setProps({
        requestPayment: {
          currentProviderServiceType: 'Specialist'
        }
      })
      values = { ...values, prosthesisCost: '123', prosthesisDescr: 'some description' }
      expect(wrapper.instance().getPrimaryPerformedIntervention(values)).to.deep.equal({
        claimLineItems: [{
          type: 'Default',
          claimCostTypeId: 1,
          cost: 123 * 1.15
        }, {
          type: 'Prosthesis',
          claimCostTypeId: 5,
          cost: 123 * 1.15,
          ProsthesisId: undefined
        }],
        interventionId: 'some id',
        location: undefined
      })
      values = { ...values, prosthesisCost: 'abc', prosthesisDescr: 'some description' }
      expect(wrapper.instance().getPrimaryPerformedIntervention(values)).to.deep.equal({
        claimLineItems: [{
          type: 'Default',
          claimCostTypeId: 1,
          cost: 123 * 1.15
        }, {
          type: 'Prosthesis',
          claimCostTypeId: 5,
          cost: 0,
          ProsthesisId: undefined
        }],
        interventionId: 'some id',
        location: undefined
      })
    })
  })

  describe('getAdditionalPerformedIntervention/getOtherCosts', () => {
    const spyFormSubmitSuccess = sinon.spy()
    const spyFormSubmitError = sinon.spy()

    let values

    beforeEach(() => {
      values = {
        specialistCost: '123',
        dateOfProcedure: '11/11/1111',
        accRelated: 'No',
        ReferralLetterCounts: 1,
        SpecialistReportCounts: 1,
        declarationAgree: true,
        primaryProcedure: [{ id: 'some id' }],
        invoiceNumber: 'invoice'
      }
      props = {
        cssName: 'request-payment',
        currentProviderName: undefined,
        requestPayment: {
          currentProviderServiceType: '',
          docBundle: {},
          isValid: undefined
        },
        currentProviderLinks: [],
        requestPayment_preApproval: {},
        formSubmitSuccess: spyFormSubmitSuccess,
        formSubmitError: spyFormSubmitError
      }
      wrapper = shallow(<RequestPayment {...props} />)
    })

    afterEach(() => {
      spyGetFormData.reset()
      spyGetPrimary.reset()
      spyGetAdditional.reset()
      spyGetOtherCosts.reset()
      spyFormSubmitSuccess.reset()
      spyFormSubmitError.reset()
    })

    it('getAdditionalPerformedIntervention returns an array', () => {
      values = { ...values, otherProcedures: [{ otherProcedure: [{ id: 'some id' }], specialistCost: '123' }] }
      expect(wrapper.instance().getAdditionalPerformedIntervention(values)).to.deep.equal([{
        claimLineItems: [{
          type: 'Default',
          claimCostTypeId: 1,
          cost: 123 * 1.15
        }],
        interventionId: 'some id',
        location: 'NotApplicable'
      }])
      values = { ...values, otherProcedures: [{ otherProcedure: [{ id: 'some id' }], specialistCost: 'abc' }] }
      expect(wrapper.instance().getAdditionalPerformedIntervention(values)).to.deep.equal([{
        claimLineItems: [{
          type: 'Default',
          claimCostTypeId: 1,
          cost: 0
        }],
        interventionId: 'some id',
        location: 'NotApplicable'
      }])
    })

    it('getAdditionalPerformedIntervention returns empty array', () => {
      values = { ...values, otherProcedures: [] }
      expect(wrapper.instance().getAdditionalPerformedIntervention(values)).to.deep.equal([])
    })

    // it('getOtherCosts returns an array', () => {
    //   values = { ...values, otherCosts: [{ claimCostTypeId: '1', otherCost: '123' }] }
    //   expect(wrapper.instance().getOtherCosts(values)).to.deep.equal([{
    //     type: 'Default',
    //     claimCostTypeId: 1,
    //     cost: 123 * 1.15
    //   }])
    //   values = { ...values, otherCosts: [{ claimCostTypeId: '1', otherCost: 'abc' }] }
    //   expect(wrapper.instance().getOtherCosts(values)).to.deep.equal([{
    //     type: 'Default',
    //     claimCostTypeId: 1,
    //     cost: 0
    //   }])
    // })
    //
    // it('getOtherCosts returns an empty array', () => {
    //   values = { ...values, otherCosts: [] }
    //   expect(wrapper.instance().getOtherCosts(values)).to.deep.equal([])
    // })

    it('does not get called in getFormData method without value.otherCosts', () => {
      expect(spyGetOtherCosts.callCount).to.equal(0)
      expect(spyGetFormData.callCount).to.equal(0)
      wrapper.instance().getFormData(values)
      expect(spyGetOtherCosts.callCount).to.equal(0)
      expect(spyGetFormData.callCount).to.equal(1)
    })

    it('gets called in getFormData method and appends to getPrimaryPerformedIntervention.claimLineItems if value.otherCosts exists', () => {
      wrapper.setProps({
        requestPayment: {
          currentProviderServiceType: 'Hospital',
          docBundle: {
            id: 'some id'
          }
        }
      })
      const input = {
        ...values,
        operatingTheatreCost: '123',
        theatreTime: '15',
        otherCosts: [{
          claimCostTypeId: '1',
          otherCost: '123'
        }],
        primaryPerformedIntervention: {
          claimLineItems: [{
            type: 'Default',
            claimCostTypeId: '2',
            otherCost: '123'
          }]
        }
      }
      delete input.specialistCost
      expect(spyGetOtherCosts.callCount).to.equal(0)
      expect(spyGetFormData.callCount).to.equal(0)
      expect(spyGetPrimary.callCount).to.equal(0)
      expect(wrapper.instance().getFormData(input).primaryPerformedIntervention.claimLineItems).to.deep.equal([{
        TimeInMinutes: 15, claimCostTypeId: 2, cost: 123 * 1.15, type: 'OperatingTheatre'
      }, {
        claimCostTypeId: 1, cost: 123 * 1.15, type: 'Default'
      }])
      expect(spyGetOtherCosts.callCount).to.equal(1)
      expect(spyGetFormData.callCount).to.equal(1)
      expect(spyGetPrimary.callCount).to.equal(1)
    })

    it('gets called in getFormData method and does not append to getPrimaryPerformedIntervention.claimLineItems without value.otherCosts ', () => {
      wrapper.setProps({
        requestPayment: {
          currentProviderServiceType: 'Hospital',
          docBundle: {
            id: 'some id'
          }
        }
      })
      const input = {
        ...values,
        operatingTheatreCost: '123',
        theatreTime: '15',
        otherCosts: [],
        primaryPerformedIntervention: {
          claimLineItems: [{
            type: 'Default',
            claimCostTypeId: '2',
            otherCost: '123'
          }]
        }
      }
      delete input.specialistCost
      expect(spyGetOtherCosts.callCount).to.equal(0)
      expect(spyGetFormData.callCount).to.equal(0)
      expect(spyGetPrimary.callCount).to.equal(0)
      expect(wrapper.instance().getFormData(input).primaryPerformedIntervention.claimLineItems).to.deep.equal([{
        TimeInMinutes: 15, claimCostTypeId: 2, cost: 123 * 1.15, type: 'OperatingTheatre'
      }])
      expect(spyGetOtherCosts.callCount).to.equal(0)
      expect(spyGetFormData.callCount).to.equal(1)
      expect(spyGetPrimary.callCount).to.equal(1)
    })
  })
})

describe('(View) RequestPayment - mount', () => {
  let wrapper
  let props
  let state

  const spyloadRequrestPaymentCostList = sinon.spy()
  const spyFormReset = sinon.spy()

  beforeEach(() => {
    props = {
      cssName: 'request-pre-approval',
      currentProviderName: 'Testing Tester',
      requestPayment: {
        currentProviderServiceType: '',
        isValid: undefined,
        docBundle: {}
      },
      currentProviderLinks: [],
      requestPayment_preApproval: {
        isValid: true
      },
      docBundle: {},
      handleSubmit: () => {},
      loadRequestPaymentCostList: spyloadRequrestPaymentCostList,
      formReset: spyFormReset
    }
    state = {
      hasError: false
    }
  })

  afterEach(() => {
    ModuleStub.momentLocalizer.reset()
    ModuleStub.momentLocalizer.restore()
  })

  // +todo: add describe block for componentWillUnmount with test that tests formReset called with arg requestPrepproval
  describe('componentWillUnmount', () => {
    it('calls formReset with argument "requestPayment"', () => {
      const spyComponentWillUnmount = sinon.spy(RequestPayment.prototype, 'componentWillUnmount')
      expect(spyComponentWillUnmount.callCount).to.equal(0)
      wrapper = mount(<ReduxFormStub>
        <RequestPaymentReduxForm {...props} {...state} />
      </ReduxFormStub>)
      expect(spyComponentWillUnmount.callCount).to.equal(0)
      wrapper.unmount()
      expect(spyComponentWillUnmount.callCount).to.equal(1)
      expect(spyFormReset.withArgs('requestPayment').callCount).to.equal(1)
      spyComponentWillUnmount.reset()
    })
  })

  // +todo: add describe block for componentWillMount with test that tests momentLocalizer called with argument Moment
  describe('componentWillMount', () => {
    it('calls momentLocalizer with argument Moment', () => {
      const spyComponentWillMount = sinon.spy(RequestPayment.prototype, 'componentWillMount')
      expect(spyComponentWillMount.callCount).to.equal(0)
      expect(ModuleStub.momentLocalizer.callCount).to.equal(0)
      wrapper = mount(<ReduxFormStub>
        <RequestPaymentReduxForm {...props} {...state} />
      </ReduxFormStub>)
      expect(spyComponentWillMount.callCount).to.equal(1)
      expect(ModuleStub.momentLocalizer.withArgs(Moment).callCount).to.equal(1)
      spyComponentWillMount.reset()
    })
  })
})
