# Responsive jQuery Carousel Tutorial

This tutorial will teach you how to build a responsive carousel with jQuery. View the live [demo](https://emdubb.github.io/jQuery_carousel_tutorial/). Features of the carousel include:

- Auto rotation
- Responsive
- Arrow controls

### Getting started

Make sure you have your html file linked to your CSS and JavaScript and that you have linked [jQuery](https://code.jquery.com/) to your document. We will also be using [normalize.css](https://necolas.github.io/normalize.css/). For the purposes of this demonstration our file structure will look like this:

![File Tree](https://i.imgur.com/KoBwFi0.png)



### How It Works

Let's take a minute and think about how to approach building a carousel. We want images to be lined up in a row and slide from one to the next, so we will initially lay out our page something like this:

![Slide Layout](https://i.imgur.com/MHl3daZ.png)

Once we have our page formatted we want to move through all of the slides, rotating through a queue that will continuously display one slide after another like this:



![Slide Functionality](https://i.imgur.com/fJeAbem.png)





---

#### Step 1: HTML - Layout

Create a `<section>` with the id "carousel" this will be the main container for your carousel. Then for every slide you want to have for the carousel create a div with the class "slide-img" and the id "slide#". For this example we will have 5 slides, so the HTML will look like this: 

```html
<section id="carousel">
    <div class="slide-image" id="slide1">
    </div>
    <div class="slide-image" id="slide2">
    </div>
    <div class="slide-image" id="slide3">
    </div>
    <div class="slide-image" id="slide4">
    </div>
    <div class="slide-image" id="slide5">
    </div>
  </section>
```

#### Step 2: CSS - Adding Images

For each id lets add a background image. By using a background image with a little bit of styling this will allow you to use any image, horizontal or vertical, at any size and it will be responsive. So, for five slides, your CSS should look like this:

*You can use as few or as many slides as you would like, just make sure they all have the 'slide-image' class in the HTML and they have a unique id that corresponds to a style with the correct image url.*

```css
#slide1 {
  background-image: url('../img/image1.jpg');
}

#slide2 {
  background-image: url('../img/image2.jpg');
}

#slide3 {
  background-image: url('../img/image3.jpg');
}

#slide4 {
  background-image: url('../img/image4.jpg');
}

#slide5 {
  background-image: url('../img/image5.jpg');
}
```



#### Step 3: CSS - Styling The Images

If you preview this in the browser you will notice that your images are not being displayed. We need to specify the height and width of the div. Lets use 100vh and 100vw. If you are unfamiliar with these units they refer to the viewport width (vw) and viewport height (vh). This will ensure that your carousel displays full screen on any device. So lets add these to our 'slide-image' class.

```css
.slide-image {
  width: 100vw;
  height: 100vh;
}
```

Now depending on your images they may only be displaying part of the image. Lets add some styling to make sure that they cover the `div` and are centered. Add to the 'slide-image' class the following:

```CSS
.slide-image {
  width: 100vw;
  height: 100vh;
  background-position: center;
  background-size: cover;
}
```



#### Step 4: CSS - Lining Up The Images

You should now be seeing 5 images stacked on top of each other. First let's set the size of the container, again, we are going to make this full screen so lets use 100vh and 100vw. To line them up lets set the display property on the 'slide-image' class to 'inline-block'. If you refresh your browser, you'll notice they are still stacked. This is because we told the images to take of the full width of the viewport, so they are wrapping. To prevent them from wrapping, lets use the ['white-space'](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space) property and set it to 'nowrap'. In addition we want to set the 'overflow' property to 'hidden' this ensures that if you change the width of the carousel of the carousel to not be full screen then only one image will display at a time.

```css
#carousel {
  overflow: hidden;
  white-space: nowrap;
  width: 100vw;
  height: 100vh;
}

.slide-image {
  width: 100vw;
  height: 100vh;
  background-position: center;
  background-size: cover;
  display: inline-block;
}
```

Excellent, now lets add some functionality!



#### Step 5: JavaScript - Adding jQuery

First things first. Lets wrap all of our code with a `$(document).ready()` so that our images load before the slideshow starts.

```javascript
$(document).ready(function(){
  // We will write all our code here
})
```



#### Step 6: JavaScript - Setting An Interval

We want our slideshow to automatically run on an interval so we will use JavaScripts [`.setInterval()`](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval) method on the `window`.  We want our slides to change every 3 seconds, so after the callback function we will set the duration to '3000'.

```javascript
$(document).ready(function(){

  var interval = window.setInterval(rotateSlides, 3000)
  
  function rotateSlides() {
    // animation will go here
  }

})
```



#### Step 7: JavaScript - Setting Our Variables

Now that we have our interval set up, we want to start by grabbing the first slide and storing it as a variable, we'll do this with jQuery's [`.find()`](https://api.jquery.com/find/) method within the carousel section.

*You may notice that we have opted to call the variable `$firstSlide` instead of `firstSlide`. You will see that in JavaScript programmers often prefix variable names with a `$` if they are storing a jQuery object.*

```javascript
$(document).ready(function(){

  var interval = window.setInterval(rotateSlides, 3000)
  
  function rotateSlides() {
    var $firstSlide = $('#carousel').find('div:first');
  }

})
```



Now that we have the slide, we want to move it to the left. We want to move it the full width of itself. Since we are making a responsive carousel we don't know exactly the width of the slide, so every time we run the interval we want to get the slides current width. We will do this with jQuery's [`.width()`](http://api.jquery.com/width/) method.

```javascript
$(document).ready(function(){

  var interval = window.setInterval(rotateSlides, 3000)
  
  function rotateSlides(){
    var $firstSlide = $('#carousel').find('div:first');
    var width = $firstSlide.width();
  }

})
```



#### Step 8: JavaScript - Animating The First Slide

Now that we have the info we need, lets do some animation with jQuery's [`.animate()`](http://api.jquery.com/animate/) method. We will call `.animate()` on the `$firstSlide`. The animation that we want to occur is moving the slide to the left so we will pass in `{marginLeft: -width}`. Width is the distance we want it to move, but we want it to slide left and not right so we need to specify that the width is negative. The next parameter is the duration of the animation, 1000 (1 second), and then we need to pass in a callback function to tell it what to do after the animation has occurred. 

```javascript
$(document).ready(function(){
  
  var interval = window.setInterval(rotateSlides, 3000)
  
  function rotateSlides(){
    var $firstSlide = $('#carousel').find('div:first');
    var width = $firstSlide.width();
    
    $firstSlide.animate({marginLeft: -width}, 1000, function(){
      // What to do after the animation
    })
  }

})
```



If you refresh your browser, your first slide will slide to the left and the next one will come into the view. Pretty cool! Now lets make all the slides work.



#### Step 9: JavaScript - Rotating Through The Slide Queue

Right now everytime the interval runs the first slide is moving further and further to the left. What we need to do next is add some code to our callback function that will move the first slide to the end of the queue. We want the second image to now be the first slide. Recall this image from earlier:  

![Slide Functionality](https://i.imgur.com/fJeAbem.png)



We have the first slide stored as `$firstSlide` and we know we want to move it to the end of the queue, so lets store the last slide. Once we have the last slide, we can use jQuery's [`.after()`](http://api.jquery.com/after/) method to move the first slide after the last slide.

```javascript
$(document).ready(function(){
  
  var interval = window.setInterval(rotateSlides, 3000)
  
  function rotateSlides(){
    var $firstSlide = $('#carousel').find('div:first');
    var width = $firstSlide.width();
    
    $firstSlide.animate({marginLeft: -width}, 1000, function(){
      var $lastSlide = $('#carousel').find('div:last')
      $lastSlide.after($firstSlide);
    })
  }

})
```



If you refresh your browser, all the slide should rotate. If you open up your browser's dev tools and look in the DOM tree while the slide show runs, then you should see the slides reordering as the slideshow progresses. You may have noticed that once it gets to the end, the elements are still rotating in the DOM tree, but nothing is happening on the screen. This is because the slides all have a negative margin that is being set when we move the slide to the left. So we need to reset the margin after the animation happens. For this, we do not need to animate the slide, so we will simply use jQuery's [`.css()`](http://api.jquery.com/css/) method.

```javascript
$(document).ready(function(){
  
  var interval = window.setInterval(rotateSlides, 3000)
  
  function rotateSlides(){
    var $firstSlide = $('#carousel').find('div:first');
    var width = $firstSlide.width();
    
    $firstSlide.animate({marginLeft: -width}, 1000, function(){
      var $lastSlide = $('#carousel').find('div:last')
      $lastSlide.after($firstSlide);
      $firstSlide.css({marginLeft: 0})
    })
  }

})
```



If you refresh your browser you should now have a carousel rotaing on repeat. Huzzah!

---

### Fancy Functionality

Okay, fancy pants. You have a wicked cool carousel, but now you want to be able to click through it. Let's add some arrow controls!

#### Step 10: Adding Arrow Controls - Setting Up The HTML

Lets add our arrows to the HTML in the carousel section, but above the slides. Give each arrow an 'arrow' class for shared stylings and an id 'left-arrow' and 'right-arrow' for arrow specific stylings.

```html
<section id="carousel">
    <img src="img/arrow_left.svg" alt="Left Carousel Arrow" class="arrow" id="left-arrow">
    <img src="img/arrow_right.svg" alt="Right Carousel Arrow" class="arrow" id="right-arrow">
    <div class="slide-image" id="slide1">
    </div>
    ...
</section>
```



#### Step 11: Adding Arrow Controls - Styling The Arrows

First let's make sure the arrows are a reasonable size. If you are using the assets from this demo, set the 'width' property to '5%'. We want the arrows to be vertically centered. To do this set the parent element (the section with the id 'carousel') property 'position' to 'relative'. Then set the arrows to have a 'position' of 'absolute'. This will allow us to style the arrows relative to their parent container. Now we can set the 'top' property to '50%' and to make sure that 50% is calculated from the center of the arrow image lets set the 'transform' property to 'translateY(50%)'. 

```css
#carousel {
  ...
  position: relative;
}

.arrow {
  width: 5%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

#right-arrow {
  right: 20px;
}

#left-arrow {
  left: 20px;
}
```



#### Step 12: Adding Arrow Controls - Responsive CSS

We want the arrows to look proportionate on each device, so we will add some media queries. If you aren't sure how to write media queries, that's okay. It is outside of the scope of this tutorial, but make sure you add the following to the **bottom** of your css file.

```css
@media (max-device-width: 1024px) {
  .arrow {
    width: 20%;
  }
}

@media (max-width: 768px) {
  .arrow {
    width: 10%;
  }
}
```

Looking pretty stellar, right? Now, lets make these arrows do something!



#### Step 13: Adding Arrow Controls - Event Listeners

Heading back JavaScript, lets add listeners for the arrows and set up their corresponding functions. I'm feeling a little extra fancy, so I'm going to add a listener for when the slide is clicked to advance.

```javascript
$('.left-arrow').click(previousSlide);
$('.right-arrow').click(nextSlide);
$('.slide-image').click(nextSlide);

function nextSlide(){
  // Go to next slide
}

function previousSlide(){
  // Go to previous slide
}
```



#### Step 14: Adding Arrow Controls - Advancing To The Next Slide

Let's start with advancing to the next slide. The first thing we want to do is stop the automatic advancing of the carousel by clearing the interval.

```javascript
function nextSlide(){
  window.clearInterval(interval);
}
```



Since we are making a responsive carousel we want to get the current slide and the width like we did before. We don't want to rely on the values that we were using in the interval because the browser may have changed. We want the variables at the exact moment the user clicked. 

```javascript
function nextSlide(){
  window.clearInterval(interval);
  var $currentSlide = $('#carousel').find('div:first');
  var width = $currentSlide.width();
}
```



Now that we have the info we need, just like before, let's advance to the next slide. Then after the animation move the current slide to be after the last on in the queue. This is the same thing we were doing within the interval above.

```javascript
function nextSlide(){
  window.clearInterval(interval);
  var $currentSlide = $('#carousel').find('div:first');
  var width = $currentSlide.width();
  $currentSlide.animate({marginLeft: -width}, 1000, function(){
    var $lastSlide = $('#carousel').find('div:last')
    $lastSlide.after($currentSlide);
    $currentSlide.css({marginLeft: 0})
  });
}
```



We have one more step to go before our 'nextSlide' method is complete. We need to resume the interval. We are going to reassign the variable 'interval' with a new interval session that references the same functionality in our 'rotateSlides' method.

```javascript
function nextSlide(){
  window.clearInterval(interval);
  var $currentSlide = $('#carousel').find('div:first');
  var width = $currentSlide.width();
  $currentSlide.animate({marginLeft: -width}, 1000, function(){
    var $lastSlide = $('#carousel').find('div:last')
    $lastSlide.after($currentSlide);
    $currentSlide.css({marginLeft: 0})
    interval = window.setInterval(rotateSlides, 3000);
  });
}
```



#### Step 15: Adding Arrow Controls - Going Back To The Previous Slide

Almost there! The 'previousSlide' method will be very similar but we need to adjust a few things to be able to go backwards. We are going to start of the same as the 'nextSlide' method by stopping the interval and getting the current values that we need. In this case we need the current slide, the width, and the previous slide before we animate.

```javascript
function previousSlide(){
  window.clearInterval(interval);
  var $currentSlide = $('#carousel').find('div:first');
  var width = $currentSlide.width();
  var $previousSlide = $('#carousel').find('div:last')
}
```



Before we animate this bad boy we need to take an extra step and move the previous slide back to the front of the queue so that it can slide in nicely from the left side of the screen. We will do this by setting the left margin of the previous slide to the negative value of its width and using jQuery's [`.before()`](http://api.jquery.com/before/) method to reorder the DOM.

```javascript
function previousSlide(){
  window.clearInterval(interval);
  var $currentSlide = $('#carousel').find('div:first');
  var width = $currentSlide.width();
  var $previousSlide = $('#carousel').find('div:last')
  $previousSlide.css({marginLeft: -width})
  $currentSlide.before($previousSlide);
}
```



Once we have the previous slide set to the front of the queue we can now add the animation just like before. This time in our animation callback function we do not need to reorder anything. All we need to do is restart the interval and it will continue to advance slides from there.

```javascript
function previousSlide(){
  window.clearInterval(interval);
  var $currentSlide = $('#carousel').find('div:first');
  var width = $currentSlide.width();
  var $previousSlide = $('#carousel').find('div:last')
  $previousSlide.css({marginLeft: -width})
  $currentSlide.before($previousSlide);
  $previousSlide.animate({marginLeft: 0}, 1000, function(){
    interval = window.setInterval(rotateSlides, 3000);
  });
}
```



Congratulations! You are now the proud new developer of a snazzy new responsive carousel that's locked and loaded with arrow controls.