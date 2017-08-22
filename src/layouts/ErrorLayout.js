import React from 'react'
import Col from 'react-bootstrap/lib/Col'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Footer from './Footer'
import logo from 'components/Header/assets/nibFirstChoice.svg'

const cssName = 'error-layout'

export const ErrorLayout = ({ main }) => (
  <div className={`${cssName}`}>
    <div className='container-wrapper'>
      <Grid>
        <div className={`${cssName}__header`}>
          <Row className='container'>
            <Col xsOffset={1} mdOffset={1} xs={10} md={10}>
              <Row>
                <Col className='logo-col' xsOffset={1} mdOffset={1} xs={10} md={10}>
                  <Row>
                    <img className={`${cssName}__header-logo`} src={logo} />
                  </Row>
                  <Row>
                    <main className='error-layout__viewport'>
                      {main}
                    </main>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Grid>
      <Footer />
    </div>
  </div>
)

ErrorLayout.propTypes = {
  main : React.PropTypes.element
}

export default ErrorLayout
