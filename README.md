# New Information (Temporary Site)

## Content Management Process

To update content on the site, edit `/content/content.js`. Once edited, you should commit, and push your changes to the 'main' branch. Netlify will then detect the push and deploy to the live site.

There are five objects that can be edited in the content.js file, 'general', 'seo', 'about', 'email', 'text'.

### General

| Property      | Description |
| -----------   | ----------- |
| mobileAnimationDuration         | Timing for mobile animation (in seconds)     |
| asteriskDescription         | Text that shows up when the asterisk in the top right corner is hovered     |

### Seo

| Property      | Description |
| -----------   | ----------- |
| title         | SEO title       |
| description   | SEO description       |
| keywords      | SEO keywords (should be a comma separated list) |
| image         | Path to social media image. Should have a forward slash in front of it like this '/test.jpg', and the file should live in `/static` |

### About

| Property      | Description |
| -----------   | ----------- |
| img           | Image that shows up when ? is clicked. Should be something like 'test.jpg', and file should exist in `/src/images`       |
| imgAlt        | Alt text for 'img'       |
| text          | About text that appears next to ? |

### Email

| Property      | Description |
| -----------   | ----------- |
| definition    | This is the definition that shows up when you hover over the email signup       |

### Text

This is an array of objects. Each object can have 3 values:

| Property       | Description |
| -----------    | ----------- |
| word           | Individual word in sentence       |
| definition     | The definition for 'word' that should show up at the bottom of the page when 'word' is hovered over    |
| link           | (Optional) A URL. If 'link' exists, the corresponding 'word' will be a link with the URL value here |

The 'word' and 'definition' properties can also have <span> tags embedded in them. These span elements can have either the class 'overline' to add an overline, or 'upside-down' to flip a character upside down.