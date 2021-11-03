# Sentry for Aha! Develop
  
This [Aha! Develop](https://www.aha.io/develop/overview) extension provides an integration with Sentry. It currently provides two contributions:

- `Sentry importer` – Import Sentry issues into Aha! Develop.
- `Sentry attribute` – Shows the latest Sentry stats directly in on the feature.

## Demo

![Sentry importer extension demo](res/sentry-extension.png)

## Installing the extension

**Note: In order to install an extension into your Aha! Develop account, you must be an account administrator.**

Install the Sentry import extension by clicking [here](https://secure.aha.io/settings/account/extensions/install?url=https%3A%2F%2Fsecure.aha.io%2Fextensions%2Faha-develop.sentry.gz).

## Working on the extension

Install [`aha-cli`](https://github.com/aha-app/aha-cli):

```sh
npm install -g aha-cli
```

Clone the repo:

```sh
git clone https://github.com/aha-develop/sentry.git
```

**Note: In order to install an extension into your Aha! Develop account, you must be an account administrator.**

Install the extension into Aha! and set up a watcher:

```sh
yarn install or npm install
aha extension:install
aha extension:watch
```

Now, any change you make inside your working copy will automatically take effect in your Aha! account.

## Formatting

When you have finished working on your extension, you can format code styles using Prettier:

```sh
yarn format or npm run format
```

## Building

When you have finished working on your extension, package it into a `.gz` file so that others can install it:

```sh
aha extension:build
```

After building, you can upload the `.gz` file to a publicly accessible URL, such as a GitHub release, so that others can install it using that URL.

To learn more about developing Aha! Develop extensions, including the API reference, the full documentation is located here: [Aha! Develop Extension API](https://www.aha.io/support/develop/extensions)
