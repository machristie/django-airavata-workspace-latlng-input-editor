
# Creating a custom input editor

1. Fork this repository.
2. Change the name of CustomInputEditor.vue as appropriate. Make sure to also
change the `name ` attribute as well to match.
3. Modify your custom input editor as appropriate. Feel free to `npm install` additional dependencies that your custom input editor requires.
4. Run `npm run serve` to preview your custom input editor component.

# Publishing custom input editor to NPM repository

1. Update package.json
   * change the name to represent your custom input editor. For example if your
     custom input editor is called `RadioButtonInputEditor.vue` then you might
     name your custom input editor package
     `django-airavata-workspace-radio-button-input-editor`. Please prefix your
     custom input editor with `django-airavata-workspace`.
2. Change the name of the component in `scripts` `build`
3. Create an account on npmjs.com and log into your account with `npm
adduser`. See [npm
docs](https://docs.npmjs.com/getting-started/publishing-npm-packages) for
more information.
4. Run `npm run build`
5. Run `npm publish`
