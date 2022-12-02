# **SF Movies**

 [![](https://img.shields.io/badge/Hosted_On_Netlify-informational?style=for-the-badge&logo=netlify&labelColor=ea1c24&color=fb624c&logoColor=ffffff)][1] 
 
 [1]: [](https://taupe-tapioca-400ff7.netlify.app/)
 
## Technologies used 
![](https://img.shields.io/badge/React-informational?style=for-the-badge&logo=react&labelColor=ea1c24&color=fb624c&logoColor=ffffff) &nbsp;
![](https://img.shields.io/badge/SCSS-informational?style=for-the-badge&logo=sass&labelColor=ea1c24&color=fb624c&logoColor=ffffff)

- APIs Used - SF Movies API, MapBox
- Package Installer - npm

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
6. Along with all the locations where a movie was shot, displayed other information like actors, directors, production company etc. etc. which was available in the SF movies API. In the movie card, the “Want to Visit” button takes the user to the location of the movie (zooms in or out) 
7. Used micro-animations (transitions) for a better user experience.
8. Created custom styles for the maps.  
9. Followed BEM naming convention for SCSS. 
10. Also, tried to keep the components as modular as possible. 
11. The layout is **responsive -** the website works well on devices ranging from desktops to tablet to mobile phones. 
12. Added custom markers on the map. On clicking the markers one can view the place name on a tooltip. 

## Scope of Improvement

1. To use styled components so that if the application is scaled up one wouldn’t have to worry about clashes in class names. 
2. To use TMDB API to provide more information on the movie cards. Possibly include the movie poster while displaying the movie card. 
3. To use loaders for processes that takes more time.
4. To have a light theme along with the dark theme.


## To run this project locally 
- Clone the repo 
- Install the required packages by running `npm install`
- Finally do `npm start` 

## Screenshots 

### Using the Map
Search for movies by entering the movie title or selecting a movie from the dropdown. This displays the markers for locations where the movie was shot. Click on Want to visit to get a more zoomed in view. Click on the markers shows a popup with the location. 


https://user-images.githubusercontent.com/64982040/204746303-7e8defc5-1815-4605-9592-bebb4350f491.mov


### Switch Themes 

https://user-images.githubusercontent.com/64982040/204745658-363cede8-e11f-41cf-8aff-3412fd0d025f.mov

