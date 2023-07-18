# App

GymPass/TotalPass style app.

## Requisitos Funcionais

- [ ] Deve ser possível cadastrar usuários;
- [ ] Deve ser possível autenticar usuários;
- [ ] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [ ] Deve ser possível que o usuário visualize o seu histórico de check-ins;
- [ ] Deve ser possível que o usuário busque academias próximas;
- [ ] Deve ser possível que o usuário busque academias pelo nome;
- [ ] Deve ser possível que o usuário realize check-in em uma academia;
- [ ] Deve ser possível validar o check-in de um usuário;

## Regras de Negócio

- [ ] O usuário não deve poder se cadastrar com um email que já existe;
- [ ] O usuário não pode fazer 2 check-ins no mesmo dia
- [ ] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [ ] o check-in só pode ser validado até 20 minutos após criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## Requisitos Não-Funcionais

- [ ] A senha do usuário precisa estar criptografada;
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas as listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT;
