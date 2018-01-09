
var express=require('express');
var mysql=require('mysql');
var router=express.Router();
var fs=require('fs');  
var formidable=require('formidable'); 

var pool=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'img',
    port:3306
})

var temp=''
router.post('/insert', function(req, res, next) {
    res.header('Access-Control-Allow-Origin','*');
    var sel=req.body.sel;
    pool.query(`INSERT INTO  img (img) VALUES ('${temp}')`, function(err, rows, fields) { 
        res.send(rows)
    });
});
router.post('/tr', function(req, res, next) {
    res.header('Access-Control-Allow-Origin','*');
    pool.query(`SELECT * FROM img `, function(err, rows, fields) {
        res.send(rows)
    });
});

router.post("/con",function(req,res){
    res.header('Access-Control-Allow-Origin','*');
    var user=req.body.user;
    var pass=req.body.pass;
    var data=req.body.data;
    pool.query(`SELECT * FROM img`,function(err,rows){
        if(err) throw err;
        res.send(rows)
    })
})
//修改
router.post('/gai', function(req, res, next) {
    res.header('Access-Control-Allow-Origin','*');
    var id=req.body.gai;
    pool.query('SELECT * FROM img WHERE id='+id, function(err, rows, fields) { 
        res.send(rows)
    });
});
//确认修改
router.post('/qrgai', function(req, res, next) {
    res.header('Access-Control-Allow-Origin','*');
    var id=req.body.id;
    var sel=req.body.sel;
    pool.query("UPDATE img SET img='"+temp+"' WHERE id="+id , function(err, rows, fields) { 
        res.send(rows)
    }); 
});
//删除
router.post('/delete', function(req, res, next) {
    res.header('Access-Control-Allow-Origin','*');
    var id=req.body.id;
    pool.query('DELETE FROM img WHERE id='+id, function(err, rows, fields) { 
        res.send(rows)
    });
});
// img
router.post('/img',function(req,res){
    res.header('Access-Control-Allow-Origin','*');
    var form = new formidable.IncomingForm();
    form.uploadDir = 'public/images'  //图片的存放路径
    form.parse(req,function(err,fields,files){
       
        for(i in files){
            var file = files[i];
            var fName = (new Date()).getTime();
            switch(file.type){
                case 'image/jpeg':
                fName = fName+'.jpg';
                break;
                case 'image/png':
                fName = fName + '.png';
                break;
                case 'image/gif':
                fName = fName + '.gif';
                break;
            }
            var newPath = 'public/images/' + fName
            fs.renameSync(file.path,newPath);
            res.send(newPath)
            temp=fName
        }
    })

})




module.exports=router;