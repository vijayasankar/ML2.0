import React from 'react'
import RadioGroupField from 'components/RadioGroupField'
import { render, shallow } from 'enzyme'



describe('(Component) RadioGroupField, Instantiate', () => {
  let component

  beforeEach(() => {
    component = new RadioGroupField()
    component.props = {}
  })
  // TODO need to figure out how to test Field component
  // For now able to test components with radioList as an empty array.

  it('renderRadioGroup should render root FormGroup correctly with error property NOT set', () => {
    let params = {
      input: {},
      meta: { error: null }
    }
    component.props = {
      radioList: []
    }

    const renderedComponent = render(component.renderRadioGroup({...params}))
    const wrapper = renderedComponent.find(`div.form-group`).not('div.has-error')
    expect(wrapper).to.exist
  })

  it('renderRadioGroup should render root FormGroup (child node) correctly with error property set', () => {
    let params = {
      input: {},
      meta: { error: 'error' },
    }
    component.props = {
      radioList: []
    }

    const renderedComponent = render(component.renderRadioGroup({...params}))
    const wrapper = renderedComponent.find(`div.form-group.has-error`)
    expect(wrapper).to.exist
  })

  it('renderRadioGroup should NOT render span.error-message (child node) with error property NOT set', () => {
    let params = {
      input: {},
      meta: { error: null },
    }
    component.props = {
      radioList: [],
      classNameError: "class-name-error"
    }

    const renderedComponent = render(component.renderRadioGroup({...params}))
    expect(renderedComponent.find(`span.error-message.${params.classNameError}`)).to.not.exist
  })

  it('renderRadioGroup should render span.error-message (child node) correctly with error property set', () => {
    let params = {
      input: {},
      meta: { error: 'error' }
    }
    component.props = {
      radioList: [],
      classNameError: "class-name-error"
    }
    const renderedComponent = render(component.renderRadioGroup({...params}))
    expect(renderedComponent.find('span.error-message')).to.exist
  })
})

describe('(Component) RadioGroupField, Shallow', () => {
  let component

  const initProps = {
    cssName: 'theCssName',
    name: 'theName',
    fieldName: 'fieldName',
    radioList: []
  }

  beforeEach(() => {
    component = shallow(<RadioGroupField {...initProps}/>)
  })

  it.skip('should render root div correctly with radioList property not set', () => {
    // TODO code base should probably handle radioList property not set or have it as required on propTypes
    const props = {
      ...initProps
    }
    const wrapper = component.find(`div.${props.cssName}-form-group.is-${props.name}.is-col-1`).not(`div.has-no-label`)
    expect(wrapper).to.exist
  })

  it('should render root div correctly with radioList property set to an empty array', () => {
    const props = {
        ...initProps,
        radioList: []
    }
    component.setProps({...props})
    const wrapper = component.find(`div.${props.cssName}-form-group.is-${props.name}.is-col-1`).not(`div.has-no-label`)
    expect(wrapper).to.exist
  })

  it('should render root div correctly with radioList property set to a populated array', () => {
    const props = {
      ...initProps,
    radioList: ["test","test","test"]
  }
    component.setProps({...props})
    const wrapper = component.find(`div.${props.cssName}-form-group.is-${props.name}.is-col-${props.radioList.length}`).not(`div.has-no-label`)
    expect(wrapper).to.exist
  })
  it('should render root div correctly with hasNoLabel property set', () => {
    const props = {
      ...initProps,
    radioList: ["test","test"],
    hasNoLabel: true
  }
    component.setProps({...props})
    const wrapper = component.find(`div.${props.cssName}-form-group.is-${props.name}.is-col-${props.radioList.length}.has-no-label`)
    expect(wrapper).to.exist
  })

  it('should render Field (child Node) correctly', () => {
    const props = {
        ...initProps
    }
    component.setProps({...props})
    const wrapper = component.find
    (`Field[name="${props.fieldName}"][className="${props.cssName}-form-group-input-radio-group is-${props.name}"][classNameError="${props.cssName}-form-group-error is-${props.name}"][componentCssName="${props.cssName}"][componentName="${props.name}"]`)
    expect(wrapper).to.exist
  })

})
