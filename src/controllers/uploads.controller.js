import { uploadOnCloudinary } from "../utils/cloudinary.js"

export const handleFileUpload = (req, res) => {

    if (!req.file) {
        
        return res.status(400).send('No file uploaded.');
    }

   
    console.log(req.file.path);

    
    uploadOnCloudinary(req.file.path)
        .then((response) => {
            if (response) {
               
                console.log('Cloudinary upload response:', response);
                res.send('File uploaded successfully.');
            } else {
             
                console.log('Cloudinary upload failed.');
                res.status(500).send('File upload failed.');
            }
        })
        .catch((error) => {
            
            console.error('Error uploading file to Cloudinary:', error);
            res.status(500).send('Internal server error.');
        });
};

export const getFile = (req,res)=>{
    res.render('upload')
}