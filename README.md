# Project 1: Shared shopping lists

1. The name of the application: "Shared shopping lists";

2. A brief description of the application:

    An online shopping list application, that can store shopping lists created by users, also every list editable, so you can items inside, and mark them collected.

3. The location where the application has been deployed and where one can test it, if an online deployment exists:

    The project is deployed on Render.io: https://roman-moroz-wsd-shopping-list.onrender.com/
    
    - I pin here my mail: "getefanplay@gmail.com", as I'm scared of that text at my deployment info page: "Free instance types will spin down with inactivity."
    
4. Guidelines for running the application locally (you can assume that participants have docker-compose):

    - UnZIP archive;
    - Open Docker;
    - Turn on WSL(depending where you test it);
    - Start application using "docker-compose up" command;
    - You can try tests using command "docker-compose run --entrypoint=npx e2e-playwright playwright test && docker-compose rm -sf"
    - Good Luck!

    The application feels intuitive to use.

5. Application structure:

    The application follows a layered architecture approach, with each layer responsible for specific tasks and dependencies.

    ## App.js
    - Acts as the entry point of the application.
    - Orchestrates the overall flow of the application.
    - Integrates and coordinates the services and views.

    ## Services
    - Communicates with controllers to perform specific actions.
    - Abstracts the underlying functionality from the views.

    ## Controllers
    - Receives requests from the views and interacts with the services.
    - Validates incoming data and coordinates with the services.

    ## Database
    - Provides mechanisms for data persistence and retrieval.
    - Communicates with the controllers and services for data manipulation.

    ## Deployed Database
    - Hosts the application's database.
    - Serves as the backend storage for the application.

    ## Integrated tests
    - Checking if the application works correctly
