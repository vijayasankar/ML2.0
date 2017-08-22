import Col from 'react-bootstrap/lib/Col'
import FileUploadProgress from 'react-fileupload-progress'
import ProgressBar from 'react-bootstrap/lib/ProgressBar'
import React, { PropTypes } from 'react'
import Rfind from 'ramda/src/find'
import Row from 'react-bootstrap/lib/Row'
import RpropEq from 'ramda/src/propEq'
import Rreject from 'ramda/src/reject'
import { Field } from 'redux-form'
import { formatFileSize } from 'utils/helpers'
import apiRequest, * as Req from 'utils/request'

class AttachDocumentField extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      clientReferenceSuffix: 0,
      currentFile: null,
      currentRequest: {},
      fileInput: {},
      imagePreviewUrl: null,
      uploadError: false,
      uploadProgress: -1,
      uploaded: []
    }
  }

  componentDidMount () {
    // redux form value to track number of documents uploaded
    this.props.change(this.documentCountsFieldName(), 0)
  }

  required = (value, allValues, props) => {
    return (!this.props.required || (value && value > 0)) ? undefined : 'This document is required'
  }

  documentCountsFieldName = () => {
    return this.props.documentType + 'Counts'
  }

  onProgress = (e, req, progress) => {
    this.setState({ uploadProgress: progress })
    console.log('onProgress', e, req, progress, this.state.uploadProgress)
  }

  handleDelete = (event, toDelete) => {
    console.debug('===> handleDelete: toDelete', toDelete)

    const before = this.state.uploaded
    console.debug('===> handleDelete: before', before)

    // invoke delete URL
    try {
      apiRequest(before[0].deleteLink, 'DELETE').then(result => {
        console.debug('===> handleDelete: fetch', result)
      })
    } catch (err) {
      console.error('AttachDocumentField:fetch:err', err)
    }

    const after = Rreject(RpropEq('clientReference', toDelete.clientReference), before)
    console.log('===> handleDelete: after', after)
    this.props.change(this.documentCountsFieldName(), after.length)

    this.setState({
      fileInput: {},
      imagePreviewUrl: null,
      uploadProgress: -1,
      uploaded: after,
      uploadError: false
    })
  }

  handleAbort = (a, b) => {
    console.log('===> handleAbort', a, b)
    console.log('===> handleAbort', a.target)
    console.log('===> handleAbort', a.currentTarget)
    console.log('===> handleAbort', a.type)

    console.log('===> handleAbort', this.state.currentRequest)
    this.state.currentRequest.abort()

    this.setState({
      fileInput: {},
      imagePreviewUrl: null,
      uploadProgress: -1,
      currentRequest: {},
      currentFile: null,
      uploadError: false
    })
  }

  onAbort = (e, req) => {
    console.log('===> onAbort', e, req)
    console.log('===> onAbort', e.target)
    console.log('===> onAbort', e.currentTarget)
    console.log('===> onAbort', e.type)

    // console.log('===> onAbort', this.state.currentRequest)
    // this.state.currentRequest.abort()

    this.setState({
      fileInput: {},
      imagePreviewUrl: null,
      uploadProgress: -1,
      currentRequest: {},
      currentFile: null,
      uploadError: false
    })
  }

  onError = (e, req) => {
    console.log('===> onError', e, req)
    console.log('===> onError', e.target)
    console.log('===> onError', e.currentTarget)
    console.log('===> onError', e.type)

    this.setState({
      uploadProgress: -1,
      uploadError: true
    })
  }

  onLoad = (e, req) => {
    console.log('===> onLoad e:', e)
    console.log('===> onLoad req:', req)

    let currentFile = this.state.currentFile
    console.log('===> onLoad CURRENT', currentFile)

    if (req && req.response) {
      const resp = JSON.parse(req.response)

      let doc = null
      if (resp && resp.documents) {
        doc = Rfind(RpropEq('clientReference', currentFile.clientReference))(resp.documents)
      }
      console.log('===> onLoad DOC', doc)

      if (doc) {
        currentFile.id = doc.id

        // TODO obtain and use delete link
        if (doc.links) {
          let link = Rfind(RpropEq('rel', 'delete'))(doc.links)
          if (link) {
            currentFile.deleteLink = link.url
          } else {
            // this is the workaround
            currentFile.deleteLink = this.getDocumentDeleteUrlFromBundle(doc)
          }
        } else {
          // this is the workaround
          currentFile.deleteLink = this.getDocumentDeleteUrlFromBundle(doc)
        }
        console.log('===> onLoad delete link', currentFile.deleteLink)

        currentFile.imagePreviewUrl = this.state.imagePreviewUrl
      }
    }

    this.props.change(this.documentCountsFieldName(), this.state.uploaded.length + 1)

    this.setState({
      uploadProgress: -1,
      uploaded: [...this.state.uploaded, currentFile],
      uploadError: false
    })

    this.setState({
      fileInput: {},
      currentFile: null
    })
  }

  getDocumentDeleteUrlFromBundle (doc) {
    let url = null

    if (this.props.docBundle && this.props.docBundle.links) {
      let link = Rfind(RpropEq('rel', 'delete'))(this.props.docBundle.links)
      link && (url = link.url + '/documents/' + doc.id)
    }
    return url
  }

  formGetter = () => {
    return new FormData(document.getElementById(this.props.documentType + 'Form'))
  }

  renderDocumentCounts = ({ input, meta: { touched, error } }) => {
    return (
      <div>
        <input {...input} type='text' style={{ display: 'none' }} />
        {touched && (error && <span className='attachDocuments'>{error}</span>)}
      </div>
    )
  }

  renderFormLabels = ({ input, meta: { touched, error } }) => {
    let disabled = ''
    if (this.state.currentFile || (this.state.uploaded.length >= this.props.maxAllowed)) {
      disabled = 'disabled'
    }

    let hasError = ''
    touched && error && (hasError = 'error')

    return (
      <div>
        <input {...input} type='text' style={{ display: 'none' }} />
        <label htmlFor={this.props.documentType} className={`${this.props.cssName}-label ${disabled} ${hasError}`}>
          <span>{`${this.props.labelText}`}</span>
        </label>
        <label className={`${this.props.cssName}-label-disabled ${disabled}`}>
          <span>{`${this.props.labelText}`}</span>
        </label>
      </div>
    )
  }

  customFormRenderer = (onSubmit) => {
    return (
      <form id={`${this.props.documentType}Form`}>
        <Field name={this.documentCountsFieldName()} component={this.renderFormLabels} validate={this.required} />
        <input type='file' name='file' id={this.props.documentType} style={{ display:'none' }}
          accept='image/gif, image/jpeg, image/png, application/pdf'
          onClick={(event) => {
            // do this so the same file can be attached, typically after being deleted
            event.target.value = null
          }}
          onChange={onSubmit} ref={(c) => { if (c) { this.state.fileInput = c } }} />
      </form>
    )
  }

  // Do not use the plugin's progress bar -- see renderUploading()
  customProgressRenderer = (progress, uploadError, cancelHandler) => {
    return
  }

  customBeforeSend = (req) => {
    console.log('==> customBeforeSend:', req)

    const token = Req.getTokenFromSessionStore()

    req.setRequestHeader('Accept', 'application/json')
    req.setRequestHeader('X-NibNZ-Version', '1')
    req.setRequestHeader('Authorization', `Bearer ${token}`)

    this.setState({ currentRequest: req })
    return req
  }

  customFormCustomizer = (formData) => {
    console.log('==> customFormCustomizer:', formData)
    console.log('==> customFormCustomizer props:', this.props)
    console.log('==> customFormCustomizer FILES:', this.state.fileInput.files)

    const file = this.getCurrentFileFromInput()
    const suffix = this.state.clientReferenceSuffix
    file.clientReference = this.props.documentType + '-' + suffix

    formData.append('documentMetadata', JSON.stringify({
      documentType: this.props.documentType,
      contentType: file.type,
      clientReference: this.props.documentType + '-' + suffix,
      name: file.name
    }))

    this.setState({
      currentFile: file,
      clientReferenceSuffix: (suffix + 1)
    })

    let reader = new FileReader()
    reader.onloadend = () => {
      // console.log('TTT', reader.result)
      this.setState({
        imagePreviewUrl: reader.result
      })
    }

    if (file.type === 'application/pdf') {
      this.setState({
        imagePreviewUrl: '/providerportal/img/icon-pdf.svg'
      })
    } else {
      reader.readAsDataURL(file)
    }

    return formData
  }

  getCurrentFileFromInput = () => {
    return (this.state.fileInput && this.state.fileInput.files && this.state.fileInput.files[0])
      ? this.state.fileInput.files[0] : null
  }

  renderUploaded = () => {
    const {
      cssName
    } = this.props

    console.log('*** renderUploaded', this.state)

    // ------------------------------------------------------------------------
    // #providerportal
    // ------------------------------------------------------------------------
    return (
      <div>
        {
          this.state.uploaded.map((aFile, i) =>
            <Row key={i} className={`${cssName}-uploaded`}>
              <Col xs={1} md={1}>
                {(aFile && aFile.imagePreviewUrl)
                  ? <img className={`${cssName}-thumbnail`} src={aFile.imagePreviewUrl} /> : <span>&nbsp;</span>
                }
              </Col>
              <Col xs={8} md={8}>
                {aFile ? aFile.name : ''}
              </Col>
              <Col xs={3} md={3}>
                <div className={`${cssName}-file-size`}>
                  {aFile ? formatFileSize(aFile.size, 1) : ''}
                </div>
                <div className={`${cssName}-file-action`}>
                  {aFile &&
                    <button className={`${cssName}-delete`} onClick={(e) => this.handleDelete(e, aFile)}>
                      <img src='/providerportal/img/icon-trash.svg' />
                    </button>
                  }
                </div>
              </Col>
            </Row>
          )
        }
      </div>
    )
  }

  renderUploading = () => {
    const {
      cssName
    } = this.props

    let currentFile = this.state.currentFile
    currentFile && console.log('==> CURRENT FILE', currentFile)

    return (
      <div>
        {currentFile &&
          <Row>
            <Col xs={1} md={1}>
              <span>&nbsp;</span>
            </Col>
            <Col xs={8} md={8}>
              {currentFile.name}
              <br />
              {(this.state.uploadProgress >= 0) && (this.state.uploadProgress < 100) &&
                <ProgressBar className={`${cssName}-label`} now={this.state.uploadProgress}
                  label='uploading...' srOnly />
              }
              {this.state.uploadError &&
                <span className='error-message'>Upload failed</span>
              }
            </Col>
            <Col xs={3} md={3}>
              <div className={`${cssName}-file-size`}>
                {formatFileSize(currentFile.size, 1)}
              </div>
              <div className={`${cssName}-file-action`}>
                {(this.state.uploadProgress < 100) &&
                  <button className={`${cssName}-abort`} onClick={this.handleAbort}>
                    <img src='/providerportal/img/icon-x.svg' />
                  </button>
                }
              </div>
            </Col>
          </Row>
        }
      </div>
    )
  }

  render () {
    const {
      // cssName,
      docBundle,
      documentType
    } = this.props

    let url = ''

    if (docBundle && docBundle.links) {
      let link = Rfind(RpropEq('rel', 'add-document'))(docBundle.links)
      url = link.url
    }

    return (
      <Row>
        <Col xs={5} md={5}>
          <FileUploadProgress key={documentType} url={url}
            onProgress={this.onProgress}
            onLoad={this.onLoad}
            onError={this.onError}
            onAbort={this.onAbort}
            formGetter={this.formGetter}
            formRenderer={this.customFormRenderer}
            progressRenderer={this.customProgressRenderer}
            formCustomizer={this.customFormCustomizer}
            beforeSend={this.customBeforeSend}
            />
        </Col>
        <Col xs={7} md={7}>
          <Field name={this.documentCountsFieldName()} component={this.renderDocumentCounts}
            validate={this.required} />
          {this.renderUploaded()}
          {this.renderUploading()}
        </Col>
      </Row>
    )
  }
}

AttachDocumentField.propTypes = {
  change: PropTypes.func.isRequired, // from Redux Form
  cssName: PropTypes.string,
  docBundle: PropTypes.object.isRequired,
  documentType: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  maxAllowed: PropTypes.number,
  required: PropTypes.bool
}

AttachDocumentField.defaultProps = {
  maxAllowed: Number.POSITIVE_INFINITY,  // lol
  required: false
}

export default AttachDocumentField
