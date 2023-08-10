# Research Intelligent Website on Fullstack Nextjs/Prisma

This is derived from the starter project for the fullstack tutorial with Next.js and Prisma. You can find the final version of this project in the [`final`](https://github.com/prisma/blogr-nextjs-prisma/tree/final) branch of this repo.

The original guide is from [`Vercel Showcase Auth`](https://vercel.com/guides/nextjs-prisma-postgres) and [`Showcase CMS`](https://vercel.com/guides/integrating-next-js-and-contentful-for-your-headless-cms), which has a session use error. it's api mistakenly used client session rather than server session. This new guide fixed this bug.
## Basics
start dev: ```npm run dev```
access at: ```localhost:3000```
Login: Github OAuth

## Data Model
### Main Data
Prisma is the main application ORM.
Schema file: ```~\prisma\schema.prisma```
generation command: 
```npx prisma generate```
```npx prisma db push```
call web database gui:
```npx prisma studio```

### Other Data Source
DocumentDB: MongoDB
CMS: graphql.contentful.com/content
GraphDB:
Time Series DB:
Large File: cloud storage


### Concept Model

#### Plain Post
the original pure text post.

#### Structured Post
like contentful, support custom defined data field/typed. support rich text.

#### Entity/Relation Post
for intelligent/knowledge model, the post contains a triplet array and targeted knowledge base, which represent the manual input of a graph model. the model are two typed:
- Entity, use ontology like format. (dictionary, terms, etc,)
- Relations, use RDF like format.
a set of entity/relations are a domain knowledge base.
the knowledge base can be converted between graph/knowledge base formats.

#### 

## Visual
### Tailwind CSS

### UI Lib
MUI: ```npm install @mui/material @emotion/react @emotion/styled```
[`Nextjs Example`](https://mui.com/material-ui/getting-started/example-projects/)
NEXTUI: [`For Framework Next.js`](https://nextui.org/docs/frameworks/nextjs)
