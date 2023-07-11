// @flow

import React from 'react';
import _ from 'lodash';

import JsonSchemaFormSuite from './JsonSchemaFormSuite';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  header: {
    '& h1': {
      textAlign: 'center',
      margin: '1em',
    },
    '& p': {
      marginRight: '5em',
      marginLeft: '5em',
    },
  },
});

// Can be used to set initial schemas and mods (useful for development)
const initialJsonSchema = {};
const initialUiSchema = {};
const mods = {};

export default function PlaygroundContainer({ title }: { title: string }) {
  // steps ---> FormWizard
  // Step1 -> Step2 -> Step3
  // Step1 -> Step3 -> Step 5
  // 2 controls:::
  // 1. ctrl_age | Age -> [input]
  // 2. formwizardInput2 | Complaints -> [input]
  const updatedSchema = [
    {
      schema: 'step1Schema',
      routes: [
        {
          conditions: [
            { id: 'ctrl_age', value: '18', op: 'eq', required: true },
            {
              id: 'formwizardInput2',
              value: 'Sick',
              op: 'gt',
              required: false,
            },
          ],
          next: 'step2',
          previous: null,
        },
        {},
      ],
    },
  ];

  // FormRenderer

  const [schema, setSchema] = React.useState(JSON.stringify(initialJsonSchema));
  const [uischema, setUischema] = React.useState(
    JSON.stringify(initialUiSchema),
  );
  console.log({ schema: JSON.parse(schema) });
  const classes = useStyles();

  return (
    <div className='playground'>
      <div className={classes.header}>
        <h1>{title}</h1>
        <p>
          Demo app for the{' '}
          <a href='https://github.com/ginkgobioworks/react-json-schema-form-builder'>
            React JSON Schema Form Builder
          </a>
          , which allows a user to visually build a form and obtain the JSON
          Schema corresponding to it
        </p>
        <p>
          The Visual Form Builder tab corresponds to the actual Form Builder
          component. This reads in code from the JSON Schema, which is stored
          and updated live in the "Edit Schema" tab, and renders the code as
          manipulatable form elements. The result of the form is rendered with
          the material design theme in the Preview Form tab. The Pre-Configured
          Components tab also demonstrates how the form builder takes advantage
          of the definitions property of JSON Schema to render definitions.
        </p>
      </div>
      <JsonSchemaFormSuite
        lang={'json'}
        schema={schema}
        uischema={uischema}
        mods={mods}
        schemaTitle='Data Schema'
        uischemaTitle='UI Schema'
        onChange={(newSchema: string, newUiSchema: string) => {
          setSchema(newSchema);
          setUischema(newUiSchema);
        }}
        width='95%'
        height='800px'
      />
    </div>
  );
}
