# App

GymPass/TotalPass style app.

## Requisitos Funcionais

- [x] Deve ser possível cadastrar usuários;
- [x] Deve ser possível autenticar usuários;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [x] Deve ser possível que o usuário visualize o seu histórico de check-ins;
- [x] Deve ser possível que o usuário busque academias próximas (até 10km);
- [x] Deve ser possível que o usuário busque academias pelo nome;
- [x] Deve ser possível que o usuário realize check-in em uma academia;
- [x] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar uma academia

## Regras de Negócio

- [x] O usuário não deve poder se cadastrar com um email que já existe;
- [x] O usuário não pode fazer 2 check-ins no mesmo dia
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [x] o check-in só pode ser validado até 20 minutos após criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## Requisitos Não-Funcionais

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] Todas as listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT;
