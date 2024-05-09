<br>
<div align="center">
    <a href="https://github.com/varun2430/sky_vault/commits/main/"><img alt="GitHub commits" src="https://img.shields.io/github/commit-activity/t/varun2430/sky_vault/main?style=for-the-badge"></a>
    <a href="https://github.com/varun2430/sky_vault/issues"><img alt="GitHub issues" src="https://img.shields.io/github/issues/varun2430/sky_vault?color=brightgreen&label=issues&style=for-the-badge"></a>
    <a href="https://github.com/varun2430/sky_vault/blob/main/LICENSE"><img alt="GitHub license" src="https://img.shields.io/github/license/varun2430/sky_vault?style=for-the-badge"></a>
    <a href="https://www.linkedin.com/in/varun-kadkade-7359aa214/"><img alt="LinkedIn" src="https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555"></a>
</div>
<br>

<br />
<div align="center">
  <a href="https://github.com/varun2430/sky_vault">
    <img src="readme_assets/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">SkyVault</h3>

  <p align="center">
    Secure Cloud Storage
    <br />
    <br />
    <a href="https://drive.google.com/file/d/1gBhaQFrgVoicwWLPCFFBQxP4ceO-RN17/view?usp=sharing">View Demo</a>
    ·
    <a href="https://github.com/varun2430/sky_vault/issues/new?labels=bug">Report Bug</a>
    ·
    <a href="https://github.com/varun2430/sky_vault/issues/new?labels=enhancement">Request Feature</a>
  </p>
</div>

## About The Project

<div align="center">
    <img alt="SkyVault Demo Gif" src="readme_assets/demo.gif">
</div>

SkyVault is a secure cloud storage SaaS utilizing both client-side and server-side encryption techniques, ensuring 100% data encryption in transit and at rest.

### Built With

The following are the list of frameworks/libraries used in this project.

<div align="center">
    <img alt="React" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
    <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white">
    <img alt="Redux" src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white">
    <img alt="Express" src="https://img.shields.io/badge/Express-404d59?style=for-the-badge&logo=express&logoColor=white">
</div>

## Getting Started

This is a guide on how to set up the project locally. Follow these steps to get a local copy up and running.

### Prerequisites

Ensure you have the following installed:

- [Node.js LTS](https://nodejs.org/)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/varun2430/sky_vault.git
   ```

2. Setup the Backend:

   ```sh
   cd backend
   npm install
   ```

   Create a .env file in the backend directory and set the required environment variables:

   ```sh
   PORT=""
   AWS_REGION=""
   AWS_ACCESS_KEY=""
   AWS_SECRET_KEY=""
   S3_BUCKET=""
   MONGO_URL=""
   JWT_SECRET=""
   ```

   Start the Express server:

   ```sh
   node server.js
   ```

3. Setup the Frontend:
   ```sh
   cd frontend
   npm install
   ```
   Create a .env file in the frontend directory and set the required environment variables:
   ```sh
   VITE_API_URL=""
   ```
   Start the development server:
   ```sh
   npm run dev
   ```

## Contributing

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the GPL-3.0 License. See `LICENSE` for more information.
