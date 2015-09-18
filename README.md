# Welcome to the Fashion Feed API Documentation!

The Zalando SE's Feed public API was created to give a programmatic access to Zalando's MyFeed and allow basic operations, such as searching for sources like New In, Street styles, stylists e.t.c, items like Brand new in, top sellers e.t.c, and preferences being offered and accessing details about them.

The aim of this manual is to define in detail what requests are expected by the API and the responses you can expect in return.

##  Authorization

Since API provide personalized information. You would need to [register as a customer](https://www.zalando.co.uk/login)
It's also possible to use default profiles (MALE and FEMALE) without any authorization for getting default results.

Fashion Feed API use [token based authorization](https://github.com/zalando/Zalando-Fashion-Feed-API/wiki/Authorization).

## Schema

The API has a machine-readable JSON schema that describes what resources are available via the API and how they are represented. You can access the schema using CURL:

    $ curl 'https://api-doc.dz.zalan.do/docs/api/myfeed.json'
## Swagger UI

You can find Graphical API representation with Swagger UI tool [here](https://api-doc.dz.zalan.do/docs/swagger-ui/index.html)

##  API Documentation index

API Documentation index could be found [here](https://api-doc.dz.zalan.do).