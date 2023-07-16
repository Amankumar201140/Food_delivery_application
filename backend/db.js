const mongoose = require('mongoose');
const mongoURI ='mongodb://amanrajsjs:amanrajsjs@ac-ut1z0ra-shard-00-00.dpada4o.mongodb.net:27017,ac-ut1z0ra-shard-00-01.dpada4o.mongodb.net:27017,ac-ut1z0ra-shard-00-02.dpada4o.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-tx2drq-shard-0&authSource=admin&retryWrites=true&w=majority'

mongoose.set('strictQuery', true);
const mongoDB =async() =>{
    await mongoose.connect(mongoURI,{useNewUrlParser: true},async(err,result)=>{
        if(err) console.log("---",err)
        else{
            console.log("connected");
            const fetched_data = await mongoose.connection.db.collection("food-items");
            fetched_data.find({}).toArray(async function( err, data){
              const foodCategory = await mongoose.connection.db.collection("foodCategory");
              foodCategory.find({}).toArray(function(err, catData){
                if(err) console.log(err);
                 else {
                     global.food_items = data;
                     global.foodCategory = catData;
                    }
              })
                // if(err) console.log(err);
                // else {
                //     global.food_items = data;
                //     console.log( global.food_items )
                // }
            })
        }
    
});
}

module.exports =mongoDB;
