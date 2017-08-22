import HomeRoute from 'routes/Home'
// import Header from 'components/Header'
// import HomeView from 'routes/Home/components/HomeView'

describe('(Route) Home', () => {
  let _components

  beforeEach(() => {
    _components = HomeRoute.components
  })

  it('Should return a route configuration object', () => {
    expect(typeof HomeRoute).to.equal('object')
  })

  it('Should define a route component', () => {
    expect(_components).to.have.property('header')
    expect(_components).to.have.property('main')
    expect(typeof _components.header).to.equal('function')
    expect(typeof _components.main).to.equal('function')
    // expect(_components).to.deep.equal({ header: Header, main: HomeView })
  })
})
