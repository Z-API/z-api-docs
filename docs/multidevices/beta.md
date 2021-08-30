---
id: beta
title: Programa Beta Z-API
---

## Sobre o beta Z-API multi-device

Estamos aqui **"deitando o cabelo"** para conseguir entregar da forma mais transparente possivel todas as novidades desta nova versão para você :)

Mas com a mesma transparência de sempre precisamos te dizer que realmente quase nada foi aproveitado da versão anterior, tivemos que criar uma nova versão onde pouco se aproveitou da anterior, isso foi muito legal pois conseguimos melhorar ainda mais nossa performance e estabilidade.

Durante este processo nosso time se empenhou para entregar a mesma experiência de antes com os beneficios desta nova versão. Nossos testes estão sendo criteriosos e abrangentes, mas como todo bom Dev você ja sabe que em algum momento poderemos identificar algum ponto que passou desapercebido em nossos testes e quando isso acontecer saiba que estaremos aqui para o mais rapido possivel procurar uma solução e em tempo record corrigir.

## Quem pode ser beta Z-API ?

Não criamos barreiras de entrada, nosso desejo é de que o mais rápido possivel ela esteja disponivel para todos nossos clientes.

Inicialmente vamos limitar à 100 clientes(que já possuam conta com assinatura ativa) com o máximo de 10 instâncias por cliente e obvio que também esteja disposto a quebrar umas castanhas com a gente :)

## Check-List Beta

1 - Ser cliente com ao menos 1 instância ativa.

2 - Ter um numero com a versão que permite habilitar mult-devices

3 - Estar disposto a contribuir com a evolução do Z-API.

Os selecionados serão adicionados em um novo grupo aberto, onde nosso time estara a disposição para tirar todas as duvidas e resolver o mais rápido possível qualquer incidente.

Na proxima semana faremos o beta com aproximadamente 20 clientes e nossa meta é que em 30 dias todos ja possam estar desfrutando dessa belezura :)

Se você já atendende os requisitos solicite sua participação através do form https://forms.gle/6MG8RypxWz91uxcc7

## Quais as funcionalidades já estão disponiveis nesta versão

Como já falamos na introdução nem mesmo o Whatsapp disponibilizou todos os metodos ainda e com o Z-API não é diferente, abaixo vamos listar o overview para que você saiba exatamente tudo que esta já esta disponivel nesta nova versão.

## Controller

### QRCodeController

qr-code ✅

qr-code/base64 ✅

qr-code/image ✅

### ProfileController

profiles ✅

profiles/auth ✅

### MachineController

status ✅

instances ✅

instances-total ✅

### InstanceController

check-smartphone ✅

disconnect ✅

status ✅

update-callbacks ✅

destroy ✅

restart ✅

create-connection ✅

restore-session ✅

### GroupController

groups-settings ✅

groups/phone ✅

roups/name ✅

groups/photo ✅

groups/description ✅

groups/phone/leave ✅

groups/phone/contacts ✅

groups/phone/contacts/admin ✅

### ContactController

contacts ⚠️

contacts/:phone ⚠️

contacts/:phone/picture ✅

### MessageController

remove-message ⚠️

### ChatController

phone-exists ⚠️

chats ⚠️

chats-with-message ⚠️

chats/:phone ⚠️

chats/:phone/messages ⚠️

chats/:phone/messages-current ⚠️

chats/:phone/messages/:messageId ⚠️

chats/:phone/messages/:messageId/read ⚠️

chats/:phone/modify-chat ⚠️

chats/:phone/forward-message ⚠️

## Envio de mensagens

### Envio de texto

para contato ✅

para grupo ✅

### Envio de imagem

para contato ✅

para grupo ✅

### Envio de video

para contato ✅

para grupo ✅

### Envio de documento

para contato ✅

para grupo ✅

### Envio de localização

para contato ✅

para grupo ✅

### Envio de botões

para contato ✅

para grupo ✅

### Envio de lista de opções

para contato ✅

para grupo ✅

### Envio de pagamento (não envia ainda expiração)

para contato ✅⚠

para grupo ✅⚠

## Webhooks

Ao enviar ✅

Ao receber ✅

Ao desconectar ✅

## Status (read, played etc..)

Eventos de presença (Digitando, gravando audio, etc...) ⚠️
