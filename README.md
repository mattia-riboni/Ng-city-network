## City-Network

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
   <li><a href="#contact">Contact</a></li>
  </ol>
</details>


## About The Project
![City-network](/src/assets/img/screenshot.png)

This start2impact (for NTTData) project has been made to help to connect people in cities, sharing local news, events, informations, sport and so more. The usage of this app is really easy thanks to his social network look. To have a look without install the project and run it locally, here's a [web version](https://city-network.netlify.app/) deployed with [Netlify](https://www.netlify.com/)  

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![Angular][Angular.io]][Angular-url]

* [![Ionic][Ionicframework.com]][Ionic-url]

* [![Firebase][Firebase.google.com]][Firebase-url]

* [![Mockturtle][Mockturtle.net]][Mockturtle-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites
You should:
-   Have a stable version of Node.js installed.
-  Have Angular CLI installed. If not run the following command:

	```sh
	$ npm  install  -g  @angular/cli|  
	``` 



### Installation

 1. First, create a folder. Remember to go to the folder with the following command:

	```sh
	 cd folder
	 ``` 

 2. Clone the repo

	   ```sh
	   https://github.com/mattia-riboni/Ng-city-network  
    ```
   
 3. Install NPM packages
	   ```sh
	   npm install
	   ```
 
 4. Use the following command (also available inside `package.json`):
	 - `ng serve` to start the app, then open **[http://localhost:4200/](http://localhost:4200/)** in your browser
	 - `ng build` to build the app
	 - `ng test` to test the app
	 - `ng test --no-watch --code-coverage` to get the code coverage

 
 

  


<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Usage

The usage is made very simple thanks to a similarity to come of the most famous social-networks. There are three bigger sections:

 - Global: here you can see the most relevant posts about the default city, it can be changed searching a new city inside the searchbar on top and pressing the search button. At the moment only posts for Rome, Milan, Turin and Naples are available. Any post can be commented and liked clicking on his relative button.
 - Personal: it's like the Global section, but here you can scroll your friend's private posts; friends feature will be implemented soon!
 - Users: there is a list of user (now those are fake users generated with mockturtle, only for example purposes). Any user can be clicked to reach his personal page, where information and post can be edited or created. The two buttons on top allow the creation or elimination of a user 
 
 Every section is protected by authentiction, users can login or register in the dedicated section, on top right; the logout button is shown only if the user is already logged, in the same position of login/register button.

<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- CONTACT -->
## Contact

Mattia Riboni - mattiariboni@gmail.com

Project Link: [https://github.com/mattia-riboni/Ng-city-network  ](https://github.com/mattia-riboni/Ng-city-network  )

<p align="right">(<a href="#readme-top">back to top</a>)</p>
