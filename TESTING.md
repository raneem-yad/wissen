# User Story Testing

[Document can be viewed here with more details](https://docs.google.com/spreadsheets/d/1PGTyuksE7jeTZeBwcTbz94Z0Oz-22vZtCTD-6P6U3OI/edit?usp=sharing)

## Courses
![test](/readme/testing/courses.png)

## Comments 
![test](/readme/testing/comments.png)

## Instructors
![test](/readme/testing/instructor.png)

## General
![test](/readme/testing/general.png)

## Learners
![test](/readme/testing/learner.png)

## Authorization
![test](/readme/testing/autherization.png)


## Lighthouse Testing

Lighthouse testing was performed and found performance to be poor. 
The Poor performance caused by slider image I change them to Webp
and got no success in improve it.

![lighthouse](/readme/testing/lighthouse.png)


## Responsiveness

All pages were tested to ensure responsiveness on screen sizes from 320px and upwards as defined in WCAG 2.1 Reflow criteria for responsive design on Chrome, Edge, Firefox and Opera browsers.

Steps to test:

* Open browser and navigate to Wissen_Website
* Open the developer tools (right click and inspect)
* Set to responsive and decrease width to 320px
* Set the zoom to 50%
* Click and drag the responsive window to maximum width

Expected:

Website is responsive on all screen sizes and no images are pixelated or stretched. No horizontal scroll is present. No elements overlap.

Actual:

Website behaved as expected.


## Eslint

Eslint was installed and configured locally.

## Validators

All CSS files were individually validated.

![CSS](/readme/testing/css_validator.png)


## Unfixed Bugs
`Warning: OverlayTrigger: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.`

This is because of using OverlayTrigger to show a tooltip message for not allowing the instructor to rate himself. I tried to solve it, but it took more time than I expected, so I prioritized other bugs over this one.
