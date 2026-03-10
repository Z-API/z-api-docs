---
id: mencionar-grupo
sidebar_position: 1
title: Mention Group
---


import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';

# <Icon name="Users" size="lg" /> Mention Group

Mention related groups to a community through the Z-API.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituacao}

This method is responsible for mentioning related groups to a community. Mentions can only be made in groups within a community, and the mentioned groups must belong to the same community.

**Requirements**:
- The group where the message will be sent must belong to a community
- The mentioned groups must belong to the same community
- You can mention groups and participants in the same message

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-text
```

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Value |
|--------|-------|
| `Client-Token` | **YOUR_ACCOUNT_TOKEN** |

---

## <Icon name="Code" size="md" /> Request Body {#request-body}

```json
{
  "phone": "5511999999999-group",
  "message": "Welcome to *Z-API group* @1203634230225498-group",
  "groupMentioned": [
    {
      "phone": "1203634230225498-group",
      "subject": "Z-API subgroup"
    }
  ]
}
```

:::tip Tip

It is also possible to mention participants in the message along with the group mentions.

:::

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 {#200}

Example

```json
{
  "zaapId": "3999984263738042930CD6ECDE9VDWSA",
  "messageId": "D241XXXX732339502B68",
  "id": "D241XXXX732339502B68"
}
```

### 405 {#405}

In this case, make sure you are sending the correct method specification, that is, check if you sent POST or GET as specified at the beginning of this topic.

### 415 {#415}

If you receive a 415 error, ensure to add in the request headers the "Content-Type" of the object you are sending, most commonly "application/json"

## <Icon name="Webhook" size="md" /> Webhook Response {#webhook-response}

Link to the webhook response (upon receiving)

[Webhook](../webhooks/on-message-received#example-of-text-return)

## <Icon name="Code" size="md" /> Example of Code

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
curl_easy_setopt(hnd, CURLOPT_URL, "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-text");

struct curl_slist *headers = NULL;
headers = curl_slist_append(headers, "content-type: application/json");
headers = curl_slist_append(headers, "client-token: {{security-token}}");
curl_easy_setopt(hnd, CURLOPT_HTTPHEADER, headers);

curl_easy_setopt(hnd, CURLOPT_POSTFIELDS, "{\"phone\": \"5511999998888\", \"message\": \"Welcome to *Z-API*\"}");

CURLcode ret = curl_easy_perform(hnd);
```

  </TabItem>
  <TabItem value="clojure-clj_http">

```http
(require '[clj-http.client :as client])

(client/post "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-text" {:headers {:client-token "{{security-token}}"}
                                                                                       :content-type :json
                                                                                       :form-params {:phone "5511999998888"
                                                                                                     :message "Welcome to *Z-API*"}})
```

  </TabItem>
  <TabItem value="csharp-restsharp">

```csharp
var client = new RestClient("https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-text");
var request = new RestRequest(Method.POST);
request.AddHeader("content-type", "application/json");
request.AddHeader("client-token", "{{security-token}}");
request.AddParameter("undefined", "{\"phone\": \"5511999998888\", \"message\": \"Welcome to *Z-API*\"}", ParameterType.RequestBody);
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

	url := "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-text"

	payload := strings.NewReader("{\"phone\": \"5511999998888\", \"message\": \"Welcome to *Z-API*\"}")

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
POST /instances/SUA_INSTANCIA/token/SEU_TOKEN/send-text HTTP/1.1
Client-Token: {{security-token}}
Host: api.z-api.io
Content-Length: 59

{"phone": "5511999998888", "message": "Welcome to *Z-API*"}
```

  </TabItem>
  <TabItem value="java-okhttp">

```java
OkHttpClient client = new OkHttpClient();

MediaType mediaType = MediaType.parse("application/json");
RequestBody body = RequestBody.create(mediaType, "{\"phone\": \"5511999998888\", \"message\": \"Welcome to *Z-API*\"}");
Request request = new Request.Builder()
  .url("https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-text")
  .post(body)
  .addHeader("client-token", "{{security-token}}")
  .build();

Response response = client.newCall(request).execute();
```

  </TabItem>
  <TabItem value="java-unirest">

```java
HttpResponse<String> response = Unirest.post("https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-text")
  .header("client-token", "{{security-token}}")
  .body("{\"phone\": \"5511999998888\", \"message\": \"Welcome to *Z-API*\"}")
  .asString();
```

  </TabItem>
  <TabItem value="javascript-jquery">

```javascript
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-text",
  "method": "POST",
  "headers": {
    "client-token": "{{security-token}}"
  },
  "processData": false,
  "data": "{\"phone\": \"5511999998888\", \"message\": \"Welcome to *Z-API*\"}"
}

$.ajax(settings).done(function (response) {
  console.log(response);
});
```

  </TabItem>
  <TabItem value="javascript-fetch">

```javascript
fetch("https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-text", {
  "method": "POST",
  "headers": {
    "client-token": "{{security-token}}"
  },
  "body": {
    "phone": "5511999998888",
    "message": "Welcome to *Z-API*"
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
  "phone": "5511999998888",
  "message": "Welcome to *Z-API*"
});

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open("POST", "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-text");
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
  "path": "/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-text",
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

req.write(JSON.stringify({phone: '5511999998888', message: 'Welcome to *Z-API*'}));
req.end();
```

  </TabItem>
  <TabItem value="node-request">

```javascript
var request = require("request");

var options = {
  method: 'POST',
  url: 'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-text',
  headers: {'content-type': 'application/json', 'client-token': '{{security-token}}'},
  body: {phone: '5511999998888', message: 'Welcome to *Z-API*'},
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

var req = unirest("POST", "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-text");

req.headers({
  "content-type": "application/json",
  "client-token": "{{security-token}}"
});

req.type("json");
req.send({
  "phone": "5511999998888",
  "message": "Welcome to *Z-API*"
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
NSDictionary *parameters = @{ @"phone": @"5511999998888",
                              @"message": @"Welcome to *Z-API*" };

NSData *postData = [NSJSONSerialization dataWithJSONObject:parameters options:0 error:nil];

NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:@"https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-text"]
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

let uri = Uri.of_string "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-text" in
let headers = Header.add (Header.init ()) "client-token" "{{security-token}}" in
let body = Cohttp_lwt_body.of_string "{\"phone\": \"5511999998888\", \"message\": \"Welcome to *Z-API*\"}" in

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
  CURLOPT_URL => "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-text",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => "{\"phone\": \"5511999998888\", \"message\": \"Welcome to *Z-API*\"}",
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
$request->setUrl('https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-text');
$request->setMethod(HTTP_METH_POST);

$request->setHeaders(array(
  'content-type' => 'application/json',
  'client-token' => '{{security-token}}'
));

$request->setBody('{"phone": "5511999998888", "message": "Welcome to *Z-API*"}');

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
$body->append('{"phone": "5511999998888", "message": "Welcome to *Z-API*"}');

$request->setRequestUrl('https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-text');
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
$response = Invoke-WebRequest -Uri 'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-text' -Method POST -Headers $headers -ContentType 'undefined' -Body '{"phone": "5511999998888", "message": "Welcome to *Z-API*"}'
```

  </TabItem>
  <TabItem value="powershell-restmethod">

```bash
$headers=@{}
$headers.Add("content-type", "application/json")
$headers.Add("client-token", "{{security-token}}")
$response = Invoke-RestMethod -Uri 'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-text' -Method POST -Headers $headers -ContentType 'undefined' -Body '{"phone": "5511999998888", "message": "Welcome to *Z-API*"}'
```

  </TabItem>
  <TabItem value="python-python3">

```python
import http.client

conn = http.client.HTTPSConnection("api.z-api.io")

payload = "{\"phone\": \"5511999998888\", \"message\": \"Welcome to *Z-API*\"}"

headers = { 'client-token': "{{security-token}}" }

conn.request("POST", "/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-text", payload, headers)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))
```

  </TabItem>
  <TabItem value="python-requests">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-text"

payload = "{\"phone\": \"5511999998888\", \"message\": \"Welcome to *Z-API*\"}"
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

url = URI("https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-text")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Post.new(url)
request["client-token"] = '{{security-token}}'
request.body = "{\"phone\": \"5511999998888\", \"message\": \"Welcome to *Z-API*\"}"

response = http.request(request)
puts response.read_body
```

  </TabItem>
  <TabItem value="shell-curl">

```bash
curl --request POST \
  --url https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-text \
  --header 'client-token: {{security-token}}' \
  --header 'content-type: application/json' \
  --data '{"phone": "5511999998888", "message": "Welcome to *Z-API*"}'
```

  </TabItem>
  <TabItem value="shell-httpie">

```bash
echo '{"phone": "5511999998888", "message": "Welcome to *Z-API*"}' |  \
  http POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-text \
  client-token:'{{security-token}}'
```

  </TabItem>
  <TabItem value="shell-wget">

```bash
wget --quiet \
  --method POST \
  --header 'client-token: {{security-token}}' \
  --body-data '{"phone": "5511999998888", "message": "Welcome to *Z-API*"}' \
  --output-document \
  - https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-text
```

  </TabItem>
  <TabItem value="swift-nsurlsession">

```swift
import Foundation

let headers = ["client-token": "{{security-token}}"]
let parameters = [
  "phone": "5511999998888",
  "message": "Welcome to *Z-API*"
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-text")! as URL,
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

- [Mention Member](/docs/groups/mencionar-membro) - Mention participants in a group
- [Communities](/docs/communities/introducao) - Documentation on communities