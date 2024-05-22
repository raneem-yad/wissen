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
While this is to be expected with so many images,
this could be improved in the future by compressing 
images before uploading them.
Unfortunately, I did not have time to implement this functionality in this iteration.

![lighthouse]()


## Responsiveness

All pages were tested to ensure responsiveness on screen sizes from 320px and upwards as defined in WCAG 2.1 Reflow criteria for responsive design on Chrome, Edge, Firefox and Opera browsers.

Steps to test:

* Open browser and navigate to body-doodles
* Open the developer tools (right click and inspect)
* Set to responsive and decrease width to 320px
* Set the zoom to 50%
* Click and drag the responsive window to maximum width

Expected:

Website is responsive on all screen sizes and no images are pixelated or stretched. No horizontal scroll is present. No elements overlap.

Actual:

Website behaved as expected.

Website was also opened on the following devices and no responsive issues were seen:

Oukitel C21 Pro TCL 30 Pro iPhone SE

## Eslint

Eslint was installed and configured locally. After running, one warning appeared about react version not specified but no errors were logged.

<blockquote>

C:\Users\garet\body-doodles>npx eslint src


npm WARN config global `--global`, `--local` are deprecated. Use `--location=global` instead.

Warning: React version not specified in eslint-plugin-react settings. See https://github.com/jsx-eslint/eslint-plugin-react#configuration .</blockquote>
