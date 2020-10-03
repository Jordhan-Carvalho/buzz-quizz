@@@@@ WEBPACK COM TS-LOADER

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

Para rodar localmente basta clonar o repositório e acessar o index.html

Para editar os arquivos em TS é necessário a instalação TypeScript e rodar o comando abaixo.

```bash
tsc -w
```

Ou pelo NodeJS

```bash
npm run dev
```

## Notes

A pasta Build foi incluída no repositório com a finalidade de se trabalhar com o GitHub Pages.

Backend disponibilizado pelo RespondeAí

Demo:
https://jordhan-carvalho.github.io/buzz-quizz/
