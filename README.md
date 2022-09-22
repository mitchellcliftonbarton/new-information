# New Information (Temporary Site)

## Content Management Process

To update content on the site, edit the files in `/content`. Once edited, you should commit, and push your changes to the 'main' branch. Netlify will then detect the push and deploy to the live site.

There are four files that can be edited in the content folder: `information.js`, `log.js`, `projects.js`, and `seo.js`.

### Information (information.js)

| Property      | Description |
| -----------   | ----------- |
| address         | A string for your studio address. Will take HTML     |
| addressLink     | A URL for google maps of the studio address     |
| email           | A string for your studio email     |
| instagram       | A URL for your studio instagram     |
| textColumn1     | A string for the text that should appear in the information first column     |
| textColumn2     | A string for the text that should appear in the information second column     |

### Log (log.js)

This is an array of objects. Each object can have 2 values:

| Property      | Description |
| -----------   | ----------- |
| date         | A string for the date for the log item. Should be in the following format: '7.14.22'       |
| text         | A string for the log item.       |

### Projects (projects.js)

This is an array of objects. Each object can have 8 values:

| Property      | Description |
| -----------   | ----------- |
| title           | Project title       |
| caption         | A string for project caption       |
| image           | Image for the project. Should be something like 'test.jpg', and file should exist in `/src/images`       |
| imageAlt        | Alt text for 'img'       |
| mobileImage     | Image for the project that will only appear on mobile. Should be something like 'test.jpg', and file should exist in `/src/images`. If it exists, it will replace the 'image' on mobile. If it doesnt exist, 'image' will show up on mobile and desktop       |
| video           | A video for the project. Should be an .mp4 file and should exist in `/src/images`. Will override the 'image' field if it exists       |
| color           | A hex code for that projects color |
| slug            | A slug for this project. Must be a unique all lowercase string. e.g. 'year-of-uncertainty' |

### Seo (seo.js)

| Property      | Description |
| -----------   | ----------- |
| title         | SEO title       |
| description   | SEO description       |
| keywords      | SEO keywords (should be a comma separated list) |
| image         | Path to social media image. Should have a forward slash in front of it like this '/test.jpg', and the file should live in `/static` |