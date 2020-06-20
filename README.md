# Change-ringing method database queries
This app connects to a MongoDB database containing the methods and performances that appear in the CCCBR's xml method collection, available at [https://cccbr.github.io/methods-library/index.html](https://cccbr.github.io/methods-library/index.html).

## Collections

The database has three collections: methods, oldPerformances, and performances. The oldPerformances collection contains the performances in the July 28, 2018 version of the CCCBR's xml library. I chose to keep these because they have some extra information no longer included in the xml files, perhaps most notably Bellboard IDs. Both performance collections include only first performances of a method—as of January 2019 these were all single-method peals in tower and hand, but they could in the future include extents. The methods and (new) performances are updated every Monday night/Tuesday morning with a different app.

## Models

MongoDB documents look very much like javascript objects. The files in the "models" folder indicate what fields are possible in each of the three document types, and the type of data in each field. 


## About this app
This app started out as a remix of [https://groovy-terrier.glitch.me](https://groovy-terrier.glitch.me), which helped me learn how to work with MongoDB.