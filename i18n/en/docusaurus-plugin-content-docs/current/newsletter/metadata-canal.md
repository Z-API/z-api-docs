---
id: metadata-canal
title: Channel Metadata
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Channel Metadata

## Method

### /newsletter/metadata

```http
GET https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/metadata/{newsletterId}
```

## Header

| Key | Value |
|-----|-------|
| Client-Token | ACCOUNT SECURITY TOKEN |

## Concept

This method returns the channel metadata with all information about the channel and its view.

## Attributes

### Required

| Attributes | Type | Description |
| --- | --- | --- |
| id | string | Channel ID |

## Request Params

### URL

```http
GET https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/metadata/{newsletterId}
```

:::warning
The channel id must always contain the suffix "@newsletter", as this is the standard used by WhatsApp itself.
:::

## Response

### 200

| Attributes | Type | Description |
| --- | --- | --- |
| id | string | Channel ID |
| creationTime | timestamp | Channel creation date timestamp |
| state | string | Channel state (ACTIVE, NON_EXISTING) |
| name | string | Channel name |
| description | string | Channel description |
| subscribersCount | string | Channel subscriber count |
| inviteLink | string | Channel invite link |
| verification | string | Indicates whether the channel is verified or not (VERIFIED, UNVERIFIED) |
| picture | string | Channel image URL |
| preview | string | Channel image preview URL |
| viewMetadata | object | Object with view information |

**Object (viewMetadata)**

| Attributes | Type | Description |
| --- | --- | --- |
| mute | string | Indicates whether the channel is muted or not (ON, OFF) |
| role | string | Indicates whether it is the owner or subscriber of the channel (OWNER, SUBSCRIBER) |

**Example**

```json
{
  "id": "999999999999999999@newsletter",
  "creationTime": "1695643504",
  "state": "ACTIVE",
  "name": "Z-API",
  "description": "Canal oficial Z-API",
  "subscribersCount": "123",
  "inviteLink": "https://www.whatsapp.com/channel/0029Va5Xk71a",
  "verification": "VERIFIED",
  "picture": "https://mmg.whatsapp.net/v/t61.24694-24/383686038_859672472421500_990610487096734362_n.jpg?ccb=11-4&oh=01_AdS-Wk3RSfXmtEqDA4-LTFaZQILXZSprywV8EwNoZPOaGw&oe=651EF162&_nc_sid=000000&_nc_cat=111",
  "preview": "https://mmg.whatsapp.net/v/t61.24694-24/383686038_859672472421500_990610487096734362_n.jpg?stp=dst-jpg_s192x192&ccb=11-4&oh=01_AdRltWYOZftf0cnm-GNw5RRGoxQ53nJR9zzxxot_N7JQCw&oe=651EF162&_nc_sid=000000&_nc_cat=111",
  "viewMetadata": {
    "mute": "OFF",
    "role": "OWNER"
  }
}
```

## 405

In this case, make sure you are sending the method specification correctly, i.e., check if you sent POST or GET as specified at the beginning of this topic.

## 415

If you receive a 415 error, make sure to add the "Content-Type" of the object you are sending to the request headers, in most cases "application/json".

## Webhook Response

Link to the newsletter webhook response:

[Webhook](/docs/webhooks/ao-receber)

## Code Examples

<Tabs defaultValue="shell-curl">
  <TabItem value="c-libcurl" label="C (LibCurl)">

```c
CURL *hnd = curl_easy_init();

curl_easy_setopt(hnd, CURLOPT_CUSTOMREQUEST, "GET");
curl_easy_setopt(hnd, CURLOPT_URL, "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/metadata/999999999999999999@newsletter");

struct curl_slist *headers = NULL;
headers = curl_slist_append(headers, "accept: application/json");
headers = curl_slist_append(headers, "client-token: {{security-token}}");
curl_easy_setopt(hnd, CURLOPT_HTTPHEADER, headers);

CURLcode ret = curl_easy_perform(hnd);
```

  </TabItem>
  <TabItem value="clojure-clj_http" label="Clojure">

```clojure
(require '[clj-http.client :as client])

(client/get "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/metadata/999999999999999999@newsletter" {:headers {:client-token "{{security-token}}"}
                                                                                                                              :accept :json})
```

  </TabItem>
  <TabItem value="csharp-restsharp" label="C# (RestSharp)">

```csharp
var client = new RestClient("https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/metadata/999999999999999999@newsletter");
var request = new RestRequest(Method.GET);
request.AddHeader("accept", "application/json");
request.AddHeader("client-token", "{{security-token}}");
IRestResponse response = client.Execute(request);
```

  </TabItem>
  <TabItem value="go-native" label="Go (Native)">

```go
package main

import (
	"fmt"
	"net/http"
	"io/ioutil"
)

func main() {

	url := "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/metadata/999999999999999999@newsletter"

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
  <TabItem value="http-1_1" label="HTTP">

```http
GET /instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/metadata/999999999999999999@newsletter HTTP/1.1
Client-Token: {{security-token}}
Host: api.z-api.io
```

  </TabItem>
  <TabItem value="java-okhttp" label="Java (OkHttp)">

```java
OkHttpClient client = new OkHttpClient();

Request request = new Request.Builder()
  .url("https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/metadata/999999999999999999@newsletter")
  .get()
  .addHeader("client-token", "{{security-token}}")
  .build();

Response response = client.newCall(request).execute();
```

  </TabItem>
  <TabItem value="java-unirest" label="Java (Unirest)">

```java
HttpResponse<String> response = Unirest.get("https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/metadata/999999999999999999@newsletter")
  .header("client-token", "{{security-token}}")
  .asString();
```

  </TabItem>
  <TabItem value="javascript-fetch" label="JavaScript (Fetch)">

```js
fetch("https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/metadata/999999999999999999@newsletter", {
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
  <TabItem value="javascript-jquery" label="JavaScript (jQuery)">

```js
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/metadata/999999999999999999@newsletter",
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
  <TabItem value="javascript-xhr" label="JavaScript (XHR)">

```js
var data = null;

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open("GET", "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/metadata/999999999999999999@newsletter");
xhr.setRequestHeader("client-token", "{{security-token}}");

xhr.send(data);
```

  </TabItem>
  <TabItem value="node-native" label="Node.js (Native)">

```js
var http = require("https");

var options = {
  "method": "GET",
  "hostname": "api.z-api.io",
  "port": null,
  "path": "/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/metadata/999999999999999999@newsletter",
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
  <TabItem value="node-request" label="Node.js (Request)">

```js
var request = require("request");

var options = {
  method: 'GET',
  url: 'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/metadata/999999999999999999@newsletter',
  headers: {accept: 'application/json', 'client-token': '{{security-token}}'}
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

var req = unirest("GET", "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/metadata/999999999999999999@newsletter");

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
  <TabItem value="objc-nsurlsession" label="Objective-C (NSURLSession)">

```objectivec
#import <Foundation/Foundation.h>

NSDictionary *headers = @{ @"client-token": @"{{security-token}}" };

NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:@"https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/metadata/999999999999999999@newsletter"]
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
  <TabItem value="ocaml-cohttp" label="OCaml (CoHTTP)">

```ocaml
open Cohttp_lwt_unix
open Cohttp
open Lwt

let uri = Uri.of_string "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/metadata/999999999999999999@newsletter" in
let headers = Header.add (Header.init ()) "client-token" "{{security-token}}" in

Client.call ~headers `GET uri
>>= fun (res, body_stream) ->
  (* Do stuff with the result *)
```

  </TabItem>
  <TabItem value="php-curl" label="PHP (cURL)">

```php
<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/metadata/999999999999999999@newsletter",
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
  <TabItem value="php-http1" label="PHP (HTTP v1)">

```php
<?php

$request = new HttpRequest();
$request->setUrl('https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/metadata/999999999999999999@newsletter');
$request->setMethod(HTTP_METH_GET);

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
  <TabItem value="php-http2" label="PHP (HTTP v2)">

```php
<?php

$client = new http\Client;
$request = new http\Client\Request;

$request->setRequestUrl('https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/metadata/999999999999999999@newsletter');
$request->setRequestMethod('GET');
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
$response = Invoke-WebRequest -Uri 'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/metadata/999999999999999999@newsletter' -Method GET -Headers $headers
```

  </TabItem>
  <TabItem value="powershell-restmethod" label="PowerShell (RestMethod)">

```powershell
$headers=@{}
$headers.Add("accept", "application/json")
$headers.Add("client-token", "{{security-token}}")
$response = Invoke-RestMethod -Uri 'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/metadata/999999999999999999@newsletter' -Method GET -Headers $headers
```

  </TabItem>
  <TabItem value="python-python3" label="Python (http.client)">

```python
import http.client

conn = http.client.HTTPSConnection("api.z-api.io")

headers = { 'client-token': "{{security-token}}" }

conn.request("GET", "/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/metadata/999999999999999999@newsletter", headers=headers)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))
```

  </TabItem>
  <TabItem value="python-requests" label="Python (Requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/metadata/999999999999999999@newsletter"

headers = {'client-token': '{{security-token}}'}

response = requests.request("GET", url, headers=headers)

print(response.text)
```

  </TabItem>
  <TabItem value="ruby-native" label="Ruby (Native)">

```ruby
require 'uri'
require 'net/http'
require 'openssl'

url = URI("https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/metadata/999999999999999999@newsletter")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Get.new(url)
request["client-token"] = '{{security-token}}'

response = http.request(request)
puts response.read_body
```

  </TabItem>
  <TabItem value="shell-curl" label="Shell (cURL)">

```bash
curl --request GET \
  --url https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/metadata/999999999999999999@newsletter \
  --header 'accept: application/json' \
  --header 'client-token: {{security-token}}'
```

  </TabItem>
  <TabItem value="shell-httpie" label="Shell (HTTPie)">

```bash
http GET https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/metadata/999999999999999999@newsletter \
  client-token:'{{security-token}}'
```

  </TabItem>
  <TabItem value="shell-wget" label="Shell (Wget)">

```bash
wget --quiet \
  --method GET \
  --header 'client-token: {{security-token}}' \
  --output-document \
  - https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/metadata/999999999999999999@newsletter
```

  </TabItem>
  <TabItem value="swift-nsurlsession" label="Swift (NSURLSession)">

```swift
import Foundation

let headers = ["client-token": "{{security-token}}"]

let request = NSMutableURLRequest(url: NSURL(string: "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/metadata/999999999999999999@newsletter")! as URL,
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