# steps
-------
1. create the project folder, and create child folders, frontend & backend
2. in frontend folder, run vite to create react project, and make sure it can run properly
3. in backend, run npm init -y
4. then install bcyrptjs, cloudinary, cookie-parser, dotenv, express, jsonwebtoken, mongoose, socket.io
5. then install nodeman -D
6. create the folder structure
7. create index.js in src
   - change type in package.json to module
   - import express
   - create app.listen and run to make sure the server can run
8. create auth.controller.js, create signup, login & logut route function
9. create auth.route.js, create route for signup, login and logout, import auth.controller route functions, export the route
10. in index.js, import auth.route and use it in app.use for "/api/auth"
11. create db in mongodb, get the URI
12. create .env file, put PORT and MONGODB_URI
13. create db.js, import mongoose and create connectDB async function
14. in index.js, after server is run, call connectDB
15. in mongodb, set the allow access from anywhere
16. create user.model.js with fields: email, fullName, password, profilePic, and then trun on timestamps, create User and export it
17. signup controller
    - get fullName, email & password from req.body
	- create try catch
	- check if password length lower than 6, return 400 with message
	- then User.findOne({email}), and if user exist return 400 with message
	- create salt using bcyrpt.getSalt
	- hash the password
	- create newUser with new User({})
	- if newUser exist
	  - generate jwt token and store in cookies
	  - create generateToken function in libs
	    - create utils.js
		- create generateToken function that receives userId and res
		- import jsonwebtoken
		- get the token using jwt.sign
		- store token in cookies, res.cookie()
		- return token
	  - set the response, res.status(201).json({}) 
	- if not, return 400 with message
	- in the catch, console log message and res.status(500)
18. try user signup using postman
19. now login controller
    - get email and password from req.body
	- try catch
	- User.findOne by email to get the user
	- if user not exist, return 400 with message
	- if ok, then use bcrypt to compare password and user.password
	- if not the same, return 400 with message
	- if ok, then generateToken(user._id, res)
	- then res.status(201).json({})
	- in catch, return console log message and also return 500 internal server error
20. now logout controller
    - try catch
	- only need to remove token from cookie
	- res.cookie("jwt", "", {maxAge: 0})
	- res.status 200 with message
	- in catch, console log and also return 500 with internal server error
21. now test everything with postman
22. now we want to add updateProfile route
    - in auth.route, add route.put for update-profile
	- call updateProfile controller, create the function in controller folder
	- but before calling updateProfile controller, we will call a middleware called protectRoute
	  - create auth.middleware.js in middleware folder
	  - create updateProfile function
	  - try catch, get the token from cookies
	  - but to do this, first we must import cookie-parser and use in index.js
	  - if token not found, return 401 with message
	  - if ok, then decode the token using jwt.verify
	  - if decoded failed, return 401 with message
	  - if ok, then use the userId from the decoded token, call User.findById to get the user
	  - if user not found, return 404 with message
	  - if ok, then assign user to req.user
	  - then call next()
	  - in catch, console log error and return 500 Internal Server Error
23. now let's work on cloudinary to store our when user udpate their profile
    - go to cloudinary website, login, get the cloud name
	- then generate new api key, get the api key and api secret
	- save all above info in .env file
	- create cloudinary.js file in lib folder
	- import v2 as cloudinary from cloudinary
	- import config from dotenv
	- call config()
	- set cloudinary config, set the cloud_name, api_key and api_secret
	- export default cloudinary
24. add check route to checkAuth
    - in auth.route.js, add /check route, call protectRoute first, then call checkAuth
	- create checkAuth controller function
	  - try catch
	  - simply response res 200 return req.user in json
	  - in catch, call console log display error message and return 500 Internal Server Error
25. now time for message
26. create message model as usual
27. create message.route.js
    - the first one is to get users for sidebar
    - router.get('/users'), protectRoute & getUsersForSidebar
	- create getUsersForSidebar controller
	  - get logged in user id from req.user._id
	  - get filteredUsers (exclude logged in user), without password]
	  - return 200 with filtered users
	  - catch part, console log with return 500 internal server error
	- import message route into index.js and add to app.use /api/message
28. now to get all messages for user and sender
    - in message.router.js, router.get("/:id"), protectRoute & getMessages
	- create getMessages controller
	  - try catch
	  - get userToChatId from params
	  - get all the messages 
	    - query using mongoose
	  - return 200 with messages
	- in catch console log error message and return status 500 with message
29. now to send message
    - in message.router.js, router.post /send/:id, protectRoute & sendMessage
	- create sendMessage controller
	  - try catch
	  - get text & image from req.body
	  - get receiverId from req.params
	  - get senderId from req.user._id
	  - image there's image, upload to cloudinary, get the response, and get the imageUrl and assign to imageUrl var
	  - set new Message({}) with all the fields populated
	  - save it
	  - return 201 with json the new message
	  - in catch console log the error message and return status 500 with the message

# frontend
1. npm install react-hot-toast, react-router-dom
2. setup tailwind css
3. setup daisyui
4. test
5. do some housekeeping, create components and pages folder
6. in main.jsx, wrap App with BrowserRouter from react router dom
7. in App.jsx clear everything
8. add Navbar component, create Navbar component
9. import Routes and Route
10. create Routes > Route > for
    - HomePage, SignupPage, LoginPage, SettingsPage and ProfilePage
11. create HomePage.jx, LoginPage.jsx, ProfilePage.jsx, SettingsPage.jsx and SignupPage.jsx, and manage the import in App.jsx
12. install axios and zustand, axios is to manage the api, and zustand is to manage global state
13. create lib folder, create axios.js
    - import axios
	- export const axiosInstance, axios create, baseUrl & withCredentials
14. create store folder, create useAuthStore.js
    - import create from zustand
	- import axiosInstance
	- export useAuthStore with below states:
	  - authUser, isSigningUp, isLoggingIn, isUpdatingProfile, isCheckingAuth
	- create checkAuth function, tryc catch finally, use axiosInstance and call auth/check
15. back to backend folder, npm install cors, in index.js app.use cors with origin & credentials configuration
16. back to frontend, in App.jsx, get authUser, checkAuth & isCheckingAuth from store
17. use useffect to call checkAuth
18. display loading when is checking auth
    - ischeckingauth && !authuser
	- npm install lucide-react
	- import Loader
	- return div > Loader, with all the classname
19. check authUser in home page route and profile page route, if !authAuser navigate to login page
20. check !authUser in signup and login page, if already authUser, navigate to homepage
21. time for signup page
22. in useAuthStore, create signup function skeleton first
23. create state for showPassword and formData object
24. import signup and isSigningUp from useAuthStore
25. create skeleton function for validateForm and handleSummit
26. create the form, follow existing code, too long and too many class names
27. for the other side of the form, create AuthImagePattern component and import it into SignupPage
28. when the form is done, start with the validation function
    - import Toaster into App.jsx
	- complete the validationForm function validations, and if success return true
	- in handleSubmit, call the above validation function
	- if validation true, call signup function and assing formData
	- in useAuthStore
	  - set the isSigningUp true
	  - try catch finally
	  - call axiosInstance post /auth/signup and pass data
	  - get the response
	  - set authUser res.data
	  - toast successful
	  - in error, simply toast error
	  - in finally, set isSigningUp false
	- now give it a fucking try
29. create the logout function in useAuthStore
30. now go to then Navbar at start creating the complete header, simply follow the code from video, too long and too many class names
31. then give it a fucking try to logout
32. next create the login function in useAuthStore
33. then create the login page, simply follow the code from the video, to many elements and class names
34. now we want to start working on the profile page
    - create updateProfile skeleton function in the useAuthStore first
	- the finish the ProfilePage, follow the code in the video, too many elements and class names
	- then finish the updateProfile function
	  - set isUpdatingProfile to true
	  - try catch finally
	  - finally set isUpdatingProfile to false
	  - error, console log and toast.error
	  - try, call axiosInstance put auth/update-profile and send the data
	  - get the res, set to authUser
	  - toast success
35. ok that's part is done, time for setting page
36. first create tailwind.config.js file
37. create the content and add all the themes
38. create constants folder and index.js file in it
39. in the file export const THEMES
40. in store folder, create useThemeStore.js
    - import create from zustand
	- follow standard zustand store file
	- export useThemeStore, create(set) => {}
	- contains theme, setTheme
41. now in SettingsPage
    - create PREVIEW_MESSAGES constant
	- complete the SettingsPage component, simply follow the code from the video, too many elements and class names
42. since now we are using latest daisy, the list of themes should be configured in index.css, follow the fix i've got from AI
43. test, the theme settings should work now
45. now time for the homepage, the chat page
46. start with creating useChatStore.js
    - messages, users, selectedUser, isUsersLoading, isMessagesLoading
	- getUsers
	- getMessages
47. in homepage
    - import selectedUser
	- complete the component
	  - create Sidebar, NoChatSelected & ChatContainer components
	  - complete NoChatSelected component, follow the code from the video
	  - create and complete the SidebarSkeleton.jsx
	    - create folder skeletons in components folder
		- create the file
		- it's a long design code, simply follow code from video
	  - complete the Sidebar component
	    - get all the states and functions from useChatStore
		- the rest, simply follow the code from video, it's a long one
48. next is ChatContainer
    - bring in messages, getMessages, isMessageLoading and selectedUser from useChatStore
	- call useEffect to get messages for selectedUser
	- if isMessagesLoading, return skeleton
	  - chatheader
	  - messageskeleton
	  - messageinput
	- chatcontainer return
	  - chatheader
	  - messages
	  - messageinput
	- create above components
	- create message skeleton
	- follow code from videos, too long and too many class names
	- next is MessageInput, complete it, simply follow code from video
	- next complete the handleImageChange function
	- next complete the removeImage function
	- finally complete the handleSendMessage function
	- then give it a fucking try, it should work by now, at least the text and image will go to database
	- if everythings seems ok, next is the messages part
	- do it in ChatContainer between chatheader and messageinput
	- follow the code from the video, so long and lots of class elements and class names
	- the chat should now displays the messages
	- now create utils.js file in lib folder and create and export formatMessageTime function to be used to format the date time displayed in the chat
	- try again, everything should work now
49. Finally, socket.io time
50. in the backend, we've already installed socket.io package
51. the idea is, socket io server is like wrapping the express app and server
52. create socket.js file in lib folder
53. import Server from socket.io, http from http and express from express
    - create app from express
	- create server from http
	- create io
	- then, io.on(connection)
	- export io, app, server
	- in index.js, replace app with app fro socket.js
	- bring as well server and replace app.listen to server.listen
54. next in frontend, install socket.io-client
55. in useAuthStore import io
56. create connectSocket and disconnectSocket functions
57. call connectSocket in login and signup
58. call disconnectSocket in logout
59. but for both functions to complete, we need to update socket.js in the backend
    - create userSocketMap to store online users
	- get userId by using socket.handshake.query.userId
	- assign it to userSocketMap
	- the io.emit
	- when disconnect, delete userId from userSocketMap then io.emit again
	- in connectSocket in client, add authUser._id to userId in the query in io, so the userId reaches the backend
	- give it a fucking try
60. now time for the real time messages
61. in socket.js, add getReceiverSocketId helper function
62. in message.controller, in sendMessage function, when a new message is sent, after the new message is saved in database, then call the getReceiverSocketId to get the receiverSocketId
63. if there is, call io.to(receiverSocketId).emit("newMessage", newMessage)
64. this will emit the new message through socket.io to specific receiver
65. then in useChatStore, create subscribeToMessages function
    - first get selectedUser, if there's none, simply return
	- get socket from useAuthStore
	- socket.on to listen to new message
	- update the messages array
66. then in useChatStore, create unsubscribeFromMessages function
    - get socket from useAuthStore
	- socket.off('newMessage')
67. in ChatContainer component, call subscribeToMessages and unsubscribeToMessages
    - in useEffect, after getMessages, call subscribeTomessages
	- the in cleaning up, call unsubscribeFromMessages
68. give a fucking try, it should work now
69. now we want the chat window to automatically scroll to the bottom whenever a new message comes in
    - in ChatContainer, create messageEndRef = useRef
	- add as ref in the message div
	- then add a new useEffect which will be triggered whenever messages is changed
	  - messagedEndRef.current.scrollIntoView
70. optimize code, in subscribeToMessage function in useChateStore, add newMessage.senderId !== selectedUser._id check
71. add filter online users
    - in Sidebar component, create state showOnlineOnly
	- create const filteredUsers, filter online users when showOnlineOnly true
	- replace users with filteredUsers
	- add jsx code for the checkbox for showOnlineOnly
	- add jsx code to display no online users when there's no online users
	







