# Mood-Parachute - a simple, mindful, and engaging journal app
## Authors: Yutong Zhan, Jiayi Wen
## Functionality Updates in Iteration 3:
1. **Location Use**: User can quickly add a place by tapping the location icon while journaling.
<img width="200" alt="image" src="https://github.com/jiayiwen23/Mood-Parachute/assets/62995082/5871d650-ef4e-43f2-8bfb-8000ed949281">

2. **Map in Profile**: The map displays journal numbers at each documented location, illustrating the user's journaling journey.
<img width="200" alt="image" src="https://github.com/jiayiwen23/Mood-Parachute/assets/62995082/0c137384-1022-4f24-b580-e9693791351d">

3. **Notification**:
  User can set a specific time of daily notification to remind them to record their thoughts.
<img width="200" alt="image" src="https://github.com/jiayiwen23/Mood-Parachute/assets/62995082/3b8b2b06-d1b1-4994-8ba3-c10e0b9b4469">
<img width="210" alt="image" src="https://github.com/jiayiwen23/Mood-Parachute/assets/62995082/27e6bed1-b69c-4682-853d-469c83c806dd">
<img width="200" alt="image" src="https://github.com/jiayiwen23/Mood-Parachute/assets/62995082/625f353c-2f17-478e-a1a3-e357304dba41">

4. **Happiness card query**:
   The happiness card will read the journal of an authenticated user from Firestore Database and randomly display one of the past journals which is marked as very happy in the "FLIP A CARD" screen.
5. **Aid card in "FLIP A CARD"**:
   The Aid card will read data stored in Firestore Database, containing psychology-backed suggestions. It provides users with actionable advice randomly.
## Functionality Updates in Iteration 2:
1. **Authentication**:
   The first screen user sees is a signup/login page. Authentication is implemented through Firebase, utilizing email and password credentials. Only registered users are granted access to the Home page, where they can create, edit, and view their personal journals and cards.
2. **Camera use**:
   User is able to take a picture using device camera and select a photo from local image library when creating/editing a journal or a card.

3. **External API use**:
   Using Pexels API in SceneryCard to display random photos with natural scenery.
   
   <img width="200" alt="image" src="https://github.com/jiayiwen23/Mood-Parachute/assets/62995082/fba8de84-f474-44af-9d1e-62ee40fe3d79">
   <img width="200" alt="image" src="https://github.com/jiayiwen23/Mood-Parachute/assets/62995082/2924b334-8750-4f16-a77f-60b88b26efe5">

5. **Card collection CRUD**:
   User can make their own set of cards by uploading a picture and entering text. They can view, delete, and edit the cards.
<img width="200" alt="image" src="https://github.com/jiayiwen23/Mood-Parachute/assets/62995082/10df9c77-53b1-4fb0-87bb-e92b08dc17cf">
<img width="200" alt="image" src="https://github.com/jiayiwen23/Mood-Parachute/assets/62995082/7bb8e70f-b00b-4093-884c-d7e6f56f33a0">
<img width="200" alt="image" src="https://github.com/jiayiwen23/Mood-Parachute/assets/62995082/bd1defe8-8ef3-43be-bcb1-ad21297f2cbc">

6. **User info collection CRUD**:
<img width="200" alt="image" src="https://github.com/jiayiwen23/Mood-Parachute/assets/62995082/236d456b-081c-4bc6-9448-06a582ef9aee">

### Contributions Iteration 2:
- Jiayi: Authenticaiton, External API use, User info collection CRUD
- Yutong: Camera use, Card collection CRUD

## Functionalities in Iteration 1:
- Implemented the overall structure and navigation
- Established the basis of CRUD operations to Firestore
## Key Features:
1. Journal Overview in calendar
2. Add/Edit Journal Entry
3. Card Game Toolkit
4. LoginPage
5. SignupPage
6. Profile
## Data Model
1. User Profiles Collection
   + user: a unique identifier for each user
   + userName: a user-definde name
   + avatar: the user's avatar image
2. Journal Entries Collection
   + EntryID: A unique identifier for each journal entry
   + UserID: The ID of the user who created the entry
   + Date: The date and time when the entry was made
   + Journal: The text content of the journal entry
   + Mood: The user's mood at the time of the entry
   + Image: The image attached to the journal
   + Location: The location when the entry was made
3. Psychology-Backed Tool Cards Collection 
   + CardID: A unique identifier for each tool card
   + Title: The title of the card, summarizing the psychological tool or advice
   + Description: A detailed explanation or step-by-step guide on how to use the tool for immediate mood relief or coping strategies
