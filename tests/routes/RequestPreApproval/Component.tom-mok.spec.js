import React from 'react'
import { mount } from 'enzyme'
import { createStore } from 'redux'
import { expect } from 'chai'
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { Provider } from 'react-redux'
import * as testRequestUtils from 'utils/request.js'
import Moment from 'moment'

import RequestPreApprovalComponent from 'routes/RequestPreApproval/container'
import requestPreApprovalReducer from 'routes/RequestPreApproval/modules'
import requestPreApprovalVerifyPolicyReducer from 'routes/RequestPreApproval/modules/verifyPolicy'
import requestPreApprovalProcedureCostReducer from 'routes/RequestPreApproval/modules/procedureCost'
import requestPreApprovalAssociatedCostReducer from 'routes/RequestPreApproval/modules/associatedCosts'
import myProvidersReducer from 'store/myProviders'
import policiesHomeReducer from 'store/policiesHome'
import claimsHomeReducer from 'store/claimsHome'

describe.skip('(View) RequestPreApproval', () => {
    let _wrapper
    let store

    var sinonStubPromise = require('sinon-stub-promise');    

    var initialPoliciesHomeState = {
        policiesHome: {
            links: [
                {
                    rel: 'find-insured-person-by-policy-and-dob',
                    method: 'GET',
                    url: 'http://find-insured-person-by-policy-and-dob'
                }
            ]
        }
    }

    var stubbedPolicyData = {
        persons: [
            {
                "policyId": "testPolicyId",
                "personId": "testPersonId",
                "firstName": "testFirstName",
                "lastName": "testLastName"
            }
        ]
    }

    function initWrapperAndStore(initialProps = {}) {

        store = createStore(combineReducers({
            form: formReducer,
            requestPreApproval: requestPreApprovalReducer,
            myProviders: myProvidersReducer,
            policiesHome: policiesHomeReducer,
            claimsHome: claimsHomeReducer,
            requestPreApproval_verifyPolicy: requestPreApprovalVerifyPolicyReducer,
            requestPreApproval_procedureCost: requestPreApprovalProcedureCostReducer,
            requestPreApproval_associatedCosts: requestPreApprovalAssociatedCostReducer,
            requestPreApproval_attachDocuments: requestPreApprovalReducer            
        }), initialPoliciesHomeState)

        _wrapper = mount(<Provider store={store}>
            <RequestPreApprovalComponent { ...initialProps}/>
                         </Provider>)
    }

    before(() => {
        initWrapperAndStore();        
        sinonStubPromise(sinon);
    })

    function policyUserNameSection() {
        return _wrapper.find('.request-pre-approval__verify-policy__policy-user-name-form-group-wrapper')
    }

    function dontHavePolicyNumberLink() {
        return _wrapper.find('.request-pre-approval__verify-policy-form-group-trigger.is-policy-number')
    }

    function havePolicyNumberLink() {
        return _wrapper.find('.request-pre-approval__verify-policy-form-group-trigger.is-dob')
    }

    function verifyPolicyLink() {
        return _wrapper.find('.link is-bold request-pre-approval__verify-policy-form-trigger is-verify-policy')
    }

    function policyNumberInputField() {
        return _wrapper.find('.request-pre-approval__verify-policy-form-group-input-text.is-policy-id.form-control')
    }

    function dateOfBirthInputField() {
        return _wrapper.find('.rw-input')
    }

    function verifyPolicyButton() {
        return _wrapper.find('button[type="submit"]')
    }

    it("displays the policy user name form when 'I don\'t have the policy number' link is clicked", () => {        

        // preconditions
        expect(policyUserNameSection()).not.to.exist;

        // action
        dontHavePolicyNumberLink().simulate('click')        

        // expected behaviour
        expect(policyUserNameSection()).to.exist;
    })

    it("hides the policy user name form when 'I have the policy number' link is clicked", () => {

        // preconditions
        expect(policyUserNameSection()).to.exist;

        // action
        havePolicyNumberLink().simulate('click')

        // expected behaviour
        expect(policyUserNameSection()).to.not.exist;
    })

    it("stores the policy number, date of birth, and patient name correctly when 'Verify policy' link is clicked", () => {        

        // set policy number and dob
        policyNumberInputField().simulate('change', { target: { value: '8888888' } });        

        _wrapper.find('.rw-btn-calendar.rw-btn').simulate('click')
        _wrapper.find('.rw-btn-left.rw-btn').simulate('click')
        _wrapper.find('.rw-btn.rw-state-focus').at(1).simulate('click')

        // set up spy-promise
        var spyApiRequest = sinon.stub(testRequestUtils, 'default').returnsPromise()
        spyApiRequest.resolves({ data: stubbedPolicyData })

        // set up the expected api call
        var apiFormattedDateOfBirth = Moment(dateOfBirthInputField().props().value, ['DD/MM/YYYY']).format('YYYY-MM-DD')
        var expectedApiCall = initialPoliciesHomeState.policiesHome.links[0].url + "?policyNumber=8888888&dateOfBirth=" + apiFormattedDateOfBirth;

        // "click" the submit button and check apiRequest was invoked
        expect(spyApiRequest.callCount).to.equal(0)
        verifyPolicyButton().simulate('submit')
        expect(spyApiRequest.callCount).to.equal(1)

        // check the arguments passed to the api call
        expect(spyApiRequest.getCalls()[0].args).to.deep.equal([expectedApiCall])

        spyApiRequest.restore();
        
        //_wrapper.find('input[name="primaryProcedure"]').simulate('change', { target: { value: 'TestPrimaryProcedure' } });
        
    })
})
