import AssociatedCosts from './AssociatedCosts'
import AttachDocuments from './AttachDocuments'
import Button from 'react-bootstrap/lib/Button'
import Col from 'react-bootstrap/lib/Col'
import Declaration from './Declaration'
import Link from 'react-router/lib/Link'
import Moment from 'moment'
import ProcedureCost from './ProcedureCost'
import React from 'react'
import Row from 'react-bootstrap/lib/Row'
import Submitted from './Submitted'
import VerifyPolicy from './VerifyPolicy'
import apiRequest from 'utils/request'
import find from 'ramda/src/find'
import momentLocalizer from 'react-widgets/lib/localizers/moment'
import propEq from 'ramda/src/propEq'
import { SubmissionError, reduxForm } from 'redux-form'
import { checkObjectIsEmpty, localeDateToIsoDate } from 'utils/helpers'

export class RequestPreApproval extends React.Component {
  constructor (props) {
    super(props)
    this.formSubmit = this.formSubmit.bind(this)
    this.getFormData = this.getFormData.bind(this)
    this.validateFormValues = this.validateFormValues.bind(this)
    this.validateOtherProcedures = this.validateOtherProcedures.bind(this)
    this.wordingVersion = '00000000-0000-0000-00000000000000000'
    this.state = {
      hasError: false
    }
  }

  componentWillMount () {
    momentLocalizer(Moment)
  }

  componentWillUnmount () {
    this.props.formReset('requestPreApproval')
  }

  findDuplicates (item, blacklist) {
    const currentOtherProcedureId = (
      Boolean(item.otherProcedure) &&
      item.otherProcedure.length > 0 &&
      item.otherProcedure[0].id
    )
    const currentSpecialistId = (
      Boolean(item.nameOfSpecialist) &&
      item.nameOfSpecialist.length > 0 &&
      item.nameOfSpecialist[0].id
    )
    const match = blacklist.findIndex((x) => {
      return x.otherProcedureId === currentOtherProcedureId &&
        x.specialistId === currentSpecialistId
    })
    if (match !== -1) { return true }
    blacklist.push({
      otherProcedureId: currentOtherProcedureId,
      specialistId: currentSpecialistId
    })
    return false
  }

  validateOtherProcedures (values) {
    console.log('values.primaryProcedure', values.primaryProcedure)
    console.log('validate.otherProcedures', values.otherProcedures)
    let blacklist = []
    let otherProcedureValidators = {
      otherProcedures: []
    }

    const primaryProcedureId = (Boolean(values.primaryProcedure) &&
      values.primaryProcedure.length > 0 &&
      values.primaryProcedure[0].id)

    const specialistId = (Boolean(values.nameOfSpecialist) &&
      values.nameOfSpecialist.length > 0 &&
      values.nameOfSpecialist[0].id)

    if (Boolean(primaryProcedureId) && Boolean(specialistId)) {
      blacklist.push({
        otherProcedureId: primaryProcedureId,
        specialistId: specialistId
      })
    }

    Boolean(values.otherProcedures) &&
    values.otherProcedures.forEach((item, index) => {
      console.log('ITEM?!?!?!?!?!?: ', item)
      otherProcedureValidators.otherProcedures[index] = {
        ...(
          (
            Boolean(item.otherProcedure) === false ||
            Boolean(item.otherProcedure.length < 1) ||
            Boolean(item.otherProcedure[0].id) === false ||
            primaryProcedureId !== item.otherProcedure[0].id
          ) &&
          Boolean(item.specialistCost) === false &&
          { specialistCost: 'Please enter specialist cost.' }
        ),
        ...(
          (
            Boolean(item.otherProcedure) === false ||
            Boolean(item.otherProcedure.length < 1) ||
            Boolean(item.otherProcedure[0].id) === false
          ) &&
          { otherProcedure: 'Please select other procedure.' }
        ),
        ...(
          (
            Boolean(item.nameOfSpecialist) === false ||
            Boolean(item.nameOfSpecialist.length < 1) ||
            Boolean(item.nameOfSpecialist[0].id) === false
          ) &&
          { nameOfSpecialist: 'Please enter name of specialist.' }
        ),
        ...(
          (this.findDuplicates(item, blacklist)) &&
          { nameOfSpecialist: 'This procedure already exist.' }
        )
      }
    })
    return otherProcedureValidators
  }

  // +todo: missing validations for documentBundleId, accRelated, (policyMemberDetails, policyMemberDetails.PolicyId, policyMemberDetails.dateOfBirth),
  //       location, associatedCosts, associatedCosts.serviceProviderId (one of hospital/service/etc will be required)
  // --------------------------------------------------------------------------
  // Need clarification on associatedCosts.serviceProviderId (one of hospital/service/etc will be required)
  // --------------------------------------------------------------------------

  validateSupplimentalFormValues (values) {
    return {
      ...(
        (
          Boolean(this.props.requestPreApproval) === false ||
          Boolean(this.props.requestPreApproval.docBundle) === false ||
          Boolean(this.props.requestPreApproval.docBundle.id) === false
        ) &&
        { documentBundleId: true }
      ),
      ...(
        (
          Boolean(this.props.requestPreApproval_verifyPolicy) === false ||
          Boolean(this.props.requestPreApproval_verifyPolicy.policyId) === false
        ) &&
        { policyId: true }
      ),
      ...(
        (
          Boolean(this.props.requestPreApproval_verifyPolicy) === false ||
          Boolean(this.props.requestPreApproval_verifyPolicy.dob) === false
        ) &&
        { dob: true }
      ),
      ...(
        (
          Boolean(values.location) === false ||
          (
            values.location !== 'No' &&
            values.location !== 'NotAvailable' &&
            values.location !== 'Yes'
          )
        ) &&
        { location: true }
      ),
      ...(
        (
          (
            Boolean(values.nameOfSpecialist) === false ||
            Boolean(values.nameOfSpecialist.length < 1) ||
            Boolean(values.nameOfSpecialist[0].id) === false
          ) ||
            Boolean(values.specialistCost) === false
        ) &&
        { associatedCosts: true }
      )
    }
  }

  validateFormValues (values) {
    console.log('VALUES!!!!!!!!!!: ', values)
    let blacklist = []

    const primaryProcedureId = (Boolean(values.primaryProcedure) &&
      values.primaryProcedure.length > 0 &&
      values.primaryProcedure[0].id)

    const specialistId = (Boolean(values.nameOfSpecialist) &&
      values.nameOfSpecialist.length > 0 &&
      values.nameOfSpecialist[0].id)

    if (Boolean(primaryProcedureId) && Boolean(specialistId)) {
      blacklist.push({
        otherProcedureId: primaryProcedureId,
        specialistId: specialistId
      })
    }

    return {
      ...(
        (
          Boolean(values.primaryProcedure) === false ||
          Boolean(values.primaryProcedure.length < 1) ||
          Boolean(values.primaryProcedure[0].id) === false
        ) &&
        { primaryProcedure: 'Please select primary procedure.' }
      ),
      ...(
        (Boolean(values.specialistCost) === false) &&
        { specialistCost: 'Please enter specialist cost.' }
      ),
      ...(
        (Boolean(values.proposedDateOfProcedure) === false) &&
        { proposedDateOfProcedure: 'Please enter proposed date of procedure.' }
      ),
      ...(
        (Boolean(values.dateOfOnset) === false) &&
        { dateOfOnset: 'Please enter date of onset.' }
      ),
      ...(
        (Boolean(values.nameOfSpecialist) === false || values.nameOfSpecialist.length < 1) &&
        (
          Boolean(values.nameOfSpecialist) === false ||
          Boolean(values.nameOfSpecialist.length < 1) ||
          Boolean(values.nameOfSpecialist[0].id) === false
        ) &&
        { nameOfSpecialist: 'Please select name of specialist.' }
      ),
      ...(
        Boolean(values.hospitalTime) &&
        (Boolean(values.sharedRoom) === false) &&
        { sharedRoom: 'Please select shared room.' }
      ),
      ...(
        (
          (Boolean(values.theatreTime) || Boolean(values.hospitalTime)) &&
          Boolean(values.nameOfHospital) &&
          (Boolean(values.nameOfHospital.length > 0) === false ||
          Boolean(values.nameOfHospital[0].id) === false)
        ) &&
        { nameOfHospital: 'Hospital name is not valid.' }
      ),
      ...(
        (Boolean(values.accRelated) === false) &&
          { accRelated: 'Please select is this ACC related.' }
        ),
      ...(
        (values.accRelated === 'Yes' && values.AccLetterCounts < 1) &&
        { AccLetterCounts: 'Please attach ACC letter.' }
      ),
      // +todo: check if anaesthetistName is required if theatreTime is set?
      // ----------------------------------------------------------------------
      // Norman's Acceptance criteria
      // ----------------------------------------------------------------------
      // If Theatre Time is present, or anaesthetist cost is present, then Anaesthetist name is required
      // ----------------------------------------------------------------------
      ...(
        ((values.theatreTime || values.anaesthetistCost) &&
        (!values.anaesthetistName)) &&
        { anaesthetistName: 'Please enter anaesthetist name.' }
      ),
      ...(
        (!values.ReferralLetterCounts) &&
        { ReferralLetterCounts: 'Please attach referral letter.' }
      ),
      ...((!values.SpecialistReportCounts) &&
        { SpecialistReportCounts: 'Please attach specialist report.' }
      ),
      // ----------------------------------------------------------------------
      // Norman's Acceptance criteria
      // ----------------------------------------------------------------------
      // If any two procedures have the same value (primary or any secondaries) , they must have different provider names.
      // If a different provider is listed for any of the other procedures i.e. not the same provider as the primary procedure, then specialist cost is required for that procedure.
      // If the provider name is the same as the primary procedure then procedure cost is optional
      // ----------------------------------------------------------------------
      ...(
        Boolean(values.otherProcedures) &&
        !values.otherProcedures.every(item => {
          return (
            (
              Boolean(item.otherProcedure) &&
              Boolean(item.otherProcedure.length > 0) &&
              Boolean(item.otherProcedure[0].id)
            ) &&
            (
              Boolean(item.nameOfSpecialist) &&
              Boolean(item.nameOfSpecialist.length > 0) &&
              Boolean(item.nameOfSpecialist[0].id)
            ) &&
            (!this.findDuplicates(item, blacklist))
          )
        }) &&
        this.validateOtherProcedures(values)
      ),
      // +todo : check whether the below is redundant or not
      // ----------------------------------------------------------------------
      // ...(
      //   Boolean(values.otherProcedures) &&
      //   values.otherProcedures.length > 0 &&
      //   values.otherProcedures.every(item => {
      //     console.log('item:otherProcedures....', item)
      //     console.log(checkObjectIsEmpty(item))
      //     return (
      //       // Boolean(item.nameOfSpecialist) &&
      //       // item.nameOfSpecialist.length > 0 &&
      //       // item.nameOfSpecialist[0].id &&
      //       Boolean(item.otherProcedure)
      //       // ----------------------------------------------------------------
      //       // Redux Form can return empty array [] even when item is valid
      //       // ----------------------------------------------------------------
      //       // Boolean(checkObjectIsEmpty(item))
      //     )
      //   }) &&
      //   this.validateOtherProcedures(values)
      // ),
      ...(
        (
          Boolean(values.declarationAgree) === false ||
          values.declarationAgree !== true
        ) &&
        { declarationAgree: 'Please tick to confirm that you have read and agreed to the terms in the declaration above.' }
      )
    }
  }

  getFormData (values) {
    const primaryProcedureId = (
      Boolean(values.primaryProcedure) &&
      values.primaryProcedure.length > 0 &&
      values.primaryProcedure[0].id
    )
    const specialistId = (
      Boolean(values.nameOfSpecialist) &&
      values.nameOfSpecialist.length > 0 &&
      values.nameOfSpecialist[0].id
    )
    const hospitalId = (
      Boolean(values.nameOfHospital) &&
      values.nameOfHospital.length > 0 &&
      values.nameOfHospital[0].id
    )
    const prosthesisDescrId = (
      Boolean(values.prosthesisDescr) &&
      values.prosthesisDescr.length > 0 &&
      values.prosthesisDescr[0].id
    )
    const getPrimaryIntervention = () => {
      // Primary procedure
      let primaryIntervention = {
        associatedCosts: [
          {
            type: 'Default',
            claimCostTypeId: 1,
            cost: parseInt(values.specialistCost, 10),
            serviceProviderId: specialistId
          }
        ],
        interventionId: primaryProcedureId,
        location: values.location
      }
      // Operating theatre cost
      Boolean(values.operatingTheatreCost) &&
      primaryIntervention.associatedCosts.push({
        type: 'Default',
        claimCostTypeId: 2,
        cost: parseInt(values.operatingTheatreCost, 10),
        serviceProviderId: specialistId
      })
      // Radiology cost
      Boolean(values.radiologyCost) &&
      primaryIntervention.associatedCosts.push({
        type: 'Default',
        claimCostTypeId: 3,
        cost: parseInt(values.radiologyCost, 10),
        serviceProviderId: specialistId
      })
      // Hospital cost + Hospital values in Primary procedure section
      Boolean(values.hospitalCost) &&
      primaryIntervention.associatedCosts.push({
        type: 'Hospital',
        claimCostTypeId: 4,
        cost: parseInt(values.hospitalCost, 10),
        serviceProviderId: hospitalId,
        hospitalNights: parseInt(values.hospitalTime, 10) || 0,
        theatreMinutes: parseInt(values.theatreTime, 10) || 0,
        isSharedRoom: values.sharedRoom === undefined ? undefined : values.sharedRoom === 'Yes'
      })
      // Prosthesis Cost
      Boolean(values.prosthesisCost) &&
      primaryIntervention.associatedCosts.push({
        type: 'Prosthesis',
        claimCostTypeId: 5,
        cost: parseInt(values.prosthesisCost, 10),
        serviceProviderId: specialistId,
        prosthesisId: prosthesisDescrId
      })
      // Consultation cost
      Boolean(values.consultationCost) &&
      primaryIntervention.associatedCosts.push({
        type: 'Default',
        claimCostTypeId: 8,
        cost: parseInt(values.consultationCost, 10),
        serviceProviderId: specialistId
      })
      // Sundry cost
      Boolean(values.sundryCost) &&
      primaryIntervention.associatedCosts.push({
        type: 'Default',
        claimCostTypeId: 7,
        cost: parseInt(values.sundryCost, 10),
        serviceProviderId: specialistId
      })
      // Anaesthetist Cost
      Boolean(values.anaesthetistCost) &&
      primaryIntervention.associatedCosts.push({
        type: 'Anaesthetist',
        claimCostTypeId: 6,
        cost: parseInt(values.anaesthetistCost, 10),
        serviceProviderId: specialistId,
        anaesthetistName: values.anaesthetistName
      })
      return primaryIntervention
    }
    const getAdditionalInterventions = () => {
      let additionalInterventions = []
      values.otherProcedures.forEach(item => {
        Boolean(item.nameOfSpecialist) &&
        Boolean(item.otherProcedure) &&
        additionalInterventions.push({
          associatedCosts: [{
            type: 'Default',
            claimCostTypeId: 1,
            // +todo : validate specialistCost > 0 in validateOtherProcedures + unit tests
            cost: parseInt(item.specialistCost, 10),
            // +todo : validate nameOfSpecialist[0].id + unit tests
            // ----------------------------------------------------------------
            // See validateSupplimentalFormValues()
            // ----------------------------------------------------------------
            // +todo : recommended: rename 'nameOfSpecialist' to be more accurately descriptive
            // ----------------------------------------------------------------
            // Name of specialist is what is in the UI
            // ----------------------------------------------------------------
            serviceProviderId: item.nameOfSpecialist[0].id
          }],
          // +todo : validate otherProcedure[0].id + unit tests
          // ------------------------------------------------------------------
          // see validateOtherProcedures()
          // ------------------------------------------------------------------
          interventionId: item.otherProcedure[0].id,
          location: 'NotApplicable'
        })
      })
      return additionalInterventions
    }
    return {
      policyMemberDetails: {
        policyId: this.props.requestPreApproval_verifyPolicy.policyId,
        dateOfBirth: this.props.requestPreApproval_verifyPolicy.dob,
        firstName: this.props.requestPreApproval_verifyPolicy.firstName,
        lastName: this.props.requestPreApproval_verifyPolicy.lastName
      },
      proposedDateOfProcedure: localeDateToIsoDate(values.proposedDateOfProcedure),
      dateOfOnset: localeDateToIsoDate(values.dateOfOnset),
      isAccRelated: Boolean((values.accRelated) && values.accRelated === 'Yes'),
      documentBundleId: this.props.requestPreApproval.docBundle.id,
      declaration: {
        hasReadAndAgreedPrivacyDeclaration: values.declarationAgree,
        hasReadAndAgreedDisclosureDeclaration: values.declarationAgree,
        documentBundleId: this.wordingVersion
        // wordingVersion: this.wordingVersion
      },
      // Procedure cost Section + Primary procedure
      primaryIntervention: getPrimaryIntervention(),
      // Associated Costs + Other Procedure
      ...(
        Boolean(values.otherProcedures) &&
        values.otherProcedures.length > 0 &&
        { additionalInterventions: getAdditionalInterventions() }
      )
    }
  }

  formSubmit (values) {
    // ------------------------------------------------------------------------
    // Validate form data
    // ------------------------------------------------------------------------
    console.log('RequestPreApproval:index:formSubmit')
    console.log('reduxForm:values', values)
    console.log('this.props', this.props)
    const err = this.validateFormValues(values)
    console.log('ERROR!!!!!!: ', err)
    if (!checkObjectIsEmpty(err)) {
      console.log('%c FORM SUBMIT ERROR!!!!', 'color: orange', err)
      this.setState({ hasError: true })
      throw new SubmissionError(err)
    }

    this.setState({ hasError: false })
    console.log('%c SUBMIT FORM VIA API - Start', 'color: red')
    // ------------------------------------------------------------------------
    // Prepare formData - No validation errors
    // ------------------------------------------------------------------------
    console.log('reduxForm:values', values)
    console.log('this.props', this.props)
    const formData = this.getFormData(values)
    console.log('formData', formData)
    console.log('%c SUBMIT FORM VIA API - End', 'color: red')
    const link = find(propEq('rel', 'create-preapproval'))(this.props.currentProviderLinks)
    if (!link) { return }
    return apiRequest(link.url, link.method, formData)
      .then(result => {
        if (!(result)) {
          throw new Error()
        }
        console.log('formSubmit:result', result)
        this.props.formSubmitSuccess('requestPreApproval')
      })
      .catch((err) => {
        console.error('formSubmit:apiRequest:err', err)
        this.props.formSubmitError('requestPreApproval', err)
      })
  }

  render () {
    // eslint-disable-next-line no-unused-vars
    const { handleSubmit, error, pristine, reset, submitting } = this.props
    return (
      <section className={`${this.props.cssName}-wrapper`}>
        <div className={`${this.props.cssName}`}>
          <h1 className={`${this.props.cssName}-heading text-center`}>
            Request a pre-approval
          </h1>
          {!this.props.requestPreApproval.isValid &&
            <h2 className={`${this.props.cssName}-subheading text-center`}>
              {this.props.currentProviderName}
            </h2>
          }
          {this.props.requestPreApproval.isValid &&
            <h2 className={`${this.props.cssName}-subheading text-center`}>
              Request submitted
            </h2>
          }
          <hr className={`${this.props.cssName}-heading-hr`} />
          {!this.props.requestPreApproval.isValid &&
            <section className={`${this.props.cssName}__verify-policy-wrapper`}>
              <VerifyPolicy
                {...this.props.requestPreApproval_verifyPolicy}
                showAdditionalFormSection={this.props.showAdditionalFormSection}
                hideAdditionalFormSection={this.props.hideAdditionalFormSection}
                verifyPolicySuccess={this.props.verifyPolicySuccess}
                formReset={this.props.formReset}
                cssName={`${this.props.cssName}__verify-policy`}
              />
            </section>
          }
          {!this.props.requestPreApproval.isValid && this.props.requestPreApproval_verifyPolicy.isValid &&
            <div>
              <hr />
              <section
                className={`${this.props.cssName}__procedure-cost-wrapper`}
              >
                <ProcedureCost
                  {...this.props.requestPreApproval_procedureCost}
                  procedureCostHospitalTime={
                    this.props.procedureCostHospitalTime
                  }
                  procedureCostTheatreTime={this.props.procedureCostTheatreTime}
                  searchTypeahead={this.props.searchTypeahead}
                  cssName={`${this.props.cssName}__procedure-cost`}
                />
              </section>
              <hr />
              <section
                className={`${this.props.cssName}__associated-costs-wrapper`}
              >
                <AssociatedCosts
                  {...this.props.requestPreApproval_associatedCosts}
                  searchProstheses={this.props.searchProstheses}
                  cssName={`${this.props.cssName}__associated-costs`}
                />
              </section>
              <hr />
              <section
                className={`${this.props.cssName}__attach-documents-wrapper`}
              >
                <AttachDocuments
                  {...this.props.requestPreApproval_attachDocuments}
                  cssName={`${this.props.cssName}__attach-documents`}
                />
              </section>
              <hr />
              <section className={`${this.props.cssName}__declaration-wrapper`}>
                <Declaration cssName={`${this.props.cssName}__declaration`} />
              </section>
              {this.state.hasError &&
                <span className={`${this.props.cssName}__error-message`}>
                  Some inconsistency has been detected in the information you have entered on this form.
                  Please scroll up and correct the errors shown
                </span>
              }
              <section className={`${this.props.cssName}-trigger-wrapper`}>
                <Row>
                  <Col xs={12} md={12}>
                    <form onSubmit={handleSubmit(this.formSubmit)}>
                      <Link to='/providerportal/'
                        className={`${this.props.cssName}-trigger is-cancel btn primary-btn`}
                      >
                        Cancel
                      </Link>
                      <Button
                        className={`${this.props.cssName}-trigger is-submit btn primary-btn`}
                        type='submit'
                        disabled={submitting}
                      >
                        <span
                          className={`${this.props.cssName}-trigger-text is-submit`}
                        >
                          Submit
                        </span>
                      </Button>
                    </form>
                  </Col>
                </Row>
              </section>
            </div>
          }
          {this.props.requestPreApproval.isValid &&
            <section
              className={`${this.props.cssName}__submitted-wrapper`}
            >
              <Submitted
                cssName={`${this.props.cssName}__submitted`}
                formReset={this.props.formReset}
              />
            </section>
          }
        </div>
      </section>
    )
  }
}

RequestPreApproval.propTypes = {
  cssName: React.PropTypes.string,
  currentProviderLinks: React.PropTypes.array,
  currentProviderName: React.PropTypes.string,
  formReset: React.PropTypes.func,
  formSubmit: React.PropTypes.func,
  formSubmitError: React.PropTypes.func,
  formSubmitSuccess: React.PropTypes.func,
  handleSubmit: React.PropTypes.func,
  hideAdditionalFormSection: React.PropTypes.func,
  pristine: React.PropTypes.bool,
  procedureCostHospitalTime: React.PropTypes.func,
  procedureCostTheatreTime: React.PropTypes.func,
  requestPreApproval: React.PropTypes.shape({
    docBundle: React.PropTypes.object,
    isValid: React.PropTypes.bool
  }),
  requestPreApproval_associatedCosts: React.PropTypes.object,
  requestPreApproval_attachDocuments: React.PropTypes.object,
  requestPreApproval_procedureCost: React.PropTypes.object,
  requestPreApproval_verifyPolicy: React.PropTypes.object,
  reset: React.PropTypes.func,
  searchProstheses: React.PropTypes.func,
  searchTypeahead: React.PropTypes.func,
  showAdditionalFormSection: React.PropTypes.func,
  submitting: React.PropTypes.bool,
  verifyPolicySuccess: React.PropTypes.func
}

RequestPreApproval.defaultProps = {
  cssName: 'request-pre-approval'
}

export const validate = values => {
  console.log('values:validate:index:requestPreApproval', values)
  const errors = {}
  if (values.specialistCost && (values.specialistCost < 1)) {
    errors.specialistCost = 'Please enter specialist cost.'
  }
  if (values.anaesthetistCost && (values.anaesthetistCost > 0) && !values.anaesthetistName) {
    errors.anaesthetistName = 'Please enter anaesthetist name.'
  } else if (values.anaesthetistName && values.anaesthetistName.length > 50) {
    errors.anaesthetistName = 'Must be 50 characters or less.'
  }
  if (values.prosthesisCost && (values.prosthesisCost > 0) &&
    (!values.prosthesisDescr || values.prosthesisDescr.length === 0)
  ) {
    errors.prosthesisDescr = 'Please enter prothesis description.'
  }
  if (Boolean(values.hospitalTime) && !values.sharedRoom) {
    errors.sharedRoom = 'Please select shared room.'
  }
  if (values.sharedRoom === 'Yes' && !values.hospitalTime) {
    errors.hospitalTime = 'Please enter hospital time.'
  }
  if ((Boolean(values.hospitalTime) || Boolean(values.theatreTime) || (values.sharedRoom === 'Yes')) && (Boolean(values.nameOfHospital) === false)) {
    errors.nameOfHospital = 'Please select hospital name.'
  }
  if (Boolean(values.theatreTime) && (Boolean(values.operatingTheatreCost) === false)) {
    errors.totalCostErr = 'Please enter operating theatre cost.'
  }
  if (Boolean(values.operatingTheatreCost) && (Boolean(values.theatreTime) === false)) {
    errors.theatreTime = 'Please enter theatre time.'
  }
  if (Boolean(values.hospitalTime) && (Boolean(values.hospitalCost) === false)) {
    errors.totalCostErr = 'Please enter hospital cost.'
  }
  if (Boolean(values.hospitalCost) && (Boolean(values.hospitalTime) === false)) {
    errors.hospitalTime = 'Please enter hospital time.'
  }
  if (Boolean(values.nameOfHospital &&
      values.nameOfHospital.length > 0 &&
      Boolean(values.nameOfHospital[0].id)) &&
      ((Boolean(values.hospitalTime) === false) && (Boolean(values.theatreTime) === false))) {
    errors.hospitalTime = 'Please enter hospital or theatre time.'
    errors.theatreTime = 'Please enter hospital or theatre time.'
  }
  if (
    Boolean(values.proposedDateOfProcedure) &&
    !Moment(values.proposedDateOfProcedure).isAfter(Moment().subtract(1, 'days'))
  ) {
    errors.proposedDateOfProcedure = 'Proposed date of procedure is not valid.'
  }
  if (
    Boolean(values.dateOfOnset) &&
    !Moment(values.dateOfOnset).isBefore(Moment())
  ) {
    errors.dateOfOnset = 'Date of onset is not valid.'
  }
  return errors
}

export const warn = values => {
  console.log('values:warn:index:requestPreApproval', values)
  const warnings = {}
  if (
    values.proposedDateOfProcedure &&
    Moment(values.proposedDateOfProcedure).format('X') - Moment().format('X') < 345600
  ) {
    warnings.proposedDateOfProcedure = ['Your procedure is taking place within 5 working days,', ' please complete the pre-approval and call our Claims Team on', ' 0800 123 642.']
  }
  return warnings
}

const RequestPreApprovalReduxForm = reduxForm({
  form: 'requestPreApproval',
  validate,
  warn
})(RequestPreApproval)

export default RequestPreApprovalReduxForm
