const models = require('../models/index');
const formidable = require('formidable');
const upload = require('./function/myFunc');
const fs = require('fs-extra');


exports.insert= async (req, res, next)=>{
    const form = new formidable.IncomingForm()
    form.parse(req, async (error, fields, files) => {
        const result = await models.tb_plublication.create({
            no: fields.no,
            lao_topic: fields.lao_topic,
            lao_Content: fields.lao_Content,
            eng_Content: fields.eng_Content,
            eng_topic: fields.eng_topic
        }, { logging: false })
        _path = "/pub"
        _lao_Content = await upload.uploadFile(files.lao_Content, result.lao_Content, result.id, _path, "la");
        console.log(_lao_Content)
        _eng_Content= await upload.uploadFile(files.eng_Content, result.eng_Content, result.id, _path, "en");

        await models.tb_plublication.update({
            lao_Content: _lao_Content,
            eng_Content: _eng_Content,
        }, { where: { id: result.id }, logging: false });

        return res.status(201).json({ message: "success" })
    })
}
   
      


// show data lao content
exports.index= async(req, res)=>{
    res.json({})
}

// update
exports.update = async (req, res)=>{
    try {
        const {id} = req.parse;
    const pub = await model.tb_plublication.findByPk(id);
    if(!pub){
        res.status(404).json({
            message:"Not Found!"
        })
    }else{
        const form = new formidable.IncomingForm()
    form.parse(req, async (error, fields, files) => {
        const result = await models.tb_plublication.create({
            no: fields.no,
            lao_topic: fields.lao_topic,
            lao_Content: fields.lao_Content,
            eng_Content: fields.eng_Content,
            eng_topic: fields.eng_topic
        }, { where:{id:id},logging: false })
        _path = "/pub"
        _lao_Content = await upload.uploadFile(files.lao_Content, result.lao_Content, result.id, _path, "la");
        console.log(_lao_Content)
        _eng_Content= await upload.uploadFile(files.eng_Content, result.eng_Content, result.id, _path, "en");

        await models.tb_plublication.update({
            lao_Content: _lao_Content,
            eng_Content: _eng_Content,
        }, { where: { id:id }, logging: false });

        return res.status(200).json({ message: "updated" })
    })
    }
    } catch (error) {
        res.status(400).json({
            error:error.message,
           
        })
        
    }
}

// // show lao content
// exports.index_la= async(req, res)=>{
//    const pub = await model.tb_plublication.findAll({
//     attributes:['lao_topic','lao_content','createdAt']
//    });

//   try {
//     res.status(200).json({
        
//         data:pub,
        
//     })
//   } catch (error) {
//       res.status(400).json({
//           error:true,
//           message:error.message
//       })
//   }
// }
// // show eng content
// exports.index_en= async(req, res)=>{
//     const pub = await model.tb_plublication.findAll({
//      attributes:['eng_topic','eng_content','createdAt']
//     });
 
//    try {
//      res.status(200).json({
         
//          data:pub,
         
//      })
//    } catch (error) {
//        res.status(400).json({
//            error:true,
//            message:error.message
//        })
//    }
//  }
// // detele
// exports.delete = async(req, res) =>{
//     try {
//         const {id} = req.params;

//    if(!id){
//     res.status(400).json({
//         error:true,
//         message:'Not found ID!',
//         data:null
//     })
//    }else{
//     const pub = await model.tb_plublication.destroy({
//         where:{id:id}
//     });

//     res.status(200).json({
//         data:pub,
//         message:'data updated!'
//     })
//    }
//     } catch (error) {
//         res.status(400).json({
//             data:error
//         })
//     }
// }

// // update

// exports.update =async (req, res)=>{
//     try {
//         const {id} = req.params;
//         const {no, lao_topic,eng_topic,lao_Content, eng_Content} = req.body;
//     if(!id){
        
//         res.status(400).json({
//             error:true,
//             message:'Not found ID!'
//         })
//     }else{
//         const pub = await model.tb_plublication.update({
//             no:no,
//             lao_topic:lao_topic,
//             eng_topic:eng_topic,
//             lao_Content:lao_Content,
//             eng_Content:eng_Content
//         }, {where:{id:id}})
    
//         res.status(200).json({
//             data:pub,
//             message:'data updated!'
//         });
//     }
//     } catch (error) {
//         console.log(error)
//     }

// }


