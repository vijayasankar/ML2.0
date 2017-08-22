import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'
import { sumOfFormSelectorWithTwoDecimalsFieldsObject} from 'utils/helpers'
import {
  formReset,
  formSubmit,
  formSubmitError,
  formSubmitSuccess,
  loadRequestPaymentCostList,
  verifyPreApprovalSuccess
} from 'modules/actions'
import RequestPayment from './components/index.js'

const mapDispatchToProps = {
  formReset,
  formSubmit,
  formSubmitError,
  formSubmitSuccess,
  loadRequestPaymentCostList,
  verifyPreApprovalSuccess
}

const mapStateToProps = (state) => {
  const formSelector = formValueSelector('requestPayment')
  const accRelated = formSelector(state, 'accRelated')
  const primaryProcedure = formSelector(state, 'primaryProcedure')
  const getTotalCost = (...formFields) => {
    const formSelectorFields = formSelector(state, ...formFields)
    let total = sumOfFormSelectorWithTwoDecimalsFieldsObject(formSelectorFields, ['claimCostTypeId'])
    return total
  }
  return ({
    currentProviderId: state.myProviders.currentProviderDetails.id,
    currentProviderName: state.myProviders.currentProviderDetails.name,
    currentProviderLinks: state.myProviders.currentProviderDetails.links,
    requestPayment: {
      currentProviderServiceType: state.myProviders.currentProviderDetails.serviceTypes[0],
      docBundle: state.requestPayment.docBundle,
      isValid: state.requestPayment.isValid
    },
    requestPayment_preApproval: {
      isValid: state.requestPayment_preApproval.isValid,
      links: state.claimsHome.links,
      preApprovalNumber: state.requestPayment_preApproval.preApprovalNumber,
      query: state.location.query,
      name: state.requestPayment_preApproval.name,
      dob: state.requestPayment_preApproval.dob,
      proposedDateOfProcedure: state.requestPayment_preApproval.proposedDateOfProcedure,
      err: {
        preApprovalNumber: {
          isError: state.requestPayment_preApproval.err.preApprovalNumber.isError,
          message: state.requestPayment_preApproval.err.preApprovalNumber.message
        },
        dob: {
          isError: state.requestPayment_preApproval.err.dob.isError,
          message: state.requestPayment_preApproval.err.dob.message
        }
      }
    },
    requestPayment_costsForAnaesthetist: {
      links: state.claimsHome.links,
      totalCost: getTotalCost(
        'timeBaseUnitsCost',
        'timeUnitsCost',
        'modifyingUnitsCost'
      )
    },
    requestPayment_costsForHospital: {
      links: state.claimsHome.links,
      list: state.requestPayment_costs.list,
      primaryProcedure: primaryProcedure,
      totalCost: getTotalCost(
        'operatingTheatreCost',
        'radiologyCost',
        'hospitalCost',
        'specialistCost',
        'consultationCost',
        'anaesthetistCost',
        'prosthesisCost',
        'otherCosts',
        'otherProcedures'
      )
    },
    requestPayment_costsForSpecialist: {
      links: state.claimsHome.links,
      list: state.requestPayment_costs.list,
      primaryProcedure: primaryProcedure,
      totalCost: getTotalCost(
        'specialistCost',
        'consultationCost',
        'prosthesisCost',
        'otherCosts',
        'otherProcedures'
      )
    },
    requestPayment_attachDocuments: {
      docBundle: state.requestPayment.docBundle,
      isAccRelated: accRelated === 'Yes'
    }
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestPayment)
