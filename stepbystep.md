entre na pasta do projeto (marktattoo)

npx create-next-app@15.3.2 .
choco upgrade nodejs.install --version 22.16.0
npm run dev

npm i -D prettier-plugin-tailwindcss@0.6.11 prettier@3.5.3

npm i eslint-plugin-simple-import-sort@12.1.1 -D

npm i drizzle-orm@0.43.1 pg@8.15.6

npm i -D drizzle-kit@0.31.1

// após a criação do schema
npm install dotenv --save
npx drizzle-kit push
npx drizzle-kit studio

// efetuar commit
git add .  
git status
git commit -m "chore: add database setup with drizzle"

//-Biblioteca de compponentes shadcn/ui
npx shadcn@2.5.0 init
npx shadcn@2.5.0 add button

// Página de login
npx shadcn@2.5.0 add tabs
npx shadcn@2.5.0 add card
npx shadcn@2.5.0 add input label
npx shadcn@2.5.0 add form
