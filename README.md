# Responsive jQuery Carousel Tutorial

This tutorial will teach you how to build a responsive carousel with jQuery. View the live [demo](https://emdubb.github.io/jQuery_carousel_tutorial/). Features of the carousel include:

- Auto rotation
- Responsive
- Progress indicators
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

#### Adding Arrow Controls

#### Show Slide Progression