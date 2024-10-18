# AdonisJS endpoint protection with Unkey RBAC

---

## Overview

This a starter AdonisJS application which implements API key verification with Unkey RBAC. There are two endpoints, a public one and a protected one that requires a valid API Key.

## Features

- Public endpoint accessible without authenticationn
- Protected endpoint only accessible with a valid API key
- Verification middleware to check API key validity on protected route

## Quickstart

---

## Create an Unkey account

1. Go to [unkey](https://app.unkey.com/) and create your account for free.

## Create a permission and role

1. Go to [app/authorization/permissions](https://app.unkey.com/authorization/permissions) and click on the "Create New Permission" button.
2. Enter call-protected-route as the name and add a description if you want.
3. Click "Create New Permission"
4. Now head over to [/app/authorization/roles](https://app.unkey.com/authorization/roles) and click on the "Create New Role" button.
5. Enter a name for the role, for example, admin and select the permission from the prevous step
6. Click "Create".

## Create your API

1. Go to https://app.unkey.com/apis and click on the "Create New API" button.
2. Give it a name.
3. Click "Create".
4. Get the `API ID`.

## Create your first key

1. Click "Create Key" in the top right corner.
2. Click "Create"
3. Copy the key and save it somewhere safe.

## Connect the key to the role

1. Go to [/app/apis](https://app.unkey.com/apis) and click on the API you created.
2. Click on "Keys" in the tabs.
3. Click on the key you created.
4. Click on "Permissions" in the tabs.
5. Check the role's checkbox to give the key the role and permission.

## Set up the example

1. Clone the repository:

   ```bash
   git clone https://github.com/Ionfinisher/unkey-adonisjs-template.git
   ```

2. Navigate to the project directory:

   ```bash
   cd <project-directory>
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Change the .env.example to .env file and add the following:

   ```bash
   UNKEY_ROOT_KEY=your-root-key
   UNKEY_API_ID=your-api-id
   ```

Get the root key from https://app.unkey.com/settings/root-keys

5. Start the server

   ```bash
   cd to the root of the project directory
   node ace serve --watch
   ```

6. curl the unprotected route

   ```bash
    curl http://127.0.0.1:3333/api/v1/public
   ```

   It should return Heeyaaa!! Touchdown to the public endpoint!!

7. curl the protected route

   ```bash
    curl http://127.0.0.1:3333/api/v1/protected -H "Authorization: Bearer <YOUR_KEY>"
   ```

   It should return Woohoo!! Touchdown to the protected endpoint!!

## License

This project is licensed under the MIT License.

## Further information

For further information, go to [unkey](https://app.unkey.com/).
