---
id: transferir-propriedade
title: Transferir propriedade do canal
sidebar_position: 19
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Transferir propriedade

## Método

### /newsletter/transfer-ownership/\{newsletterId\}

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/transfer-ownership/{newsletterId}
```

## Header

| Key | Value |
|-----|-------|
| Client-Token | TOKEN DE SEGURANÇA DA CONTA |

## Conceituação

Este método transfere a propriedade (Ownership) do canal para outro administrador.

## Atributos

### Obrigatórios

| Atributos | Tipo | Descrição |
|-----------|------|-----------|
| newsletterId | string | ID do canal (path parameter) |
| phone | string | Telefone do novo dono (deve ser já admin) |

### Opcionais

| Atributos | Tipo | Descrição |
|-----------|------|-----------|
| quitAdmin | boolean | Se `true`, você deixará de ser admin após a transferência. Default: `false`. |

## Request Body

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/transfer-ownership/{newsletterId}
```

```json
{
  "phone": "5511999999999",
  "quitAdmin": true
}
```

## Response

### 200

```json
{
  "value": true
}
```

## 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou GET conforme especificado no inicio deste tópico.

## 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

## Webhook Response

Link para a response do webhook de newsletter:

[Webhook](/docs/webhooks/ao-receber)

## Exemplos de Código

<Tabs defaultValue="shell-curl">
  <TabItem value="c-libcurl" label="C (LibCurl)">

```c
CURL *hnd = curl_easy_init();

curl_easy_setopt(hnd, CURLOPT_CUSTOMREQUEST, "POST");
curl_easy_setopt(hnd, CURLOPT_URL, "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/transfer-ownership/999999999999999999@newsletter");

struct curl_slist *headers = NULL;
headers = curl_slist_append(headers, "accept: application/json");
headers = curl_slist_append(headers, "client-token: {{security-token}}");
curl_easy_setopt(hnd, CURLOPT_HTTPHEADER, headers);

curl_easy_setopt(hnd, CURLOPT_POSTFIELDS, "{\"phone\": \"5511999998888\", \"quitAdmin\": false}");

CURLcode ret = curl_easy_perform(hnd);
```

  </TabItem>
  <TabItem value="clojure-clj_http" label="Clojure">

```clojure
(require '[clj-http.client :as client])

(client/post "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/transfer-ownership/999999999999999999@newsletter" {:headers {:client-token "{{security-token}}"}
                                                                                                                                         :content-type :json
                                                                                                                                         :form-params {:phone "5511999998888"
                                                                                                                                                       :quitAdmin false}
                                                                                                                                         :accept :json})
```

  </TabItem>
  <TabItem value="csharp-restsharp" label="C# (RestSharp)">

```csharp
var client = new RestClient("https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/transfer-ownership/999999999999999999@newsletter");
var request = new RestRequest(Method.POST);
request.AddHeader("accept", "application/json");
request.AddHeader("client-token", "{{security-token}}");
request.AddParameter("undefined", "{\"phone\": \"5511999998888\", \"quitAdmin\": false}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

  </TabItem>
  <TabItem value="go-native" label="Go (Native)">

```go
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io/ioutil"
)

func main() {

	url := "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/transfer-ownership/999999999999999999@newsletter"

	payload := strings.NewReader("{\"phone\": \"5511999998888\", \"quitAdmin\": false}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("client-token", "{{security-token}}")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

  </TabItem>
  <TabItem value="http-1_1" label="HTTP">

```http
POST /instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/transfer-ownership/999999999999999999@newsletter HTTP/1.1
Client-Token: {{security-token}}
Host: api.z-api.io
Content-Length: 46

{"phone": "5511999998888", "quitAdmin": false}
```

  </TabItem>
  <TabItem value="java-okhttp" label="Java (OkHttp)">

```java
OkHttpClient client = new OkHttpClient();

MediaType mediaType = MediaType.parse("application/json");
RequestBody body = RequestBody.create(mediaType, "{\"phone\": \"5511999998888\", \"quitAdmin\": false}");
Request request = new Request.Builder()
  .url("https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/transfer-ownership/999999999999999999@newsletter")
  .post(body)
  .addHeader("client-token", "{{security-token}}")
  .build();

Response response = client.newCall(request).execute();
```

  </TabItem>
  <TabItem value="java-unirest" label="Java (Unirest)">

```java
HttpResponse<String> response = Unirest.post("https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/transfer-ownership/999999999999999999@newsletter")
  .header("client-token", "{{security-token}}")
  .body("{\"phone\": \"5511999998888\", \"quitAdmin\": false}")
  .asString();
```

  </TabItem>
  <TabItem value="javascript-fetch" label="JavaScript (Fetch)">

```js
fetch("https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/transfer-ownership/999999999999999999@newsletter", {
  "method": "POST",
  "headers": {
    "client-token": "{{security-token}}"
  },
  "body": {
    "phone": "5511999998888",
    "quitAdmin": false
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
  <TabItem value="javascript-jquery" label="JavaScript (jQuery)">

```js
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/transfer-ownership/999999999999999999@newsletter",
  "method": "POST",
  "headers": {
    "client-token": "{{security-token}}"
  },
  "processData": false,
  "data": "{\"phone\": \"5511999998888\", \"quitAdmin\": false}"
}

$.ajax(settings).done(function (response) {
  console.log(response);
});
```

  </TabItem>
  <TabItem value="javascript-xhr" label="JavaScript (XHR)">

```js
var data = JSON.stringify({
  "phone": "5511999998888",
  "quitAdmin": false
});

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open("POST", "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/transfer-ownership/999999999999999999@newsletter");
xhr.setRequestHeader("client-token", "{{security-token}}");

xhr.send(data);
```

  </TabItem>
  <TabItem value="node-native" label="Node.js (Native)">

```js
var http = require("https");

var options = {
  "method": "POST",
  "hostname": "api.z-api.io",
  "port": null,
  "path": "/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/transfer-ownership/999999999999999999@newsletter",
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

req.write(JSON.stringify({phone: '5511999998888', quitAdmin: false}));
req.end();
```

  </TabItem>
  <TabItem value="node-request" label="Node.js (Request)">

```js
var request = require("request");

var options = {
  method: 'POST',
  url: 'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/transfer-ownership/999999999999999999@newsletter',
  headers: {accept: 'application/json', 'client-token': '{{security-token}}'},
  body: {phone: '5511999998888', quitAdmin: false},
  json: true
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

  </TabItem>
  <TabItem value="node-unirest" label="Node.js (Unirest)">

```js
var unirest = require("unirest");

var req = unirest("POST", "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/transfer-ownership/999999999999999999@newsletter");

req.headers({
  "accept": "application/json",
  "client-token": "{{security-token}}"
});

req.type("json");
req.send({
  "phone": "5511999998888",
  "quitAdmin": false
});

req.end(function (res) {
  if (res.error) throw new Error(res.error);

  console.log(res.body);
});
```

  </TabItem>
  <TabItem value="objc-nsurlsession" label="Objective-C (NSURLSession)">

```objectivec
#import <Foundation/Foundation.h>

NSDictionary *headers = @{ @"client-token": @"{{security-token}}" };
NSDictionary *parameters = @{ @"phone": @"5511999998888",
                              @"quitAdmin": @NO };

NSData *postData = [NSJSONSerialization dataWithJSONObject:parameters options:0 error:nil];

NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:@"https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/transfer-ownership/999999999999999999@newsletter"]
                                                       cachePolicy:NSURLRequestUseProtocolCachePolicy
                                                   timeoutInterval:10.0];
[request setHTTPMethod:@"POST"];
[request setAllHTTPHeaderFields:headers];
[request setHTTPBody:postData];

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
  <TabItem value="ocaml-cohttp" label="OCaml (CoHTTP)">

```ocaml
open Cohttp_lwt_unix
open Cohttp
open Lwt

let uri = Uri.of_string "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/transfer-ownership/999999999999999999@newsletter" in
let headers = Header.add (Header.init ()) "client-token" "{{security-token}}" in
let body = Cohttp_lwt_body.of_string "{\"phone\": \"5511999998888\", \"quitAdmin\": false}" in

Client.call ~headers ~body `POST uri
>>= fun (res, body_stream) ->
  (* Do stuff with the result *)
```

  </TabItem>
  <TabItem value="php-curl" label="PHP (cURL)">

```php
<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/transfer-ownership/999999999999999999@newsletter",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => "{\"phone\": \"5511999998888\", \"quitAdmin\": false}",
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
  <TabItem value="php-http1" label="PHP (HTTP v1)">

```php
<?php

$request = new HttpRequest();
$request->setUrl('https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/transfer-ownership/999999999999999999@newsletter');
$request->setMethod(HTTP_METH_POST);

$request->setHeaders(array(
  'accept' => 'application/json',
  'client-token' => '{{security-token}}'
));

$request->setBody('{"phone": "5511999998888", "quitAdmin": false}');

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}
```

  </TabItem>
  <TabItem value="php-http2" label="PHP (HTTP v2)">

```php
<?php

$client = new http\Client;
$request = new http\Client\Request;

$body = new http\Message\Body;
$body->append('{"phone": "5511999998888", "quitAdmin": false}');

$request->setRequestUrl('https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/transfer-ownership/999999999999999999@newsletter');
$request->setRequestMethod('POST');
$request->setBody($body);

$request->setHeaders(array(
  'accept' => 'application/json',
  'client-token' => '{{security-token}}'
));

$client->enqueue($request)->send();
$response = $client->getResponse();

echo $response->getBody();
```

  </TabItem>
  <TabItem value="powershell-webrequest" label="PowerShell (WebRequest)">

```powershell
$headers=@{}
$headers.Add("accept", "application/json")
$headers.Add("client-token", "{{security-token}}")
$response = Invoke-WebRequest -Uri 'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/transfer-ownership/999999999999999999@newsletter' -Method POST -Headers $headers -ContentType 'undefined' -Body '{"phone": "5511999998888", "quitAdmin": false}'
```

  </TabItem>
  <TabItem value="powershell-restmethod" label="PowerShell (RestMethod)">

```powershell
$headers=@{}
$headers.Add("accept", "application/json")
$headers.Add("client-token", "{{security-token}}")
$response = Invoke-RestMethod -Uri 'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/transfer-ownership/999999999999999999@newsletter' -Method POST -Headers $headers -ContentType 'undefined' -Body '{"phone": "5511999998888", "quitAdmin": false}'
```

  </TabItem>
  <TabItem value="python-python3" label="Python (http.client)">

```python
import http.client

conn = http.client.HTTPSConnection("api.z-api.io")

payload = "{\"phone\": \"5511999998888\", \"quitAdmin\": false}"

headers = { 'client-token': "{{security-token}}" }

conn.request("POST", "/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/transfer-ownership/999999999999999999@newsletter", payload, headers)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))
```

  </TabItem>
  <TabItem value="python-requests" label="Python (Requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/transfer-ownership/999999999999999999@newsletter"

payload = "{\"phone\": \"5511999998888\", \"quitAdmin\": false}"
headers = {'client-token': '{{security-token}}'}

response = requests.request("POST", url, data=payload, headers=headers)

print(response.text)
```

  </TabItem>
  <TabItem value="ruby-native" label="Ruby (Native)">

```ruby
require 'uri'
require 'net/http'
require 'openssl'

url = URI("https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/transfer-ownership/999999999999999999@newsletter")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Post.new(url)
request["client-token"] = '{{security-token}}'
request.body = "{\"phone\": \"5511999998888\", \"quitAdmin\": false}"

response = http.request(request)
puts response.read_body
```

  </TabItem>
  <TabItem value="shell-curl" label="Shell (cURL)">

```bash
curl --request POST \
  --url https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/transfer-ownership/999999999999999999@newsletter \
  --header 'accept: application/json' \
  --header 'client-token: {{security-token}}' \
  --data '{"phone": "5511999998888", "quitAdmin": false}'
```

  </TabItem>
  <TabItem value="shell-httpie" label="Shell (HTTPie)">

```bash
echo '{"phone": "5511999998888", "quitAdmin": false}' |  \
  http POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/transfer-ownership/999999999999999999@newsletter \
  client-token:'{{security-token}}'
```

  </TabItem>
  <TabItem value="shell-wget" label="Shell (Wget)">

```bash
wget --quiet \
  --method POST \
  --header 'client-token: {{security-token}}' \
  --body-data '{"phone": "5511999998888", "quitAdmin": false}' \
  --output-document \
  - https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/transfer-ownership/999999999999999999@newsletter
```

  </TabItem>
  <TabItem value="swift-nsurlsession" label="Swift (NSURLSession)">

```swift
import Foundation

let headers = ["client-token": "{{security-token}}"]
let parameters = [
  "phone": "5511999998888",
  "quitAdmin": false
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/transfer-ownership/999999999999999999@newsletter")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
request.allHTTPHeaderFields = headers
request.httpBody = postData as Data

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
