import PageNotFoundView from 'routes/404/components/PageNotFoundView'
import React from 'react'
import { shallow } from 'enzyme'

describe('(View) PageNotFoundView - shallow', () => {
  let wrapper
  let props

  beforeEach(() => {
    props = {}
    wrapper = shallow(<PageNotFoundView {...props} />)
  })

  it('renders correct contents', () => {
    expect(wrapper.find('h1').text()).to.equal('Page not found')
    expect(wrapper.find('h2').text()).to.equal('The page you requested was not found.')
    expect(wrapper.find('Link.page-not-found')).to.have.length(1)
    expect(wrapper.find('Link.page-not-found').render().text()).to.equal('Go to homepage')
  })
})
