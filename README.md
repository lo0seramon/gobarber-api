# Recuperação de senha

**RF**

- O usuário deve poder recuperar sua senha informando o seu email;
- O usuário deve receber um email com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**RNF**

- Utilizar Mailtrap para testar envio de email em ambiente de desenvolvimento;]
- Utilizar Amazon SES para envios em produção;
- O envio de email deve acontecer em segundo plano (background-jobs);

**RN**

- O link enviado por email para resetar senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao restar sua senha;

# Atualização do Perfil

**RF**

- O usuário deve poder atualizar seu nome, email e senha;

**RN**

- O usuário não pode alterar seu email para uma email já utilizado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha;

# Painel do prestador

**RF**

- O usaurio deve poder listar seus agendamento de um dia específco;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RNF**

- O agendamentos do prestador no dia devem ser armazenados em cache;
- A notificações do prestador devem ser armazenadas no MongoDB;
- A notificações do prestador devem ser enviadas em tempo real utilizando Socket.IO;

**RN**

- A notificação deve ter um status de lida ou não lida para que o prestador possa controlar;

# Agendamento de Serviços

**RF**

- O usuário deve poder listar todos os prestadores de serviço cadastrados;
- O usuário deve poder listar os dias de um mes com pelo menos um horário disponível de um prestador;
- O usuário deve poder listar horários disponivei em um dia especifico de um prestador;
- O usuário dee poder realizar um agendamento com um prestador;

**RNF**

- A listagem de prestadores deve ser armazenada em cache;

**RN**
- Cada agendadamento deve durar 1h exatamente;
- Os agendamentos devem estar disponíveis entre 8h ás 18h (Primeiro as 8h, último às 17h);
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um hprário que já passou;
- O usuário não pode agendar serviços consigo mesmo;

