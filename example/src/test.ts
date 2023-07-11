const obj = {
  type: 'object',
  properties: {
    formWizard: {
      title: 'Form Wizard',
      type: 'object',
      properties: {
        formWizard1: {
          title: 'Form Wizard 1',
          type: 'object',
          properties: {
            formWizard1Input1: {
              title: 'Form Wizard 1 Input 1',
              type: 'string',
            },
            formWizard1Input2: {
              title: 'Form Wizard 1 Input 2',
              type: 'string',
            },
          },
          dependencies: {},
          required: [],
        },
        formWizard2: {
          title: 'Form Wizard 2',
          type: 'object',
          properties: {
            formWizard2Input2: {
              title: 'Form Wizard 2 Input 2',
              type: 'string',
            },
          },
          dependencies: {},
          required: [],
        },
      },
      dependencies: {},
      required: [],
    },
  },
  dependencies: {},
  required: [],
};

const parseSchema = (schema: any) => {
  const type = schema.type;
  const isWizardForm = schema.properties?.formWizard;

  console.log('hello here');
  if (type === 'object' && isWizardForm) {
    console.log('Chedd');
    const schemaCopy = { ...schema };

    const formSteps = Object.keys(schema.properties.formWizard.properties);
    delete schemaCopy.properties.formWizard.properties;

    const steps = {};
    formSteps.forEach((key, index) => {
      steps[index] = schemaCopy;
      steps[index].properties.formWizard.properties[key] =
        schema.properties.formWizard.properties[key];
    });

    return Object.values(steps);
  }

  return schema;
};

// ; {
// ;       type: 'object',
// ;       properties: {
// ;         formWizard: {
// ;           title: 'Form Wizard',
// ;           type: 'object',
// ;           properties: {
// ;             formWizard1: {
// ;               title: 'Form Wizard 1',
// ;               type: 'object',
// ;               properties: {
// ;                 formWizard1Input1: {
// ;                   title: 'Form Wizard 1 Input 1',
// ;                   type: 'string'
// ;                 },
// ;                 formWizard1Input2: {
// ;                   title: 'Form Wizard 1 Input 2',
// ;                   type: 'string'
// ;                 }
// ;               },
// ;               dependencies: {},
// ;               required: []
// ;             },
// ;             formWizard2: {
// ;               title: 'Form Wizard 2',
// ;               type: 'object',
// ;               properties: {
// ;                 formWizard2Input2: {
// ;                   title: 'Form Wizard 2 Input 2',
// ;                   type: 'string'
// ;                 }
// ;               },
// ;               dependencies: {},
// ;               required: []
// ;             }
// ;           },
// ;           dependencies: {},
// ;           required: []
// ;         }
// ;       },
// ;       dependencies: {},
// ;       required: []
// ;     }

// ;     {
// ;       formWizard: {
// ;         formWizard1: {
// ;           'ui:order': [
// ;             'formWizard1Input1',
// ;             'formWizard1Input2'
// ;           ]
// ;         },
// ;         formWizard2: {
// ;           'ui:order': [
// ;             'formWizard2Input2'
// ;           ]
// ;         },
// ;         'ui:order': [
// ;           'formWizard1',
// ;           'formWizard2'
// ;         ]
// ;       },
// ;       'ui:order': [
// ;         'formWizard'
// ;       ]
// ;     }
