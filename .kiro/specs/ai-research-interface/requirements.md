# Requirements Document

## Introduction

This feature will transform the existing React application into an AI research interface that allows users to submit research topics and receive comprehensive research reports. The interface will communicate with a backend API to initiate research jobs, monitor their progress, and display the completed research results.

## Requirements

### Requirement 1

**User Story:** As a user, I want to submit a research topic through a simple input interface, so that I can initiate an AI-powered research process.

#### Acceptance Criteria

1. WHEN the user loads the application THEN the system SHALL display an input field for entering a research topic
2. WHEN the user enters a research topic THEN the system SHALL enable a send button
3. WHEN the user clicks the send button THEN the system SHALL make a POST request to localhost:8000/api/research with the topic in the request body
4. WHEN the API request is successful THEN the system SHALL receive a job_id and status response
5. IF the input field is empty THEN the system SHALL disable the send button

### Requirement 2

**User Story:** As a user, I want to see the status of my research job in real-time, so that I know when my research is complete.

#### Acceptance Criteria

1. WHEN a research job is submitted THEN the system SHALL automatically begin polling the job status endpoint
2. WHEN polling the status endpoint THEN the system SHALL make GET requests to /api/research/{job_id} every 3 seconds
3. WHEN the job status is "pending" or "running" THEN the system SHALL display an appropriate loading message
4. WHEN the job status changes to "completed" THEN the system SHALL stop polling and fetch the research result
5. WHEN the job status changes to "failed" THEN the system SHALL stop polling and display an error message

### Requirement 3

**User Story:** As a user, I want to view the completed research report in a readable format, so that I can consume the research findings effectively.

#### Acceptance Criteria

1. WHEN a research job completes successfully THEN the system SHALL make a GET request to /api/research/{job_id}/result
2. WHEN the research result is received THEN the system SHALL display the report content in a formatted manner
3. WHEN the report contains markdown content THEN the system SHALL render it appropriately
4. WHEN displaying the result THEN the system SHALL show the completion timestamp
5. IF the research job fails THEN the system SHALL display the error message from the API response

### Requirement 4

**User Story:** As a user, I want to be able to start a new research job after completing one, so that I can research multiple topics in the same session.

#### Acceptance Criteria

1. WHEN a research job is completed or failed THEN the system SHALL provide an option to start a new research
2. WHEN the user chooses to start new research THEN the system SHALL reset the interface to the initial state
3. WHEN starting a new research THEN the system SHALL clear any previous results and status messages
4. WHEN multiple research jobs are initiated THEN the system SHALL handle each job independently

### Requirement 5

**User Story:** As a user, I want clear feedback about the application state and any errors, so that I understand what's happening and can take appropriate action.

#### Acceptance Criteria

1. WHEN making API requests THEN the system SHALL show loading indicators during network operations
2. WHEN network errors occur THEN the system SHALL display user-friendly error messages
3. WHEN the API is unavailable THEN the system SHALL inform the user about connectivity issues
4. WHEN displaying status updates THEN the system SHALL use clear, descriptive language
5. IF an unexpected error occurs THEN the system SHALL provide a way for the user to retry the operation

### Requirement 6

**User Story:** As a user, I want a responsive interface that adapts when research starts, so that I can see both the research form and results simultaneously in an optimal layout.

#### Acceptance Criteria

1. WHEN the application loads initially THEN the system SHALL display the research form in full screen mode
2. WHEN a research job is submitted THEN the system SHALL animate the interface to show a split-screen layout
3. WHEN the split-screen layout is active THEN the research form SHALL occupy 30% of the screen width
4. WHEN the split-screen layout is active THEN the research results panel SHALL occupy 70% of the screen width
5. WHEN transitioning between layouts THEN the system SHALL use smooth animations lasting no more than 500ms
6. WHEN the research results panel is visible THEN it SHALL display all research status and result information
7. WHEN starting a new research THEN the system SHALL maintain the split-screen layout for subsequent research jobs