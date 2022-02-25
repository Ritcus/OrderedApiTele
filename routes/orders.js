import express from 'express';

const router = express.Router();


//Dummy data for testing purpose

const order= [
    {
        id: "1",
        title: "new laptop order",
        date : "2016-09-24",
        type : "iPhone13",
        customer : "John"
    },
    {
        id: "2",
        title: "new mobile order",
        date : "2016-09-22",
        type : "iPhone13",
        customer : "Micheal"
    },

    {
        id: "3",
        title: "new mobile order",
        date : "2016-09-22",
        type : "iPhone10",
        customer : "Jason"
    },
    {
        id: "4",
        title: "new mobile order",
        date : "2016-09-24",
        type : "iPhone13",
        customer : "Bred"
    }
]


//route to get method for getting all customer/order list

router.get('/', (req, res)=>{
    if (!order){
        res.status(404).json({error:'There is not any orders to display'})
    }
    res.send(order)
});


// route to get details of a specific order id

router.get('/:id', (req, res) => {
    const {id} = req.params;


// Check if the entered id is a valid number or some string

    if (isNaN(id)){
        res.status(404).json({error:'Please enter a valid id'})
    }

   const foundOrder= order.find((findorder => findorder.id ==id));

    res.send(foundOrder)
})

// route to post new order have to do with the POSTMAN software

router.post('/', (req, res)=>{
    const newOrder = req.body;

    order.push(newOrder);

    res.send(`New order with id ${newOrder.id} has been saved in the system`)
})

//route to get the data with a specific product type and date.. have to access with the two parameter

router.get('/:type/:date', (req, res)=>{

    const {type}= req.params
    const {date}= req.params

    let count=0;

    var orders=[]

    var customer=[]

    var successJson = []
   
//lopping through all the products 

    for (var i=0; i< order.length; i++){

//changing the date format stored in database to compare the parramter input as YYYYMMDD 

        let dateConverted=order[i].date.replaceAll('-','')  

// Using the condition to check the type and date of order and pushing the respective order id and customer name into customer and order arrays

        if (order[i].type== type && dateConverted==date){
            
            orders.push(order[i].id)
            customer.push(order[i].customer)
                  
            count=count+1
        }
    }

//finally pushing all required data into the array to sending the data into the webpage 

    successJson.push({type:type,count:count,orders:orders ,
        related_customers:customer})


//Checking if user enter valid type and date input

    if (count==0){
        res.status(404).json({error:'Please enter a valid type and date'})
    }


    res.send(successJson)
    
    

})

export default router