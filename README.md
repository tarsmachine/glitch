# GlitchTV

[Glitch](https://glitchtv.herokuapp.com) is a site meant to allow users to share video of gameplay with their fans. Content is currently provided by uploading VoDs (Video on Demand), which users may then watch. Users can keep track of favorite channels by following, and search the site for content.

## Technologies Leveraged

1. Javascript
    - Front-end built in react + react-modal
    - Application state managed with redux
    - Routing with react-router (BrowserRouter)
    - jquery-rails for ajax to handle csrf tokens

2. Ruby
    - Rails backend
    - activestorage-validator for file upload validations
    - AWS-S3 for ActiveStorage

## Feature Highlights

1. Search!
    - Searches Channels and Videos by title, displays top 5 results for each.
    - Can click on the section title (Channels/Videos) to display all results for that category, and adds a < to the title to return to top results.
    - Search bar renders regardless of the route
    - Separate loading and result state for ajax calls to minimize jankiness!
    - Search results updated in real time as you type, throttled to minimize database requests
    - Overlays results when focused and has input, hides when clicking away or input is cleared.
    - x button to clear input, clearing input resets search state

2. User Auth
    - Helper subtext for signup input fields shows/hides gracefully on focus
    - Password input accessibility improved by allowing users to toggle visibility of entered password
    - Signup errors highlight specific input elements with error messages
    - Prevents users from choosing usernames of reserved keywords that would cause problematic routes, since userpages are routed to /:username (we wouldn't want to have a user named settings, because /settings would conflict)
    - Prevents submission of input until all fields are filled in
    - Login/Signup modals so users can authenticate from anywhere without leaving the current page, and enables additional app functionality on signup via mapping to redux state


## Possible Future Plans

- Categorize and Tag videos, add to Search
- Chat <- Messages on VoDs will be saved to the correct position in the video, and render during playback
- Live Content
- Live Streams archived as VoDs
- Live Chat on LiveStreams saved alongside
- Mark videos as viewed, with last watched position to resume playback.
- ViewCount to better choose popular videos/categories