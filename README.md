# Insta-Gamer
A social media platform where users can share pictures and posts of their favorite videogame tips, tricks, accomplishments, memes and more. 
Full stack built by me, with CRUD and REST api features on the backend.

**Link to project:** https://insta-gamer.cyclic.app/

![alt tag](https://colinkenjirosmith.netlify.app/images/insta-gamer.jpg)

## How It's Made:

**Tech used:** Bootstrap, MongoDB, Express, Node, Cloudinary, Passport, CSS, Javascipt

As a full stack CRUD app, I used a model view controller (MVC) organization to help my project stay organized and scale as I added features. The models Users and Posts hold the bulk of the information, and I eventually added Comments as well. The models are linked to each other such that each post includes the ID of the user that posted it, as well as comments being linked to both a post and a user.

The views are made in EJS and include a separate file for each type of page in this project: login, sign-up, feed, post, profile (posts, followers, following, settings) with several partial ejs files to keep my code DRY: header, footer, profile-details.

I purposefully started with the models and the views because that's how I organized and wireframed my project. It's easy once you think about the data you're going to be manipulating, as well as the final views of how it will be displayed and how the user manipulates it to then think about the controller, and what code you need to manipulate all the data.

The auth controller is used for loggin in and signing up for an account.

The posts controller controls rendering for the feed and individual posts, as well as liking and disliking posts, deleting posts, and adding comments.

The profile controller controls rendering for each individual profile for posts, followers, following, as well as creating new posts, following and unfollowing, and changing a user's settings.

Node manages the backend, connecting all the files to the specific requests as directed by Express to make all the routing and controlling easier to manage. MongoDB is the database that manages all the data so it is persistent and accessible from anywhere. Cloudinary is the image host so that when images are uploaded, they get uploaded to cloudinary and then only a url link is saved in the database. Passport manages logins and authentications. 

The front end is made of only HTML and CSS, with basically no client side JS. Links and buttons are managed by form HTML to ensure universal compatibility and speed. Bootstrap does the bulk of the layout and style, with only a smaller CSS file to do tweaks (~200 lines, for nearly 10 ejs files and more partials).

## Optimizations: 

I'd love to be able to come back to this project and redo the front end with React. It look good enough considering the limitations I set out for myself, but it still looks like an app from 10 or 20 years ago, instead of something from today. That comes from using just the basics, so I'm pleased with how it turned out, but I see how it could be improved.

Right now, I don't have any sort of pagination or lazy loading for the feeds. I'd love to come back and add that so the project scales, at the time of writing there are about 15-20 posts which looks great, but 100 I know would overload user's browsers with too many requests and high-resolution images to display at once. 

The User's settings are still basic, and I don't have a way to change a user's password. I'd love to add onto it with more functionality and settings, such as marking a profile private so that only users they follow can see their posts and profile.

Right now the app only works with image posts, but looking on other social media websites for inspiration like Reddit it would be great to allow text only posts and videos. Text would be easy - just made a display div to hold the header and part of the text of the post. Videos also wouldn't be too difficult - cloudinary supports videos, I'd just have to add logic for displaying a video instead of simply an image.

## Lessons Learned:

I learned a ton about using bootstrap in this project. I'd never worked with bootstrap formally before, and I wanted to see how much I could accomplish with only that framework. Fighting row and column classes until they finally work the way I want them to took some learning, but I'm confident about using them now. It's amazing how quickly a project's front end can come together with just those layout classes, and even relatively complicated layouts can be set up in minutes. However when I went over it with finer detail I started to see the limitations of the framework. Some things are easy to get close, but almost impossible to fine tune to get exactly what you want. My initial goal was to use only bootstrap classes to do everything in this project, but that proved too frustrating so I had to fall back on vanilla CSS to get my views right. Bootstrap also violates the rule of separation of concerns, where it has HTML classes determine a lot of the style of the page, instead of the CSS. This means that when I'm looking at my chrome inspector to see why a <div> is acting ary, I have to look in 2 places to see if it's a bootstrap class that's causing an issue or my custom CSS, and that led to a lot of headaches.

Regardless, I see myself using Bootstrap for future project. Probably only for the things that only need a simpler design, or perhaps only using it for layouts and doing the bulk of styling and other tweaks in CSS.

This project was a good reiteration of using Express routing and connecting everything together, from the user clicking a link, to sending the get request, to rendering and serving the final HTML document that gets displayed on the user's screen. I love being able to put all the pieces together, and understanding every step of the way in a satisfying, well-oiled machine. It formalized my understanding in a big way. I distinctly remember initially struggling with the logic of making a user only able to like a post once, and deciding to work on some other features and come back to it. It was one of the last difficult logic pieces I added to this project. By the time I came back to it, I coded it in like 15 minutes by just modifying some other code I'd already written. I'm a much stronger dev after this project than I was before it. 

Working with middleware was another fundamental that I strengthened with this application. I had a specific bug with the way a middleware called next(), to where it wasn't properly calling the next method, but after quite a lot of digging on stackoverflow I found some working code and modified it to work in my project. There's a lot more you can do with middleware than just verifying logins and such and I'm eager to expand my use of middleware in my future projects, since this made me more confident in using it.

This was also the first time using cyclic to host a full stack app, previously I'd used heroku. It took a little setting up with interfacing with MongoDB in a way I had't done before, but now it's so easy to build and deploy I wish I'd found it sooner. I see myself using cyclic for my future apps. 


