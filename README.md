# React + Vite

# Real-Time Chat Application

- Initialized React Project
- Setting up the backend on port 5001
- Created mongoose model schema for user
- Created signUp auth in authController using bcrypt and jwt for user auth
- Created our first user in db through postman
- Created login and logout auth sucessfully with error handling
- Initialized cloudinary which will help update user profilePic
- Created update route and protect middleware which will let only auth user update their profile
- Created Message routes and controllers to send and recieve texts and images
- Configured TailwindCSS in our chat app and Daisy UI
- Initialized Zustand for state management and create a store=>useAuthStore file
- Added conditional stats for routes so only authenticate users will have access
- Installed Cors to handle cors issue which will allow to fetch data from backend
- In profileScreen added a hook that will first compress the image the upload it
- Using cloudinary to store our profile images
- Configured Daisy Ui for themes
- Created Chat container for home screen which displays users
- Created useChatStore for getting & sending messages
- Created some skeleton ui's
- Fixed some minor issue which were causing issues
- Chat container working 
- Implementing Socket.io for rtf
- Created socketjs file in backend which will handle rtf
- Implemented connectSocket and disconnectSocket which tells which user is currently logged in the authStore and Whispr
- Getting the users online by indicating a green icon when user get's online
- Created dummy users to show
- Added a filter to display online users
- Added a auto scroll feature on new messages
- Optimized subscribeToMessage to only send message to selected Users
- Deployed the app on render!!!
- will add some updates as needed

# DB

- We'll split the data base
- One for users
- email
- fullName
- password
- profilepic
- One for messages
- senderId
- recieverId
- text
- image
- Also we'll add timestaps
- createdAt
- updatedAt

# Tech Stack

- HTML/CSS
- TAILWIND CSS
- REACT JS
- DAISY UI
- ZUSTAND
- NODEJS
- EXPRESSJS
- MONGODB
- CRUD
- JSONWEBTOKENS
