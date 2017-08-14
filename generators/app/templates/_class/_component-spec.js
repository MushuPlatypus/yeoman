import React from 'react';
import testSetup from '<%= testConfig %>';
import { <%= name %> } from './<%= name %>';
import { expect, assert } from 'chai';

describe('<%= reference %><%= name %>', () => {
  it('should be defined after initializing', () => {
    assert.exists(<%= name %>);
  });
});
