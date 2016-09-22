This folder contains all the Statements used to create the tables in the Database.

How user access tables work:

User:  contains username, email, password, and unique identifier
Roles: contains role name, role access levels, and unique identifier
User_Access: provides a link between the user table and role table to provide specific users certain access rights

User		User_Access		Role
1. user1	 1	1		Role1