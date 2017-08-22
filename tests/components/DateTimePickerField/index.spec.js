import React from 'react'
import DateTimePickerField from 'components/DateTimePickerField'
import { render, shallow } from 'enzyme'

describe('(Component) DateTimePickerField, Instantiate', () => {
  let component

  beforeEach(() => {
    component = new DateTimePickerField()
    component.props = {}
  })

  // As reference. Sample renderDateTimePicker html:
  // <div class="form-group has-error">
  //  <div tabindex="-1" class="rw-datetimepicker rw-widget">
  //    <input type="text" id="rw_32_input" role="combobox"
  //          placeholder="DD / MM / YYYY" aria-haspopup="true" aria-expanded="false" aria-busy="false"
  //          aria-owns="rw_32_cal" tabindex="0" autocomplete="off" value="" class="rw-input">
  //      <span class="rw-select">
  //        <button tabindex="-1" title="Select Date" type="button" aria-disabled="false"
  //          aria-label="Select Date" class="rw-btn-calendar rw-btn">
  //          <span aria-hidden="true" class="rw-i rw-i-calendar"></span>
  //        </button>
  //      </span>
  //  </div>
  //  <span class="error-message classNameError">error</span>
  // </div>
  it('renderDateTimePicker should render root FormGroup correctly with error property NOT set', () => {
    let params = {
      input: {},
      meta: { error: null }
    }

    const renderedComponent = render(component.renderDateTimePicker({...params}))
    const wrapper = renderedComponent.find(`div.form-group`).not('div.has-error')
    expect(wrapper).to.exist
  })

  it('renderDateTimePicker should render root FormGroup (child node) correctly with error property set', () => {
    let params = {
      input: {},
      meta: { error: 'error' }
    }

    const renderedComponent = render(component.renderDateTimePicker({...params}))
    const wrapper = renderedComponent.find(`div.form-group.has-error`)
    expect(wrapper).to.exist
  })

  it.skip('renderDateTimePicker should render DateTimePicker (child node) with correct props', () => {
    // TODO We need to check assumptions on props passed unto DateTimePicker
    // This can be done by refactoring source code to have local variable props for renderDateTimePicker method to be a function.
    // Probably call it getPropsForDateTimePicker()
    //        <DateTimePicker {...getPropsForDateTimePicker()} />
    // We can then spy on getPropsForDateTimePicker() and test our assumptions.

    const spyGetPropsForDateTimePicker = sinon.spy(componentcomponent.getPropsForDateTimePicker)
    component.renderDateTimePicker({...params})
    expect(spyGetPropsForDateTimePicker.returnValue).to.equal({
      // our assumed object
    })
  })

  it('renderDateTimePicker should NOT render span.error-message (child node) with error property NOT set', () => {
    let params = {
      input: {},
      meta: { error: null },
      classNameError: "class-name-error"
    }

    const renderedComponent = render(component.renderDateTimePicker({...params}))
    expect(renderedComponent.find(`span.error-message.${params.classNameError}`)).to.not.exist
  })

  it('renderDateTimePicker should render span.error-message (child node) correctly with error property set', () => {
    let params = {
      input: {},
      meta: { error: 'error' },
      classNameError: "class-name-error"
    }

    const renderedComponent = render(component.renderDateTimePicker({...params}))
    expect(renderedComponent.find('span.error-message')).to.exist
  })
})

describe('(Component) DateTimePickerField, Shallow', () => {
  let component

  const initProps = {
    cssName: 'theCssName',
    name: 'theName',
  }

  beforeEach(() => {
    component = shallow(<DateTimePickerField {...initProps}/>)
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
      ...initProps,
      fieldName: "someFieldName"
    }
    component.setProps({...props})
    const wrapper = component.find(`Field[className="${props.cssName}-form-group-datetime-picker is-${props.name}"][classNameError="${props.cssName}-form-group-error is-${props.name}"][name="${props.fieldName}"]`)
    expect(wrapper).to.exist
  })
})
