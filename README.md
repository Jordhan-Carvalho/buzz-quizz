# BuzzQuizz

BuzzQuizz é um sistema para criação e realização de quizzes inspirado nos BuzzFeed.

## Description

Este projeto engloba a parte front-end da aplicação, e foi totalmente construido com TS, HTML e CSS puro sem frameworks, e com o uso das bibliotecas axios e ion-icons.

A lista de funcionalidades inclui:

- Login e criação/acesso a quizzes utilizando token
- Listagem de todos os Quizzes criados pelo usuário
- Possibilidade de criar, editar e apagar um Quiz
- Criação de Quiz com infinitas perguntas e níveis
- Tema do Quiz(Cores) a escolha do usuário.
- Validação dos campos da criação de quiz
- Deploy automático pelo GitHub Pages

## Installation

Para trabalhar localmente é necessário a instalação das dependência de desenvolvimento.

```bash
npm install
npm start
```

Construir a pasta de distribuição

```bash
npm run build
```

## Notes

- O arquivo bundle.js foi incluído no repositório com a finalidade de se fazer o deploy no GitHub Pages.
- Código modularizado usando ES modules.
- Webpack responsável pela minificação e transpilação (usando o ts-loader) do código.
- Backend disponibilizado pelo RespondeAí.

Demo:
https://jordhan-carvalho.github.io/buzz-quizz/
