# New Information (Temporary Site)

## Content Management Process

To update content on the site, edit `/content/content.js`. Once edited, you should commit, and push your changes to the 'main' branch. Netlify will then detect the push and deploy to the live site.

There are two objects that can be edited in the content.js file, 'about' and 'text'.

### About

| Property      | Description |
| -----------   | ----------- |
| img           | Image that shows up when ? is clicked. Should be something like 'test.jpg', and file should exist in `/src/images`       |
| imgAlt        | Alt text for 'img'       |
| text          | About text that appears next to ? |

### Text

This is an array of objects. Each object can have 3 values:

| Property       | Description |
| -----------    | ----------- |
| word           | Individual word in sentence       |
| definition     | The definition for 'word' that should show up at the bottom of the page when 'word' is hovered over    |
| link           | (Optional) A URL. If 'link' exists, the corresponding 'word' will be a link with the URL value here |