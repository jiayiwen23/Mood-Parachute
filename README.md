# Mood-Parachute - a simple, mindful, and engaging journal app
## Authors: Yutong Zhan, Jiayi Wen
## Functionality Updates in Iteration 2:
1. Authentication:
   The first screen user sees is a signup/login page. Authentication is implemented through Firebase, utilizing email and password credentials. Only registered users are granted access to the Home page, where they can create, edit, and view their personal journals and cards.
2. Camera use:
   User is able to take a picture using device camera and select a photo from local image library when creating/editing a journal or a card.
3. External API use:
   Using Pexels API in SceneryCard to display random photos with natural scenery.
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
   + userName: a user-definde name for the App
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
