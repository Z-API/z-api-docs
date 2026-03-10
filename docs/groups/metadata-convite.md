---
id: metadata-convite
title: Metadata do Grupo por Convite
sidebar_position: 13
---


import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';


# <Icon name="Info" size="lg" /> Metadata do Grupo por Convite

Obtenha informações detalhadas sobre um grupo através do link de convite, sem precisar estar no grupo.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Este método retorna o metadata (metadados) completo de um grupo através do link de convite, incluindo informações sobre o grupo, participantes, administradores e outras informações públicas. Você não precisa estar no grupo para obter essas informações.

:::caution Atenção
No dia 4 de novembro de 2021, o WhatsApp alterou o formato de criação de novos grupos:
- **Antes**: `"phone": "5511999999999-1623281429"`
- **Agora**: `"phone": "120363019502650977-group"`

O `phone` retornado na resposta seguirá o formato correspondente à data de criação do grupo.
:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
GET https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/group-invitation-metadata?url=url-do-grupo
```

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Valor |
|--------|-------|
| `Client-Token` | **SEU_TOKEN_DA_CONTA** |

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 {#200}

| Atributos | Tipo | Descrição |
|-----------|------|-----------|
| `phone` | string | ID/Fone do Grupo |
| `owner` | string | Número do criador do grupo |
| `subject` | string | Nome do grupo |
| `description` | string | Descrição do grupo |
| `creation` | timestamp | Timestamp da data de criação do grupo |
| `invitationLink` | url | Link de convite do grupo |
| `contactsCount` | number | Número de contatos presente no grupo |
| `participantsCount` | number | Número de participantes no grupo |
| `participants` | array string | com dados dos participantes |

Array String (participants)

| Atributos | Tipo | Descrição |
|-----------|------|-----------|
| `phone` | string | Número do participante |
| `isAdmin` | string | Indica se o participante é administrador do grupo |
| `isSuperAdmin` | string | Indica se é o criador do grupo |
| `subjectTime` | timestamp | Data de criação do grupo |
| `subjectOwner` | string | Número do criador do grupo |

Exemplo

```json
{
  "phone": "120363019502650977-group",
  "owner": "5511888888888",
  "subject": "Meu grupo no Z-API",
  "description": "descrição do grupo",
  "creation": 1588721491000,
  "invitationLink": "https://chat.whatsapp.com/KNmcL17DqVA0sqkQ5LLA5",
  "contactsCount": 1,
  "participantsCount": 1,
  "participants": [
    {
      "phone": "5511888888888",
      "isAdmin": false,
      "isSuperAdmin": true
    },
    {
      "phone": "5511777777777",
      "isAdmin": false,
      "isSuperAdmin": false
    }
  ],
  "subjectTime": 1617805323000,
  "subjectOwner": "5511888888888"
}
```

### 405 {#405}

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou GET conforme especificado no inicio deste tópico.

### 415 {#415}

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

---

## <Icon name="Code" size="md" /> Exemplo de Código

<Tabs
  defaultValue="node-native"
  values={[
    { label: 'C (Libcurl)', value: 'c-libcurl' },
    { label: 'Clojure (Clj_http)', value: 'clojure-clj_http' },
    { label: 'C# (Restsharp)', value: 'csharp-restsharp' },
    { label: 'Go (Native)', value: 'go-native' },
    { label: 'HTTP (1_1)', value: 'http-1_1' },
    { label: 'Java (Okhttp)', value: 'java-okhttp' },
    { label: 'Java (Unirest)', value: 'java-unirest' },
    { label: 'JavaScript (Jquery)', value: 'javascript-jquery' },
    { label: 'JavaScript (Fetch)', value: 'javascript-fetch' },
    { label: 'JavaScript (Xhr)', value: 'javascript-xhr' },
    { label: 'Node.js (Native)', value: 'node-native' },
    { label: 'Node.js (Request)', value: 'node-request' },
    { label: 'Node.js (Unirest)', value: 'node-unirest' },
    { label: 'Objc (Nsurlsession)', value: 'objc-nsurlsession' },
    { label: 'Ocaml (Cohttp)', value: 'ocaml-cohttp' },
    { label: 'PHP (Curl)', value: 'php-curl' },
    { label: 'PHP (Http1)', value: 'php-http1' },
    { label: 'PHP (Http2)', value: 'php-http2' },
    { label: 'Powershell (Webrequest)', value: 'powershell-webrequest' },
    { label: 'Powershell (Restmethod)', value: 'powershell-restmethod' },
    { label: 'Python (Python3)', value: 'python-python3' },
    { label: 'Python (Requests)', value: 'python-requests' },
    { label: 'Ruby (Native)', value: 'ruby-native' },
    { label: 'cURL (Curl)', value: 'shell-curl' },
    { label: 'cURL (Httpie)', value: 'shell-httpie' },
    { label: 'cURL (Wget)', value: 'shell-wget' },
    { label: 'Swift (Nsurlsession)', value: 'swift-nsurlsession' },
  ]}>
  <TabItem value="c-libcurl">

```bash
CURL *hnd = curl_easy_init();

curl_easy_setopt(hnd, CURLOPT_CUSTOMREQUEST, "GET");
curl_easy_setopt(hnd, CURLOPT_URL, "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/group-invitation-metadata?URL=(URL-DO-GRUPO)");

struct curl_slist *headers = NULL;
headers = curl_slist_append(headers, "accept: application/json");
headers = curl_slist_append(headers, "client-token: {{security-token}}");
curl_easy_setopt(hnd, CURLOPT_HTTPHEADER, headers);

CURLcode ret = curl_easy_perform(hnd);
```

  </TabItem>
  <TabItem value="clojure-clj_http">

```http
(require '[clj-http.client :as client])

(client/get "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/group-invitation-metadata" {:headers {:client-token "{{security-token}}"}
                                                                                                      :query-params {:URL "(URL-DO-GRUPO)"}
                                                                                                      :accept :json})
```

  </TabItem>
  <TabItem value="csharp-restsharp">

```csharp
var client = new RestClient("https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/group-invitation-metadata?URL=(URL-DO-GRUPO)");
var request = new RestRequest(Method.GET);
request.AddHeader("accept", "application/json");
request.AddHeader("client-token", "{{security-token}}");
IRestResponse response = client.Execute(request);
```

  </TabItem>
  <TabItem value="go-native">

```go
package main

import (
	"fmt"
	"net/http"
	"io/ioutil"
)

func main() {

	url := "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/group-invitation-metadata?URL=(URL-DO-GRUPO)"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("client-token", "{{security-token}}")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

  </TabItem>
  <TabItem value="http-1_1">

```http
GET /instances/SUA_INSTANCIA/token/SEU_TOKEN/group-invitation-metadata?URL=(URL-DO-GRUPO) HTTP/1.1
Client-Token: {{security-token}}
Host: api.z-api.io


```

  </TabItem>
  <TabItem value="java-okhttp">

```java
OkHttpClient client = new OkHttpClient();

Request request = new Request.Builder()
  .url("https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/group-invitation-metadata?URL=(URL-DO-GRUPO)")
  .get()
  .addHeader("client-token", "{{security-token}}")
  .build();

Response response = client.newCall(request).execute();
```

  </TabItem>
  <TabItem value="java-unirest">

```java
HttpResponse<String> response = Unirest.get("https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/group-invitation-metadata?URL=(URL-DO-GRUPO)")
  .header("client-token", "{{security-token}}")
  .asString();
```

  </TabItem>
  <TabItem value="javascript-jquery">

```javascript
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/group-invitation-metadata?URL=(URL-DO-GRUPO)",
  "method": "GET",
  "headers": {
    "client-token": "{{security-token}}"
  }
}

$.ajax(settings).done(function (response) {
  console.log(response);
});
```

  </TabItem>
  <TabItem value="javascript-fetch">

```javascript
fetch("https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/group-invitation-metadata?URL=(URL-DO-GRUPO)", {
  "method": "GET",
  "headers": {
    "client-token": "{{security-token}}"
  }
})
.then(response => {
  console.log(response);
})
.catch(err => {
  console.log(err);
});
```

  </TabItem>
  <TabItem value="javascript-xhr">

```javascript
var data = null;

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open("GET", "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/group-invitation-metadata?URL=(URL-DO-GRUPO)");
xhr.setRequestHeader("client-token", "{{security-token}}");

xhr.send(data);
```

  </TabItem>
  <TabItem value="node-native">

```javascript
var http = require("https");

var options = {
  "method": "GET",
  "hostname": "api.z-api.io",
  "port": null,
  "path": "/instances/SUA_INSTANCIA/token/SEU_TOKEN/group-invitation-metadata?URL=(URL-DO-GRUPO)",
  "headers": {
    "client-token": "{{security-token}}"
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.end();
```

  </TabItem>
  <TabItem value="node-request">

```javascript
var request = require("request");

var options = {
  method: 'GET',
  url: 'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/group-invitation-metadata',
  qs: {URL: '(URL-DO-GRUPO)'},
  headers: {accept: 'application/json', 'client-token': '{{security-token}}'}
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

```

  </TabItem>
  <TabItem value="node-unirest">

```javascript
var unirest = require("unirest");

var req = unirest("GET", "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/group-invitation-metadata");

req.query({
  "URL": "(URL-DO-GRUPO)"
});

req.headers({
  "accept": "application/json",
  "client-token": "{{security-token}}"
});


req.end(function (res) {
  if (res.error) throw new Error(res.error);

  console.log(res.body);
});

```

  </TabItem>
  <TabItem value="objc-nsurlsession">

```objectivec
#import <Foundation/Foundation.h>

NSDictionary *headers = @{ @"client-token": @"{{security-token}}" };

NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:@"https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/group-invitation-metadata?URL=(URL-DO-GRUPO)"]
                                                       cachePolicy:NSURLRequestUseProtocolCachePolicy
                                                   timeoutInterval:10.0];
[request setHTTPMethod:@"GET"];
[request setAllHTTPHeaderFields:headers];

NSURLSession *session = [NSURLSession sharedSession];
NSURLSessionDataTask *dataTask = [session dataTaskWithRequest:request
                                            completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
                                                if (error) {
                                                    NSLog(@"%@", error);
                                                } else {
                                                    NSHTTPURLResponse *httpResponse = (NSHTTPURLResponse *) response;
                                                    NSLog(@"%@", httpResponse);
                                                }
                                            }];
[dataTask resume];
```

  </TabItem>
  <TabItem value="ocaml-cohttp">

```http
open Cohttp_lwt_unix
open Cohttp
open Lwt

let uri = Uri.of_string "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/group-invitation-metadata?URL=(URL-DO-GRUPO)" in
let headers = Header.add (Header.init ()) "client-token" "{{security-token}}" in

Client.call ~headers `GET uri
>>= fun (res, body_stream) ->
  (* Do stuff with the result *)
```

  </TabItem>
  <TabItem value="php-curl">

```php
<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/group-invitation-metadata?URL=(URL-DO-GRUPO)",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "GET",
  CURLOPT_HTTPHEADER => array(
    "accept: application/json",
    "client-token: {{security-token}}"
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}
```

  </TabItem>
  <TabItem value="php-http1">

```php
<?php

$request = new HttpRequest();
$request->setUrl('https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/group-invitation-metadata');
$request->setMethod(HTTP_METH_GET);

$request->setQueryData(array(
  'URL' => '(URL-DO-GRUPO)'
));

$request->setHeaders(array(
  'accept' => 'application/json',
  'client-token' => '{{security-token}}'
));

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}
```

  </TabItem>
  <TabItem value="php-http2">

```php
<?php

$client = new http\Client;
$request = new http\Client\Request;

$request->setRequestUrl('https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/group-invitation-metadata');
$request->setRequestMethod('GET');
$request->setQuery(new http\QueryString(array(
  'URL' => '(URL-DO-GRUPO)'
)));

$request->setHeaders(array(
  'accept' => 'application/json',
  'client-token' => '{{security-token}}'
));

$client->enqueue($request)->send();
$response = $client->getResponse();

echo $response->getBody();
```

  </TabItem>
  <TabItem value="powershell-webrequest">

```bash
$headers=@{}
$headers.Add("accept", "application/json")
$headers.Add("client-token", "{{security-token}}")
$response = Invoke-WebRequest -Uri 'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/group-invitation-metadata?URL=(URL-DO-GRUPO)' -Method GET -Headers $headers
```

  </TabItem>
  <TabItem value="powershell-restmethod">

```bash
$headers=@{}
$headers.Add("accept", "application/json")
$headers.Add("client-token", "{{security-token}}")
$response = Invoke-RestMethod -Uri 'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/group-invitation-metadata?URL=(URL-DO-GRUPO)' -Method GET -Headers $headers
```

  </TabItem>
  <TabItem value="python-python3">

```python
import http.client

conn = http.client.HTTPSConnection("api.z-api.io")

headers = { 'client-token': "{{security-token}}" }

conn.request("GET", "/instances/SUA_INSTANCIA/token/SEU_TOKEN/group-invitation-metadata?URL=(URL-DO-GRUPO)", headers=headers)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))
```

  </TabItem>
  <TabItem value="python-requests">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/group-invitation-metadata"

querystring = {"URL":"(URL-DO-GRUPO)"}

headers = {'client-token': '{{security-token}}'}

response = requests.request("GET", url, headers=headers, params=querystring)

print(response.text)
```

  </TabItem>
  <TabItem value="ruby-native">

```ruby
require 'uri'
require 'net/http'
require 'openssl'

url = URI("https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/group-invitation-metadata?URL=(URL-DO-GRUPO)")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Get.new(url)
request["client-token"] = '{{security-token}}'

response = http.request(request)
puts response.read_body
```

  </TabItem>
  <TabItem value="shell-curl">

```bash
curl --request GET \
  --url 'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/group-invitation-metadata?URL=(URL-DO-GRUPO)' \
  --header 'accept: application/json' \
  --header 'client-token: {{security-token}}'
```

  </TabItem>
  <TabItem value="shell-httpie">

```bash
http GET 'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/group-invitation-metadata?URL=(URL-DO-GRUPO)' \
  client-token:'{{security-token}}'
```

  </TabItem>
  <TabItem value="shell-wget">

```bash
wget --quiet \
  --method GET \
  --header 'client-token: {{security-token}}' \
  --output-document \
  - 'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/group-invitation-metadata?URL=(URL-DO-GRUPO)'
```

  </TabItem>
  <TabItem value="swift-nsurlsession">

```swift
import Foundation

let headers = ["client-token": "{{security-token}}"]

let request = NSMutableURLRequest(url: NSURL(string: "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/group-invitation-metadata?URL=(URL-DO-GRUPO)")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "GET"
request.allHTTPHeaderFields = headers

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

  </TabItem>
</Tabs>

