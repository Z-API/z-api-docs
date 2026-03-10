---
id: metadata-leve
sidebar_position: 1
title: Group Metadata (Light)
---


import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';

# <Icon name="Info" size="lg" /> Metadata of Group (Light)

Get group and participant information without the invite link.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituacao}

This method returns the light metadata of the group with all information about the group and its participants, except for the invite link.

The only difference between this method and [Group Metadata](/docs/groups/metadata) is that this one does not return the invite link of the group, as obtaining it can be costly and slightly time-consuming. Knowing this, we provide a "light" way to get the group metadata.

If you want to use this method and later need the invite link of the group, you can obtain it from the [Get Group Invite Link](/docs/groups/obter-link) API.

:::caution Caution

On November 4, 2021, WhatsApp changed the format for creating new groups:

- **Before**: `"phone": "5511999999999-1623281429"`
- **Now**: `"phone": "120363019502650977-group"`

:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/light-group-metadata/{phone}
```

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Value |
|--------|-------|
| `Client-Token` | **YOUR_ACCOUNT_TOKEN** |

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 {#200}

| Attributes | Type | Description |
|-----------|------|-------------|
| `phone` | string | Group ID/Fone |
| `description` | string | Group description |
| `owner` | string | Creator's phone number |
| `subject` | string | Group name |
| `creation` | timestamp | Timestamp of group creation date |
| `communityId` | string | Community ID |
| `adminOnlyMessage` | boolean | Indicates if only Admin can send messages |
| `adminOnlySettings` | boolean | Indicates if only Admin can change settings |
| `requireAdminApproval` | boolean | Indicates if admin approval is needed to join the group |
| `isGroupAnnouncement` | boolean | Indicates if it's an alert group |
| `participants` | array string | with data of participants |

Array String (participants)

| Attributes | Type | Description |
|-----------|------|-------------|
| `phone` | string | Participant's phone number |
| `isAdmin` | string | Indicates if the participant is an Admin of the group |
| `isSuperAdmin` | string | Indicates if it's the creator of the group |

Example

```json
{
  "phone": "120363019502650977-group",
  "description": "Grupo Z-API",
  "owner": "5511999999999",
  "subject": "Meu grupo no Z-API",
  "creation": 1588721491000,
  "invitationLink": null,
  "invitationLinkError": null,
  "communityId": null,
  "adminOnlyMessage": false,
  "adminOnlySettings": false,
  "requireAdminApproval": false,
  "isGroupAnnouncement": false,
  "participants": [
    {
      "phone": "5511888888888",
      "isAdmin": false,
      "isSuperAdmin": false
    },
    {
      "phone": "5511777777777",
      "isAdmin": true,
      "isSuperAdmin": false,
      "short": "ZAPIs",
      "name": "ZAPIs Boys"
    }
  ],
  "subjectTime": 1617805323000,
  "subjectOwner": "554497050785"
}
```

### 405 {#405}

Make sure you are sending the correct method specification, i.e., verify if you sent POST or GET as specified at the beginning of this topic.

### 415 {#415}

If you receive a 415 error, make sure to add in the request headers the "Content-Type" of the object you are sending, most commonly "application/json"

---

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

curl_easy_setopt(hnd, CURLOPT_CUSTOMREQUEST, "GET");
curl_easy_setopt(hnd, CURLOPT_URL, "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/light-group-metadata/123123123-group");

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

(client/get "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/light-group-metadata/123123123-group" {:headers {:client-token "{{security-token}}"}
                                                                                                                 :accept :json})
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

	url := "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/light-group-metadata/123123123-group"

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
GET /instances/SUA_INSTANCIA/token/SEU_TOKEN/light-group-metadata/123123123-group HTTP/1.1
Client-Token: {{security-token}}
Host: api.z-api.io

```

  </TabItem>
  <TabItem value="java-okhttp">

```java
OkHttpClient client = new OkHttpClient();

Request request = new Request.Builder()
  .url("https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/light-group-metadata/123123123-group")
  .get()
  .addHeader("client-token", "{{security-token}}")
  .build();

Response response = client.newCall(request).execute();
```

  </TabItem>
  <TabItem value="java-unirest">

```java
HttpResponse<String> response = Unirest.get("https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/light-group-metadata/123123123-group")
  .header("client-token", "{{security-token}}")
  .asString();
```

  </TabItem>
  <TabItem value="javascript-jquery">

```javascript
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/light-group-metadata/123123123-group",
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
fetch("https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/light-group-metadata/123123123-group", {
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

xhr.open("GET", "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/light-group-metadata/123123123-group");
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
  "path": "/instances/SUA_INSTANCIA/token/SEU_TOKEN/light-group-metadata/123123123-group",
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
  url: 'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/light-group-metadata/123123123-group',
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

var req = unirest("GET", "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/light-group-metadata/123123123-group");

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

NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:@"https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/light-group-metadata/123123123-group"]
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

let uri = Uri.of_string "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/light-group-metadata/123123123-group" in
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
  CURLOPT_URL => "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/light-group-metadata/123123123-group",
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
$request->setUrl('https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/light-group-metadata/123123123-group');
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
  <TabItem value="php-http2">

```php
<?php

$client = new http\Client;
$request = new http\Client\Request;

$request->setRequestUrl('https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/light-group-metadata/123123123-group');
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
  <TabItem value="powershell-webrequest">

```bash
$headers=@{}
$headers.Add("accept", "application/json")
$headers.Add("client-token", "{{security-token}}")
$response = Invoke-WebRequest -Uri 'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/light-group-metadata/123123123-group' -Method GET -Headers $headers
```

  </TabItem>
  <TabItem value="powershell-restmethod">

```bash
$headers=@{}
$headers.Add("accept", "application/json")
$headers.Add("client-token", "{{security-token}}")
$response = Invoke-RestMethod -Uri 'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/light-group-metadata/123123123-group' -Method GET -Headers $headers
```

  </TabItem>
  <TabItem value="python-python3">

```python
import http.client

conn = http.client.HTTPSConnection("api.z-api.io")

headers = { 'client-token': "{{security-token}}" }

conn.request("GET", "/instances/SUA_INSTANCIA/token/SEU_TOKEN/light-group-metadata/123123123-group", headers=headers)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))
```

  </TabItem>
  <TabItem value="python-requests">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/light-group-metadata/123123123-group"

headers = {'client-token': '{{security-token}}'}

response = requests.request("GET", url, headers=headers)

print(response.text)
```

  </TabItem>
  <TabItem value="ruby-native">

```ruby
require 'uri'
require 'net/http'
require 'openssl'

url = URI("https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/light-group-metadata/123123123-group")

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
  --url https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/light-group-metadata/123123123-group \
  --header 'accept: application/json' \
  --header 'client-token: {{security-token}}'
```

  </TabItem>
  <TabItem value="shell-httpie">

```bash
http GET https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/light-group-metadata/123123123-group \
  client-token:'{{security-token}}'
```

  </TabItem>
  <TabItem value="shell-wget">

```bash
wget --quiet \
  --method GET \
  --header 'client-token: {{security-token}}' \
  --output-document \
  - https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/light-group-metadata/123123123-group
```

  </TabItem>
  <TabItem value="swift-nsurlsession">

```swift
import Foundation

let headers = ["client-token": "{{security-token}}"]

let request = NSMutableURLRequest(url: NSURL(string: "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/light-group-metadata/123123123-group")! as URL,
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