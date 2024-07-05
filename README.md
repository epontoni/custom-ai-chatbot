This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Clone the repo `git clone https://github.com/epontoni/custom-ai-chatbot.git`, install the project's dependecies `npm i`, complete the enviroment variables, then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

Install vercel globally

```bash
npm i -g vercel
```

Login if not

```bash
vercel login
```

Start deploy

```bash
vercel
```

? Set up and deploy "..." [Y/n] y
? Wich scop do you want to deploy to?
? Link to existing project? [y/N] n
? What's your project's name?
? In which directory is your code located? ./
(...)
? Want to modify these settings? [y/N]

After that, go to vercel webpage and paste the environment variables

```bash
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# NeonDB
DATABASE_URL=

# GraphQL (IBM Stepzen)
NEXT_PUBLIC_GRAPHQL_ENDPOINT=
GRAPHQL_TOKEN=

# OpenAI
OPENAI_API_KEY=
```

Send changes to production

```bash
vercel --prod
```
