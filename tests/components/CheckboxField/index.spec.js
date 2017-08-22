import React from 'react'
import CheckboxField from 'components/CheckboxField'
import ReduxFormStub from '../../ReduxFormStub'
import { mount, shallow } from 'enzyme'

describe('(Component) CheckboxField, Shallow', () => {
  let component

  const initProps = {
    cssName: 'theCssName',
    name: 'theName',
  }

  beforeEach(() => {
    component = shallow(<CheckboxField {...initProps} />)
  })

  // todo: need to validate the child nodes using props (i.e. the field and the label child nodes)
  // i.e. the test should read it('should render the root div and child nodes correctly', () => {
  it('should render root div correctly', () => {
    // todo: use enzyme to find component using a more precise match.  This bit of code will pass even if hasNoLabel is true
    const props = {
      ...initProps
    }
    const wrapper = component.find(`div.${props.cssName}-form-group.is-${props.name}`).not(`div.has-no-label`)
    expect(wrapper).to.exist
  })

  // todo: need to validate the child nodes using props (i.e. the field and the label child nodes)
  // i.e. the test should read it('should render the root div and child nodes correctly with hasNoLabel property set', () => {
  it('should render root div correctly with hasNoLabel property set', () => {
    const props = {
      ...initProps,
      hasNoLabel: true
    }
    component.setProps({...props})
    const wrapper = component.find(`div.${props.cssName}-form-group.is-${props.name}.has-no-label`)
    expect(wrapper).to.exist
  })

  it('should render Field (child Node) correctly', () => {
    const props = {
      ...initProps,
      value: "someValue",
      fieldName: "someFieldName"
    }
    component.setProps({...props})
    const wrapper = component.find(`Field[component="input"][id="${props.name}-${props.value}"][name="${props.fieldName}"][type="checkbox"][value="${props.value}"]`)
    expect(wrapper).to.exist
  })

  it('should render label (child Node) correctly', () => {
    const props = {
      ...initProps,
      value: "someValue"
    }
    component.setProps({...props})
    const wrapper = component.find(`label[htmlFor="${props.name}-${props.value}"]`)
    expect(wrapper).to.exist
  })
})
