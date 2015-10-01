# Welcome to the Fashion Feed API Documentation!

The **Zalando SE**  presents some personel feed API, by which consumer can access sources like New-in, StreetStyles, Brand recommendation etc..
 
 The aim is to describe in detail, how the API works!

##First Step

**Authorization**

Since API provides personalized information. So consumer need to  [register as a customer](https://www.zalando.ch/login/). 
It's also possible to use default profiles (MALE and FEMALE) without any authorization for getting default results.

Fashion Feed API use [token based authorization](https://github.com/zalando/Zalando-Fashion-Feed-API/wiki/Authorization).

##Second Step  
**Feeds**

        Inorder to access feed API, below is some example for params!
        feed-id = ex. 3022022230 or MALE, FEMALE as default
        source-id = top_seller, article_reco, brand_reco, brand, new_for_brand, new_in, street_style, stylist, outfit.
        stream-id = all, personalized, top etc..


##Third Step  
**Profile**

        Inorder to access Profile API, below is some example for params!
        profile-id = ex. 3022022230 or ME, MALE, FEMALE as default
        type-id = article, brand.
        preference-id = brand:AO1, article:NI112B08Z-Q11
        opinion = LIKE, DISLIKE.
        
## Schema


The API returns JSON schema that describes what resources are available via the API and how they are represented. You can access the schema using CURL:

    $ curl 'https://api-doc.dz.zalan.do/docs/api/myfeed.json'
    
## Swagger UI

You can find Graphical API representation with Swagger UI tool [here](https://api-doc.dz.zalan.do/docs/swagger-ui/index.html)

##  API Documentation index

API Documentation index could be found [here](https://api-doc.dz.zalan.do).