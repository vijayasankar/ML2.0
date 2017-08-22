import HomeView from 'routes/Home/components/HomeView'
import Link from 'react-router/lib/Link'
import React from 'react'
import { shallow, render, mount } from 'enzyme'

import ReduxFormStub from '../../../ReduxFormStub'

describe('(View) HomeView - instantiate', () => {
  let component

  beforeEach(() => {
    component = new HomeView()
  })

  describe('tests for correct constructor', () => {
    it('has a limit of 15', () => {
      expect(component.limit).to.equal(6)
    })

    it('has 6 columns', () => {
      expect(component.renderPreApprovalsColumns).to.have.length(6)
      expect(component.renderPaymentsColumns).to.have.length(6)
    })

    describe('for this.renderPreApprovalsColumns', () => {
      it('has correct headers', () => {
        expect(render(component.renderPreApprovalsColumns[0].Header()).html()).to.equal('<span>Name</span>')
        expect(render(component.renderPreApprovalsColumns[1].Header()).html()).to.equal('<span>Submitted</span>')
        expect(render(component.renderPreApprovalsColumns[2].Header()).html()).to.equal('<span>Proposed date</span>')
        expect(render(component.renderPreApprovalsColumns[3].Header()).html()).to.equal('<span>Status</span>')
        expect(render(component.renderPreApprovalsColumns[4].Header()).html()).to.equal('<span>Pre-approval</span>')
        expect(render(component.renderPreApprovalsColumns[5].Header()).html()).to.equal('<span>Payment</span>')
      })

      it('has correct accessor', () => {
        expect(component.renderPreApprovalsColumns[0].accessor).to.equal('insuredPersonName')
        expect(component.renderPreApprovalsColumns[1].accessor).to.equal('dateLodged')
        expect(component.renderPreApprovalsColumns[2].accessor).to.equal('proposedDateOfProcedure')
        expect(component.renderPreApprovalsColumns[3].accessor).to.equal('status')
        expect(component.renderPreApprovalsColumns[4].accessor).to.equal('reference')
        expect(component.renderPreApprovalsColumns[5].accessor).to.equal('payment')
      })

      it('has correct headerClassName', () => {
        expect(component.renderPreApprovalsColumns[0].headerClassName).to.equal('is-name')
        expect(component.renderPreApprovalsColumns[1].headerClassName).to.equal('is-submitted')
        expect(component.renderPreApprovalsColumns[2].headerClassName).to.equal('is-proposed-date')
        expect(component.renderPreApprovalsColumns[3].headerClassName).to.equal('is-status')
        expect(component.renderPreApprovalsColumns[4].headerClassName).to.equal('is-pre-approval-number')
        expect(component.renderPreApprovalsColumns[5].headerClassName).to.equal('is-payment')
      })

      it('has correct cells', () => {
        expect(component.renderPreApprovalsColumns[0].Cell).to.not.exist
        expect(render(component.renderPreApprovalsColumns[1].Cell({ value: '' })).html()).to.equal('<div></div>')
        expect(render(component.renderPreApprovalsColumns[2].Cell({ value: '' })).html()).to.equal('<div></div>')
        expect(component.renderPreApprovalsColumns[3].Cell).to.not.exist
        expect(render(component.renderPreApprovalsColumns[4].Cell({
          original: {}
        })).html()).to.equal('<span></span>')
        expect(render(component.renderPreApprovalsColumns[4].Cell({
          original: {},
          value: 'value'
        })).html()).to.equal('<span>value</span>')
        expect(render(component.renderPreApprovalsColumns[4].Cell({
          original: {
            links: []
          },
          value: 'value'
        })).html()).to.equal('<span>value</span>')
        expect(render(component.renderPreApprovalsColumns[4].Cell({
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
        expect(render(component.renderPreApprovalsColumns[4].Cell({
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
        expect(render(component.renderPreApprovalsColumns[4].Cell({
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
        expect(render(component.renderPreApprovalsColumns[5].Cell({ value: '' })).html()).to.equal('<span>Request payment</span>')
        expect(render(component.renderPreApprovalsColumns[5].Cell({
          value: 'Approved',
          original: {
            links: []
          }
        })).html()).to.equal('<span>Request payment</span>')
        expect(render(component.renderPreApprovalsColumns[5].Cell({
          value: '',
          original: {
            reference: undefined
          }
        })).html()).to.equal('<span>Request payment</span>')
        expect(render(component.renderPreApprovalsColumns[5].Cell({
          value: '',
          original: {
            reference: 123
          }
        })).html()).to.equal('<span>Request payment</span>')
        expect(render(component.renderPreApprovalsColumns[5].Cell({
          value: '',
          original: {
            reference: null
          }
        })).html()).to.equal('<span>Request payment</span>')
        expect(component.renderPreApprovalsColumns[5].Cell({
          value: '',
          original: {
            reference: 'aaa'
          }
        })).to.deep.equal(<Link to={`/providerportal/request-payment?preApprovalNumber=aaa`}>Request payment</Link>)
      })
    })

    describe('for this.renderPaymentsColumns', () => {
      it('has correct headers', () => {
        expect(render(component.renderPaymentsColumns[0].Header()).html()).to.equal('<span>Name</span>')
        expect(render(component.renderPaymentsColumns[1].Header()).html()).to.equal('<span>Submitted</span>')
        expect(render(component.renderPaymentsColumns[2].Header()).html()).to.equal('<span>Date paid</span>')
        expect(render(component.renderPaymentsColumns[3].Header()).html()).to.equal('<span>Status</span>')
        expect(render(component.renderPaymentsColumns[4].Header()).html()).to.equal('<span>Pre-approval</span>')
        expect(render(component.renderPaymentsColumns[5].Header()).html()).to.equal('<span>Payment</span>')
      })

      it('has correct cells', () => {
        expect(component.renderPaymentsColumns[0].Cell).to.not.exist
        expect(render(component.renderPaymentsColumns[1].Cell({ value: '' })).html()).to.equal('<div></div>')
        expect(render(component.renderPaymentsColumns[2].Cell({ value: '' })).html()).to.equal('<div></div>')
        expect(component.renderPaymentsColumns[3].Cell).to.not.exist
        expect(render(component.renderPaymentsColumns[4].Cell({
          original: {}
        })).html()).to.equal('<span></span>')
        expect(render(component.renderPaymentsColumns[4].Cell({
          original: {},
          value: 'value'
        })).html()).to.equal('<span>value</span>')
        expect(render(component.renderPaymentsColumns[4].Cell({
          original: {
            links: []
          },
          value: 'value'
        })).html()).to.equal('<span>value</span>')
        expect(render(component.renderPaymentsColumns[4].Cell({
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
        expect(render(component.renderPaymentsColumns[4].Cell({
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
        expect(render(component.renderPaymentsColumns[4].Cell({
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
        expect(render(component.renderPaymentsColumns[5].Cell({ value: '' })).html()).to.equal('<span></span>')
        expect(render(component.renderPaymentsColumns[5].Cell({ value: 'something' })).html()).to.equal('<span class="is-payment">$ something</span>')
      })

      it('has correct accessor', () => {
        expect(component.renderPaymentsColumns[0].accessor).to.equal('insuredPersonName')
        expect(component.renderPaymentsColumns[1].accessor).to.equal('dateLodged')
        expect(component.renderPaymentsColumns[2].accessor).to.equal('dateOfPayment')
        expect(component.renderPaymentsColumns[3].accessor).to.equal('status')
        expect(component.renderPaymentsColumns[4].accessor).to.equal('reference')
        expect(component.renderPaymentsColumns[5].accessor).to.equal('paymentAmount')
      })

      it('has correct headerClassName', () => {
        expect(component.renderPaymentsColumns[0].headerClassName).to.equal('is-name')
        expect(component.renderPaymentsColumns[1].headerClassName).to.equal('is-submitted')
        expect(component.renderPaymentsColumns[2].headerClassName).to.equal('is-date-paid')
        expect(component.renderPaymentsColumns[3].headerClassName).to.equal('is-status')
        expect(component.renderPaymentsColumns[4].headerClassName).to.equal('is-pre-approval-number')
        expect(component.renderPaymentsColumns[5].headerClassName).to.equal('is-payment')
      })
    })
  })
})

describe('(View) HomeView - shallow', () => {
  let wrapper
  let props

  const spyLoadHomeLists = sinon.spy()

  beforeEach(() => {
    props = {
      cssName: 'home',
      currentProvider: {
        name: ''
      },
      currentProviderDetails: {},
      loadHomeLists: spyLoadHomeLists,
      loadPaymentsList: () => {},
      loadPreApprovalsList: () => {},
      value: ''
    }
    wrapper = shallow(<HomeView {...props} />)
  })

  it('renders correct h1', () => {
    wrapper.setProps({ currentProvider: { name: 'Provider Name' } })
    expect(wrapper.find('h1').text()).to.equal('Provider Name')
  })

  it('has componentDidMount which calls prop loadHomeLists if there is a prop currentProviderDetails', () => {
    wrapper.instance().componentDidMount()
    expect(spyLoadHomeLists.callCount).to.equal(0)
    wrapper.setProps({ currentProviderDetails: {} })
    wrapper.instance().componentDidMount()
    expect(spyLoadHomeLists.callCount).to.equal(0)
    wrapper.setProps({ currentProviderDetails: { id: undefined } })
    wrapper.instance().componentDidMount()
    expect(spyLoadHomeLists.callCount).to.equal(0)
    wrapper.setProps({ currentProviderDetails: { id: 123 } })
    wrapper.instance().componentDidMount()
    expect(spyLoadHomeLists.callCount).to.equal(0)
    wrapper.setProps({ currentProviderDetails: { id: '' } })
    wrapper.instance().componentDidMount()
    expect(spyLoadHomeLists.callCount).to.equal(0)
    wrapper.setProps({ currentProviderDetails: { id: 'aaa' } })
    wrapper.instance().componentDidMount()
    expect(spyLoadHomeLists.callCount).to.equal(1)
  })

  it('renders pre-approvals section if currentProvider is a specialist', () => {
    expect(wrapper.find(`section.${props.cssName}__pre-approvals-section`)).to.not.exist
    wrapper.setProps({
      currentProvider: {
        name: 'Provider Name'
      },
      currentProviderDetails: {
        serviceTypes: 'Specialist'
      },
      preApprovalsList: [],
      paymentsList: []
    })
    expect(wrapper.find(`section.${props.cssName}__pre-approvals-section`)).to.exist
  })

  it('prints out error messages for both preapprovals and payment', () => {
    expect(wrapper.find(`div.${props.cssName}__pre-approvals-list-message`)).to.not.exist
    expect(wrapper.find(`div.${props.cssName}__payments-list-message`)).to.not.exist
    wrapper.setProps({
      currentProvider: {
        name: 'Provider Name'
      },
      currentProviderDetails: {
        serviceTypes: 'Specialist'
      },
      preApprovalsList: [],
      paymentsList: []
    })
    expect(wrapper.find(`div.${props.cssName}__pre-approvals-list-message`)).to.exist
    expect(wrapper.find(`div.${props.cssName}__payments-list-message`)).to.exist
  })

  it('prints out two unique ReactTables when the lists are populated', () => {
    expect(wrapper.find('ReactTable').find({ data: [{ name: 'preApprovals' }] })).to.have.length(0)
    expect(wrapper.find('ReactTable').find({ data: [{ name: 'payments' }] })).to.have.length(0)
    wrapper.setProps({
      currentProvider: {
        name: 'Provider Name'
      },
      currentProviderDetails: {
        serviceTypes: 'Specialist'
      },
      preApprovalsList: [{
        name: 'preApprovals'
      }],
      paymentsList: [{
        name: 'payments'
      }]
    })
    expect(wrapper.find('ReactTable').find({ data: [{ name: 'preApprovals' }] })).to.have.length(1)
    expect(wrapper.find('ReactTable').find({ data: [{ name: 'payments' }] })).to.have.length(1)
  })

  it('prints out two "View all" links when two ReactTables are rendered (per table)', () => {
    expect(wrapper.find('Link.is-pre-approvals')).to.have.length(0)
    expect(wrapper.find('Link.is-payments')).to.have.length(0)
    wrapper.setProps({
      currentProvider: {
        name: 'Provider Name'
      },
      currentProviderDetails: {
        serviceTypes: 'Specialist'
      },
      preApprovalsList: [{
        name: 'preApprovals'
      }],
      paymentsList: [{
        name: 'payments'
      }]
    })
    expect(wrapper.find('Link.is-pre-approvals')).to.have.length(1)
    expect(wrapper.find('Link.is-payments')).to.have.length(1)
  })
})

describe('(View) HomeView - mount', () => {
  let props
  let state

  beforeEach(() => {
    props = {
      cssName: 'home',
      currentProvider: {
        name: ''
      },
      currentProviderDetails: {},
      loadHomeLists: () => {},
      loadPaymentsList: () => {},
      loadPreApprovalsList: () => {},
      value: ''
    }

    state = {}
  })

  it('componentDidMount is triggered successfully upon mount', () => {
    const spyComponentDidMount = sinon.spy(HomeView.prototype, 'componentDidMount')
    expect(spyComponentDidMount.callCount).to.equal(0)
    mount(<ReduxFormStub><HomeView {...props} {...state} /></ReduxFormStub>)
    expect(spyComponentDidMount.callCount).to.equal(1)
  })
})
