import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import { AttachDocuments } from 'routes/RequestPreApproval/components/AttachDocuments'

describe('(Component) AttachDocuments - shallow', () => {
  let wrapper
  let props

  beforeEach(() => {
    props = {
      cssName: '',
      docBundle: {},
      isAccRelated: undefined
    }
    wrapper = shallow(<AttachDocuments {...props} />)
  })

  it('renders correct heading', () => {
    expect(wrapper.find('h3').text()).to.equal('Attach documents')
  })

  it('renders three AttachDocumentField', () => {
    wrapper.setProps({ isAccRelated: false })
    expect(wrapper.find('AttachDocumentField')).to.have.length(3)
  })

  it('three AttachDocumentFields are all unique', () => {
    wrapper.setProps({ isAccRelated: false })
    expect(wrapper.find('AttachDocumentField').find({ documentType: 'ReferralLetter' })).to.have.length(1)
    expect(wrapper.find('AttachDocumentField').find({ documentType: 'SpecialistReport' })).to.have.length(1)
    expect(wrapper.find('AttachDocumentField').find({ documentType: 'Unspecified' })).to.have.length(1)
  })

  it('renders one extra AttachDocumentField for acc, total of 4', () => {
    wrapper.setProps({ isAccRelated: true })
    expect(wrapper.find('AttachDocumentField').find({ documentType: 'AccLetter' })).to.have.length(1)
    expect(wrapper.find('AttachDocumentField').find({ documentType: 'ReferralLetter' })).to.have.length(1)
    expect(wrapper.find('AttachDocumentField').find({ documentType: 'SpecialistReport' })).to.have.length(1)
    expect(wrapper.find('AttachDocumentField').find({ documentType: 'Unspecified' })).to.have.length(1)
    expect(wrapper.find('AttachDocumentField')).to.have.length(4)
  })
})
