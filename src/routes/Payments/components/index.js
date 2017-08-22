import React from 'react'
import ReactTable from 'react-table'
import find from 'ramda/src/find'
import propEq from 'ramda/src/propEq'
import { isoDateTolocaleDate } from 'utils/helpers'

class Payments extends React.Component {
  constructor (props) {
    super(props)
    this.limit = 50
    this.handleViewMore = this.handleViewMore.bind(this)
    this.renderColumns = [
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

  componentDidMount () {
    this.props.loadPaymentsList()
  }

  handleViewMore (event) {
    const next = (find(propEq('rel', 'next'))(this.props.links)) || (find(propEq('rel', 'last'))(this.props.links))
    if (next) {
      const url = next.url
      this.props.loadMorePaymentsList(url)
    }
  }

  render () {
    return (
      <div>
        <section className={`${this.props.cssName}-wrapper`}>
          <h1 className={`${this.props.cssName}-heading text-center`}>
            Payments
          </h1>
          <h2 className={`${this.props.cssName}-subheading text-center`}>
            {this.props.currentProviderName}
          </h2>
          {this.props.list.length > 0 &&
            <ReactTable
              columns={this.renderColumns}
              data={this.props.list}
              defaultPageSize={-1}
              manual
              minRows={15}
              page={undefined}
              pageSize={undefined}
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
          }
          {!this.props.isFetching && this.props.list.length === 0 &&
            <div className={`${this.props.cssName}-list-message`}>
              {[
                'We have not been able to find any payments requested through this portal.',
                'Manually submitted payment requests,',
                'and claims sent in directly by the patient,',
                'will not be reflected in this list.'
              ].join(' ')}
            </div>
          }
          {this.props.isListPagingNext &&
            <div className='text-center'>
              <span className={`${this.props.cssName}-trigger is-view-more`}
                onClick={this.handleViewMore}
              >
                View more
              </span>
            </div>
          }
        </section>
      </div>
    )
  }
}

Payments.propTypes = {
  cssName: React.PropTypes.string,
  currentProviderName: React.PropTypes.string,
  links: React.PropTypes.array,
  list: React.PropTypes.array,
  loadMorePaymentsList: React.PropTypes.func,
  loadPaymentsList: React.PropTypes.func,
  original: React.PropTypes.object,
  value: React.PropTypes.string
}

Payments.defaultProps = {
  cssName: 'payments'
}

export default Payments
