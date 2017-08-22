import React from 'react'
import { expect } from 'chai'
import { shallow, render, mount } from 'enzyme'

import Payments from 'routes/Payments/components/index'

describe('(View) Payments - instantiate', () => {
  let component

  beforeEach(() => {
    component = new Payments()
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
      expect(render(component.renderColumns[2].Header()).html()).to.equal('<span>Date paid</span>')
      expect(render(component.renderColumns[3].Header()).html()).to.equal('<span>Status</span>')
      expect(render(component.renderColumns[4].Header()).html()).to.equal('<span>Pre-approval</span>')
      expect(render(component.renderColumns[5].Header()).html()).to.equal('<span>Payment</span>')
    })

    it('has correct renderColumns accessors', () => {
      expect(component.renderColumns[0].accessor).to.equal('insuredPersonName')
      expect(component.renderColumns[1].accessor).to.equal('dateLodged')
      expect(component.renderColumns[2].accessor).to.equal('dateOfPayment')
      expect(component.renderColumns[3].accessor).to.equal('status')
      expect(component.renderColumns[4].accessor).to.equal('reference')
      expect(component.renderColumns[5].accessor).to.equal('paymentAmount')
    })

    it('has correct renderColumns headerClassNames', () => {
      expect(component.renderColumns[0].headerClassName).to.equal('is-name')
      expect(component.renderColumns[1].headerClassName).to.equal('is-submitted')
      expect(component.renderColumns[2].headerClassName).to.equal('is-date-paid')
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
              rel: 'claim-advice-document',
              url: 'aaa'
            }
          ]
        },
        value: 'value'
      })).html()).to.equal('<a target="_blank" href="aaa">value</a>')
      expect(render(component.renderColumns[5].Cell({
        value: 'value' })).html()).to.equal('<span class="is-payment">$ value</span>')
      expect(render(component.renderColumns[5].Cell({ value: '' })).html()).to.equal('<span></span>')
    })
  })
})

describe('(View) Payments - shallow', () => {
  let wrapper
  let props

  const spyHandleViewMore = sinon.spy(Payments.prototype, 'handleViewMore')

  beforeEach(() => {
    props = {
      cssName: 'payments',
      currentProviderName: '',
      isFetching: undefined,
      isListPagingNext: undefined,
      links: [],
      list: [],
      loadMorePaymentsList: () => {},
      loadPaymentsList: () => {},
      original: {},
      value: ''
    }
    wrapper = shallow(<Payments {...props} />)
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
    const spyLoadMorePaymentsList = sinon.spy(wrapper.prop('loadMorePaymentsList'))
    wrapper.setProps({
      isListPagingNext: true,
      links: [{
        rel: 'next',
        url: ''
      }],
      loadMorePaymentsList: spyLoadMorePaymentsList
    })
    expect(spyLoadMorePaymentsList.callCount).to.equal(0)
    wrapper.find(`span.${props.cssName}-trigger`).simulate('click')
    expect(spyLoadMorePaymentsList.callCount).to.equal(1)
  })

  it('loadMorePaymentsList is not triggered when links is empty', () => {
    const spyLoadMorePaymentsList = sinon.spy(wrapper.prop('loadMorePaymentsList'))
    wrapper.setProps({
      isListPagingNext: true,
      links: [],
      loadMorePaymentsList: spyLoadMorePaymentsList
    })
    expect(spyLoadMorePaymentsList.callCount).to.equal(0)
    wrapper.find(`span.${props.cssName}-trigger`).simulate('click')
    expect(spyLoadMorePaymentsList.callCount).to.equal(0)
  })
})

describe('(View) Payments - mount', () => {
  let props
  let state

  beforeEach(() => {
    props = {
      cssName: 'payments',
      currentProviderName: '',
      isFetching: undefined,
      isListPagingNext: undefined,
      links: [],
      list: [],
      loadMorePaymentsList: () => {},
      loadPaymentsList: () => {},
      original: {},
      value: ''
    }

    state = {
      limit: 50
    }
  })

  it('componentDidMount is triggered successfully upon mount', () => {
    const spyComponentDidMount = sinon.spy(Payments.prototype, 'componentDidMount')
    expect(spyComponentDidMount.callCount).to.equal(0)
    mount(<Payments {...props} {...state} />)
    expect(spyComponentDidMount.callCount).to.equal(1)
  })
})
