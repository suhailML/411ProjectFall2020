# 411ProjectFall2020

Team Members:
Suhail Singh
Jared Min 
Chinwe Oparaji
Israel Ramirez
Robel Solomon
Alex Neumann 

# Project Summary 
With social distancing rules in place, many students have resorted to tv shows and movies as their main sources of entertainment. This has led students to the same conundrum that we all dread, which is what movie or tv show should I watch for the next 2 hours? We want address this issue by creating a webapp that would allow BU students to see what other students are watching and recommending on campus. We are also hoping to implement a feature that would allow you to see what Movies and Shows are trending on different parts of campus. Each part of campus (East , West, South , Central, Fenway) will have their own trends based on student votes and recommendations. The webapp could also give a personalized feed based on a survey given when registering for an account. In addition, the web app could scrape through popular movie review websites and forums and come up with trending movies in specific movie watching communities. This would look like recommending movies that are popular among industry screenwriters, or a critic’s choice recommendation for the people that have more of a critical eye when it comes to watching movies and shows. 

## Starting up the application (THIS WILL NOT WORK WITHOUT THE.ENV FILE WITH THE GOOGLE CLIENT ID AND API KEY)
1. Go into your terminal and cd into the project directory
2. cd into app folder
3. run "yarn start" 
4. Application should immediately open in your default browser. If not, try direct your browser to http://localhost:3000/.

## Utilization of OAuth 
For this project, we utilized Google Sign-In as our application's method for logging in. The reason for this is because we wanted to restrict our userbase to the BU community and the best way to accomplish this was to require the users to have an @bu.edu extension in their email. Google Sign-In also allows us to access basic information about the user to help build the user's profile. 

## API Usage
https://developers.themoviedb.org/3/trending/get-trending

For this application, we utilized an API from "TheMovieDB." This allowed for us to access all the global trending movies and their attributes (even images!). 

## Demo 
