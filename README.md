# <p align="center">TalkWe</p>

<p align="center">
  <image src="https://github.com/rifanid98/talkwe/blob/master/src/assets/images/logo.png" alt="talkwe logo">
</p>
<p align="center">
  Built with React Native, Build with love.
</p>

## :memo: Table Of Content

- [Introduction](https://github.com/rifanid98/talkwe#introduction)
- [Features](https://github.com/rifanid98/talkwe#features)
- [Screenshots](https://github.com/rifanid98/talkwe#screenshots)
- [Usage](https://github.com/rifanid98/talkwe#usage)
  - [Prerequisites](https://github.com/rifanid98/talkwe#prerequisites)
  - [Installing](https://github.com/rifanid98/talkwe#installing-to-your-local-machine)
- [Contributing](https://github.com/rifanid98/talkwe#contributing-to-this-project)
- [Contributors](https://github.com/rifanid98/talkwe#contributors)
- [Related Project](https://github.com/rifanid98/talkwe#related)
- [Contact](https://github.com/rifanid98/talkwe#contact)
- [License](https://github.com/rifanid98/talkwe#license)

## Introduction

TalkWe is a mobile chat application created using MERN Stack (MySQL, Express.Js, React Native & Node.Js). Useful to make it easier for users to communicate with friends.

## Features

#### Authentication

User can login or register if he does not have an account before. There is also standard authentication validation when logging in and registering.

- Login.
- Register.

#### Home Screen

There is a menu to go to the profile screen, notifications screen, friend requests screen and maps screen at the top right.

- Friends List.
- Messages List.

#### Profile Screen

- User Profile.
- Friend Profile.

#### Maps Screen

By default, maps screen will showing user location. There are two menus :

- Nearby Friends List.
  Users can see list of friends they have, and can find out the last location of each friend.
- Nearby Users List.
  Users can see a list of the closest users available, and can find out the last location of each of them (if they enable the location sharing feature).

## Screenshots

<image src="https://github.com/rifanid98/talkwe/blob/master/screenshots/login.jpg" width="250">
<image src="https://github.com/rifanid98/talkwe/blob/master/screenshots/register.jpg" width="250">
<image src="https://github.com/rifanid98/talkwe/blob/master/screenshots/home.jpg" width="250">
<image src="https://github.com/rifanid98/talkwe/blob/master/screenshots/chat.jpg" width="250">
<image src="https://github.com/rifanid98/talkwe/blob/master/screenshots/profile.jpg" width="250">
<image src="https://github.com/rifanid98/talkwe/blob/master/screenshots/friends-request.jpg" width="250">
<image src="https://github.com/rifanid98/talkwe/blob/master/screenshots/maps-friends-list.jpg" width="250">
<image src="https://github.com/rifanid98/talkwe/blob/master/screenshots/maps-users-list.jpg" width="250">

## Usage

- For common users, you can download the release apk at [google drive]()
- For developer, you can continue to follow the instructions bellow.

### Prerequisites

Before you begin, ensure you have met the following requirements:

- `Node.Js`
- `MySQL Server`
- `Git`

### Installing to your local machine

- Go to your desktop directory or your dedicated projects folder.
- Open your favourite terminal or command prompt (use git bash if you use windows os).
- Follow these command :
  `git clone https://github.com/rifanid98/talkwe`
  `cd talkwe`
  `npm install`
- Open `.env` environtment file, and change following config :
  - `ACTIVE_CONFIG=prod` to `ACTIVE_CONFIG=dev`
  - `API_URL=` to your local ip `API_URL=http://192.168 42.75:3000` (use port 3000). Type ifconfig on the terminal to see your local ip.
  - `GOOGLE_API_KEY=` to your google api key. Search on google how to get google api key.
  - `LOCATION_IQ_PRIVATE_KEY=` to your LocationIQ private key. You can get the key by register at [locationiq.com](locationiq.com)
- You are ready to start.

## Contributing to this project (TalkWe)

To contribute to the project, follow these steps:

1. Fork this repository.
2. Create a branch: `git checkout -b <branch_name>`.
3. Make your changes and commit them: `git commit -m '<commit_message>'`
4. Push to the original branch: `git push origin <project_name>/<location>`
5. Create the pull request.

Alternatively see the GitHub documentation on [creating a pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

Contact me immediately if you haven't received a response from me within 1 week to my email [adninsijawa.office@gmail.com]()

## Contributors

Thanks to the following people who have contributed to this project:

- [@novalyezu](https://github.com/novalyezu)

## Related Project

- [talkweapi](https://github.com/rifanid98/talkweapi) backend api for this project.

## Contact

If you want to contact me you can reach me at <adninsijawa.office@gmail.com>.

## License

This project uses the following license: [MIT](link).
