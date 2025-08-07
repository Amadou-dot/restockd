/**
 * Custom ESLint rules for Restock'd project consistency
 */

const createComponentPropsRule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce that React components have proper props interfaces',
      category: 'Stylistic Issues',
      recommended: false,
    },
    schema: [],
    messages: {
      missingPropsInterface:
        "Component should have a named props interface (e.g., '{{componentName}}Props')",
      inlinePropsInterface:
        "Avoid inline props interfaces. Define a separate '{{componentName}}Props' interface",
    },
  },

  create(context) {
    return {
      FunctionDeclaration(node) {
        if (!isReactComponent(node)) return;

        const componentName = node.id?.name;
        if (!componentName) return;

        const params = node.params;
        if (params.length === 0) return;

        const firstParam = params[0];

        // Check if using inline object destructuring
        if (firstParam.type === 'ObjectPattern' && firstParam.typeAnnotation) {
          const typeAnnotation = firstParam.typeAnnotation.typeAnnotation;

          if (typeAnnotation.type === 'TSTypeLiteral') {
            context.report({
              node: firstParam,
              messageId: 'inlinePropsInterface',
              data: { componentName },
            });
          }
        }
      },
    };

    function isReactComponent(node) {
      // Check if function returns JSX
      if (node.body?.type === 'BlockStatement') {
        return hasJSXReturn(node.body);
      }
      return false;
    }

    function hasJSXReturn(block) {
      for (const statement of block.body) {
        if (statement.type === 'ReturnStatement' && statement.argument) {
          if (isJSXElement(statement.argument)) {
            return true;
          }
        }
      }
      return false;
    }

    function isJSXElement(node) {
      return (
        node &&
        (node.type === 'JSXElement' ||
          node.type === 'JSXFragment' ||
          (node.type === 'ConditionalExpression' &&
            (isJSXElement(node.consequent) || isJSXElement(node.alternate))))
      );
    }
  },
};

const noHardcodedConstantsRule = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Prevent hardcoded business constants, encourage using config',
      category: 'Best Practices',
      recommended: true,
    },
    schema: [
      {
        type: 'object',
        properties: {
          allowedNumbers: {
            type: 'array',
            items: { type: 'number' },
          },
          forbiddenNumbers: {
            type: 'array',
            items: { type: 'number' },
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      hardcodedConstant:
        'Avoid hardcoded constant {{value}}. Consider using APP_CONFIG or constants file.',
      hardcodedTaxRate:
        'Tax rate should be imported from APP_CONFIG.tax.rate instead of hardcoded {{value}}',
    },
  },

  create(context) {
    const options = context.options[0] || {};
    const forbiddenNumbers = options.forbiddenNumbers || [0.08, 0.1, 0.15]; // Common tax rates
    const allowedNumbers = options.allowedNumbers || [-1, 0, 1, 2, 100];

    return {
      Literal(node) {
        if (typeof node.value === 'number') {
          if (forbiddenNumbers.includes(node.value)) {
            const messageId =
              node.value === 0.08 ? 'hardcodedTaxRate' : 'hardcodedConstant';
            context.report({
              node,
              messageId,
              data: { value: node.value },
            });
          }
        }
      },
    };
  },
};

const enforceImportFromConfigRule = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Enforce imports from centralized config for specific constants',
      category: 'Best Practices',
      recommended: true,
    },
    schema: [],
    messages: {
      useConfigImport:
        "Import {{constant}} from '@/config/app' instead of '@/utils/constants'",
    },
  },

  create(context) {
    const constantsToCheck = [
      'TAX_RATE',
      'SHIPPING_COST',
      'PRODUCTS_PER_PAGE',
      'COMPANY_INFO',
    ];

    return {
      ImportDeclaration(node) {
        if (node.source.value === '@/utils/constants') {
          node.specifiers.forEach(spec => {
            if (
              spec.type === 'ImportSpecifier' &&
              constantsToCheck.includes(spec.imported.name)
            ) {
              context.report({
                node: spec,
                messageId: 'useConfigImport',
                data: { constant: spec.imported.name },
              });
            }
          });
        }
      },
    };
  },
};

const enforceApiParameterNamingRule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce consistent parameter naming in API routes',
      category: 'Stylistic Issues',
      recommended: true,
    },
    schema: [],
    messages: {
      useFullNextRequest:
        "Use 'NextRequest' instead of abbreviated 'NxtReq' for consistency",
      useStandardParamsName:
        "Use 'request' instead of '{{currentName}}' for the first parameter",
    },
  },

  create(context) {
    return {
      ImportSpecifier(node) {
        if (
          node.imported.name === 'NextRequest' &&
          node.local.name !== 'NextRequest'
        ) {
          context.report({
            node,
            messageId: 'useFullNextRequest',
          });
        }
      },

      FunctionDeclaration(node) {
        const filename = context.getFilename();
        if (filename.includes('/api/') && filename.endsWith('route.ts')) {
          const firstParam = node.params[0];
          if (firstParam && firstParam.type === 'Identifier') {
            if (!['request', 'req'].includes(firstParam.name)) {
              context.report({
                node: firstParam,
                messageId: 'useStandardParamsName',
                data: { currentName: firstParam.name },
              });
            }
          }
        }
      },
    };
  },
};

module.exports = {
  rules: {
    'component-props-interface': createComponentPropsRule,
    'no-hardcoded-constants': noHardcodedConstantsRule,
    'enforce-config-imports': enforceImportFromConfigRule,
    'api-parameter-naming': enforceApiParameterNamingRule,
  },
};
