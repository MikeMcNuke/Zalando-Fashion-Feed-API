# Welcome to the Fashion Feed-API-Documentation wiki!

The Zalando SE's Feed public API was created to give a programmatic access to Zalando's MyFeed and allow basic operations, such as searching for sources like New In, Street styles, stylists e.t.c, items like Brand new in, top sellers e.t.c, and preferences being offered and accessing details about them.

The aim of this manual is to define in detail what requests are expected by the API and the responses you can expect in return.

##  API
  
[https://api-doc.dz.zalan.do](https://api-doc.dz.zalan.do)

All API access is over HTTPS, and accessed from the api.zalando.com domain. All data is sent and received as JSON.

Shop API for reference: https://github.com/zalando/shop-api-documentation/wiki

## Schema

The API has a machine-readable JSON schema that describes what resources are available via the API and how they are represented. You can access the schema using CURL:

$ curl 'https://api-doc.dz.zalan.do/docs/api/myfeed.json'
