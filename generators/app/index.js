'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the wicked ' + chalk.red('generator-tmpl') + ' generator!'));

    const prompts = [
      {
        type: 'list',
        name: 'project',
        message: 'What project do you work in?',
        choices: ['web', 'style-guide'],
        store: true
      }, {
        type: 'input',
        name: 'name',
        message: 'Your component path/name',
        default: this.appname // Default to current folder name
      }, {
        type: 'input',
        name: 'path',
        message: 'Should the component be nested deeper in the Components folder?'
      }, {
        type: 'list',
        name: 'componentType',
        message: 'What type of component do you need?',
        choices: ['Class', 'Stateless']
      }
    ];

    return this
      .prompt(prompts)
      .then(props => {
        // To access props later use this.props.someAnswer;

        this.props = props;
        this.log('app name', this.props.name);
        this.log('cool feature', this.props.componentType);
      });
  }

  writing() {
    let _project;
    let _template;
    let _path;
    let _testConfig;
    if (this.props.path === '') {
      _path = '/components/';
    } else {
      _path = '/components/' + this.props.path + '/';
    }
    switch (this.props.componentType) {
      case 'Class':
        _template = '_class';
        this._writingComponent(_template, _path);
        if(this.props.project === 'web') {
          this._writingComponentTest(_template, _path, this._getTestConfigPath(_path));
        }
        this._writingComponentActions(_template, _path);
        if(this.props.project === 'web') {
          this._writingComponentActionsTest(_template, _path, this._getTestConfigPath(_path));
        }
        this._writingComponentReducer(_template, _path);
        if(this.props.project === 'web') {
          this._writingComponentReducerTest(_template, _path, this._getTestConfigPath(_path));
        }
        this._writingStyles(_template, _path);
        break;
      case 'Stateless':
        _template = '_stateless';
        this._writingComponent(_template, _path);
        if(this.props.project === 'web') {
          this._writingComponentTest(_template, _path, this._getTestConfigPath(_path));
        }
        this._writingStyles(_template, _path);
        break;
      default:
        _template = '_stateless';
    }
  }
  _getTestConfigPath(_path) {
    let _defaultTestPath = './../../';
    const _testConfig = 'config/test-setup.js';
    if(this.props.path === '') {
      return _defaultTestPath + _testConfig;
    }
    console.log(this.props.path);
    const depth = this.props.path.split('/').length;
    for (var i = 0; i < depth; i++) {
      _defaultTestPath += '../'
    }
   return _defaultTestPath + _testConfig;
  }

  _writingComponent(_template, _path) {
    this
      .fs
      .copyTpl(
        this.templatePath(`${_template}/_component.js`),
        this.destinationPath(this.props.project + _path + this.props.name + '/' + this.props.name + '.js'), {
          name: this.props.name
        });
  }

  _writingComponentTest(_template, _path, _testConfig) {
    this
      .fs
      .copyTpl(
        this.templatePath(`${_template}/_component-spec.js`),
        this.destinationPath(this.props.project + _path + this.props.name + '/' + this.props.name + '-spec.js'), {
          name: this.props.name,
          reference: _path,
          testConfig: _testConfig
        });
  }

  _writingComponentActions(_template, _path) {
    this
      .fs
      .copyTpl(
        this.templatePath(`${_template}/_componentActions.js`),
        this.destinationPath(this.props.project + _path + this.props.name + '/' + this.props.name + 'Actions.js'), {
          name: this.props.name,
          nameMod: 'Actions'
        });
  }

  _writingComponentActionsTest(_template, _path) {
    this
      .fs
      .copyTpl(
        this.templatePath(`${_template}/_componentActions-spec.js`),
        this.destinationPath(this.props.project + _path + this.props.name + '/' + this.props.name + 'Actions-spec.js'), {
          name: this.props.name,
          nameMod: 'Actions',
          reference: _path
        });
  }

  _writingComponentReducer(_template, _path) {
    this
      .fs
      .copyTpl(
        this.templatePath(`${_template}/_componentReducer.js`),
        this.destinationPath(this.props.project + _path + this.props.name + '/' + this.props.name + 'Reducer.js'), {
          name: this.props.name,
          nameMod: 'Reducer'
        });
  }

  _writingComponentReducerTest(_template, _path) {
    this
      .fs
      .copyTpl(
        this.templatePath(`${_template}/_componentReducer-spec.js`),
        this.destinationPath(this.props.project + _path + this.props.name + '/' + this.props.name + 'Reducer-spec.js'), {
          name: this.props.name,
          nameMod: 'Reducer',
          reference: _path
        });
  }

  _writingStyles(_template, _path) {
    this
      .fs
      .copyTpl(
        this.templatePath(`${_template}/_component.scss`),
        this.destinationPath(this.props.project + _path + this.props.name + '/' + this.props.name + '.scss'), {
          name: this.props.name
        });
  }
};
