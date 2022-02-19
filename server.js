const express= require('express');
const mysql= require('mysql');
const bodyParser= require('body-parser');
const cors= require('cors');
const Connection = require('mysql/lib/Connection');

const app= express();



const Port=  3500;

app.use(express.static(__dirname+'/public'));
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())

app.set('view engine','ejs');

const connetion= mysql.createConnection({
    host:'localhost',
    password:'',
    user:'root',
    database:'maria'
})

connetion.connect(err=>{
    if(err){
        throw err
    }else{
        console.log('database connecting');
    }
})

app.get('/',(req,res)=>{

    connetion.query('SELECT * FROM service',((err,data)=>{
        if(err){
            throw err
        }else{
            res.render('home',{data})
        }
    }))

   
})

app.post('/saveData',(req,res)=>{
    let {date,time,service}= req.body
    let responseRequete={
        response:''
    }

    
    connetion.query('SELECT COUNT(id) AS totalCommand FROM commande',(err, resultat)=>{
        if(err){
            throw err
        }else{
            totalCommand=resultat[0].totalCommand;
            if(totalCommand ===0){
                connetion.query('INSERT INTO commande (service,date_order,time) value(?,?,?)',[service,date,time])
                responseRequete.response='command succeful register';
                console.log('11111')
                res.json(responseRequete)
            }else{
                connetion.query('SELECT * FROM commande where date_order=?',[date],(err2,resultat2)=>{
                    if(err2){
                        throw err2
                    }else{
                        let arrayOfTimeOnCurrentDate=[];
                      resultat2.forEach(data2 => {
                          arrayOfTimeOnCurrentDate.push(data2.time)
                      });
                      if(arrayOfTimeOnCurrentDate.includes(time)){
                        responseRequete.response='this time is already occuped, choose another time';
                        
                        res.json(responseRequete)
                      }else{
                        connetion.query('INSERT INTO commande (service,date_order,time) value(?,?,?)',[service,date,time])
                        responseRequete.response='command succeful register';
                        
                        res.json(responseRequete)
                      }
                    }
                })
            }
        }
    })


  
})














app.listen(Port,()=> console.log('port run on port '+ Port))
