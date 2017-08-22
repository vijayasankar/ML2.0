import React from 'react'
import DollarTextField from 'components/DollarTextField'
import ReduxFormStub from '../../ReduxFormStub'
import { render, mount, shallow } from 'enzyme'


describe('(Component) DollarTextField, Instantiate', () => {
  let component

  beforeEach(() => {
    component = new DollarTextField()
    component.props = {}
  })

  it('renderTextInput should render root FormGroup correctly with error property NOT set', () => {
    let params = {
      input: {},
      meta: { error: null }
    }

    const renderedComponent = render(component.renderTextInput({...params}))
    const wrapper = renderedComponent.find(`div.form-group`).not('div.has-error')
    expect(wrapper).to.exist
  })

  it('renderTextInput should render root FormGroup (child node) correctly with error property set', () => {
    let params = {
      input: {},
      meta: { error: 'error' }
    }

    const renderedComponent = render(component.renderTextInput({...params}))
    const wrapper = renderedComponent.find(`div.form-group.has-error`)
    expect(wrapper).to.exist
  })

  it.skip('renderTextInput should render FormControl (child node) with correct props', () => {
    // TODO Need more investigation on props are used and passed down FormControl
  })

  it('renderTextInput should NOT render span.error-message (child node) with error property NOT set', () => {
    let params = {
      input: {},
      meta: { error: null },
      classNameError: "class-name-error"
    }

    const renderedComponent = render(component.renderTextInput({...params}))
    expect(renderedComponent.find(`span.error-message.${params.classNameError}`)).to.not.exist
  })

  it('renderTextInput should render span.error-message (child node) correctly with error property set', () => {
    let params = {
      input: {},
      meta: { error: 'error' },
      classNameError: "class-name-error"
    }

    const renderedComponent = render(component.renderTextInput({...params}))
    expect(renderedComponent.find('span.error-message')).to.exist
  })
})

describe('(Component) DollarTextField, Shallow', () => {
  let component

  const initProps = {
    cssName: 'theCssName',
    name: 'theName',
    fieldName: 'fieldName',
    placeholderText: 'placeHolder'
  }

  beforeEach(() => {
    component = shallow(<DollarTextField {...initProps}/>)
  })

  it('should render root div correctly', () => {
    const props = {
      ...initProps
  }
    const wrapper = component.find(`div.${props.cssName}-field-wrapper.is-${props.name}`).not(`div.has-no-label`)
    expect(wrapper).to.exist
  })

  it('should render root div correctly with hasNoLabel property set', () => {
    const props = {
      ...initProps,
    hasNoLabel: true
  }
    component.setProps({...props})
    const wrapper = component.find(`div.${props.cssName}-field-wrapper.is-${props.name}.has-no-label`)
    expect(wrapper).to.exist
  })

  it('should render Field (child Node) correctly', () => {
    const props = {
      ...initProps
    }
    component.setProps({...props})
    const wrapper = component.find(`Field[name="${props.fieldName}"][className="${props.cssName}-form-group-input  is-${props.name} text-right"][placeholder="${props.placeholderText}"]`)
    expect(wrapper).to.exist
  })

  it('should render Field (child Node) correctly with member property set', () => {
    const props = {
        ...initProps,
        member: "member"
      }
      component.setProps({...props})
      const wrapper = component.find(`Field[name="${props.member}.${props.fieldName}"][className="${props.cssName}-form-group-input  is-${props.name} text-right"][placeholder="${props.placeholderText}"]`)
      expect(wrapper).to.exist
  })

})

describe('(Component) DollarTextField, Mount', () => {
  let component

  const spyComponentDidUpdate = sinon.spy(DollarTextField.prototype, 'componentDidUpdate')
  const spyChange = sinon.spy()

  const initProps = {
    name: "aName",
    value: "initValue",
    change: spyChange
  }

  beforeEach(() => {
    component = mount(
      <ReduxFormStub>
        <DollarTextField {...initProps} />
      </ReduxFormStub>
    )
  })

  afterEach(() => {
    spyChange.reset()
    spyComponentDidUpdate.reset()
  })

  it('should call componentDidUpdate and not change props', () => {
    const props = {
      name: "newName",
      change: spyChange
    }
    component.setProps({fieldComponentProps: props})
    expect(spyChange.called).to.equal(false)
    expect(DollarTextField.prototype.componentDidUpdate.callCount).to.equal(1)
  })

  it('should call componentDidUpdate and change props', () => {
    const updatedProps = {
      name: "aName",
      value: "newValue",
      change: spyChange
    }

    component.setProps({fieldComponentProps: updatedProps})
    expect(spyChange.callCount).to.equal(1)
    expect(DollarTextField.prototype.componentDidUpdate.callCount).to.equal(1)
  })
})
