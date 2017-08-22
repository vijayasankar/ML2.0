import React from 'react'
import Footer from 'layouts/Footer'
import { shallow, render } from 'enzyme'

describe('(Layout) Footer', function () {
  let component

  beforeEach(() => {
    component = shallow(<Footer />)
  })

  it('should render a single footer called footer', () => {
    expect(component.find('footer.footer')).to.have.length(1)
  })

  it('should render three hyperlinks', () => {
    expect(component.find('a')).to.have.length(3)
  })

  it('should all be a link to "https://www.nibfirstchoice.co.nz" on a new tab', () => {
    expect(component.find('a').get(0).props.href).to.equal('https://www.nibfirstchoice.co.nz/terms-and-conditions')
    expect(component.find('a').get(0).props.target).to.equal('_blank')
    expect(component.find('a').get(1).props.href).to.equal('https://www.nibfirstchoice.co.nz/privacy-policy')
    expect(component.find('a').get(1).props.target).to.equal('_blank')
    expect(component.find('a').get(2).props.href).to.equal('https://www.nibfirstchoice.co.nz/provider')
    expect(component.find('a').get(2).props.target).to.equal('_blank')
  })

  it('first link should be terms and conditions', () => {
    expect(render(component.find('a').get(0)).html())
      .to.equal('<a href="https://www.nibfirstchoice.co.nz/terms-and-conditions" target="_blank">Terms &amp; conditions</a>')
  })

  it('second link should be privacy policy', () => {
    expect(render(component.find('a').get(1)).html())
      .to.equal('<a href="https://www.nibfirstchoice.co.nz/privacy-policy" target="_blank">Privacy policy</a>')
  })

  it('third link should be FAQ', () => {
    expect(render(component.find('a').get(2)).html())
      .to.equal('<a href="https://www.nibfirstchoice.co.nz/provider" target="_blank">FAQ</a>')
  })
})
