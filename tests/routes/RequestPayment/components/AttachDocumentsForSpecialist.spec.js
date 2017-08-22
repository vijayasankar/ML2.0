import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import { AttachDocuments } from 'routes/RequestPayment/components/AttachDocumentsForSpecialist'

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

  it('correct uploadProgress state', () => {
    expect(wrapper.state('uploadProgress')).to.deep.equal(-1)
  })

  it('correct fileInput state', () => {
    expect(wrapper.state('fileInput')).to.deep.equal({})
  })

  it('correct currentRequest state', () => {
    expect(wrapper.state('currentRequest')).to.deep.equal({})
  })

  it('renders correct heading', () => {
    expect(wrapper.find('h3').text()).to.equal('Attach documents')
  })

  it('renders two AttachDocumentField', () => {
    wrapper.setProps({ isAccRelated: false })
    expect(wrapper.find('AttachDocumentField')).to.have.length(2)
  })

  it('two AttachDocumentFields are unique', () => {
    wrapper.setProps({ isAccRelated: false })
    expect(wrapper.find('AttachDocumentField').find({ documentType: 'SurgicalNotes' })).to.have.length(1)
    expect(wrapper.find('AttachDocumentField').find({ documentType: 'Unspecified' })).to.have.length(1)
  })

  it('correctly renders extra AttachDocumentField for acc, total of 3', () => {
    wrapper.setProps({ isAccRelated: true })
    expect(wrapper.find('AttachDocumentField').find({ documentType: 'SurgicalNotes' })).to.have.length(1)
    expect(wrapper.find('AttachDocumentField').find({ documentType: 'Unspecified' })).to.have.length(1)
    expect(wrapper.find('AttachDocumentField').find({ documentType: 'AccLetter' })).to.have.length(1)
    expect(wrapper.find('AttachDocumentField')).to.have.length(3)
  })
})
