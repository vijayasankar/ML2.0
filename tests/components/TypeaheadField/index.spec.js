import React from 'react'
import TypeaheadField from 'components/TypeaheadField'
import ReduxFormStub from '../../ReduxFormStub'
import { render, mount, shallow } from 'enzyme'

describe('(Component) TypeaheadField, Instantiate', () => {
  let _component

  beforeEach(() => {
    _component = new TypeaheadField()
  })

  it('call renderAsyncTypeahead without error', () => {
    let params = {
      input: "input",
      controlId: "123",
      meta: { touched: true, error: null, warning: false }
    }

    _component.props = {
      fromToday: true,
      untilToday: true,
      radioList: []
    }

    const renderedComponent = render(_component.renderAsyncTypeahead({...params}))
    expect(renderedComponent.find('span.error-message')).to.not.exist
  })

  it('call renderAsyncTypeahead with error', () => {
    let params = {
      input: "input",
      controlId: "123",
      meta: { touched: true, error: "error", warning: false }
    }

    _component.props = {
      fromToday: true,
      untilToday: true,
      radioList: []
    }

    const renderedComponent = render(_component.renderAsyncTypeahead({...params}))
    expect(renderedComponent.find('span.error-message')).to.exist
  })

  it('call renderMenuItemChildren', () => {
    const renderedComponent = render(_component.renderMenuItemChildren({name: "test"}))
    expect(renderedComponent.find('div')).to.have.length(1)
    expect(renderedComponent.find('span')).to.have.length(1)
  })

  it('componentWillUpdate - calls change props', () => {
    const change = sinon.spy()

    const updateProps = {
      anyProp: "any",
      change
    }
    _component.props = {}
    _component.props.change = change
    _component.componentWillUpdate(updateProps, {searchList: ["anItem"]})
    expect(change.callCount).to.equal(1)
  })

  it('componentWillUpdate - not call change props', () => {
    const change = sinon.spy()

    const updateProps = {
      anyProp: "any",
      change
    }
    _component.props = {}
    _component.props.change = change
    _component.componentWillUpdate(updateProps, {searchList: []})
    expect(change.callCount).to.equal(0)
  })

})

describe('(Component) TypeaheadField, Shallow', () => {
  let _component

  const props = {
    cssName: 'theCssName',
    name: 'theName',
  }

  beforeEach(() => {
    _component = shallow(<TypeaheadField {...props} />)
  })

  it('renders root div with expected class names', () => {
    expect(_component.find('Field')).to.have.length(1)
  })

})

describe('(Component) TypeaheadField, Mount', () => {
  let _component

  sinon.spy(TypeaheadField.prototype, 'componentDidMount')

  it('componentDidMount - calls change props with null fieldName', () => {
    const change = sinon.spy()
    const props = {
      stateValue: "stateValue",
      change
    }
    _component = mount(
      <ReduxFormStub>
      <TypeaheadField {...props} />
    </ReduxFormStub>
    )
    expect(TypeaheadField.prototype.componentDidMount.called).to.equal(true)
    expect(change.calledWith(undefined, [props.stateValue])).to.equal(true)
  })

  it('componentDidMount - calls change props with fieldName from member and fieldName props ', () => {
    const change = sinon.spy()
    const props = {
      stateValue: "stateValue",
      member: "memName",
      fieldName: "fName",
      change
    }
    _component = mount(
      <ReduxFormStub>
        <TypeaheadField {...props} />
      </ReduxFormStub>
    )
    expect(TypeaheadField.prototype.componentDidMount.called).to.equal(true)
    expect(change.calledWith(props.member+'.'+props.fieldName, [props.stateValue])).to.equal(true)
  })

  it('componentDidMount - calls change props with fieldName from fieldName props only', () => {
    const change = sinon.spy()
    const props = {
      stateValue: "stateValue",
      fieldName: "fieldName",
      change
    }
    _component = mount(
      <ReduxFormStub>
      <TypeaheadField {...props} />
    </ReduxFormStub>
    )
    expect(TypeaheadField.prototype.componentDidMount.called).to.equal(true)
    expect(change.calledWith(props.fieldName, [props.stateValue])).to.equal(true)
  })

  it('componentDidMount - not call change props', () => {
    const change = sinon.spy()
    const props = {
      change
    }
    _component = mount(
      <ReduxFormStub>
        <TypeaheadField {...props} />
      </ReduxFormStub>
    )

    expect(TypeaheadField.prototype.componentDidMount.called).to.equal(true)
    expect(change.callCount).to.equal(0)
  })
})
