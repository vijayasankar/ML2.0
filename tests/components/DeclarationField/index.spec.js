import React from 'react'
import DeclarationField from 'components/DeclarationField'
import { shallow } from 'enzyme'

// TODO Need to unit test renderDeclaration method of Declaration field
// Current challenge is it returns a CheckboxField which contains a Field which needs
// to be wrapped in a redux form container.
// We can probably do a mount and have a ReduxFormStub contain Declaration field.
// Then make sure that selector for components rendered under renderDeclaration are unique

describe('(Component) DeclarationField, Shallow', () => {
  let component

  const initProps = {
    cssName: 'theCssName',
    name: 'theName',
    fieldName: 'fieldName',
  }

  beforeEach(() => {
    component = shallow(<DeclarationField {...initProps}/>)
  })

  it.skip('should render root div correctly', () => {
    const props = {
      ...initProps
    }
    const wrapper = component.find(`div.${props.cssName}-form-group.is-${props.name}`)
    expect(wrapper).to.exist
  })


  it('should render Field (child Node) correctly', () => {
    const props = {
        ...initProps
    }
    component.setProps({...props})
    const wrapper = component.find(`Field[name="${props.fieldName}"][className="${props.cssName}-form-group-input-checkbox is-${props.name}"][classNameError="${props.cssName}-form-group-error is-${props.name}"][componentCssName="${props.cssName}"][componentName="${props.name}"]`)
    expect(wrapper).to.exist
  })

})
