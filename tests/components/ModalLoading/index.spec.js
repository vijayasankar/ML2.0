import React from 'react'
import ModalLoading from 'components/ModalLoading/ModalLoading'
import { shallow } from 'enzyme'

describe('(Component) NumberDialField', () => {
  beforeEach(() => {
  })

  it('Renders null when there is currentProviderDetails', () => {
    const currentProviderDetailsObj = {
      currentProviderDetails: {
        id: 12345
      }
    }
    const _component = shallow(<ModalLoading {...currentProviderDetailsObj} />)
    expect(_component).to.exist
    const wrapper = _component.find('.modal__loading')
    expect(wrapper).to.not.exist
  })

  it('Renders when there is no currentProviderDetails', () => {
    const _component = shallow(<ModalLoading />)
    expect(_component).to.exist
    const wrapper = _component.find('.modal__loading')
    expect(wrapper).to.exist
  })
})
