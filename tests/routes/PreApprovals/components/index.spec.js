import Link from 'react-router/lib/Link'
import React from 'react'
import { expect } from 'chai'
import { shallow, render, mount } from 'enzyme'

import ReduxFormStub from '../../../ReduxFormStub'

import PreApprovals from 'routes/PreApprovals/components/index'

describe('(View) PreApprovals - instantiate', () => {
  let component

  beforeEach(() => {
    component = new PreApprovals()
  })

  describe('tests for correct constructor', () => {
    it('has a limit of 50', () => {
      expect(component.limit).to.equal(50)
    })

    it('has binding handleViewMore', () => {
      expect(component.handleViewMore).to.exist
    })

    it('has 6 columns', () => {
      expect(component.renderColumns).to.have.length(6)
    })

    it('has correct renderColumns headers', () => {
      expect(render(component.renderColumns[0].Header()).html()).to.equal('<span>Name</span>')
      expect(render(component.renderColumns[1].Header()).html()).to.equal('<span>Submitted</span>')
      expect(render(component.renderColumns[2].Header()).html()).to.equal('<span>Proposed date</span>')
      expect(render(component.renderColumns[3].Header()).html()).to.equal('<span>Status</span>')
      expect(render(component.renderColumns[4].Header()).html()).to.equal('<span>Pre-approval</span>')
      expect(render(component.renderColumns[5].Header()).html()).to.equal('<span>Payment</span>')
    })

    it('has correct renderColumns accessors', () => {
      expect(component.renderColumns[0].accessor).to.equal('insuredPersonName')
      expect(component.renderColumns[1].accessor).to.equal('dateLodged')
      expect(component.renderColumns[2].accessor).to.equal('proposedDateOfProcedure')
      expect(component.renderColumns[3].accessor).to.equal('status')
      expect(component.renderColumns[4].accessor).to.equal('reference')
      expect(component.renderColumns[5].accessor).to.equal('payment')
    })

    it('has correct renderColumns headerClassNames', () => {
      expect(component.renderColumns[0].headerClassName).to.equal('is-name')
      expect(component.renderColumns[1].headerClassName).to.equal('is-submitted')
      expect(component.renderColumns[2].headerClassName).to.equal('is-proposed-date')
      expect(component.renderColumns[3].headerClassName).to.equal('is-status')
      expect(component.renderColumns[4].headerClassName).to.equal('is-pre-approval-number')
      expect(component.renderColumns[5].headerClassName).to.equal('is-payment')
    })

    it('has correct renderColumns cells', () => {
      expect(component.renderColumns[0].Cell).to.not.exist
      expect(render(component.renderColumns[1].Cell({ value: '1980-01-01' })).html()).to.equal('<div>01/01/1980</div>')
      expect(render(component.renderColumns[2].Cell({ value: '1980-01-01' })).html()).to.equal('<div>01/01/1980</div>')
      expect(component.renderColumns[3].Cell).to.not.exist
      expect(render(component.renderColumns[4].Cell({
        original: {}
      })).html()).to.equal('<span></span>')
      expect(render(component.renderColumns[4].Cell({
        original: {},
        value: 'value'
      })).html()).to.equal('<span>value</span>')
      expect(render(component.renderColumns[4].Cell({
        original: {
          links: []
        },
        value: 'value'
      })).html()).to.equal('<span>value</span>')
      expect(render(component.renderColumns[4].Cell({
        original: {
          links: [
            {
              rel: '',
              url: ''
            }
          ]
        },
        value: 'value'
      })).html()).to.equal('<span>value</span>')
      expect(render(component.renderColumns[4].Cell({
        original: {
          links: [
            {
              rel: 'self',
              url: ''
            }
          ]
        },
        value: 'value'
      })).html()).to.equal('<span>value</span>')
      expect(render(component.renderColumns[4].Cell({
        original: {
          links: [
            {
              rel: 'pre-approval-advice-document',
              url: 'aaa'
            }
          ]
        },
        value: 'value'
      })).html()).to.equal('<a target="_blank" href="aaa">value</a>')
      expect(render(component.renderColumns[5].Cell({
        value: 'Approved',
        original: {
          links: []
        }
      })).html()).to.equal('<span>Request payment</span>')
      expect(render(component.renderColumns[5].Cell({
        value: '',
        original: {
          reference: undefined
        }
      })).html()).to.equal('<span>Request payment</span>')
      expect(render(component.renderColumns[5].Cell({
        value: '',
        original: {
          reference: 123
        }
      })).html()).to.equal('<span>Request payment</span>')
      expect(render(component.renderColumns[5].Cell({
        value: '',
        original: {
          reference: null
        }
      })).html()).to.equal('<span>Request payment</span>')
      expect(component.renderColumns[5].Cell({
        value: '',
        original: {
          reference: 'aaa'
        }
      })).to.deep.equal(<Link to={`/providerportal/request-payment?preApprovalNumber=aaa`}>Request payment</Link>)
    })
  })
})

describe('(View) PreApprovals - shallow', () => {
  let wrapper
  let props

  const spyHandleViewMore = sinon.spy(PreApprovals.prototype, 'handleViewMore')

  beforeEach(() => {
    props = {
      cssName: 'pre-approvals',
      currentProviderName: '',
      isFetching: undefined,
      isListPagingNext: undefined,
      links: [],
      list: [],
      loadMorePreApprovalsList: () => {},
      loadPreApprovalsList: () => {},
      original: {},
      value: ''
    }
    wrapper = shallow(<PreApprovals {...props} />)
  })

  it('Renders correct provider name', () => {
    wrapper.setProps({ currentProviderName: 'Provider Name' })
    const h2 = wrapper.find('h2')
    expect(h2.text()).to.equal('Provider Name')
  })

  it('renders a table when list is not empty and no message is rendered', () => {
    wrapper.setProps({
      list: [{}]
    })
    expect(wrapper.find(`div.${props.cssName}-list-message`)).to.not.exist
    expect(wrapper.find('ReactTable')).to.exist
  })

  it('renders a message when it is not fetching and the list is empty', () => {
    wrapper.setProps({
      isFetching: false,
      list: []
    })
    expect(wrapper.find('ReactTable')).to.not.exist
    expect(wrapper.find(`div.${props.cssName}-list-message`)).to.exist
  })

  it('Renders "View More" option', () => {
    wrapper.setProps({ isListPagingNext: true })
    const viewMore = wrapper.find('span.is-view-more')
    expect(viewMore).to.exist
  })

  it("Doesn't render 'View More' option", () => {
    wrapper.setProps({ isListPagingNext: false })
    const viewMore = wrapper.find('span.is-view-more')
    expect(viewMore).to.not.exist
  })

  it('HandleViewMore is triggered upon clicking "View More" option', () => {
    wrapper.setProps({ isListPagingNext: true })
    expect(spyHandleViewMore.callCount).to.equal(0)
    wrapper.find(`span.${props.cssName}-trigger`).simulate('click')
    expect(spyHandleViewMore.callCount).to.equal(1)
  })

  it('loadMorePaymentsList is triggered upon clicking "View More" option', () => {
    const spyLoadMorePreApprovalsList = sinon.spy(wrapper.prop('loadMorePreApprovalsList'))
    wrapper.setProps({
      isListPagingNext: true,
      links: [{
        rel: 'next',
        url: ''
      }],
      loadMorePreApprovalsList: spyLoadMorePreApprovalsList
    })
    expect(spyLoadMorePreApprovalsList.callCount).to.equal(0)
    wrapper.find(`span.${props.cssName}-trigger`).simulate('click')
    expect(spyLoadMorePreApprovalsList.callCount).to.equal(1)
  })

  it('loadMorePaymentsList is not triggered when links is empty', () => {
    const spyLoadMorePreApprovalsList = sinon.spy(wrapper.prop('loadMorePreApprovalsList'))
    wrapper.setProps({
      isListPagingNext: true,
      links: [],
      loadMorePreApprovalsList: spyLoadMorePreApprovalsList
    })
    expect(spyLoadMorePreApprovalsList.callCount).to.equal(0)
    wrapper.find(`span.${props.cssName}-trigger`).simulate('click')
    expect(spyLoadMorePreApprovalsList.callCount).to.equal(0)
  })
})

describe('(View) PreApprovals - mount', () => {
  let props
  let state

  beforeEach(() => {
    props = {
      cssName: 'pre-approvals',
      currentProviderName: '',
      isFetching: undefined,
      isListPagingNext: undefined,
      links: [],
      list: [],
      loadMorePreApprovalsList: () => {},
      loadPreApprovalsList: () => {},
      original: {},
      value: ''
    }

    state = {
      limit: 50
    }
  })

  it('componentDidMount is triggered successfully upon mount', () => {
    const spyComponentDidMount = sinon.spy(PreApprovals.prototype, 'componentDidMount')
    expect(spyComponentDidMount.callCount).to.equal(0)
    mount(<ReduxFormStub><PreApprovals {...props} {...state} /></ReduxFormStub>)
    expect(spyComponentDidMount.callCount).to.equal(1)
  })
})
