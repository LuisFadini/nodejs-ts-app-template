# Base TypeScript APP

I created this as a minimal base template for backend applications using [Express.js](https://expressjs.com/), [TypeScript](https://www.typescriptlang.org/), [ESLint](https://eslint.org/) and [Vitest](https://vitest.dev/).

The goal was no heavy frameworks, just a clean starting point, with a minimal setup.

## Stack

Here are why I choose this specific stack:

### Express

Express lets you structure your server however you want, you can use SOLID, Clean Architecture, MVC or nothing at all.

### TypeScript

JavaScript is too flexible for serious applications, although I don’t like adding an extra build step, TypeScript is the most realistic way to build maintainable Node backends.

### ESLint

Without enforcing rules, JavaScript and Typescript codebases can get messy very fast, that why I use ESLint to keep things consistent and prevents common mistakes.

### Vitest

Used for testing and coverage, as even small projects mey benefit from tests.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/luisfadini/nodejs-ts-app-template
cd nodejs-ts-app-template
```

### 2. Install Node.js

This project targets **Node.js v24 LTS**.

If you don’t have it installed, it’s recommended to use a version manager such as [fnm](https://github.com/Schniz/fnm) or [nvm](https://github.com/nvm-sh/nvm).
Both support automatic version switching using the included `.nvmrc` file.

### 3. Install pnpm

As this project uses pnpm, you may need to install it.

You can install it globally with:

```bash
npm install -g pnpm@latest-10
```

Or follow the official installation guide: [https://pnpm.io/installation](https://pnpm.io/installation)

### 4. Install dependencies and run the project

```bash
pnpm install
pnpm dev
```

## Should You Use This?

If you want flexibility and a clean Express base, yes.

If you want strong structure and conventions, use something like [NestJS](https://nestjs.com/).

If performance becomes a real bottleneck, maybe don’t use Node at all, go to something like [Go](https://go.dev/).
