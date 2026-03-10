---
id: aprovar-participantes
sidebar_position: 1
title: Approve Participants
---


import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';

# <Icon name="UserCheck" size="lg" /> Approve Participants

Accept participant entries into the group through the Z-API API.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituacao}

This method is responsible for accepting participant entries into the group. Use this endpoint when a group is configured to require administrator approval and you wish to approve the entry request of one or more participants.

:::caution Attention

On November 4th, 2021 WhatsApp changed the format for creating new groups:

- **Before**: `"phone": "5511999999999-1623281429"`
- **Now**: `"phone": "120363019502650977-group"`

:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

``` http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/approve-participant
```

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Value |
|--------|-------|
| `Client-Token` | **YOUR_ACCOUNT_TOKEN** |

---

## <Icon name="Code" size="md" /> Request Body {#request-body}

**Old Format**

```json
{
  "groupId": "5511999999999-1623281429",
  "phones": [
    "5544999999999",
    "5544888888888"
  ]
}
```

**New Format**

```json
{
  "groupId": "120363019502650977-group",
  "phones": [
    "5544999999999",
    "5544888888888"
  ]
}
```

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 {#200}

Example

```json
{
  "value": true
}
```

### 405 {#405}

In this case, make sure you are sending the correct method specification, i.e., verify that you are sending POST or GET as specified at the beginning of this topic.

### 415 {#415}

If you receive a 415 error, make sure to add in the request headers the "Content-Type" of the object you are sending, which is mostly "application/json"

## <Icon name="Webhook" size="md" /> Webhook Response {#webhook-response}

Link to the webhook response (on receiving)

[Webhook](../webhooks/on-message-received#response)

---

## <Icon name="Code" size="md" /> Code Example

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

curl_easy_setopt(hnd, CURLOPT_CUSTOMREQUEST, "POST");
curl_easy_setopt(hnd, CURLOPT_URL, "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/approve-participant");

struct curl_slist *headers = NULL;
headers = curl_slist_append(headers, "content-type: application/json");
headers = curl_slist_append(headers, "client-token: {{security-token}}");
curl_easy_setopt(hnd, CURLOPT_HTTPHEADER, headers);

curl_easy_setopt(hnd, CURLOPT_POSTFIELDS, "{\"groupId\": \"5511999999999-1623281429\", \"phones\": [\"5511999999999\"]}");

CURLcode ret = curl_easy_perform(hnd);
```

  </TabItem>
  <TabItem value="clojure-clj_http">

```http
(require '[clj-http.client :as client])

(client/post "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/approve-participant" {:headers {:client-token "{{security-token}}"}
                                                                                                 :content-type :json
                                                                                                 :form-params {:groupId "5511999999999-1623281429"
                                                                                                               :phones ["5511999999999"]}})
```

  </TabItem>
  <TabItem value="csharp-restsharp">

```csharp
var client = new RestClient("https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/approve-participant");
var request = new RestRequest(Method.POST);
request.AddHeader("content-type", "application/json");
request.AddHeader("client-token", "{{security-token}}");
request.AddParameter("undefined", "{\"groupId\": \"5511999999999-1623281429\", \"phones\": [\"5511999999999\"]}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

  </TabItem>
  <TabItem value="go-native">

```go
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io/ioutil"
)

func main() {

	url := "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/approve-participant"

	payload := strings.NewReader("{\"groupId\": \"5511999999999-1623281429\", \"phones\": [\"5511999999999\"]}")

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
  <TabItem value="http-1_1">

```http
POST /instances/SUA_INSTANCIA/token/SEU_TOKEN/approve-participant HTTP/1.1
Client-Token: {{security-token}}
Host: api.z-api.io
Content-Length: 68

{"groupId": "5511999999999-1623281429", "phones": ["5511999999999"]}
```

  </TabItem>
  <TabItem value="java-okhttp">

```java
OkHttpClient client = new OkHttpClient();

MediaType mediaType = MediaType.parse("application/json");
RequestBody body = RequestBody.create(mediaType, "{\"groupId\": \"5511999999999-1623281429\", \"phones\": [\"5511999999999\"]}");
Request request = new Request.Builder()
  .url("https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/approve-participant")
  .post(body)
  .addHeader("client-token", "{{security-token}}")
  .build();

Response response = client.newCall(request).execute();
```

  </TabItem>
  <TabItem value="java-unirest">

```java
HttpResponse<String> response = Unirest.post("https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/approve-participant")
  .header("client-token", "{{security-token}}")
  .body("{\"groupId\": \"5511999999999-1623281429\", \"phones\": [\"5511999999999\"]}")
  .asString();
```

  </TabItem>
  <TabItem value="javascript-jquery">

```javascript
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/approve-participant",
  "method": "POST",
  "headers": {
    "client-token": "{{security-token}}"
  },
  "processData": false,
  "data": "{\"groupId\": \"5511999999999-1623281429\", \"phones\": [\"5511999999999\"]}"
}

$.ajax(settings).done(function (response) {
  console.log(response);
});
```

  </TabItem>
  <TabItem value="javascript-fetch">

```javascript
fetch("https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/approve-participant", {
  "method": "POST",
  "headers": {
    "client-token": "{{security-token}}"
  },
  "body": {
    "groupId": "5511999999999-1623281429",
    "phones": [
      "5511999999999"
    ]
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
var data = JSON.stringify({
  "groupId": "5511999999999-1623281429",
  "phones": [
    "5511999999999"
  ]
});

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open("POST", "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/approve-participant");
xhr.setRequestHeader("client-token", "{{security-token}}");

xhr.send(data);
```

  </TabItem>
  <TabItem value="node-native">

```javascript
var http = require("https");

var options = {
  "method": "POST",
  "hostname": "api.z-api.io",
  "port": null,
  "path": "/instances/SUA_INSTANCIA/token/SEU_TOKEN/approve-participant",
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

req.write(JSON.stringify({groupId: '5511999999999-1623281429', phones: ['5511999999999']}));
req.end();
```

  </TabItem>
  <TabItem value="node-request">

```javascript
var request = require("request");

var options = {
  method: 'POST',
  url: 'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/approve-participant',
  headers: {'content-type': 'application/json', 'client-token': '{{security-token}}'},
  body: {groupId: '5511999999999-1623281429', phones: ['5511999999999']},
  json: true
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

var req = unirest("POST", "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/approve-participant");

req.headers({
  "content-type": "application/json",
  "client-token": "{{security-token}}"
});

req.type("json");
req.send({
  "groupId": "5511999999999-1623281429",
  "phones": [
    "5511999999999"
  ]
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
NSDictionary *parameters = @{ @"groupId": @"5511999999999-1623281429",
                              @"phones": @[ @"5511999999999" ] };

NSData *postData = [NSJSONSerialization dataWithJSONObject:parameters options:0 error:nil];

NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:@"https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/approve-participant"]
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
  <TabItem value="ocaml-cohttp">

```http
open Cohttp_lwt_unix
open Cohttp
open Lwt

let uri = Uri.of_string "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/approve-participant" in
let headers = Header.add (Header.init ()) "client-token" "{{security-token}}" in
let body = Cohttp_lwt_body.of_string "{\"groupId\": \"5511999999999-1623281429\", \"phones\": [\"5511999999999\"]}" in

Client.call ~headers ~body `POST uri
>>= fun (res, body_stream) ->
  (* Do stuff with the result *)
```

  </TabItem>
  <TabItem value="php-curl">

```php
<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/approve-participant",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => "{\"groupId\": \"5511999999999-1623281429\", \"phones\": [\"5511999999999\"]}",
  CURLOPT_HTTPHEADER => array(
    "client-token: {{security-token}}",
    "content-type: application/json"
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
$request->setUrl('https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/approve-participant');
$request->setMethod(HTTP_METH_POST);

$request->setHeaders(array(
  'content-type' => 'application/json',
  'client-token' => '{{security-token}}'
));

$request->setBody('{"groupId": "5511999999999-1623281429", "phones": ["5511999999999"]}');

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

$body = new http\Message\Body;
$body->append('{"groupId": "5511999999999-1623281429", "phones": ["5511999999999"]}');

$request->setRequestUrl('https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/approve-participant');
$request->setRequestMethod('POST');
$request->setBody($body);

$request->setHeaders(array(
  'content-type' => 'application/json',
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
$headers.Add("content-type", "application/json")
$headers.Add("client-token", "{{security-token}}")
$response = Invoke-WebRequest -Uri 'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/approve-participant' -Method POST -Headers $headers -ContentType 'undefined' -Body '{"groupId": "5511999999999-1623281429", "phones": ["5511999999999"]}'
```

  </TabItem>
  <TabItem value="powershell-restmethod">

```bash
$headers=@{}
$headers.Add("content-type", "application/json")
$headers.Add("client-token", "{{security-token}}")
$response = Invoke-RestMethod -Uri 'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/approve-participant' -Method POST -Headers $headers -ContentType 'undefined' -Body '{"groupId": "5511999999999-1623281429", "phones": ["5511999999999"]}'
```

  </TabItem>
  <TabItem value="python-python3">

```python
import http.client

conn = http.client.HTTPSConnection("api.z-api.io")

payload = "{\"groupId\": \"5511999999999-1623281429\", \"phones\": [\"5511999999999\"]}"

headers = { 'client-token': "{{security-token}}" }

conn.request("POST", "/instances/SUA_INSTANCIA/token/SEU_TOKEN/approve-participant", payload, headers)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))
```

  </TabItem>
  <TabItem value="python-requests">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/approve-participant"

payload = "{\"groupId\": \"5511999999999-1623281429\", \"phones\": [\"5511999999999\"]}"
headers = {'client-token': '{{security-token}}'}

response = requests.request("POST", url, data=payload, headers=headers)

print(response.text)
```

  </TabItem>
  <TabItem value="ruby-native">

```ruby
require 'uri'
require 'net/http'
require 'openssl'

url = URI("https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/approve-participant")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Post.new(url)
request["client-token"] = '{{security-token}}'
request.body = "{\"groupId\": \"5511999999999-1623281429\", \"phones\": [\"5511999999999\"]}"

response = http.request(request)
puts response.read_body
```

  </TabItem>
  <TabItem value="shell-curl">

```bash
curl --request POST \
  --url https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/approve-participant \
  --header 'client-token: {{security-token}}' \
  --header 'content-type: application/json' \
  --data '{"groupId": "5511999999999-1623281429", "phones": ["5511999999999"]}'
```

  </TabItem>
  <TabItem value="shell-httpie">

```bash
echo '{"groupId": "5511999999999-1623281429", "phones": ["5511999999999"]}' |  \
  http POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/approve-participant \
  client-token:'{{security-token}}'
```

  </TabItem>
  <TabItem value="shell-wget">

```bash
wget --quiet \
  --method POST \
  --header 'client-token: {{security-token}}' \
  --body-data '{"groupId": "5511999999999-1623281429", "phones": ["5511999999999"]}' \
  --output-document \
  - https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/approve-participant
```

  </TabItem>
  <TabItem value="swift-nsurlsession">

```swift
import Foundation

let headers = ["client-token": "{{security-token}}"]
let parameters = [
  "groupId": "5511999999999-1623281429",
  "phones": ["5511999999999"]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/approve-participant")! as URL,
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

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Reject Participants](/docs/groups/rejeitar-participantes) - Reject participant entries into the group
- [Add Participants](/docs/groups/adicionar-participantes) - Add participants directly to the group
- [Group Settings](/docs/groups/configuracoes) - Configure if the group requires approval