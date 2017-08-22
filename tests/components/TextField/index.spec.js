import React from 'react'
import TextField from 'components/TextField'
import { render, shallow, mount } from 'enzyme'

describe('(Component) TextField, Instantiate', () => {
  let component

  beforeEach(() => {
    component = new TextField()
    component.props = {}
  })

  // TODO call handleClearTextInput then spy on change to be called and have first fieldName be the first Argument

  it('renderTextInput should render root FormGroup correctly with error property NOT set', () => {
    let params = {
      input: {},
      controlId: "anId",
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

  it('renderTextInput should NOT render span.text-input-clear-trigger (child node) with input.value is empty', () => {
    let params = {
      input: { value: "" },
      meta: { error: null },
      classNameError: "class-name-error"
    }

    const renderedComponent = render(component.renderTextInput({...params}))
    expect(renderedComponent.find(`span.text-input-clear-trigger`)).to.not.exist
  })

  it.skip('renderTextInput should NOT render span.text-input-clear-trigger (child node) with input.value is NOT set', () => {
    // TODO check if we need to handle when value.input is undefined.
    let params = {
      input: {},
      meta: {}
    }

    const renderedComponent = render(component.renderTextInput({...params}))
    expect(renderedComponent.find(`span.text-input-clear-trigger`)).to.not.exist
  })

  it('renderTextInput should render span.text-input-clear-trigger (child node) correctly with input.value set', () => {
    let params = {
      input: {},
      meta: {}
    }
    const props = {
      cssName: "aCssName",
      name: "aName"
    }
    component.props = {
        ...props
    }
    const renderedComponent = render(component.renderTextInput({...params}))
    expect(renderedComponent.find(`span.text-input-clear-trigger.${props.cssName}-form-group-clear-trigger.is-${props.name}`)).to.exist
  })

  it('renderTextInput should NOT render span.error-message (child node) with error property NOT set', () => {
    let params = {
      input: {},
      meta: {}
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
    expect(renderedComponent.find(`span.error-message.${params.classNameError}`)).to.exist
  })
})

describe('(Component) TextField - Shallow', () => {
  let component

  const initProps = {
    cssName: 'theCssName',
    name: 'theName',
    fieldName: 'fieldName',
    placeholderText: 'placeHolder'
  }

  beforeEach(() => {
    component = shallow(<TextField {...initProps}/>)
  })

  it('should render root div correctly', () => {
    const props = {
      ...initProps
    }
    const wrapper = component.find(`div.${props.cssName}-field-wrapper.is-${props.name}`)
    expect(wrapper).to.exist
  })

  it('should render Field (child Node) correctly', () => {
    const props = {
      ...initProps
    }
    component.setProps({...props})
    const wrapper = component.find(`Field[className="${props.cssName}-form-group-input-text is-${props.name}"][name="${props.fieldName}"][componentName="${props.name}"][classNameError="${props.cssName}-form-group-error is-${props.name}"][componentCssName="${props.cssName}"][placeholder="${props.placeholderText}"]`)
    expect(wrapper).to.exist
  })
})

