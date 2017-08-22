import Link from 'react-router/lib/Link'
import React from 'react'
import ReactTable from 'react-table'
import find from 'ramda/src/find'
import propEq from 'ramda/src/propEq'
import { isoDateTolocaleDate } from 'utils/helpers'

class PreApprovals extends React.Component {
  constructor (props) {
    super(props)
    this.limit = 50
    this.handleViewMore = this.handleViewMore.bind(this)
    this.renderColumns = [
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
  }

  componentDidMount () {
    this.props.loadPreApprovalsList()
  }

  handleViewMore (event) {
    console.log('handleViewMore', this.props.links)
    const next = (find(propEq('rel', 'next'))(this.props.links)) || (find(propEq('rel', 'last'))(this.props.links))
    if (next) {
      const url = next.url
      this.props.loadMorePreApprovalsList(url)
    }
  }

  render () {
    return (
      <div>
        <section className={`${this.props.cssName}-wrapper`}>
          <h1 className={`${this.props.cssName}-heading text-center`}>
            Pre-approvals
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
                  return this.props.loadPreApprovalsList({
                    limit: this.limit,
                    sortBy: id,
                    sortOrder: ((desc && 'Descending') || 'Ascending')
                  })
                }
                return this.props.loadPreApprovalsList({ limit: this.limit })
              }}
            />
          }
          {!this.props.isFetching && this.props.list.length === 0 &&
            <div className={`${this.props.cssName}-list-message`}>
              {[
                'We have not been able to find any pre-approvals requested through the provider portal.',
                'If you have a pre-approval number that was generated through the customer portal,',
                'or have requested pre-approval telephonically,',
                'then you can still request a payment using that pre-approval number.'
              ].join(' ')}
            </div>
          }
          {this.props.isListPagingNext &&
            <div className='text-center'>
              <span className={`${this.props.cssName}-trigger is-view-more`} onClick={this.handleViewMore}>
                View more
              </span>
            </div>
          }
        </section>
      </div>
    )
  }
}

PreApprovals.propTypes = {
  cssName: React.PropTypes.string,
  currentProviderName: React.PropTypes.string,
  links: React.PropTypes.array,
  list: React.PropTypes.array,
  loadMorePreApprovalsList: React.PropTypes.func,
  loadPreApprovalsList: React.PropTypes.func,
  original: React.PropTypes.object,
  value: React.PropTypes.string
}

PreApprovals.defaultProps = {
  cssName: 'pre-approvals'
}

export default PreApprovals
