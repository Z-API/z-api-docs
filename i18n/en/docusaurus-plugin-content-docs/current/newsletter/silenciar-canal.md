---
id: silenciar-canal
sidebar_position: 9
title: Change channel
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Mute Channel

## Method

### /mute-newsletter

```http
PUT https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mute-newsletter
```

## Header

| Key | Value |
|-----|-------|
| Client-Token | SECURITY TOKEN FOR ACCOUNT |

## Conceptualization

This method is responsible for muting a newsletter.

## Attributes

### Required

| Attributes | Type | Description |
|-----------|------|-------------|
| id | string | Newsletter ID |

## Request Body

```http
PUT https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mute-newsletter
```

```json
{
  "id": "999999999999999999@newsletter"
}
```

:::warning
The newsletter ID must always include the suffix "@newsletter", as this is the standard used by WhatsApp itself.
:::

## Response

### 200

| Attributes | Type | Description |
|-----------|------|-------------|
| value | boolean | true if successful, false in case of failure |

**Example**

```json
{
  "value": true
}
```

## 405

Make sure you are sending the correct specification for the method. Verify if you sent POST, PUT or GET as specified at the beginning of this topic.

## 415

If you receive a 415 error, make sure to add in the request headers "Content-Type" of the object you are sending, most commonly "application/json"

## Webhook Response

Link for the webhook response of newsletter:

[Webhook](/docs/webhooks/ao-receber)

## Examples of Code

<Tabs defaultValue="shell-curl">
  <TabItem value="c-libcurl" label="C (LibCurl)">

```c
CURL *hnd = curl_easy_init();

curl_easy_setopt(hnd, CURLOPT_CUSTOMREQUEST, "PUT");
curl_easy_setopt(hnd, CURLOPT_URL, "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mute-newsletter");

struct curl_slist *headers = NULL;
headers = curl_slist_append(headers, "content-type: application/json");
headers = curl_slist_append(headers, "client-token: {{security-token}}");
curl_easy_setopt(hnd, CURLOPT_HTTPHEADER, headers);

curl_easy_setopt(hnd, CURLOPT_POSTFIELDS, "{\"id\": \"ID do Canal\"}");

CURLcode ret = curl_easy_perform(hnd);
```

  </TabItem>
  <TabItem value="clojure-clj_http" label="Clojure">

```clojure
(require '[clj-http.client :as client])

(client/put "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mute-newsletter" {:headers {:client-token "{{security-token}}"}
                                                                                            :content-type :json
                                                                                            :form-params {:id "ID do Canal"}})
```

  </TabItem>
  <TabItem value="csharp-restsharp" label="C# (RestSharp)">

```csharp
var client = new RestClient("https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mute-newsletter");
var request = new RestRequest(Method.PUT);
request.AddHeader("content-type", "application/json");
request.AddHeader("client-token", "{{security-token}}");
request.AddParameter("undefined", "{\"id\": \"ID do Canal\"}", ParameterType.RequestBody);
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

	url := "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mute-newsletter"

	payload := strings.NewReader("{\"id\": \"ID do Canal\"}")

	req, _ := http.NewRequest("PUT", url, payload)

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
PUT /instances/SUA_INSTANCIA/token/SEU_TOKEN/mute-newsletter HTTP/1.1
Client-Token: {{security-token}}
Host: api.z-api.io
Content-Length: 21

{"id": "ID do Canal"}
```

  </TabItem>
  <TabItem value="java-okhttp" label="Java (OkHttp)">

```java
OkHttpClient client = new OkHttpClient();

MediaType mediaType = MediaType.parse("application/json");
RequestBody body = RequestBody.create(mediaType, "{\"id\": \"ID do Canal\"}");
Request request = new Request.Builder()
  .url("https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mute-newsletter")
  .put(body)
  .addHeader("client-token", "{{security-token}}")
  .build();

Response response = client.newCall(request).execute();
```

  </TabItem>
  <TabItem value="java-unirest" label="Java (Unirest)">

```java
HttpResponse<String> response = Unirest.put("https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mute-newsletter")
  .header("client-token", "{{security-token}}")
  .body("{\"id\": \"ID do Canal\"}")
  .asString();
```

  </TabItem>
  <TabItem value="javascript-fetch" label="JavaScript (Fetch)">

```js
fetch("https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mute-newsletter", {
  "method": "PUT",
  "headers": {
    "client-token": "{{security-token}}"
  },
  "body": {
    "id": "ID do Canal"
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
  "url": "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mute-newsletter",
  "method": "PUT",
  "headers": {
    "client-token": "{{security-token}}"
  },
  "processData": false,
  "data": "{\"id\": \"ID do Canal\"}"
}

$.ajax(settings).done(function (response) {
  console.log(response);
});
```

  </TabItem>
  <TabItem value="javascript-xhr" label="JavaScript (XHR)">

```js
var data = JSON.stringify({
  "id": "ID do Canal"
});

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open("PUT", "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mute-newsletter");
xhr.setRequestHeader("client-token", "{{security-token}}");

xhr.send(data);
```

  </TabItem>
  <TabItem value="node-native" label="Node.js (Native)">

```js
var http = require("https");

var options = {
  "method": "PUT",
  "hostname": "api.z-api.io",
  "port": null,
  "path": "/instances/SUA_INSTANCIA/token/SEU_TOKEN/mute-newsletter",
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

req.write(JSON.stringify({id: 'ID do Canal'}));
req.end();
```

  </TabItem>
  <TabItem value="node-request" label="Node.js (Request)">

```js
var request = require("request");

var options = {
  method: 'PUT',
  url: 'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mute-newsletter',
  headers: {'content-type': 'application/json', 'client-token': '{{security-token}}'},
  body: {id: 'ID do Canal'},
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

var req = unirest("PUT", "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mute-newsletter");

req.headers({
  "content-type": "application/json",
  "client-token": "{{security-token}}"
});

req.type("json");
req.send({
  "id": "ID do Canal"
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
NSDictionary *parameters = @{ @"id": @"ID do Canal" };

NSData *postData = [NSJSONSerialization dataWithJSONObject:parameters options:0 error:nil];

NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:@"https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mute-newsletter"]
                                                       cachePolicy:NSURLRequestUseProtocolCachePolicy
                                                   timeoutInterval:10.0];
[request setHTTPMethod:@"PUT"];
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

let uri = Uri.of_string "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mute-newsletter" in
let headers = Header.add (Header.init ()) "client-token" "{{security-token}}" in
let body = Cohttp_lwt_body.of_string "{\"id\": \"ID do Canal\"}" in

Client.call ~headers ~body `PUT uri
>>= fun (res, body_stream) ->
  (* Do stuff with the result *)
```

  </TabItem>
  <TabItem value="php-curl" label="PHP (cURL)">

```php
<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mute-newsletter",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "PUT",
  CURLOPT_POSTFIELDS => "{\"id\": \"ID do Canal\"}",
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
  <TabItem value="php-http1" label="PHP (HTTP v1)">

```php
<?php

$request = new HttpRequest();
$request->setUrl('https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mute-newsletter');
$request->setMethod(HTTP_METH_PUT);

$request->setHeaders(array(
  'content-type' => 'application/json',
  'client-token' => '{{security-token}}'
));

$request->setBody('{"id": "ID do Canal"}');

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
$body->append('{"id": "ID do Canal"}');

$request->setRequestUrl('https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mute-newsletter');
$request->setRequestMethod('PUT');
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
  <TabItem value="powershell-webrequest" label="PowerShell (WebRequest)">

```powershell
$headers=@{}
$headers.Add("content-type", "application/json")
$headers.Add("client-token", "{{security-token}}")
$response = Invoke-WebRequest -Uri 'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mute-newsletter' -Method PUT -Headers $headers -ContentType 'undefined' -Body '{"id": "ID do Canal"}'
```

  </TabItem>
  <TabItem value="powershell-restmethod" label="PowerShell (RestMethod)">

```powershell
$headers=@{}
$headers.Add("content-type", "application/json")
$headers.Add("client-token", "{{security-token}}")
$response = Invoke-RestMethod -Uri 'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mute-newsletter' -Method PUT -Headers $headers -ContentType 'undefined' -Body '{"id": "ID do Canal"}'
```

  </TabItem>
  <TabItem value="python-python3" label="Python (http.client)">

```python
import http.client

conn = http.client.HTTPSConnection("api.z-api.io")

payload = "{\"id\": \"ID do Canal\"}"

headers = { 'client-token': "{{security-token}}" }

conn.request("PUT", "/instances/SUA_INSTANCIA/token/SEU_TOKEN/mute-newsletter", payload, headers)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))
```

  </TabItem>
  <TabItem value="python-requests" label="Python (Requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mute-newsletter"

payload = "{\"id\": \"ID do Canal\"}"
headers = {'client-token': '{{security-token}}'}

response = requests.request("PUT", url, data=payload, headers=headers)

print(response.text)
```

  </TabItem>
  <TabItem value="ruby-native" label="Ruby (Native)">

```ruby
require 'uri'
require 'net/http'
require 'openssl'

url = URI("https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mute-newsletter")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Put.new(url)
request["client-token"] = '{{security-token}}'
request.body = "{\"id\": \"ID do Canal\"}"

response = http.request(request)
puts response.read_body
```

  </TabItem>
  <TabItem value="shell-curl" label="Shell (cURL)">

```bash
curl --request PUT \
  --url https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mute-newsletter \
  --header 'client-token: {{security-token}}' \
  --header 'content-type: application/json' \
  --data '{"id": "ID do Canal"}'
```

  </TabItem>
  <TabItem value="shell-httpie" label="Shell (HTTPie)">

```bash
echo '{"id": "ID do Canal"}' |  \
  http PUT https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mute-newsletter \
  client-token:'{{security-token}}'
```

  </TabItem>
  <TabItem value="shell-wget" label="Shell (Wget)">

```bash
wget --quiet \
  --method PUT \
  --header 'client-token: {{security-token}}' \
  --body-data '{"id": "ID do Canal"}' \
  --output-document \
  - https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mute-newsletter
```

  </TabItem>
  <TabItem value="swift-nsurlsession" label="Swift (NSURLSession)">

```swift
import Foundation

let headers = ["client-token": "{{security-token}}"]
let parameters = ["id": "ID do Canal"] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mute-newsletter")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "PUT"
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