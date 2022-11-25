# **SF Movies**

## Problem Statement

Create a service that shows on a map where movies have been filmed in San
Francisco. The user should be able to filter the view using autocompletion
search.

## Solution

The solution is focused on **front-end.** 

1. Used React for this application along with SCSS for styling. 
2. The map is rendered using the API provided by MapBox. Since the locations provided in the SF movie API do not have the coordinates used the geolocation API by MapBox to get the coordinates from the textual location. However the coordinates may not be always accurate since few locations in the SF Movies API are a little abstract. For instance there are locations like —  California between Kearney and Davis (which is not very comprehensible if it is the state California or some particular location) 
3. Used react-autocomplete library for the autocomplete feature. 
4. To limit the search results of the location to San Franscisco used a bounding box in the map api with SF’s coordinates. 
5. Initially developed a UI using glassmorphism effect. However switched it later. It can be viewed on theme/glassmorphism branch.  
6. Along with all the locations where a movie was shot, displayed other information like actors, directors, production company etc. etc. which was available in the SF movies API. In the movie card, the “Want to Visit” button takes the user to the location of the movie (also zooms in - in case the map is not zoomed in) 
7. Used micro-animations (transitions) for a better user experience.
8. Created custom styles for the maps.  
9. Followed BEM naming convention for SCSS. 
10. Also, tried to keep the components as modular as possible. 
11. The layout is **responsive -** the website works well on devices ranging from desktops to tablet to mobile phones. 

## Scope of Improvement

1. To use styled components so that if the application is scaled up one wouldn’t have to worry about clashes in class names. 
2. To use TMDB API to provide more information on the movie cards. 
3. To use loaders for processes that takes more time.
4. To have a light theme along with the dark theme.

