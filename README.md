# Polling_Quetion_Bank_Api
## Features
- you can create a question 
- you can Add options to a question
- you can Add a vote to an option of question
- you can Delete a question but A question can’t be deleted if one of it’s options has votes
- you can Delete an option but An option can’t be deleted if it has even one vote given to it
- you can View a question with it’s options and all the votes given to it
## Routes
- /questions/create (To create a question)
- /questions/:id/options/create (To add options to a specific question)
- /questions/:id/delete (To delete a question)
- /options/:id/delete (To delete an option)
- /options/:id/add_vote (To increment the count of votes)
- /questions/:id (To view a question and it’s options)
