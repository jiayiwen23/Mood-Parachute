# Mood-Parachute - a simple, mindful, and engaging journal app
## Authors: Yutong Zhan, Jiayi Wen
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
   + UserID: a unique identifier for each user
   + Username/Email: the user's email address
   + Password: the user's password
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
