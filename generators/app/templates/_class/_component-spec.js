import { h } from 'preact';
import testSetup from './../../config/test-setup.js';
import { <%= name %> } from './<%= name %>';
import { expect, assert } from 'chai';

describe('<%= reference %><%= name %>', () => {
  it('should be defined after initializing', () => {
    assert.exists(<%= name %>);
  });
});
