This was a group project to create an informative educational app. This applications takes data from the RedList API and 
displays the information in a new way, hopefully reflecting the problems we have in the wild with endangered species.

It is written in Javascript with a mongoDB database.  The backend has a manual dataLoader which pulls all the required data 
from the API and populates the database. The data is changing so infrequently there seemed no need to make this a continual 
process. The data in the API is quite fragmented and so it takes many calls to the API to copy all the data across.
