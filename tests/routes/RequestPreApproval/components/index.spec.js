// ----------------------------------------------------------------------------
// Note: ModuleStub needs to be defined before the Component, remember to
//       .reset() and .restore() in afterEach()
// ----------------------------------------------------------------------------
import * as ModuleStub from '../../../ModuleStub'
// ----------------------------------------------------------------------------

import * as request from 'utils/request'
import * as utilsHelpers from 'utils/helpers'
import Moment from 'moment'
import React from 'react'
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'

import ReduxFormStub from '../../../ReduxFormStub'
import RequestPreApprovalReduxForm, { RequestPreApproval } from 'routes/RequestPreApproval/components/index'

describe('(View) RequestPreApproval - instantiate', () => {
  let component
  let props

  beforeEach(() => {
    props = {
      cssName: 'request-pre-approval',
      currentProviderName: '',
      requestPreApproval: {
        currentProviderServiceType: '',
        docBundle: {},
        isValid: undefined
      },
      currentProviderLinks: '',
      requestPreApproval_verifyPolicy: {}
    }
    component = new RequestPreApproval(props)
  })

  // +todo: c-tor tests under a describe block that test the setting of state and wordingVersion
  // +todo: need to get the correct wordingVersion i.e. the declaration document bundle id
  describe('Constructor', () => {
    it('has binding methods', () => {
      expect(component.formSubmit).to.exist
      expect(component.getFormData).to.exist
      expect(component.validateFormValues).to.exist
      expect(component.validateOtherProcedures).to.exist
    })

    it('has wordingVersion', () => {
      expect(component.wordingVersion).to.equal('00000000-0000-0000-00000000000000000')
    })
  })

  describe('getFormData', () => {
    const DEFAULT_POLICYID = 'DefaultPolicyId'
    const DEFAULT_DATEOFBIRTH = 'DefaultDateOfBirth'
    const DEFAULT_FIRSTNAME = 'DefaultFirstName'
    const DEFAULT_LASTNAME = 'DefaultLastName'
    const DEFAULT_DOC_BUNDLE_ID = 'DefaultDocumentBundleId'
    const DEFAULT_PROPOSED_DATE_OF_PROCEDURE = '31/12/2000'
    const DEFAULT_FORMATTED_PROPOSED_DATE_OF_PROCEDURE = '2000-12-31'
    const DEFAULT_PROPOSED_DATE_OF_ONSET = '31/12/2000'
    const DEFAULT_FORMATTED_DATE_OF_ONSET = '2000-12-31'
    const DEFAULT_ACC_RELATED = 'Yes'
    const DEFAULT_DECLARATION_AGREE = 'DefaultDeclarationAgree'
    const DEFAULT_DECLARATION_DOC_BUNDLE_ID = 'DefaultDeclarationDocumentBundleId'
    const DEFAULT_SPECIALIST_COST = 0
    const DEFAULT_NAME_OF_SPECIALIST_ID = 'DefaultNameOfSpecialistId'
    const DEFAULT_NAME_OF_SPECIALIST = [{ id: DEFAULT_NAME_OF_SPECIALIST_ID }]
    const DEFAULT_PRIMARY_PROCEDURE_ID = 'DefaultPrimaryProcecdureId'
    const DEFAULT_PRIMARY_PROCEDURE = [{ id: DEFAULT_PRIMARY_PROCEDURE_ID }]
    const DEFAULT_LOCATION = 'DefaultLocation'

    function getRequiredDefaultProps () {
      return {
        requestPreApproval: {
          docBundle: {
            id: DEFAULT_DOC_BUNDLE_ID
          }
        },
        requestPreApproval_verifyPolicy: {
          policyId: DEFAULT_POLICYID,
          dob: DEFAULT_DATEOFBIRTH,
          firstName: DEFAULT_FIRSTNAME,
          lastName: DEFAULT_LASTNAME
        }
      }
    }

    function getRequiredDefaultValues () {
      return {
        proposedDateOfProcedure: DEFAULT_PROPOSED_DATE_OF_PROCEDURE,
        dateOfOnset: DEFAULT_PROPOSED_DATE_OF_ONSET,
        accRelated: DEFAULT_ACC_RELATED,
        declarationAgree: DEFAULT_DECLARATION_AGREE,
        specialistCost: DEFAULT_SPECIALIST_COST,
        nameOfSpecialist: DEFAULT_NAME_OF_SPECIALIST,
        primaryProcedure: DEFAULT_PRIMARY_PROCEDURE,
        location: DEFAULT_LOCATION
      }
    }

    function getDefaultComponent () {
      var defaultComponent = new RequestPreApproval(getRequiredDefaultProps())
      defaultComponent.wordingVersion = DEFAULT_DECLARATION_DOC_BUNDLE_ID

      return defaultComponent
    }

    function getExpectedDefaultFormDataObject () {
      return {
        policyMemberDetails: {
          policyId: DEFAULT_POLICYID,
          dateOfBirth: DEFAULT_DATEOFBIRTH,
          firstName: DEFAULT_FIRSTNAME,
          lastName: DEFAULT_LASTNAME
        },
        proposedDateOfProcedure: DEFAULT_FORMATTED_PROPOSED_DATE_OF_PROCEDURE,
        dateOfOnset: DEFAULT_FORMATTED_DATE_OF_ONSET,
        isAccRelated: true,
        documentBundleId: DEFAULT_DOC_BUNDLE_ID,
        declaration: {
          hasReadAndAgreedPrivacyDeclaration: DEFAULT_DECLARATION_AGREE,
          hasReadAndAgreedDisclosureDeclaration: DEFAULT_DECLARATION_AGREE,
          documentBundleId: DEFAULT_DECLARATION_DOC_BUNDLE_ID
        },
        primaryIntervention: {
          associatedCosts: [
            {
              type: 'Default',
              claimCostTypeId: 1,
              cost: DEFAULT_SPECIALIST_COST,
              serviceProviderId: DEFAULT_NAME_OF_SPECIALIST_ID
            }
          ],
          interventionId: DEFAULT_PRIMARY_PROCEDURE_ID,
          location: DEFAULT_LOCATION
        }
      }
    }

    it('returns correctly populated form data object when given minimum required props and values', () => {
      var component = getDefaultComponent()
      var values = getRequiredDefaultValues()
      var expectedFormDataObject = getExpectedDefaultFormDataObject()

      expect(component.getFormData(values)).to.deep.equal(expectedFormDataObject)
    })

    it('uses the "localeDateToIsoDate" function to get the proposedDateOfProcedure and the dateOfOnset', () => {
      var spy = sinon.spy(utilsHelpers, 'localeDateToIsoDate')
      var component = getDefaultComponent()
      var values = getRequiredDefaultValues()

      component.getFormData(values)

      expect(spy.callCount).to.equal(2)
      expect(spy.args[0]).to.deep.equal([ DEFAULT_PROPOSED_DATE_OF_PROCEDURE ])
      expect(spy.args[1]).to.deep.equal([ DEFAULT_PROPOSED_DATE_OF_ONSET ])
      spy.restore()
    })

    describe('isAccRelated', () => {
      it('is set to "true" if "values.accRelated" equals "Yes"', () => {
        var component = getDefaultComponent()
        var values = getRequiredDefaultValues()
        var expectedFormDataObject = getExpectedDefaultFormDataObject()

        values.accRelated = 'Yes'
        expectedFormDataObject.isAccRelated = true

        expect(component.getFormData(values)).to.deep.equal(expectedFormDataObject)
      })

      it('is set to "false" if "values.accRelated" has not been set', () => {
        var component = getDefaultComponent()
        var values = getRequiredDefaultValues()
        var expectedFormDataObject = getExpectedDefaultFormDataObject()

        delete values.accRelated
        expectedFormDataObject.isAccRelated = false

        expect(component.getFormData(values)).to.deep.equal(expectedFormDataObject)
      })

      it('is set to "false" if "values.accRelated" does not equal "Yes"', () => {
        var testCases = [ '', 'No', 'yes', 'etc', 'NotEqualYet' ]

        var component = getDefaultComponent()
        var values = getRequiredDefaultValues()
        var expectedFormDataObject = getExpectedDefaultFormDataObject()

        expectedFormDataObject.isAccRelated = false

        for (var i = 0; i < testCases.length; i++) {
          values.accRelated = testCases[i]

          expect(component.getFormData(values)).to.deep.equal(expectedFormDataObject)
        }
      })
    })

    describe('primaryIntervention.associatedCosts', () => {
      it('includes the correct associatedCost when "values.operatingTheatreCost" is set', () => {
        var component = getDefaultComponent()
        var values = getRequiredDefaultValues()
        var expectedFormDataObject = getExpectedDefaultFormDataObject()

        values.operatingTheatreCost = '123'
        expectedFormDataObject.primaryIntervention.associatedCosts.push({
          type: 'Default',
          claimCostTypeId: 2,
          cost: 123,
          serviceProviderId: DEFAULT_NAME_OF_SPECIALIST_ID
        })

        expect(component.getFormData(values)).to.deep.equal(expectedFormDataObject)
      })

      it('includes the correct associatedCost when "values.operatingTheatreCost" is set', () => {
        var component = getDefaultComponent()
        var values = getRequiredDefaultValues()
        var expectedFormDataObject = getExpectedDefaultFormDataObject()

        values.radiologyCost = '123'
        expectedFormDataObject.primaryIntervention.associatedCosts.push({
          type: 'Default',
          claimCostTypeId: 3,
          cost: 123,
          serviceProviderId: DEFAULT_NAME_OF_SPECIALIST_ID
        })

        expect(component.getFormData(values)).to.deep.equal(expectedFormDataObject)
      })

      it('includes the correct associatedCost when "values.operatingTheatreCost" is set', () => {
        var component = getDefaultComponent()
        var values = getRequiredDefaultValues()
        var expectedFormDataObject = getExpectedDefaultFormDataObject()

        values.radiologyCost = '123'
        expectedFormDataObject.primaryIntervention.associatedCosts.push({
          type: 'Default',
          claimCostTypeId: 3,
          cost: 123,
          serviceProviderId: DEFAULT_NAME_OF_SPECIALIST_ID
        })

        expect(component.getFormData(values)).to.deep.equal(expectedFormDataObject)
      })

      describe('associatedCost when "values.hospitalCost" is set', () => {
        it('is created correctly and included when required values are set', () => {
          var component = getDefaultComponent()
          var values = getRequiredDefaultValues()
          var expectedFormDataObject = getExpectedDefaultFormDataObject()

          values.hospitalCost = '123'
          values.nameOfHospital = [{ id: 'hospital id' }]

          expectedFormDataObject.primaryIntervention.associatedCosts.push({
            type: 'Hospital',
            claimCostTypeId: 4,
            cost: 123,
            serviceProviderId: 'hospital id',
            hospitalNights: 0,
            theatreMinutes: 0,
            isSharedRoom: undefined
          })

          expect(component.getFormData(values)).to.deep.equal(expectedFormDataObject)
        })

        it('is created correctly and included when "values.hospitalTime" and "values.theatreTime" are set', () => {
          var component = getDefaultComponent()
          var values = getRequiredDefaultValues()
          var expectedFormDataObject = getExpectedDefaultFormDataObject()

          values.hospitalCost = '123'
          values.nameOfHospital = [{ id: 'hospital id' }]
          values.hospitalTime = '88.88'
          values.theatreTime = '888.33'

          expectedFormDataObject.primaryIntervention.associatedCosts.push({
            type: 'Hospital',
            claimCostTypeId: 4,
            cost: 123,
            serviceProviderId: 'hospital id',
            hospitalNights: 88,
            theatreMinutes: 888,
            isSharedRoom: undefined
          })

          expect(component.getFormData(values)).to.deep.equal(expectedFormDataObject)
        })

        describe('isSharedRoom', () => {
          it('is set to "true" if "values.sharedRoom" equals "Yes"', () => {
            var component = getDefaultComponent()
            var values = getRequiredDefaultValues()
            var expectedFormDataObject = getExpectedDefaultFormDataObject()

            values.sharedRoom = 'Yes'
            values.hospitalCost = '123'
            values.nameOfHospital = [{ id: 'hospital id' }]

            expectedFormDataObject.primaryIntervention.associatedCosts.push({
              type: 'Hospital',
              claimCostTypeId: 4,
              cost: 123,
              serviceProviderId: 'hospital id',
              hospitalNights: 0,
              theatreMinutes: 0,
              isSharedRoom: true
            })

            expect(component.getFormData(values)).to.deep.equal(expectedFormDataObject)
          })

          it('is set to "false" if "values.sharedRoom" does not equal "Yes"', () => {
            var testCases = ['', 'No', 'yes', 'etc', 'NotEqualYet']
            var component = getDefaultComponent()
            var values = getRequiredDefaultValues()
            var expectedFormDataObject = getExpectedDefaultFormDataObject()

            values.hospitalCost = '123'
            values.nameOfHospital = [{ id: 'hospital id' }]

            expectedFormDataObject.primaryIntervention.associatedCosts.push({
              type: 'Hospital',
              claimCostTypeId: 4,
              cost: 123,
              serviceProviderId: 'hospital id',
              hospitalNights: 0,
              theatreMinutes: 0,
              isSharedRoom: false
            })

            for (var i = 0; i < testCases.length; i++) {
              values.sharedRoom = testCases[i]
              expect(component.getFormData(values)).to.deep.equal(expectedFormDataObject)
            }
          })
        })
      })

      it('includes the correct associatedCost when "values.prosthesisCost" is set', () => {
        var component = getDefaultComponent()
        var values = getRequiredDefaultValues()
        var expectedFormDataObject = getExpectedDefaultFormDataObject()

        values.prosthesisCost = '123'
        values.prosthesisDescr = [{ id: 'prosthesis id' }]

        expectedFormDataObject.primaryIntervention.associatedCosts.push({
          type: 'Prosthesis',
          claimCostTypeId: 5,
          cost: 123,
          serviceProviderId: DEFAULT_NAME_OF_SPECIALIST_ID,
          prosthesisId: 'prosthesis id'
        })

        expect(component.getFormData(values)).to.deep.equal(expectedFormDataObject)
      })

      it('includes the correct associatedCost when "values.consultationCost" is set', () => {
        var component = getDefaultComponent()
        var values = getRequiredDefaultValues()
        var expectedFormDataObject = getExpectedDefaultFormDataObject()

        values.consultationCost = '123'

        expectedFormDataObject.primaryIntervention.associatedCosts.push({
          type: 'Default',
          claimCostTypeId: 8,
          cost: 123,
          serviceProviderId: DEFAULT_NAME_OF_SPECIALIST_ID
        })

        expect(component.getFormData(values)).to.deep.equal(expectedFormDataObject)
      })

      it('includes the correct associatedCost when "values.sundryCost" is set', () => {
        var component = getDefaultComponent()
        var values = getRequiredDefaultValues()
        var expectedFormDataObject = getExpectedDefaultFormDataObject()

        values.sundryCost = 123

        expectedFormDataObject.primaryIntervention.associatedCosts.push({
          type: 'Default',
          claimCostTypeId: 7,
          cost: 123,
          serviceProviderId: DEFAULT_NAME_OF_SPECIALIST_ID
        })

        expect(component.getFormData(values)).to.deep.equal(expectedFormDataObject)
      })

      it('includes the correct associatedCost when "values.anaesthetistCost" and "values.anaesthetistName" are set', () => {
        var component = getDefaultComponent()
        var values = getRequiredDefaultValues()
        var expectedFormDataObject = getExpectedDefaultFormDataObject()

        values.anaesthetistCost = '123'
        values.anaesthetistName = 'default anaesthetistName'

        expectedFormDataObject.primaryIntervention.associatedCosts.push({
          type: 'Anaesthetist',
          claimCostTypeId: 6,
          cost: 123,
          serviceProviderId: DEFAULT_NAME_OF_SPECIALIST_ID,
          anaesthetistName: 'default anaesthetistName'
        })

        expect(component.getFormData(values)).to.deep.equal(expectedFormDataObject)
      })
    })

    describe('additionalInterventions', () => {
      it('are not included if "values.otherProcedures" is empty', () => {
        var component = getDefaultComponent()
        var values = getRequiredDefaultValues()
        var expectedFormDataObject = getExpectedDefaultFormDataObject()

        values.otherProcedures = []
        expect(component.getFormData(values)).to.deep.equal(expectedFormDataObject)
      })

      it('are empty if "values.otherProcedures" does not contain any "otherProcedure"s', () => {
        var component = getDefaultComponent()
        var values = getRequiredDefaultValues()
        var expectedFormDataObject = getExpectedDefaultFormDataObject()

        values.otherProcedures = [
          {
            nameOfSpecialist: [{ id: 's111' }],
            specialistCost: '123'
          },
          {
            nameOfSpecialist: [{ id: 's222' }],
            specialistCost: '234'
          }
        ]
        expectedFormDataObject.additionalInterventions = []

        expect(component.getFormData(values)).to.deep.equal(expectedFormDataObject)
      })

      it('are empty if "values.otherProcedures" does not contain "nameOfSpecialist"s', () => {
        var component = getDefaultComponent()
        var values = getRequiredDefaultValues()
        var expectedFormDataObject = getExpectedDefaultFormDataObject()

        values.otherProcedures = [
          {
            otherProcedure: [{ id: 'o111' }],
            specialistCost: '123'
          },
          {
            otherProcedure: [{ id: 'o222' }],
            specialistCost: '234'
          }
        ]
        expectedFormDataObject.additionalInterventions = []

        expect(component.getFormData(values)).to.deep.equal(expectedFormDataObject)
      })

      function createOtherProcedureValue (nameOfSpecialistId, otherProcedureId, cost) {
        return {
          nameOfSpecialist: [{ id: nameOfSpecialistId }],
          otherProcedure: [{ id: otherProcedureId }],
          specialistCost: cost
        }
      }

      function createExpectedAdditionalIntervention (nameOfSpecialistId, otherProcedureId, cost) {
        return {
          associatedCosts: [{
            type: 'Default',
            claimCostTypeId: 1,
            cost: cost,
            serviceProviderId: nameOfSpecialistId
          }],
          interventionId: otherProcedureId,
          location: 'NotApplicable'
        }
      }

      it('are correctly added when "values.otherProcedures" contains valid data', () => {
        var component = getDefaultComponent()
        var values = getRequiredDefaultValues()
        var expectedFormDataObject = getExpectedDefaultFormDataObject()

        values.otherProcedures = []
        values.otherProcedures.push(createOtherProcedureValue('s111', 'o111', '123.75'))
        values.otherProcedures.push(createOtherProcedureValue('s222', 'o222', '234.23'))

        expectedFormDataObject.additionalInterventions = []
        expectedFormDataObject.additionalInterventions.push(createExpectedAdditionalIntervention('s111', 'o111', 123))
        expectedFormDataObject.additionalInterventions.push(createExpectedAdditionalIntervention('s222', 'o222', 234))

        expect(component.getFormData(values)).to.deep.equal(expectedFormDataObject)
      })
    })
  })
})

describe('(View) RequestPreApproval - shallow', () => {
  let wrapper
  let props

  const spyValidateOtherProcedures = sinon.spy(RequestPreApproval.prototype, 'validateOtherProcedures')
  const spyFindDuplicates = sinon.spy(RequestPreApproval.prototype, 'findDuplicates')

  beforeEach(() => {
    props = {
      cssName: 'request-pre-approval',
      currentProviderName: undefined,
      requestPreApproval: {
        currentProviderServiceType: '',
        docBundle: {},
        isValid: undefined
      },
      currentProviderLinks: [],
      requestPreApproval_verifyPolicy: {},
      handleSubmit: () => {}
    }
    wrapper = shallow(<RequestPreApproval {...props} />)
  })

  afterEach(() => {
    spyFindDuplicates.reset()
    spyValidateOtherProcedures.reset()
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

    it('renders verifyPolicy component', () => {
      wrapper.setProps({
        requestPreApproval: { isValid: false },
        requestPreApproval_verifyPolicy: { isValid: false }
      })
      const verifyPolicy = wrapper.find({ cssName: `${props.cssName}__verify-policy` })
      expect(verifyPolicy).to.exist
    })

    it('renders verifyPolicy component when verify policy has been verified', () => {
      wrapper.setProps({
        requestPreApproval: { isValid: false },
        requestPreApproval_verifyPolicy: { isValid: true }
      })
      const verifyPolicy = wrapper.find({ cssName: `${props.cssName}__verify-policy` })
      expect(verifyPolicy).to.exist
    })

    it('renders prodecureCost component when verify policy has been verified', () => {
      wrapper.setProps({ requestPreApproval_verifyPolicy: { isValid: true } })
      const prodecureCost = wrapper.find({ cssName: `${props.cssName}__procedure-cost` })
      expect(prodecureCost).to.exist
    })

    it('renders associatedCosts component when verify policy has been verified', () => {
      wrapper.setProps({ requestPreApproval_verifyPolicy: { isValid: true } })
      const associatedCosts = wrapper.find({ cssName: `${props.cssName}__associated-costs` })
      expect(associatedCosts).to.exist
    })

    it('renders attachDocuments component when verify policy has been verified', () => {
      wrapper.setProps({ requestPreApproval_verifyPolicy: { isValid: true } })
      const attachDocuments = wrapper.find({ cssName: `${props.cssName}__attach-documents` })
      expect(attachDocuments).to.exist
    })

    it('renders declaration component when verify policy has been verified', () => {
      wrapper.setProps({ requestPreApproval_verifyPolicy: { isValid: true } })
      const declaration = wrapper.find({ cssName: `${props.cssName}__declaration` })
      expect(declaration).to.exist
    })

    it('renders submitted component when form has been submitted', () => {
      wrapper.setProps({
        requestPreApproval: { isValid: true },
        requestPreApproval_verifyPolicy: { isValid: true }
      })
      expect(wrapper.find('RequestPreApprovalSubmitted')).to.exist
    })
  })

  describe('findDuplicates', () => {
    it('returns false if there are no match', () => {
      const values = {
        otherProcedure: [{ id: 'procedure' }],
        nameOfSpecialist: [{ id: 'specialist' }]
      }
      const blacklist = [
        { otherProcedureId: 'blacklist',
          specialistId: 'blacklist' }
      ]
      expect(wrapper.instance().findDuplicates(values, blacklist)).to.equal(false)
    })

    it('returns true if they both match', () => {
      const values = {
        otherProcedure: [{ id: 'blacklist' }],
        nameOfSpecialist: [{ id: 'blacklist' }]
      }
      const blacklist = [
        { otherProcedureId: 'blacklist',
          specialistId: 'blacklist' }
      ]
      expect(wrapper.instance().findDuplicates(values, blacklist)).to.equal(true)
    })
  })

  // +todo: add describe block for validateFormValues with unit tests for this function beneath this block
  describe('validateFormValues', () => {
    // +todo: function to return expected object with default properties.  Use these in the validateFormValues tests.
    //       Make this object readable ie maintain the order of properties -> code under test
    // +todo: Cleanup the tests below using before each function to set default valid values then adding/deleting properties,
    //       more precise test names, etc.  Examples given above
    const initialRequiredValidation = {
      ReferralLetterCounts: 'Please attach referral letter.',
      SpecialistReportCounts: 'Please attach specialist report.',
      accRelated: 'Please select is this ACC related.',
      dateOfOnset: 'Please enter date of onset.',
      declarationAgree: 'Please tick to confirm that you have read and agreed to the terms in the declaration above.',
      nameOfSpecialist: 'Please select name of specialist.',
      primaryProcedure: 'Please select primary procedure.',
      proposedDateOfProcedure: 'Please enter proposed date of procedure.',
      specialistCost: 'Please enter specialist cost.'
    }

    it('returns requirement properties for all properties that are required by default', () => {
      const values = {}
      expect(wrapper.instance().validateFormValues(values)).to.deep.equal(initialRequiredValidation)
    })

    it('does not return a requirement property for primaryProcedure if primaryProcedure has a value', () => {
      const values = { primaryProcedure: [{ id: 'some id' }] }
      const requiredValidation = { ...initialRequiredValidation }
      delete requiredValidation.primaryProcedure
      expect(wrapper.instance().validateFormValues(values)).to.deep.equal(requiredValidation)
    })

    it('does not return a requirement property for specialistCost if specialistCost has a value', () => {
      const values = { specialistCost: 1 }
      const requiredValidation = { ...initialRequiredValidation }
      delete requiredValidation.specialistCost
      expect(wrapper.instance().validateFormValues(values)).to.deep.equal(requiredValidation)
    })

    it('does not return a requirement property for proposedDateOfProcedure if proposedDateOfProcedure has a value', () => {
      const values = { proposedDateOfProcedure: 'a' }
      const requiredValidation = { ...initialRequiredValidation }
      delete requiredValidation.proposedDateOfProcedure
      expect(wrapper.instance().validateFormValues(values)).to.deep.equal(requiredValidation)
    })

    it('does not return a requirement property for dateOfOnset if dateOfOnset has a value', () => {
      const values = { dateOfOnset: 'a' }
      const requiredValidation = { ...initialRequiredValidation }
      delete requiredValidation.dateOfOnset
      expect(wrapper.instance().validateFormValues(values)).to.deep.equal(requiredValidation)
    })

    it('does not return a requirement property for nameOfSpecialist if nameOfSpecialist has a value', () => {
      const values = { nameOfSpecialist: [{ id: 'some id' }] }
      const requiredValidation = { ...initialRequiredValidation }
      delete requiredValidation.nameOfSpecialist
      expect(wrapper.instance().validateFormValues(values)).to.deep.equal(requiredValidation)
    })

    it('returns a requirement property for sharedRoom if hospitalTime has a value', () => {
      const requiredValidation = {
        ...initialRequiredValidation,
        sharedRoom: 'Please select shared room.'
      }
      delete requiredValidation.nameOfHospital
      const values = { hospitalTime: 15, nameOfHospital: [{ id: 'hospital id' }] }
      expect(wrapper.instance().validateFormValues(values)).to.deep.equal(requiredValidation)
    })

    it('does not return a requirement property for sharedRoom if hospitalTime has zero value', () => {
      const requiredValidation = { ...initialRequiredValidation }
      const values = { hospitalTime: 0 }
      expect(wrapper.instance().validateFormValues(values)).to.deep.equal(requiredValidation)
    })

    it('returns a requirement property for nameOfHospital if hospitalTime has a value', () => {
      const requiredValidation = {
        ...initialRequiredValidation
      }
      const values = { hospitalTime: 15, sharedRoom: 'NotApplicable' }
      expect(wrapper.instance().validateFormValues(values)).to.deep.equal(requiredValidation)
    })

    it('returns a requirement property for nameOfHospital if theatreTime has a value', () => {
      const requiredValidation = {
        ...initialRequiredValidation
      }
      const values = { theatreTime: 10, anaesthetistName: 'some value' }
      expect(wrapper.instance().validateFormValues(values)).to.deep.equal(requiredValidation)
    })

    it('returns a requirement property for accRelated if accRelated has a value not equal to true', () => {
      const values = { accRelated: false }
      const requiredValidation = { ...initialRequiredValidation }
      expect(wrapper.instance().validateFormValues(values)).to.deep.equal(requiredValidation)
    })

    it('does not return a requirement property for accRelated if accRelated has a value equal to true', () => {
      const values = { accRelated: true }
      const requiredValidation = { ...initialRequiredValidation }
      delete requiredValidation.accRelated
      expect(wrapper.instance().validateFormValues(values)).to.deep.equal(requiredValidation)
    })

    it('returns a requirement property for AccLetterCounts if accRelated has value "Yes" and AccLetterCount has zero value', () => {
      const requiredValidation = {
        ...initialRequiredValidation,
        AccLetterCounts: 'Please attach ACC letter.'
      }
      delete requiredValidation.accRelated
      const values = { accRelated: 'Yes', AccLetterCounts: 0 }
      expect(wrapper.instance().validateFormValues(values)).to.deep.equal(requiredValidation)
    })

    it('does not return a requirement property for AccLetterCounts if accRelated has value "Yes" and AccLetterCount has a value', () => {
      const requiredValidation = {
        ...initialRequiredValidation,
      }
      delete requiredValidation.accRelated
      const values = { accRelated: 'Yes', AccLetterCounts: 1 }
      expect(wrapper.instance().validateFormValues(values)).to.deep.equal(requiredValidation)
    })

    // +todo: Add in missing positive tests for each property below that cover cases when properties are set correctly
    //       e.g. it('does not return a requirement property for AccLetterCounts if accRelated is Yes and AccLetterCounts has a value not less than 1', () => {
    it('returns a requirement property for anaesthetistName if theatreTime has a value', () => {
      const requiredValidation = {
        ...initialRequiredValidation,
        anaesthetistName: 'Please enter anaesthetist name.'
      }
      delete requiredValidation.nameOfHospital
      const values = { theatreTime: 10, nameOfHospital: [{id: 'hospital id'}] }
      expect(wrapper.instance().validateFormValues(values)).to.deep.equal(requiredValidation)
    })

    it('does not return a requirement property for anaesthetistName if theatreTime and anaesthetistCost has no value', () => {
      const requiredValidation = {
        ...initialRequiredValidation
      }
      delete requiredValidation.nameOfHospital
      const values = { theatreTime: 0, anaesthetistCost: 0, nameOfHospital: [{id: 'hospital id'}] }
      expect(wrapper.instance().validateFormValues(values)).to.deep.equal(requiredValidation)
    })

    it('returns a requirement property for anaesthetistName if theatreTime has no value but  anaesthetistCost has a value', () => {
      const requiredValidation = {
        ...initialRequiredValidation,
        anaesthetistName: 'Please enter anaesthetist name.'
      }
      delete requiredValidation.nameOfHospital
      const values = { theatreTime: 0, anaesthetistCost: 1, nameOfHospital: [{id: 'hospital id'}] }
      expect(wrapper.instance().validateFormValues(values)).to.deep.equal(requiredValidation)
    })

    it('returns a requirement property for ReferralLetterCounts if ReferralLetterCounts has a value less than 1', () => {
      const values = { ReferralLetterCounts: 0 }
      const requiredValidation = { ...initialRequiredValidation }
      expect(wrapper.instance().validateFormValues(values)).to.deep.equal(requiredValidation)
    })

    it('does not return a requirement property for ReferralLetterCounts if ReferralLetterCounts has a value not less than 1', () => {
      const values = { ReferralLetterCounts: 1 }
      const requiredValidation = { ...initialRequiredValidation }
      delete requiredValidation.ReferralLetterCounts
      expect(wrapper.instance().validateFormValues(values)).to.deep.equal(requiredValidation)
    })

    it('returns a requirement property for SpecialistReportCounts if SpecialistReportCounts has a value less than 1', () => {
      const values = { SpecialistReportCounts: 0 }
      const requiredValidation = { ...initialRequiredValidation }
      expect(wrapper.instance().validateFormValues(values)).to.deep.equal(requiredValidation)
    })

    it('does not return a requirement property for SpecialistReportCounts if SpecialistReportCounts has a value not less than 1', () => {
      const values = { SpecialistReportCounts: 1 }
      const requiredValidation = { ...initialRequiredValidation }
      delete requiredValidation.SpecialistReportCounts
      expect(wrapper.instance().validateFormValues(values)).to.deep.equal(requiredValidation)
    })

    it('returns a requirement property for declarationAgree if declarationAgree has a value not equal to true', () => {
      const values = { declarationAgree: false }
      const requiredValidation = { ...initialRequiredValidation }
      expect(wrapper.instance().validateFormValues(values)).to.deep.equal(requiredValidation)
    })

    it('does not return a requirement property for declarationAgree if declarationAgree has a value equal to true', () => {
      const values = { declarationAgree: true }
      const requiredValidation = { ...initialRequiredValidation }
      delete requiredValidation.declarationAgree
      expect(wrapper.instance().validateFormValues(values)).to.deep.equal(requiredValidation)
    })

    // +todo: require two tests to check that under the correct conditions validateOtherProcedures is or isn't called
    it('does not call validateOtherProcedures if there are no otherProcedure values', () => {
      const values = {}
      expect(spyValidateOtherProcedures.callCount).to.equal(0)
      wrapper.instance().validateFormValues(values)
      expect(spyValidateOtherProcedures.callCount).to.equal(0)
    })

    it('does not call validateOtherProcedures if there otherProcedure is empty', () => {
      const values = {
        otherProcedures: []
      }
      expect(spyValidateOtherProcedures.callCount).to.equal(0)
      wrapper.instance().validateFormValues(values)
      expect(spyValidateOtherProcedures.callCount).to.equal(0)
    })

    it('calls validateOtherProcedures if there are no nameOfSpecialist', () => {
      const values = {
        otherProcedures: [{
          otherProcedure: [{ id: 'some id' }]
        }]
      }
      expect(spyValidateOtherProcedures.callCount).to.equal(0)
      wrapper.instance().validateFormValues(values)
      expect(spyValidateOtherProcedures.callCount).to.equal(1)
    })

    it('calls validateOtherProcedures if there are no otherProcedure', () => {
      const values = {
        otherProcedures: [{
          nameOfSpecialist: [{ id: 'some id' }]
        }]
      }
      expect(spyValidateOtherProcedures.callCount).to.equal(0)
      wrapper.instance().validateFormValues(values)
      expect(spyValidateOtherProcedures.callCount).to.equal(1)
    })

    it('calls findDuplicates if there are nameOfSpecialist and otherProcedure', () => {
      const values = {
        otherProcedures: [{
          nameOfSpecialist: [{ id: 'specialist' }],
          otherProcedure: [{ id: 'procedure' }]
        }]
      }
      expect(spyFindDuplicates.callCount).to.equal(0)
      wrapper.instance().validateFormValues(values)
      expect(spyFindDuplicates.callCount).to.equal(1)
    })
  })

  // -todo: Missing tests for not returning requirement properties for documentBundleId, accRelated, policyMemberDetails,
  //       policyMemberDetails.PolicyId, policyMemberDetails.dateOfBirth, location, associatedCosts, associatedCosts.Cost,
  //       associatedCosts.serviceProviderId(one of hospital/ service / etc will be required)
  //       (NOTE: These are missing validations in the code under test)
  // --------------------------------------------------------------------------
  // Confirm this with Tom: associatedCosts.serviceProviderId(one of hospital/ service / etc will be required)
  // --------------------------------------------------------------------------

  describe('validateSupplimentalFormValues', () => {
    const initialRequiredValidation = {
      associatedCosts: true,
      dob: true,
      documentBundleId: true,
      location: true,
      policyId: true
    }

    it('returns requirement properties for all properties that are required by default', () => {
      const values = {}
      console.log('wrapper', wrapper)
      expect(wrapper.instance().validateSupplimentalFormValues(values)).to.deep.equal(initialRequiredValidation)
    })

    it('returns a requirement property for documentBundleId if documentBundleId is not defined', () => {
      const values = {}
      const requiredValidation = { ...initialRequiredValidation }
      wrapper.setProps({ requestPreApproval: 'a' })
      expect(wrapper.instance().validateSupplimentalFormValues(values)).to.deep.equal(requiredValidation)
      wrapper.setProps({ requestPreApproval: { docBundle: 'a' } })
      expect(wrapper.instance().validateSupplimentalFormValues(values)).to.deep.equal(requiredValidation)
    })

    it('does not return a requirement property for documentBundleId if documentBundleId has a value', () => {
      const values = {}
      const requiredValidation = { ...initialRequiredValidation }
      delete requiredValidation.documentBundleId
      wrapper.setProps({ requestPreApproval: { docBundle: { id: 'a' } } })
      expect(wrapper.instance().validateSupplimentalFormValues(values)).to.deep.equal(requiredValidation)
    })

    it('returns a requirement property for policyId if policyId is not defined', () => {
      const values = {}
      const requiredValidation = { ...initialRequiredValidation }
      wrapper.setProps({ requestPreApproval_verifyPolicy: 'a' })
      expect(wrapper.instance().validateSupplimentalFormValues(values)).to.deep.equal(requiredValidation)
    })

    it('does not return a requirement property for policyId if policyId has a value', () => {
      const values = {}
      const requiredValidation = { ...initialRequiredValidation }
      delete requiredValidation.policyId
      wrapper.setProps({ requestPreApproval_verifyPolicy: { policyId: 'a' } })
      expect(wrapper.instance().validateSupplimentalFormValues(values)).to.deep.equal(requiredValidation)
    })

    it('returns a requirement property for dob if dob is not defined', () => {
      const values = {}
      const requiredValidation = { ...initialRequiredValidation }
      wrapper.setProps({ requestPreApproval_verifyPolicy: 'a' })
      expect(wrapper.instance().validateSupplimentalFormValues(values)).to.deep.equal(requiredValidation)
    })

    it('does not return a requirement property for dob if dob has a value', () => {
      const values = {}
      const requiredValidation = { ...initialRequiredValidation }
      delete requiredValidation.dob
      wrapper.setProps({ requestPreApproval_verifyPolicy: { dob: 'a' } })
      expect(wrapper.instance().validateSupplimentalFormValues(values)).to.deep.equal(requiredValidation)
    })

    it('does not return a requirement property for location if location has a valid value', () => {
      let values = {}
      const requiredValidation = { ...initialRequiredValidation }
      delete requiredValidation.location
      values = { location: 'No' }
      expect(wrapper.instance().validateSupplimentalFormValues(values)).to.deep.equal(requiredValidation)
      values = { location: 'NotAvailable' }
      expect(wrapper.instance().validateSupplimentalFormValues(values)).to.deep.equal(requiredValidation)
      values = { location: 'Yes' }
      expect(wrapper.instance().validateSupplimentalFormValues(values)).to.deep.equal(requiredValidation)
    })

    it('returns a requirement property for associatedCosts if only specialistCost is defined', () => {
      let values = { specialistCost: 123 }
      const requiredValidation = { ...initialRequiredValidation }
      expect(wrapper.instance().validateSupplimentalFormValues(values)).to.deep.equal(requiredValidation)
    })

    it('returns a requirement property for associatedCosts if only nameOfSpecialist is defined', () => {
      let values = { nameOfSpecialist: [{ id: 'a' }] }
      const requiredValidation = { ...initialRequiredValidation }
      expect(wrapper.instance().validateSupplimentalFormValues(values)).to.deep.equal(requiredValidation)
    })

    it('returns a requirement property for associatedCosts if only nameOfSpecialist is not valid', () => {
      let values = {}
      const requiredValidation = { ...initialRequiredValidation }
      values = { specialistCost: 123, nameOfSpecialist: [] }
      expect(wrapper.instance().validateSupplimentalFormValues(values)).to.deep.equal(requiredValidation)
      values = { specialistCost: 123, nameOfSpecialist: null }
      expect(wrapper.instance().validateSupplimentalFormValues(values)).to.deep.equal(requiredValidation)
      values = { specialistCost: 123, nameOfSpecialist: ''}
      expect(wrapper.instance().validateSupplimentalFormValues(values)).to.deep.equal(requiredValidation)
    })

    it('does not return a requirement property for associatedCosts if specialistCost and nameOfspecialist are defined', () => {
      let values = { specialistCost: 123, nameOfSpecialist: [{ id: 'a' }] }
      const requiredValidation = { ...initialRequiredValidation }
      delete requiredValidation.associatedCosts
      expect(wrapper.instance().validateSupplimentalFormValues(values)).to.deep.equal(requiredValidation)
    })

  })

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
      values = { otherProcedures: [] }
      expect(wrapper.instance().validateOtherProcedures(values)).to.deep.equal({
        otherProcedures: []
      })
    })

    // +todo: test empty string for nameOfSpecialist
    it('requires nameOfSpecialist for each other procedure', () => {
      let values = {
        otherProcedures: [
          {
            otherProcedure: [{ id: '222' }],
            specialistCost: 1
          }
        ]
      }
      expect(wrapper.instance().validateOtherProcedures(values)).to.deep.equal({
        otherProcedures: [
          {
            nameOfSpecialist: 'Please enter name of specialist.'
          }
        ]
      })

      values = {
        otherProcedures: [
          {
            otherProcedure: [{ id: '222' }],
            specialistCost: 1
          },
          {
            otherProcedure: [{ id: '333' }],
            specialistCost: 1
          },
          {
            otherProcedure: [{ id: '444' }],
            specialistCost: 1,
            nameOfSpecialist: []
          },
          {
            otherProcedure: [{ id: '555' }],
            specialistCost: 1,
            nameOfSpecialist: ''
          },
          {
            otherProcedure: [{ id: '666' }],
            specialistCost: 1,
            nameOfSpecialist: [{ id: 'aaa' }]
          }
        ]
      }
      expect(wrapper.instance().validateOtherProcedures(values)).to.deep.equal({
        otherProcedures: [
          {
            nameOfSpecialist: 'Please enter name of specialist.'
          },
          {
            nameOfSpecialist: 'Please enter name of specialist.'
          },
          {
            nameOfSpecialist: 'Please enter name of specialist.'
          },
          {
            nameOfSpecialist: 'Please enter name of specialist.'
          },
          {}
        ]
      })
    })

    it('requires specialistCost for each other procedure', () => {
      let values = {
        otherProcedures: [
          {
            otherProcedure: [{ id: '222' }],
            nameOfSpecialist: [{ id: 'aaa' }]
          }
        ]
      }
      expect(wrapper.instance().validateOtherProcedures(values)).to.deep.equal({
        otherProcedures: [
          {
            specialistCost: 'Please enter specialist cost.'
          }
        ]
      })

      values = {
        otherProcedures: [
          {
            otherProcedure: [{ id: '222' }],
            nameOfSpecialist: [{ id: 'aaa' }]
          },
          {
            otherProcedure: [{ id: '444' }],
            nameOfSpecialist: [{ id: 'aaa' }]
          },
          {
            otherProcedure: [{ id: '666' }],
            nameOfSpecialist: [{ id: 'aaa' }],
            specialistCost: 0
          },
          {
            otherProcedure: [{ id: '888' }],
            nameOfSpecialist: [{ id: 'aaa' }],
            specialistCost: 1
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
          },
          {
            specialistCost: 'Please enter specialist cost.'
          },
          {}
        ]
      })
    })

    it('requires specialistCost cannot be a zero for each other procedure', () => {
      let values = {
        otherProcedures: [
          {
            otherProcedure: [{ id: '111' }],
            nameOfSpecialist: [{ id: 'aaa' }],
            specialistCost: 1
          },
          {
            otherProcedure: [{ id: '222' }],
            nameOfSpecialist: [{ id: 'aaa' }],
            specialistCost: 234
          },
          {
            otherProcedure: [{ id: '333' }],
            nameOfSpecialist: [{ id: 'aaa' }],
            specialistCost: 0
          },
          {
            otherProcedure: [{ id: '444' }],
            nameOfSpecialist: [{ id: 'aaa' }],
            specialistCost: 1
          },
          {
            otherProcedure: [{ id: '555' }],
            nameOfSpecialist: [{ id: 'aaa' }],
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
            otherProcedure: [{ id: '222' }],
            nameOfSpecialist: [{ id: 'aaa' }]
          },
          {
            otherProcedure: [{ id: '444' }],
            nameOfSpecialist: [{ id: 'aaa' }]
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
            nameOfSpecialist: [{ id: 'aaa' }],
            specialistCost: 1
          },
          {
            otherProcedure: [{ id: '999' }],
            nameOfSpecialist: [{ id: 'aaa' }],
            specialistCost: 1
          },
          {
            otherProcedure: [{ id: '999' }],
            nameOfSpecialist: [{ id: 'aaa' }],
            specialistCost: 1
          },
          {
            otherProcedure: [{ id: '222' }],
            nameOfSpecialist: [{ id: 'aaa' }],
            specialistCost: 1
          }
        ]
      }
      expect(wrapper.instance().validateOtherProcedures(values)).to.deep.equal({
        otherProcedures: [
          {},
          {},
          {
            nameOfSpecialist: 'This procedure already exist.'
          },
          {
            nameOfSpecialist: 'This procedure already exist.'
          }
        ]
      })
    })

    it('validates that otherProcedures does not have the same procedure & specialist as primary procedure', () => {
      let values = {
        primaryProcedure: [{
          id: '222'
        }],
        nameOfSpecialist: [{ id: 'aaa' }],
        otherProcedures: [
          {
            otherProcedure: [{ id: '222' }],
            nameOfSpecialist: [{ id: 'aaa' }],
            specialistCost: 1
          },
          {
            otherProcedure: [{ id: '222' }],
            nameOfSpecialist: [{ id: 'bbb' }],
            specialistCost: 1
          },
          {
            otherProcedure: [{ id: '999' }],
            nameOfSpecialist: [{ id: 'aaa' }],
            specialistCost: 1
          },
          {
            otherProcedure: [{ id: '222' }],
            nameOfSpecialist: [{ id: 'aaa' }],
            specialistCost: 1
          }
        ]
      }
      expect(wrapper.instance().validateOtherProcedures(values)).to.deep.equal({
        otherProcedures: [
          {
            nameOfSpecialist: 'This procedure already exist.'
          },
          {},
          {},
          {
            nameOfSpecialist: 'This procedure already exist.'
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
        nameOfSpecialist: [{ id: 'aaa' }],
        otherProcedures: [
          {
            otherProcedure: [{ id: '222' }],
            nameOfSpecialist: [{ id: 'bbb' }]
          },
          {
            otherProcedure: [{ id: '222' }],
            nameOfSpecialist: [{ id: 'ccc' }],
            specialistCost: 0
          },
          {
            otherProcedure: [{ id: '222' }],
            nameOfSpecialist: [{ id: 'ddd' }],
            specialistCost: 1
          },
          {
            otherProcedure: [{ id: '888' }],
            nameOfSpecialist: [{ id: 'aaa' }],
            specialistCost: 0
          },
          {
            otherProcedure: [{ id: '999' }],
            nameOfSpecialist: [{ id: 'aaa' }],
            specialistCost: 1
          }
        ]
      }
      expect(wrapper.instance().validateOtherProcedures(values)).to.deep.equal({
        otherProcedures: [
          {},
          {},
          {},
          { specialistCost: 'Please enter specialist cost.' },
          {}
        ]
      })
    })
    // +todo: duplicate test with the one above?
    // ------------------------------------------------------------------------
    // #removed
    // ------------------------------------------------------------------------
  })

  // +todo: unit tests to check 'formSubmit' function
  // +todo: separate concerns in formSubmit to facilitate unit tests - highly recommended

  describe('formSubmit', () => {
    const sandbox = sinon.sandbox.create()
    const spyFormSubmit = sinon.spy(RequestPreApproval.prototype, 'formSubmit')
    const spyValidateFormValues = sinon.spy(RequestPreApproval.prototype, 'validateFormValues')
    const spyGetFormData = sinon.spy(RequestPreApproval.prototype, 'getFormData')
    const spyFormSubmitSuccess = sinon.spy()
    const spyFormSubmitError = sinon.spy()
    let stub

    beforeEach(() => {
      stub = sandbox.stub(request, 'default')
      props = {
        cssName: 'request-pre-approval',
        currentProviderName: undefined,
        requestPreApproval: {
          currentProviderServiceType: '',
          docBundle: {},
          isValid: undefined
        },
        currentProviderLinks: [],
        requestPreApproval_verifyPolicy: {},
        formSubmitSuccess: spyFormSubmitSuccess,
        formSubmitError: spyFormSubmitError
      }
      wrapper = shallow(<RequestPreApproval {...props} />)
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
        proposedDateOfProcedure: '11/11/1111',
        dateOfOnset: '11/11/1111',
        nameOfSpecialist: [{ id: 'some id' }],
        accRelated: 'No',
        ReferralLetterCounts: 1,
        SpecialistReportCounts: 1,
        declarationAgree: true,
        primaryProcedure: [{ id: 'some id' }],
        nameOfHospital: [{ id: 'hospital' }]
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
        proposedDateOfProcedure: '11/11/1111',
        dateOfOnset: '11/11/1111',
        nameOfSpecialist: [{ id: 'some id' }],
        accRelated: 'No',
        ReferralLetterCounts: 1,
        SpecialistReportCounts: 1,
        declarationAgree: true,
        nameOfHospital: [{ id: 'hospital' }]
      }
      expect(() => wrapper.instance().formSubmit(values)).to.throw()
      expect(wrapper.state().hasError).to.equal(true)
    })

    // +todo: check that getFormData is called

    it('formSubmit triggers getFormData', () => {
      const values = {
        specialistCost: '123',
        proposedDateOfProcedure: '11/11/1111',
        dateOfOnset: '11/11/1111',
        nameOfSpecialist: [{ id: 'some id' }],
        accRelated: 'No',
        ReferralLetterCounts: 1,
        SpecialistReportCounts: 1,
        declarationAgree: true,
        primaryProcedure: [{ id: 'some id' }],
        nameOfHospital: [{ id: 'hospital' }]
      }
      stub.resolves({ primaryProcedure: 'values' })().then((value) => {})
      expect(spyFormSubmit.callCount).to.equal(0)
      expect(spyGetFormData.callCount).to.equal(0)
      wrapper.instance().formSubmit(values)
      expect(spyFormSubmit.callCount).to.equal(1)
      expect(spyGetFormData.callCount).to.equal(1)
    })

    // -todo: check that link is generated correctly using the create-preapproval rel in this.props.currentProviderLinks

    it('formSubmit generates a link', () => {
      wrapper.setProps({
        currentProviderLinks: [{
          rel: 'create-preapproval',
          url: 'this is a link'
        }]
      })
      const values = {
        specialistCost: '123',
        proposedDateOfProcedure: '11/11/1111',
        dateOfOnset: '11/11/1111',
        nameOfSpecialist: [{ id: 'some id' }],
        accRelated: 'No',
        ReferralLetterCounts: 1,
        SpecialistReportCounts: 1,
        declarationAgree: true,
        primaryProcedure: [{ id: 'some id' }],
        nameOfHospital: [{ id: 'hospital' }]
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
        proposedDateOfProcedure: '11/11/1111',
        dateOfOnset: '11/11/1111',
        nameOfSpecialist: [{ id: 'some id' }],
        accRelated: 'No',
        ReferralLetterCounts: 1,
        SpecialistReportCounts: 1,
        declarationAgree: true,
        primaryProcedure: [{ id: 'some id' }],
        nameOfHospital: [{ id: 'hospital' }]
      }
      stub.resolves({})().then((value) => {})
      expect(wrapper.instance().formSubmit(values)).to.equal(undefined)
    })

    // +todo: check apiRequest is called with correct data

    it('apiREquest is called with correct data', () => {
      wrapper.setProps({
        currentProviderLinks: [{
          rel: 'create-preapproval',
          url: 'this is a link'
        }]
      })
      const values = {
        specialistCost: '123',
        proposedDateOfProcedure: '11/11/1111',
        dateOfOnset: '11/11/1111',
        nameOfSpecialist: [{ id: 'some id' }],
        accRelated: 'No',
        ReferralLetterCounts: 1,
        SpecialistReportCounts: 1,
        declarationAgree: true,
        primaryProcedure: [{ id: 'some id' }],
        nameOfHospital: [{ id: 'hospital' }]
      }
      stub.resolves({ data: 'result' })().then((value) => {})
      wrapper.instance().formSubmit(values).then((value) => {
        expect(value).to.eql({ data: 'result' })
      })
    })

    it('apiRequest can cause an error', () => {
      wrapper.setProps({
        currentProviderLinks: [{
          rel: 'create-preapproval',
          url: 'this is a link'
        }]
      })
      const values = {
        specialistCost: '123',
        proposedDateOfProcedure: '11/11/1111',
        dateOfOnset: '11/11/1111',
        nameOfSpecialist: [{ id: 'some id' }],
        accRelated: 'No',
        ReferralLetterCounts: 1,
        SpecialistReportCounts: 1,
        declarationAgree: true,
        primaryProcedure: [{ id: 'some id' }],
        nameOfHospital: [{ id: 'hospital' }]
      }
      stub.resolves('')().then((value) => {
        expect(wrapper.instance().formSubmit(values)).to.throw
      })
    })

    // +todo: check this.props.formSubmitSuccess is called with 'requestPreApproval'

    it('formSubmit triggers formSubmitSuccess', () => {
      wrapper.setProps({
        currentProviderLinks: [{
          rel: 'create-preapproval',
          url: 'this is a link'
        }]
      })
      const values = {
        specialistCost: '123',
        proposedDateOfProcedure: '11/11/1111',
        dateOfOnset: '11/11/1111',
        nameOfSpecialist: [{ id: 'some id' }],
        accRelated: 'No',
        ReferralLetterCounts: 1,
        SpecialistReportCounts: 1,
        declarationAgree: true,
        primaryProcedure: [{ id: 'some id' }],
        nameOfHospital: [{ id: 'hospital' }]
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
          rel: 'create-preapproval',
          url: 'this is a link'
        }]
      })
      const values = {
        specialistCost: '123',
        proposedDateOfProcedure: '11/11/1111',
        dateOfOnset: '11/11/1111',
        nameOfSpecialist: [{ id: 'some id' }],
        accRelated: 'No',
        ReferralLetterCounts: 1,
        SpecialistReportCounts: 1,
        declarationAgree: true,
        primaryProcedure: [{ id: 'some id' }],
        nameOfHospital: [{ id: 'hospital' }]
      }
      stub.resolves({ data: false })().then((value) => {
        return value
      })
      wrapper.instance().formSubmit(values).then((value) => {
        expect(wrapper.instance().formSubmit(values)).to.throw
      })
    })

    // +todo: check that if apiRequest throws any error then this.props.formSubmitError is called with 'requestPreApproval'

    it('formSubmit triggers formSubmitError upon catching the thrown error', () => {
      wrapper.setProps({
        currentProviderLinks: [{
          rel: 'create-preapproval',
          url: 'this is a link'
        }]
      })
      const values = {
        specialistCost: '123',
        proposedDateOfProcedure: '11/11/1111',
        dateOfOnset: '11/11/1111',
        nameOfSpecialist: [{ id: 'some id' }],
        accRelated: 'No',
        ReferralLetterCounts: 1,
        SpecialistReportCounts: 1,
        declarationAgree: true,
        primaryProcedure: [{ id: 'some id' }],
        nameOfHospital: [{ id: 'hospital' }]
      }
      stub.rejects({})().catch((value) => {})
      expect(spyFormSubmitError.callCount).to.equal(0)
      wrapper.instance().formSubmit(values).catch((value) => {
        expect(spyFormSubmitError.callCount).to.equal(1)
      })
    })
  })
})

describe('(View) RequestPreApproval - mount', () => {
  let wrapper
  let props
  let state

  const spyFormReset = sinon.spy()

  beforeEach(() => {
    props = {
      cssName: 'request-pre-approval',
      currentProviderName: 'Testing Tester',
      requestPreApproval: {
        currentProviderServiceType: '',
        isValid: undefined,
        docBundle: {}
      },
      currentProviderLinks: 'link',
      requestPreApproval_verifyPolicy: {
        isValid: true
      },
      docBundle: {},
      handleSubmit: () => {},
      formReset: spyFormReset,
      getFormData: () => {},
      validateFormValues: () => {},
      validateOtherProcedures: () => {}
    }
    state = {
      hasError: false
    }
  })

  afterEach(() => {
    spyFormReset.reset()
    ModuleStub.momentLocalizer.reset()
    ModuleStub.momentLocalizer.restore()
  })

  // +todo: add describe block for componentWillUnmount with test that tests formReset called with arg requestPrepproval
  describe('componentWillUnmount', () => {
    it('calls formReset with argument "requestPrepproval"', () => {
      const spyComponentWillUnmount = sinon.spy(RequestPreApproval.prototype, 'componentWillUnmount')
      expect(spyComponentWillUnmount.callCount).to.equal(0)
      wrapper = mount(<ReduxFormStub>
        <RequestPreApprovalReduxForm {...props} {...state} />
      </ReduxFormStub>)
      expect(spyComponentWillUnmount.callCount).to.equal(0)
      wrapper.unmount()
      expect(spyComponentWillUnmount.callCount).to.equal(1)
      expect(spyFormReset.withArgs('requestPreApproval').callCount).to.equal(1)
      spyComponentWillUnmount.reset()
    })
  })

  // +todo: add describe block for componentWillMount with test that tests momentLocalizer called with argument Moment
  describe('componentWillMount', () => {
    it('calls momentLocalizer with argument Moment', () => {
      const spyComponentWillMount = sinon.spy(RequestPreApproval.prototype, 'componentWillMount')
      expect(spyComponentWillMount.callCount).to.equal(0)
      expect(ModuleStub.momentLocalizer.callCount).to.equal(0)
      wrapper = mount(<ReduxFormStub>
        <RequestPreApprovalReduxForm {...props} {...state} />
      </ReduxFormStub>)
      expect(spyComponentWillMount.callCount).to.equal(1)
      expect(ModuleStub.momentLocalizer.withArgs(Moment).callCount).to.equal(1)
      spyComponentWillMount.reset()
    })
  })
})
