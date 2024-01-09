
# next-template

A Next.js 13 template for building apps with Radix UI and Tailwind CSS.

## Usage

```bash
npx create-next-app -e https://github.com/shadcn/next-template
```

## Features

- Next.js 13 App Directory
- Radix UI Primitives
- Tailwind CSS
- Icons from [Lucide](https://lucide.dev)
- Dark mode with `next-themes`
- Tailwind CSS class sorting, merging and linting.

## License

Licensed under the [MIT license](https://github.com/shadcn/ui/blob/main/LICENSE.md).

### Workflow

- Started with npx create-next-app -e https://github.com/shadcn/next-template

#### Auth part

- npm i -D next-auth bcrypt @types/bcrypt
- added server components (/pages/api/auth)
- added client components (AuthProvider.tsx)
- wrapped root layout with AuthProvider

#### DB part

- npm i -D prisma react-hook-form
- npm install @prisma/client
- creating prisma schema and prisma client singleton
