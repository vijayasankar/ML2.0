import React from 'react'
import AttachDocumentField from 'components/AttachDocumentField'
import ReduxFormStub from '../../ReduxFormStub'
import { render, mount, shallow } from 'enzyme'

describe('(Component) AttachDocumentField, Instantiate', () => {
  let _component

  beforeEach(() => {
    _component = new AttachDocumentField()
  })

  it('call required returning undefined', () => {
    _component.props = {}
    _component.props.required = false
    expect(_component.required()).to.equal(undefined)
  })

  it('call required returning a string', () => {
    _component.props = {}
    _component.props.required = true
    expect(_component.required()).to.equal('This document is required')
  })

  it('call renderDocumentCounts with error', () => {
    let params = {
      input: "input",
      controlId: "123",
      meta: { touched: true, error: "error", warning: false }
    }

    const renderedComponent = render(_component.renderDocumentCounts({...params}))
    expect(renderedComponent.find('span')).to.exist
  })

  it('call renderDocumentCounts with error', () => {
    let params = {
      input: "input",
      controlId: "123",
      meta: { touched: true, error: false, warning: false }
    }

    const renderedComponent = render(_component.renderDocumentCounts({...params}))
    expect(renderedComponent.find('span')).to.not.exist
  })
})


describe('(Component) AttachDocumentField, Mount', () => {
  let _component

  sinon.spy(AttachDocumentField.prototype, 'componentDidMount')
  const change = sinon.spy()
  const props = {
    change
  }

  beforeEach(() => {
    _component = mount(
      <ReduxFormStub>
      <AttachDocumentField {...props} />
    </ReduxFormStub>
    )
  })


  it('calls componentDidUpdate and change props', () => {
    expect(change.callCount).to.equal(1)
    expect(AttachDocumentField.prototype.componentDidMount.callCount).to.equal(1)
  })
})
