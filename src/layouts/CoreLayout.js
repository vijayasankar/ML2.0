import React from 'react'
import Grid from 'react-bootstrap/lib/Grid'
import ModalLoading from 'components/ModalLoading'
import Footer from './Footer'

export const CoreLayout = ({ header, main }) => (
  <div className='core-layout'>
    {header}
    <div className='container-wrapper'>
      <Grid>
        <ModalLoading />
        <main className='core-layout__viewport'>
          {main}
        </main>
      </Grid>
      <Footer />
    </div>
  </div>
)

CoreLayout.propTypes = {
  header : React.PropTypes.element,
  main : React.PropTypes.element
}

export default CoreLayout
