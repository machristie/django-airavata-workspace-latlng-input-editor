
# Creating a custom input editor

1. Fork this repository.
2. Run 'npm install'.
3. Change the name of CustomInputEditor.vue as appropriate. Make sure to also
change the `name ` attribute as well to match.
4. Update App.vue to change the name of CustomInputEditor to match the name
of your component.
    * Also change the import to import the renamed component from step 3. 
    * Update `components` to list your component.
5. Modify your custom input editor as appropriate. Feel free to `npm install`
additional dependencies that your custom input editor requires.
6. Run `npm run serve` to preview your custom input editor component.

# Publishing custom input editor to NPM repository

1. Update package.json
   * change the name to represent your custom input editor. For example if your
     custom input editor is called `RadioButtonInputEditor.vue` then you might
     name your custom input editor package
     `django-airavata-workspace-radio-button-input-editor`. Please prefix your
     custom input editor with `django-airavata-workspace`.
   * Update the name of the component in the `main` property.
   * Change the name of the componet in the `scripts` `build`.
   * Change `private` to `false`.
2. Create an account on npmjs.com and log into your account with `npm
adduser`. See [npm
docs](https://docs.npmjs.com/getting-started/publishing-npm-packages) for
more information.
3. Run `npm run build`
4. Run `npm publish`
