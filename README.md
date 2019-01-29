# aem-component-builder README

## Features

This extensions creates the shell structure for a basic AEM component. It generates the component's node (and metadata) as well as a blank overlay (.html) and dialog files.

## How-to-use

- Open the Command Palette (⇧⌘P)
- Type: Build AEM Component
    1. Enter the absolute path to where you want your component to be built (i.e.: jcr_root/apps/<projectName>/components/content/)
    2. Enter the name you want you component to be called.
    3. Enter the category you want your component to be grouped under.

** NOTES:
    1. If your component name has spaces that is fine. Spaces will be replaced with a '-'.
    2. The Spaces will not be replaced for the name or category in the .content.xml file.
    3. Since this is drive from the Command Palette it is advised to copy the path for the component before using this command. That way you can just paste it in to the first entry field. Clicking out of that field to copy will close the Command Palette.
    4. For now, the dialog and markup files are blank. This is because they can vary tremendously. In fact, they are optional in the event you just want to extend another component.
    5. If you are extending another component then you will still have to add that resourceSuperType in the .content.xml file.

![AEM Component Builder](images/demo.gif)
