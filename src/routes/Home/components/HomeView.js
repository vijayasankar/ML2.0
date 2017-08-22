import React, { PropTypes } from 'react'
import ReactTable from 'react-table'
import classnames from 'classnames'
import contains from 'ramda/src/contains'
import find from 'ramda/src/find'
import propEq from 'ramda/src/propEq'
import { Link } from 'react-router'
import { isoDateTolocaleDate, checkObjectIsEmpty } from 'utils/helpers'

class HomeView extends React.Component {
  constructor (props) {
    super(props)
    this.limit = 6
    this.renderPreApprovalsColumns = [
      {
        Header: () => <span>Name</span>,
        accessor: 'insuredPersonName',
        headerClassName: 'is-name'
      }, {
        Header: () => <span>Submitted</span>,
        accessor: 'dateLodged',
        headerClassName: 'is-submitted',
        Cell: props => <div>{ isoDateTolocaleDate(props.value) }</div>
      }, {
        Header: () => <span>Proposed date</span>,
        accessor: 'proposedDateOfProcedure',
        headerClassName: 'is-proposed-date',
        Cell: props => <div>{ isoDateTolocaleDate(props.value) }</div>
      }, {
        Header: () => <span>Status</span>,
        accessor: 'status',
        headerClassName: 'is-status'
      }, {
        Header: () => <span>Pre-approval</span>,
        accessor: 'reference',
        headerClassName: 'is-pre-approval-number',
        Cell: props => {
          const link = Boolean(props.original.links) &&
            (props.original.links.length > 0) &&
            find(propEq('rel', 'pre-approval-advice-document'))(props.original.links)
          if (!link) { return <span>{props.value}</span> }
          return <a target={'_blank'} href={`${link.url}`}>{props.value}</a>
        }
      }, {
        Header: () => <span>Payment</span>,
        accessor: 'payment',
        headerClassName: 'is-payment',
        Cell: props => {
          const val = 'Request payment'
          const query = Boolean(props.original) &&
            (typeof props.original.reference === 'string') &&
            Boolean(props.original.reference) &&
            props.original.reference
          if (!query) { return <span>{val}</span> }
          return <Link to={`/providerportal/request-payment?preApprovalNumber=${query}`}>{val}</Link>
        }
      }
    ]
    this.renderPaymentsColumns = [
      {
        Header: () => <span>Name</span>,
        accessor: 'insuredPersonName', // String-based value accessors!
        headerClassName: 'is-name'
      }, {
        Header: () => <span>Submitted</span>,
        accessor: 'dateLodged',
        headerClassName: 'is-submitted',
        Cell: props => <div>{ isoDateTolocaleDate(props.value) }</div>
      }, {
        Header: () => <span>Date paid</span>,
        accessor: 'dateOfPayment',
        headerClassName: 'is-date-paid',
        Cell: props => <div>{ isoDateTolocaleDate(props.value) }</div>
      }, {
        Header: () => <span>Status</span>,
        accessor: 'status',
        headerClassName: 'is-status'
      }, {
        Header: () => <span>Pre-approval</span>,
        accessor: 'reference',
        headerClassName: 'is-pre-approval-number',
        Cell: props => {
          console.log('HomeView:props', props.original)
          const link = Boolean(props.original.links) &&
            (props.original.links.length > 0) &&
            find(propEq('rel', 'claim-advice-document'))(props.original.links)
          if (!link) { return <span>{props.value}</span> }
          return <a target={'_blank'} href={`${link.url}`}>{props.value}</a>
        }
      }, {
        Header: () => <span>Payment</span>,
        accessor: 'paymentAmount',
        headerClassName: 'is-payment',
        Cell: props => {
          if (!props.value) { return <span /> }
          return <span className='is-payment'>{ `$ ${props.value}` }</span>
        }
      }
    ]
  }

  componentDidMount (prevProps, prevState) {
    if (
      !checkObjectIsEmpty(this.props.currentProviderDetails) &&
      (typeof this.props.currentProviderDetails.id === 'string') &&
      Boolean(this.props.currentProviderDetails.id)
    ) {
      return this.props.loadHomeLists()
    }
  }

  isSpecialist () {
    return this.props.currentProviderDetails &&
      this.props.currentProviderDetails.serviceTypes &&
      contains('Specialist', this.props.currentProviderDetails.serviceTypes)
  }

  render () {
    return (
      <div className={`${this.props.cssName}-view`}>
        <h1 className={`${this.props.cssName}-heading text-center`}>{this.props.currentProvider.name}</h1>
        { this.props.currentProviderDetails &&
          this.props.currentProviderDetails.serviceTypes &&
          <div>
            {this.isSpecialist() &&
              <section className={`${this.props.cssName}__pre-approvals-section`}>
                <h2 className={`${this.props.cssName}__pre-approvals-subheading text-center`}>
                  Pre-approvals
                </h2>
                {this.props.preApprovalsList.length > 0 &&
                  <div>
                    <ReactTable
                      columns={this.renderPreApprovalsColumns}
                      data={this.props.preApprovalsList}
                      defaultPageSize={this.limit}
                      manual
                      minRows={this.limit}
                      page={undefined}
                      pageSize={undefined}
                      pages={-1}
                      resizable={false}
                      showPageJump={false}
                      showPageSizeOptions={false}
                      showPagination={false}
                      sortable
                      onSortedChange={(newSorted, column, shiftKey) => {
                        const { id, desc } = newSorted[0]
                        if (id) {
                          return this.props.loadPreApprovalsList({
                            limit: this.limit,
                            sortBy: id,
                            sortOrder: ((desc && 'Descending') || 'Ascending')
                          })
                        }
                        return this.props.loadPreApprovalsList({ limit: this.limit })
                      }}
                    />
                    <div className='text-center'>
                      <Link activeClassName='route--active'
                        className={`${this.props.cssName}-trigger is-view-all is-pre-approvals`}
                        to='/providerportal/pre-approvals'
                      >
                        View all
                      </Link>
                    </div>
                  </div>
                }
                {this.props.preApprovalsList.length === 0 &&
                  <div className={`${this.props.cssName}__pre-approvals-list-message`}>
                    {[
                      'We have not been able to find any pre-approvals requested through the provider portal.',
                      'If you have a pre-approval number that was generated through the customer portal,',
                      'or have requested pre-approval telephonically,',
                      'then you can still request a payment using that pre-approval number.'
                    ].join(' ')}
                  </div>
                }
              </section>
            }
            <section className={`${this.props.cssName}__payments-section`}>
              <h2 className={`${this.props.cssName}__payments-subheading text-center`}>
                Payments
              </h2>
              {this.props.paymentsList.length > 0 &&
                <div>
                  <ReactTable
                    columns={this.renderPaymentsColumns}
                    data={this.props.paymentsList}
                    defaultPageSize={this.limit}
                    manual
                    minRows={this.limit}
                    page={undefined}
                    pageSize={undefined}
                    pages={-1}
                    resizable={false}
                    showPageJump={false}
                    showPageSizeOptions={false}
                    showPagination={false}
                    sortable
                    onSortedChange={(newSorted, column, shiftKey) => {
                      const { id, desc } = newSorted[0]
                      if (id) {
                        return this.props.loadPaymentsList({
                          limit: this.limit,
                          sortBy: id,
                          sortOrder: ((desc && 'Descending') || 'Ascending')
                        })
                      }
                      return this.props.loadPaymentsList({ limit: this.limit })
                    }}
                  />
                  <div className='text-center'>
                    <Link activeClassName='route--active'
                      className={`${this.props.cssName}-trigger is-view-all is-payments`}
                      to='/providerportal/payments'
                    >
                      View all
                    </Link>
                  </div>
                </div>
              }
              {this.props.paymentsList.length === 0 &&
                <div className={`${this.props.cssName}__payments-list-message`}>
                  {[
                    'We have not been able to find any payments requested through this portal.',
                    'Manually submitted payment requests,',
                    'and claims sent in directly by the patient,',
                    'will not be reflected in this list.'
                  ].join(' ')}
                </div>
              }
            </section>
          </div>
        }
      </div>
    )
  }
}

HomeView.propTypes = {
  cssName: PropTypes.string,
  currentProvider: PropTypes.object,
  currentProviderDetails: PropTypes.object,
  loadHomeLists: PropTypes.func,
  loadPaymentsList: PropTypes.func,
  loadPreApprovalsList: PropTypes.func,
  paymentsList: PropTypes.array,
  preApprovalsList: PropTypes.array,
  value: PropTypes.string
}

HomeView.defaultProps = {
  cssName: 'home'
}

export default HomeView
