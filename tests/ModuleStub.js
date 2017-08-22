require('react-widgets/lib/localizers/moment')

export const momentLocalizer = sinon.stub(
  require.cache[ require.resolve('react-widgets/lib/localizers/moment') ],
  'exports'
).callsFake(() => {
  return 'Stubbed momentLocalizer'
})
