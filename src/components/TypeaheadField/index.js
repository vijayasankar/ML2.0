import FormGroup from 'react-bootstrap/lib/FormGroup'
import React, { PropTypes } from 'react'
import apiRequest from '../../utils/request'
import find from 'ramda/src/find'
import propEq from 'ramda/src/propEq'
import { AsyncTypeahead } from 'react-bootstrap-typeahead'
import { Field } from 'redux-form'

class TypeaheadField extends React.Component {
  constructor (props) {
    super(props)
    this.handleSearch = this.handleSearch.bind(this)
    this.renderMenuItemChildren = this.renderMenuItemChildren.bind(this)
    this.renderAsyncTypeahead = this.renderAsyncTypeahead.bind(this)
    this.currentValue = []
    this.state = {
      searchList: []
    }
  }

  componentDidMount () {
    if (this.props.stateValue && this.props.change) {
      const fieldName = this.props.member ? this.props.member + '.' + this.props.fieldName : this.props.fieldName

      console.log('TypeaheadField:componentDidMount', fieldName, this.props.stateValue)
      this.props.change(fieldName, [this.props.stateValue])
    }
  }

  componentWillReceiveProps (nextProps) {
    // console.log('TypeaheadField:componentWillReceiveProps', nextProps)
  }
/*
  shouldComponentUpdate (nextProps, nextState) {
    console.log('SHOULD===========================================')
    console.log('NEXTPROPS?!?!?!?!?!?!?!?!?!?: ', nextProps)
    console.log('NEXTSTAE?!?!?!?!?!?!?!?!?!?!?: ', nextState)
    console.log('CURR?!?!?!?!?!?!?!?!?!?!?!?: ', this.currentValue)
    console.log('SHOULD===========================================')
    if (nextProps && nextProps.change && nextState) {
      console.log('FIRST=====================================')
      if (nextState.searchList && nextState.searchList.length === 1) {
        console.log('SECOND=======================================')
        if (nextProps.member && (nextProps.member.slice(0, 15) === 'otherProcedures')) {
          console.log('THIRD========================================')
          if (this.currentValue && this.currentValue.length === 1 &&
            this.currentValue[0].id === nextState.searchList[0].id) {
            console.log('FOURTH=======================================')
            return true
          }
          this.currentValue = nextState.searchList
          return false
        }
      }
      return true
    }
    return true
  }
*/
  componentWillUpdate (nextProps, nextState) {
    console.log('================================================')
    console.log('NEXTPROPS?!?!?!?!?!?!?!?!?!?: ', nextProps)
    console.log('NEXTSTAE?!?!?!?!?!?!?!?!?!?!?: ', nextState)
    console.log('CURR?!?!?!?!?!?!?!?!?!?!?!?: ', this.currentValue)
    console.log('================================================')
    if (nextProps && nextProps.change && nextState) {
      if (nextState.searchList && nextState.searchList.length === 1) {
        if (nextProps.member && (nextProps.member.slice(0, 15) === 'otherProcedures')) {
          if (this.currentValue && this.currentValue.length === 1 &&
            this.currentValue[0].id === nextState.searchList[0].id) {
            return // already in sync, don't update anymore otherwise infinite loop
          }
          return
        }

        console.log('TypeaheadField:componentWillUpdate -- CHANGE!')
        this.currentValue = nextState.searchList
        const fieldName = nextProps.member ? nextProps.member + '.' + nextProps.fieldName : nextProps.fieldName
        this.props.change(fieldName, nextState.searchList)
      }
    }
  }

  handleSearch (query) {
    const section = this.props.section
    let link = ''
    let url = ''
    if (query === '') return
    query = encodeURIComponent(query)
    switch (section) {
      case 'primaryProcedure':

        // TODO - Rob to let us know once there is data at their end
        // link = find(propEq('rel', 'find-provider-interventions'))(this.props.links)

        link = find(propEq('rel', 'find-interventions'))(this.props.links)

        if (!link) { return }
        url = `${link.url}?search=${query}`
        break
      case 'otherProcedure':
        link = find(propEq('rel', 'find-related-interventions-by-name'))(this.props.links)
        if (!link) { return }
        url = `${link.url}?search=${query}`
        break
      // TODO - Rob to let us know once there is data at their end
      // const link = find(propEq('rel', 'find-provider-prostheses'))(state.myProviders.currentProviderDetails.links)
      case 'prosthesisDescr':
        link = find(propEq('rel', 'find-prostheses'))(this.props.links)
        if (!link) { return }
        url = `${link.url}?search=${query}`
        break
      case 'nameOfSpecialist':
        link = find(propEq('rel', 'find-providers'))(this.props.links)
        if (!link) { return }
        url = `${link.url}?search=${query}&types=specialist`
        break
      case 'nameOfHospital':
        link = find(propEq('rel', 'find-providers'))(this.props.links)
        if (!link) { return }
        url = `${link.url}?search=${query}&types=hospital`
        break
    }
    try {
      apiRequest(url).then(result => {
        this.setState((prevState) => ({
          searchList: result.data.items.map(item => ({
            name: item.name || item.displayName,
            ...item
          }))
        }))
      })
    } catch (err) {
      console.error('TypeaheadField:fetch:err', err)
    }
  }

  renderMenuItemChildren (option, props, index) {
    return (
      <div>
        <span>{option.name}</span>
      </div>
    )
  }

  renderAsyncTypeahead ({ input, inputRef, controlId, meta: { touched, error, warning }, ...rest }) {
    return (
      <FormGroup controlId={controlId} validationState={(error) ? 'error' : null}>
        <AsyncTypeahead ref={inputRef} {...input} {...rest} clearButton
          useCache={false}
          onBlur={(...args) => {
            // magic -- do nothing otherwise value object is overwritten by Redux Form's blur
            console.debug('##### renderAsyncTypeahead BLUR', args)
          }}
          onInputChange={rest.onInputChange}
        />
        {(error && <span className='error-message'>{error}</span>)}
      </FormGroup>
    )
  }

  render () {
    console.log('render:TypeaheadField:this.props', this.props)
    const renderedFieldName = (this.props.member)
      ? `${this.props.member}.${this.props.fieldName}`
      : `${this.props.fieldName}`
    // const opts = {}
    // if (this.props.default) {
    //   opts['selected'] = this.props.default
    // }
    return (
      <Field
        component={this.renderAsyncTypeahead}
        inputRef={this.props.inputRef}
        labelKey='name'
        name={renderedFieldName}
        onChange={this.props.onChange}
        onFocus={this.props.onFocus}
        onInputChange={this.props.onInputChange}
        onSearch={this.handleSearch}
        options={this.state.searchList}
        placeholder={this.props.placeholderText}
        renderMenuItemChildren={this.renderMenuItemChildren}
        selected={[this.props.stateValue]}
      />
    )
  }
}

TypeaheadField.propTypes = {
  change: PropTypes.func,
  fieldName: PropTypes.string,
  inputRef: PropTypes.func,
  links: PropTypes.array,
  member: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onInputChange: PropTypes.func,
  placeholderText: PropTypes.string,
  section: PropTypes.string,
  stateValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
}

export default TypeaheadField
