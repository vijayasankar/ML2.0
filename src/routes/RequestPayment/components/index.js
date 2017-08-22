import AttachDocumentsForAnaesthetist from './AttachDocumentsForAnaesthetist'
import AttachDocumentsForHospital from './AttachDocumentsForHospital'
import AttachDocumentsForSpecialist from './AttachDocumentsForSpecialist'
import Button from 'react-bootstrap/lib/Button'
import Col from 'react-bootstrap/lib/Col'
import CostsForAnaesthetist from './CostsForAnaesthetist'
import CostsForHospital from './CostsForHospital'
import CostsForSpecialist from './CostsForSpecialist'
import Declaration from './Declaration'
import InvoiceDetailsForAnaesthetist from './InvoiceDetailsForAnaesthetist'
import InvoiceDetailsForHospital from './InvoiceDetailsForHospital'
import InvoiceDetailsForSpecialist from './InvoiceDetailsForSpecialist'
import Link from 'react-router/lib/Link'
import Moment from 'moment'
import PreApproval from './PreApproval'
import React from 'react'
import Row from 'react-bootstrap/lib/Row'
import Submitted from './Submitted'
import apiRequest from 'utils/request'
import find from 'ramda/src/find'
import momentLocalizer from 'react-widgets/lib/localizers/moment'
import propEq from 'ramda/src/propEq'
import { SubmissionError, reduxForm } from 'redux-form'
import { calculateTotalIncludingGst, checkObjectIsEmpty, localeDateToIsoDate } from 'utils/helpers'

export class RequestPayment extends React.Component {
  constructor (props) {
    super(props)
    this.formSubmit = this.formSubmit.bind(this)
    this.getFormData = this.getFormData.bind(this)
    this.validateFormValues = this.validateFormValues.bind(this)
    this.wordingVersion = '00000000-0000-0000-00000000000000000'
    this.state = {
      hasError: false
    }
  }

  componentWillMount () {
    momentLocalizer(Moment)
  }

  componentWillUnmount () {
    this.props.formReset('requestPayment')
  }

  findDuplicates (item, blacklist) {
    const currentOtherProcedureId = (
      Boolean(item.otherProcedure) &&
      item.otherProcedure.length > 0 &&
      item.otherProcedure[0].id)
    const match = blacklist.findIndex((x) => {
      return x.otherProcedureId === currentOtherProcedureId
    })
    if (match !== -1) { return true }
    blacklist.push({
      otherProcedureId: currentOtherProcedureId
    })
    return false
  }

  validateOtherProcedures (values) {
    let blacklist = []
    let otherProcedureValidators = {
      otherProcedures: []
    }
    const primaryProcedureId = (Boolean(values.primaryProcedure) &&
      values.primaryProcedure.length > 0 &&
      values.primaryProcedure[0].id)

    if (primaryProcedureId) {
      blacklist.push({ otherProcedureId: primaryProcedureId })
    }

    Boolean(values.otherProcedures) &&
    values.otherProcedures.forEach((item, index) => {
      otherProcedureValidators.otherProcedures[index] = {
        ...(
          (
            Boolean(item.otherProcedure) === false ||
            Boolean(item.otherProcedure.length < 1) ||
            Boolean(item.otherProcedure[0].id) === false ||
            primaryProcedureId !== item.otherProcedure[0].id
          ) &&
          (Boolean(item.specialistCost) === false ||
          item.specialistCost === '0.00') &&
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
          (this.findDuplicates(item, blacklist)) &&
          { otherProcedure: 'This procedure already exist.' }
        )
      }
    })
    return otherProcedureValidators
  }

  validateOtherCosts (values) {
    let otherCostsValidators = {
      otherCosts: []
    }
    Boolean(values.otherCosts) &&
    values.otherCosts.forEach((item, index) => {
      otherCostsValidators.otherCosts[index] = {
        ...(
          Boolean(item) &&
          (Boolean(item.otherCost) === false) &&
          { otherCost: 'Please enter other cost.' }
        )
      }
    })
    return otherCostsValidators
  }

  validateFormValues (values) {
    let blacklist = []

    const primaryProcedureId = (Boolean(values.primaryProcedure) &&
      values.primaryProcedure.length > 0 &&
      values.primaryProcedure[0].id)

    if (primaryProcedureId) {
      blacklist.push({ otherProcedureId: primaryProcedureId })
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
        (Boolean(values.dateOfProcedure) === false) &&
        { dateOfProcedure: 'Please enter date of procedure.' }
      ),
      ...(
        (Boolean(values.invoiceNumber) === false) &&
        { invoiceNumber: 'Please enter invoice number.' }
      ),
      ...(
        Boolean(values.hospitalTime) &&
        (Boolean(values.sharedRoom) === false) &&
        { sharedRoom: 'Please select shared room.' }
      ),
      ...(
        (this.props.requestPayment.currentProviderServiceType === 'Hospital') &&
        (Boolean(values.hospitalCost) === false) &&
        { totalCostErr: 'Please enter hospital cost.' }
      ),
      ...(
        (this.props.requestPayment.currentProviderServiceType === 'Hospital') &&
        (values.theatreTime && (Boolean(values.operatingTheatreCost) === false)) &&
        { totalCostErr: 'Please enter operating theatre cost.' }
      ),
      ...(
        (this.props.requestPayment.currentProviderServiceType === 'Hospital') &&
        (values.operatingTheatreCost && (Boolean(values.theatreTime) === false)) &&
        { theatreTime: 'Please enter theatre time.' }
      ),
      ...(
        (this.props.requestPayment.currentProviderServiceType === 'Hospital') &&
        ((values.sharedRoom === 'Yes') && (Boolean(values.hospitalTime) === false)) &&
        { hospitalTime: 'Please enter hospital time.' }
      ),
      ...(
        (values.accRelated === 'Yes' && values.AccLetterCounts < 1) &&
        { AccLetterCounts: 'Please attach ACC letter.' }
      ), /*
      ...(
        (this.props.requestPayment.currentProviderServiceType === 'Hospital') &&
        (Boolean(values.hospitalTime) === false) &&
        (Boolean(values.theatreTime) === false) &&
        { hospitalTime: 'Please enter hospital time.', theatreTime: 'Please enter theatre time.' }
      ), */
      ...(
        (
          Boolean(values.declarationAgree) === false ||
          values.declarationAgree !== true
        ) &&
        { declarationAgree: 'Please tick to confirm that you have read and agreed to the terms in the declaration above.' }
      ),
      ...(
        (this.props.requestPayment.currentProviderServiceType === 'Hospital' ||
        this.props.requestPayment.currentProviderServiceType === 'Specialist') &&
        Boolean(values.accRelated) === false &&
        { accRelated: 'Please select is this ACC related.' }
      ),
      ...(
        (this.props.requestPayment.currentProviderServiceType === 'Anaesthetist') &&
        this.props.requestPayment_costsForAnaesthetist.totalCost <= 0 &&
        { totalCostErr: 'Anaesthetist costs not specified' }
      ),
      ...(
        (this.props.requestPayment.currentProviderServiceType === 'Anaesthetist') &&
        Boolean(values.SurgicalNotesCounts) === false && values.SurgicalNotesCounts < 1 &&
        { SurgicalNotesCounts: 'Please attach surgical notes.' }
      ),
      ...(
        (this.props.requestPayment.currentProviderServiceType === 'Hospital') &&
        this.props.requestPayment_costsForHospital.totalCost <= 0 &&
        { totalCostErr: 'Please enter hospital cost.' }
      ),
      ...(
        (this.props.requestPayment.currentProviderServiceType === 'Hospital') &&
        Boolean(values.SurgicalNotesCounts) === false && values.SurgicalNotesCounts < 1 &&
        { SurgicalNotesCounts: 'Please attach surgical notes.' }
      ),
      ...(
        (this.props.requestPayment.currentProviderServiceType === 'Specialist') &&
        this.props.requestPayment_costsForSpecialist.totalCost <= 0 &&
        { totalCostErr: 'Specialist costs not specified.' }
      ),
      ...(
        Boolean(values.otherCosts) &&
        !values.otherCosts.every(item => {
          return (
            Boolean(item.key) &&
            Boolean(item.claimCostTypeId) &&
            Boolean(item.otherCost)
          )
        }) &&
        this.validateOtherCosts(values)
      ),
      ...(
        Boolean(values.otherProcedures) &&
        !values.otherProcedures.every(item => {
          console.log('item:otherProcedures', item)
          return (
            (
              Boolean(item.otherProcedure) &&
              Boolean(item.otherProcedure.length > 0) &&
              Boolean(item.otherProcedure[0].id)
            ) &&
            Boolean(item.specialistCost) &&
            (!this.findDuplicates(item, blacklist))
          )
        }) &&
        this.validateOtherProcedures(values)
      )
    }
  }

  getPrimaryPerformedIntervention (values) {
    const primaryProcedureId = (
      Boolean(values.primaryProcedure) &&
      values.primaryProcedure.length > 0 &&
      values.primaryProcedure[0].id
    )
    const prosthesisDescrId = (
      Boolean(values.prosthesisDescr) &&
      values.prosthesisDescr.length > 0 &&
      values.prosthesisDescr[0].id
    )
    console.log('!!!!!!', this.props.requestPayment.currentProviderServiceType)
    let primaryPerformedIntervention = {
      claimLineItems: [],
      interventionId: primaryProcedureId,
      location: values.location
    }
    // ----------------------------------------------------------------------
    // Anaesthetist
    // ----------------------------------------------------------------------
    Boolean(
      this.props.requestPayment.currentProviderServiceType === 'Anaesthetist'
    ) &&
    primaryPerformedIntervention.claimLineItems.push({
      type: 'Anaesthetist', // type: 'Default' // Default, Anaesthetist, Hospital, OperatingTheatre, Prosthesis
      claimCostTypeId: 6,
      cost: calculateTotalIncludingGst(this.props.requestPayment_costsForAnaesthetist.totalCost),
      TimeBaseUnits: parseInt(values.timeBaseUnitsTime, 10) || 0,
      TimeBaseUnitsCost: calculateTotalIncludingGst(parseFloat(values.timeBaseUnitsCost)) || 0,
      TimeUnits: parseInt(values.timeUnitsTime, 10) || 0,
      TimeUnitsCost: calculateTotalIncludingGst(parseFloat(values.timeUnitsCost)) || 0,
      ModifyingUnits: parseInt(values.modifyingUnitsTime, 10) || 0,
      ModifyingUnitsCost: calculateTotalIncludingGst(parseFloat(values.modifyingUnitsCost)) || 0
    })
    // Anaesthetist - Operating Theatre (required to store Theatre Time)
    Boolean(
      this.props.requestPayment.currentProviderServiceType === 'Anaesthetist'
    ) &&
    Boolean(values.theatreTime) &&
    primaryPerformedIntervention.claimLineItems.push({
      type: 'OperatingTheatre',
      claimCostTypeId: 2,
      cost: 0,
      TimeInMinutes: parseInt(values.theatreTime, 10) || 0
    })
    // ----------------------------------------------------------------------
    // Hospital
    // ----------------------------------------------------------------------
    // Hospital - Operating Theatre
    Boolean(
      this.props.requestPayment.currentProviderServiceType === 'Hospital'
    ) &&
    Boolean(values.operatingTheatreCost) &&
    Boolean(values.theatreTime) &&
    primaryPerformedIntervention.claimLineItems.push({
      type: 'OperatingTheatre',
      claimCostTypeId: 2,
      cost: calculateTotalIncludingGst(parseFloat(values.operatingTheatreCost)) || 0,
      TimeInMinutes: parseInt(values.theatreTime, 10) || 0
    })
    // Hospital - Radiology
    Boolean(
      this.props.requestPayment.currentProviderServiceType === 'Hospital'
    ) &&
    Boolean(values.radiologyCost) &&
    primaryPerformedIntervention.claimLineItems.push({
      type: 'Default',
      claimCostTypeId: 3,
      cost: calculateTotalIncludingGst(parseFloat(values.radiologyCost)) || 0
    })
    // Hospital - Hospital
    Boolean(
      this.props.requestPayment.currentProviderServiceType === 'Hospital'
    ) &&
    Boolean(values.hospitalCost) &&
    Boolean(values.hospitalTime) &&
    primaryPerformedIntervention.claimLineItems.push({
      type: 'Hospital',
      claimCostTypeId: 4,
      cost: calculateTotalIncludingGst(parseFloat(values.hospitalCost)) || 0,
      NightsStayed: parseInt(values.hospitalTime, 10),
      isSharedRoom: Boolean(values.sharedRoom) && values.sharedRoom === 'Yes'
    })
    // Hospital - Specialist
    Boolean(
      this.props.requestPayment.currentProviderServiceType === 'Hospital'
    ) &&
    Boolean(values.specialistCost) &&
    primaryPerformedIntervention.claimLineItems.push({
      type: 'Default',
      claimCostTypeId: 1,
      cost: calculateTotalIncludingGst(parseFloat(values.specialistCost)) || 0
    })
    // Hospital - Consultation
    Boolean(
      this.props.requestPayment.currentProviderServiceType === 'Hospital'
    ) &&
    Boolean(values.consultationCost) &&
    primaryPerformedIntervention.claimLineItems.push({
      type: 'Default',
      claimCostTypeId: 8,
      cost: calculateTotalIncludingGst(parseFloat(values.consultationCost)) || 0
    })
    // Hospital - Anaesthetist
    Boolean(
      this.props.requestPayment.currentProviderServiceType === 'Hospital'
    ) &&
    Boolean(values.anaesthetistCost) &&
    primaryPerformedIntervention.claimLineItems.push({
      type: 'Default',
      claimCostTypeId: 6,
      cost: calculateTotalIncludingGst(parseFloat(values.anaesthetistCost)) || 0
    })
    // Hospital - Prosthesis
    Boolean(
      this.props.requestPayment.currentProviderServiceType === 'Hospital'
    ) &&
    Boolean(values.prosthesisCost) &&
    Boolean(values.prosthesisDescr) &&
    primaryPerformedIntervention.claimLineItems.push({
      type: 'Prosthesis',
      claimCostTypeId: 5,
      cost: calculateTotalIncludingGst(parseFloat(values.prosthesisCost)) || 0,
      ProsthesisId: prosthesisDescrId
    })
    // ----------------------------------------------------------------------
    // Specialist
    // ----------------------------------------------------------------------
    // Specialist - Operating Theatre (required to store Theatre Time)
    Boolean(
      this.props.requestPayment.currentProviderServiceType === 'Specialist'
    ) &&
    Boolean(values.theatreTime) &&
    primaryPerformedIntervention.claimLineItems.push({
      type: 'OperatingTheatre',
      claimCostTypeId: 2,
      cost: 0,
      TimeInMinutes: parseInt(values.theatreTime, 10) || 0
    })
    // Specialist - Specialist
    Boolean(
      this.props.requestPayment.currentProviderServiceType === 'Specialist'
    ) &&
    Boolean(values.specialistCost) &&
    primaryPerformedIntervention.claimLineItems.push({
      type: 'Default',
      claimCostTypeId: 1,
      cost: calculateTotalIncludingGst(parseFloat(values.specialistCost)) || 0
    })
    // Specialist - Consultation
    Boolean(
      this.props.requestPayment.currentProviderServiceType === 'Specialist'
    ) &&
    Boolean(values.consultationCost) &&
    primaryPerformedIntervention.claimLineItems.push({
      type: 'Default',
      claimCostTypeId: 8,
      cost: calculateTotalIncludingGst(parseFloat(values.consultationCost)) || 0
    })
    // Specialist - Prosthesis
    Boolean(
      this.props.requestPayment.currentProviderServiceType === 'Specialist'
    ) &&
    Boolean(values.prosthesisCost) &&
    Boolean(values.prosthesisDescr) &&
    primaryPerformedIntervention.claimLineItems.push({
      type: 'Prosthesis',
      claimCostTypeId: 5,
      cost: calculateTotalIncludingGst(parseFloat(values.prosthesisCost)) || 0,
      ProsthesisId: prosthesisDescrId
    })
    return primaryPerformedIntervention
  }

  // ------------------------------------------------------------------------
  // OtherCosts - (for Hospital and Specialist only)
  // ------------------------------------------------------------------------
  getOtherCosts (values) {
    let claimLineItems = []
    Boolean(values.otherCosts) &&
    values.otherCosts.forEach(item => {
      Boolean(item.claimCostTypeId) &&
      Boolean(item.otherCost) &&
      claimLineItems.push({
        type: 'Default',
        claimCostTypeId: parseInt(item.claimCostTypeId, 10),
        cost: calculateTotalIncludingGst(parseFloat(item.otherCost)) || 0
      })
    })
    return claimLineItems
  }

  getAdditionalPerformedIntervention (values) {
    let additionalPerformedIntervention = []
    console.log(values)

    Boolean(values.otherProcedures) &&
    values.otherProcedures.forEach(item => {
      Boolean(item.otherProcedure) &&
      Boolean(item.specialistCost) &&
      additionalPerformedIntervention.push({
        claimLineItems: [{
          type: 'Default',
          claimCostTypeId: 1,
          cost: calculateTotalIncludingGst(parseFloat(item.specialistCost)) || 0
        }],
        // note: remove the empty string assignment - the interventionId cannot be empty
        // --------------------------------------------------------------------
        // +todo: add validation of item.otherProcedure[0].id, add unit tests
        // --------------------------------------------------------------------
        // see validateOtherProcedures()
        // --------------------------------------------------------------------
        interventionId: item.otherProcedure[0].id,
        location: 'NotApplicable'
      })
    })
    return additionalPerformedIntervention
  }

  // +todo: use parseInt for all cost values of interventions, additional interventions, etc
  getFormData (values) {
    const formData = {
      dateOfProcedure: localeDateToIsoDate(values.dateOfProcedure),
      declaration: {
        hasReadAndAgreedPrivacyDeclaration: values.declarationAgree,
        hasReadAndAgreedTruthDeclaration: values.declarationAgree,
        wordingVersion: this.wordingVersion
      },
      documentBundleId: this.props.requestPayment.docBundle.id,
      invoiceNumber: values.invoiceNumber,
      isAccRelated: Boolean((values.accRelated) && values.accRelated === 'Yes'),
      patientDateOfBirth: this.props.requestPayment_preApproval.dob,
      // Costs + Primary procedure
      primaryPerformedIntervention: this.getPrimaryPerformedIntervention(values),
      // Costs + Other Procedure
      ...(
        Boolean(values.otherProcedures) &&
        values.otherProcedures.length > 0 &&
        { additionalPerformedIntervention: this.getAdditionalPerformedIntervention(values) }
      )
      // +todo: Move the additional costs claim line items to the primary intervention
      // ----------------------------------------------------------------------
      // See if statement below
      // ----------------------------------------------------------------------
      //  ,
      // ...(
      //  Boolean(values.otherCosts) &&
      //   (Boolean(values.otherCosts.length > 0)) &&
      //  { getOtherCosts: getOtherCosts() }
      // )
    }

    if (
      Boolean(values.otherCosts) &&
      Boolean(values.otherCosts.length > 0)
    ) {
      formData.primaryPerformedIntervention.claimLineItems = [
        ...formData.primaryPerformedIntervention.claimLineItems,
        ...this.getOtherCosts(values)
      ]
    }
    return formData
  }

  formSubmit (values) {
    // ------------------------------------------------------------------------
    // Validate form data
    // ------------------------------------------------------------------------
    console.log('RequestPayment:index:formSubmit')
    console.log('reduxForm:values', values)
    console.log('this.props', this.props)
    const err = this.validateFormValues(values)
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
    const link = find(propEq('rel', 'create-cleared-claim-as-provider'))(this.props.currentProviderLinks)
    if (!link) { return }
    const url = `${link.url}?preApprovalReference=${this.props.requestPayment_preApproval.preApprovalNumber}`
    return apiRequest(url, link.method, formData)
      .then(result => {
        if (!(result)) {
          throw new Error()
        }
        console.log('formSubmit:result', result)
        this.props.formSubmitSuccess('requestPayment')
      })
      .catch((err) => {
        console.error('formSubmit:apiRequest:err', err)
        this.props.formSubmitError('requestPayment', err)
      })
  }

  render () {
    const { handleSubmit, pristine, reset, submitting } = this.props
    return (
      <section className={`${this.props.cssName}-wrapper`}>
        <div className={`${this.props.cssName}`}>
          <h1 className={`${this.props.cssName}-heading text-center`}>
            Request a payment
          </h1>
          {!this.props.requestPayment.isValid &&
            <h2 className={`${this.props.cssName}-subheading text-center`}>
              {this.props.currentProviderName}
            </h2>
          }
          {this.props.requestPayment.isValid &&
            <h2 className={`${this.props.cssName}-subheading text-center`}>
              Request submitted
            </h2>
          }
          <hr className={`${this.props.cssName}-heading-hr`} />
          {!this.props.requestPayment.isValid &&
            <section className={`${this.props.cssName}__pre-approval-wrapper`}>
              <PreApproval
                {...this.props.requestPayment_preApproval}
                verifyPreApprovalSuccess={
                  this.props.verifyPreApprovalSuccess
                }
                cssName={`${this.props.cssName}__pre-approval`}
              />
            </section>
          }
          {!this.props.requestPayment.isValid && this.props.requestPayment_preApproval.isValid &&
            <div>
              <hr />
              {this.props.requestPayment.currentProviderServiceType === 'Anaesthetist' &&
                <section
                  className={`${this.props.cssName}__invoice-details-wrapper`}
                >
                  <InvoiceDetailsForAnaesthetist
                    {...this.props.requestPayment_invoiceDetails}
                    cssName={`${this.props.cssName}__invoice-details`}
                    title='Invoice details'
                  />
                </section>}
              {this.props.requestPayment.currentProviderServiceType === 'Hospital' &&
                <section
                  className={`${this.props.cssName}__invoice-details-wrapper`}
                >
                  <InvoiceDetailsForHospital
                    {...this.props.requestPayment_invoiceDetails}
                    cssName={`${this.props.cssName}__invoice-details`}
                    title='Invoice details'
                    isAccRelated
                  />
                </section>}
              {this.props.requestPayment.currentProviderServiceType === 'Specialist' &&
                <section
                  className={`${this.props.cssName}__invoice-details-wrapper`}
                >
                  <InvoiceDetailsForSpecialist
                    {...this.props.requestPayment_invoiceDetails}
                    cssName={`${this.props.cssName}__invoice-details`}
                    title='Invoice details'
                    isAccRelated
                  />
                </section>}
              <hr />
              {this.props.requestPayment.currentProviderServiceType === 'Anaesthetist' &&
                <div>
                  <section
                    className={`${this.props.cssName}__costs-for-anaesthetists-wrapper`}
                  >
                    <CostsForAnaesthetist
                      {...this.props.requestPayment_costsForAnaesthetist}
                      cssName={`${this.props.cssName}__costs-for-anaesthetists`}
                    />
                  </section>

                  <hr />
                  <section
                    className={`${this.props.cssName}__attach-documents-wrapper`}
                  >
                    <AttachDocumentsForAnaesthetist
                      {...this.props.requestPayment_attachDocuments}
                      cssName={`${this.props.cssName}__attach-documents`}
                    />
                  </section>

                </div>}
              {this.props.requestPayment.currentProviderServiceType === 'Hospital' &&
                <div>
                  <section
                    className={`${this.props.cssName}__costs-for-hospitals-wrapper`}
                  >
                    <CostsForHospital
                      loadRequestPaymentCostList = {this.props.loadRequestPaymentCostList}
                      {...this.props.requestPayment_costsForHospital}
                      cssName={`${this.props.cssName}__costs-for-hospitals`}
                    />
                  </section>

                  <hr />
                  <section
                    className={`${this.props.cssName}__attach-documents-wrapper`}
                  >
                    <AttachDocumentsForHospital
                      {...this.props.requestPayment_attachDocuments}
                      cssName={`${this.props.cssName}__attach-documents`}
                    />
                  </section>

                </div>}
              {this.props.requestPayment.currentProviderServiceType === 'Specialist' &&
                <div>
                  <section
                    className={`${this.props.cssName}__costs-for-specialists-wrapper`}
                  >
                    <CostsForSpecialist
                      loadRequestPaymentCostList = {this.props.loadRequestPaymentCostList}
                      {...this.props.requestPayment_costsForSpecialist}
                      cssName={`${this.props.cssName}__costs-for-specialists`}
                    />
                  </section>

                  <hr />
                  <section
                    className={`${this.props.cssName}__attach-documents-wrapper`}
                  >
                    <AttachDocumentsForSpecialist
                      {...this.props.requestPayment_attachDocuments}
                      cssName={`${this.props.cssName}__attach-documents`}
                    />
                  </section>

                </div>}
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
          {this.props.requestPayment.isValid &&
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

RequestPayment.propTypes = {
  cssName: React.PropTypes.string,
  currentProviderId: React.PropTypes.string,
  currentProviderLinks: React.PropTypes.array,
  currentProviderName: React.PropTypes.string,
  formReset: React.PropTypes.func,
  formSubmit: React.PropTypes.func,
  formSubmitError: React.PropTypes.func,
  formSubmitSuccess: React.PropTypes.func,
  handleSubmit: React.PropTypes.func,
  loadRequestPaymentCostList: React.PropTypes.func,
  pristine: React.PropTypes.bool,
  requestPayment: React.PropTypes.shape({
    currentProviderServiceType: React.PropTypes.string,
    docBundle: React.PropTypes.object,
    isValid: React.PropTypes.bool
  }),
  requestPayment_attachDocuments: React.PropTypes.object,
  requestPayment_costsForAnaesthetist: React.PropTypes.object,
  requestPayment_costsForHospital: React.PropTypes.object,
  requestPayment_costsForSpecialist: React.PropTypes.object,
  requestPayment_invoiceDetails: React.PropTypes.object,
  requestPayment_preApproval: React.PropTypes.object,
  reset: React.PropTypes.func,
  submitting: React.PropTypes.bool,
  verifyPreApprovalSuccess: React.PropTypes.func
}

RequestPayment.defaultProps = {
  cssName: 'request-payment'
}

export const validate = values => {
  const errors = {}
  if (values.anaesthetistCost && (values.anaesthetistCost > 0) && !values.anaesthetistName) {
    errors.anaesthetistName = 'Required.'
  } else if (values.anaesthetistName && values.anaesthetistName.length > 50) {
    errors.anaesthetistName = 'Must be 50 characters or less.'
  }
  if (values.prosthesisCost && (values.prosthesisCost > 0) && !values.prosthesisDescr) {
    errors.prosthesisDescr = 'Required.'
  }
  if (
    Boolean(values.dateOfProcedure) &&
    !Moment(values.dateOfProcedure).isBefore(Moment())
  ) {
    errors.dateOfProcedure = 'Date of procedure is invalid.'
  }
  // --------------------------------------------------------------------------
  // Applies to Hospital only
  // --------------------------------------------------------------------------
  if (values.hospitalTime && !values.sharedRoom) {
    errors.sharedRoom = 'Please select shared room.'
  }
  return errors
}

export const warn = values => {
  console.log('values:warn:index:requestPayment', values)
  const warnings = {}
  return warnings
}

const RequestPaymentReduxForm = reduxForm({
  form: 'requestPayment',
  validate,
  warn
})(RequestPayment)

export default RequestPaymentReduxForm
