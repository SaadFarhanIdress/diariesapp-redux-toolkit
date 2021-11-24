# Diaries App With Redux-Toolkit, TypeScript, and Mirage

## [Live](https://codesandbox.io/s/diariesapp-redux-toolkit-oizi3?file=/src/index.css)
<img src="https://scontent.fkhi2-3.fna.fbcdn.net/v/t39.30808-6/259514662_1063495301066140_1440434779906836908_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=730e14&_nc_ohc=e1-qYYzq0lIAX_-TUhI&_nc_ht=scontent.fkhi2-3.fna&oh=cd23f7cb59dae142742841fb5af84eab&oe=61A28F9E" />

## Feature
- User have to be authenticated.
- User can create private or public diaries.
- User can create entries in a diary.
- User can edit entries.
  
## Folder Structure
| File name 　　　　　　　　　　　　　　| Description 　　|
| :--  | :--         |
| `└── src`  (directory) | Contains the source files for the project |
| `　　└── features` (directory) | Contains components. |
| `　　　　├── auth` (directory) | Contains the entry component. |
| `　　　　├── diary` (directory) | Contains the code to show time. |
| `　　　　└── entry` (directory) | Contains the implementation of reset/start/pause timer. |
| `　　├── interfaces` (directory) | Contains three interfaces. |
| `　　└── services` (directory) | Contains mock server and API request handler. |
| `　　　　└── mirage` (directory) | Contains server request controllers and server setup function. |
| `　　　　    ├── routes` (directory) | Contains server routes handler. |
| `　　　　    └── server.ts` (directory) | Contains server models and setupServer function. |
| `　　　　└── api.ts` (directory) | Contains function to send API request to server. |
| `　　├── store` (directory) | Contains store configuration. |
| `　　├── utils` (directory) | Contains util. |
| `　　├── App.tsx` | Parent App Component. |
| `　　├── index.css` | Global CSS. |
| `　　└── index.tsx` | Main index file. |