import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'
import { sumOfFormSelectorFieldsObject } from 'utils/helpers'
import {
  formReset,
  formSubmit,
  formSubmitError,
  formSubmitSuccess,
  hideAdditionalFormSection,
  searchProstheses,
  searchTypeahead,
  showAdditionalFormSection,
  verifyPolicySuccess
} from 'modules/actions'
import RequestPreApproval from './components/index.js'

const mapDispatchToProps = {
  formReset,
  formSubmit,
  formSubmitError,
  formSubmitSuccess,
  hideAdditionalFormSection,
  searchProstheses,
  searchTypeahead,
  showAdditionalFormSection,
  verifyPolicySuccess
}

const mapStateToProps = (state) => {
  const formSelector = formValueSelector('requestPreApproval')
  const accRelated = formSelector(state, 'accRelated')
  const nameOfSpecialist = formSelector(state, 'nameOfSpecialist')
  const primaryProcedure = formSelector(state, 'primaryProcedure')
  const getTotalCost = (...formFields) => {
    const formSelectorFields = formSelector(state, ...formFields)
    let total = sumOfFormSelectorFieldsObject(formSelectorFields, ['claimCostTypeId'])
    return (total) || 0
  }
  return ({
    currentProviderId: state.myProviders.currentProviderDetails.id,
    currentProviderName: state.myProviders.currentProviderDetails.name,
    currentProviderLinks: state.myProviders.currentProviderDetails.links,
    requestPreApproval: {
      docBundle: state.requestPreApproval.docBundle,
      isValid: state.requestPreApproval.isValid
    },
    requestPreApproval_verifyPolicy: {
      dob: state.requestPreApproval_verifyPolicy.dob,
      firstName: state.requestPreApproval_verifyPolicy.firstName,
      isValid: state.requestPreApproval_verifyPolicy.isValid,
      lastName: state.requestPreApproval_verifyPolicy.lastName,
      links: state.policiesHome.links,
      policyId: state.requestPreApproval_verifyPolicy.policyId,
      err: {
        policyId: {
          isError: state.requestPreApproval_verifyPolicy.err.policyId.isError,
          message: state.requestPreApproval_verifyPolicy.err.policyId.message
        },
        dob: {
          isError: state.requestPreApproval_verifyPolicy.err.dob.isError,
          message: state.requestPreApproval_verifyPolicy.err.dob.message
        }
      },
      additionalFormSection: {
        policyUser: {
          isShowing: state.requestPreApproval_verifyPolicy.additionalFormSection.policyUser.isShowing,
          list: state.requestPreApproval_verifyPolicy.additionalFormSection.policyUser.list
        },
        policyUserName: {
          isShowing: state.requestPreApproval_verifyPolicy.additionalFormSection.policyUserName.isShowing
        }
      }
    },
    requestPreApproval_procedureCost: {
      currentProvider: state.myProviders.currentProvider,
      currentProviderDetails: state.myProviders.currentProviderDetails,
      links: state.claimsHome.links,
      primaryProcedure: primaryProcedure,
      nameOfSpecialistFormValue: nameOfSpecialist
    },
    requestPreApproval_associatedCosts: {
      prosthesesOptions: state.requestPreApproval_associatedCosts.prosthesesOptions,
      totalCost: getTotalCost(
        'operatingTheatreCost',
        'radiologyCost',
        'hospitalCost',
        'prosthesisCost',
        'consultationCost',
        'sundryCost',
        'anaesthetistCost',
        'specialistCost',
        'otherProcedures'
      )
    },
    requestPreApproval_attachDocuments: {
      docBundle: state.requestPreApproval.docBundle,
      isAccRelated: accRelated === 'Yes'
    }
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestPreApproval)
