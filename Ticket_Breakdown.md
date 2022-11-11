# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here


Last Edited: November 11, 2022 11:10 PM

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Story 1: Create a new table, called agent_facility. Set the Primary Id to be a `UNIQUE KEY` when creating this table.

This table should also have columns agent, shift and facility which will contain the ***foreign keys*** of the agent, shift and facility tables 

**Acceptance criteria:**

The table must create a Many to Many relationship between Agents and Facilities, 

Each row must have a unique shift ID. We cannot have shift id appear in more than 1 row across the table

The ID of each row must not be incremental but `UNIQUE KEY`  

Story 2: We will create a function called generateFacilityReport, this will generate the shifts done by a unique agent at each facility.

The parameters passed into the fucntion must be the; **quarter** to query for , concatenation of the facility_id and the agent_id to give us a unique key 

as so: facility_id + agent_id = unique_agent_facility_id

aeq1 +”_” + 234132asd  = aeq1_234132asd

generateFacilityReport(”Q4”, “aeq1_234132asd” )

In the function, separate these two at the underscore and search all the rows with the facility_id of aeq1 and agent_id of 234132asd

**Acceptance criteria :** 

Function must reiceve parameter of unique 

The function must return PDF with tables if it has data to print 

The function must return a status response of 404 to indicate “resource not found “

Story 3: SQL query should be INNER JOIN of the facility table and the shifts table for the full data, and should SUM() all the hours with each shift As they are most likely already connecting with foreign keys.  Limited by the quarter queried for. This means each shift row in the Shift table will have a hours column.

The table being returned should have the colums agent, facility, unique_agent_facility_id, hours_worked  

**Acceptance criteria :** 

Sum() of hours must happen in SQL not on application level to make sure query it efficient

Every hour coulmn must be at least 0 by default NOT NULL to prevent errors