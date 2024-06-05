import { uploadOnCloudinary } from "../utils/cloudinary.js";
import fs from "fs";
import { spawn,exec } from "child_process";

const sanitizeFilename = (filename) => filename.replace(/ /g, '_');

export const handleFileUpload = (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    console.log(req.file.path);

    uploadOnCloudinary(req.file.path)
        .then((response) => {
            if (response) {
                console.log('Cloudinary upload response:', response);

                const videopath = response.secure_url;
                const sanitizedFilename = sanitizeFilename(response.original_filename);
                const outputpath = `../server/public/course/${sanitizedFilename}`;
                const hlspath = `${outputpath}/index.m3u8`;
                
                console.log('hlspath:', hlspath);

                if (!fs.existsSync(outputpath)) {
                    fs.mkdirSync(outputpath, { recursive: true });
                }

                const ffmpegPath = 'C:/ffmpeg/bin/ffmpeg.exe';
                const ffmpegCommand = `"${ffmpegPath}" -i "${videopath}" -codec:v libx264 -codec:a aac -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${outputpath}/segment%03d.ts" -start_number 0 "${hlspath}"`;
                 const ffmpegArgs = [
                    '-i', `${videopath}`,
                    '-codec:v', 'libx264',
                    '-codec:a', 'aac',
                    '-hls_time', '10',
                    '-hls_playlist_type', 'vod',
                    '-hls_segment_filename', `${outputpath}/segment%03d.ts`,
                    '-start_number', '0',
                    `${hlspath}`
                  ];

              /*  exec(ffmpegCommand, (error, stdout, stderr) => {
                    if (error) {
                        console.error(`exec error: ${error}`);
                        return res.status(500).send('Video conversion failed.');
                    }

                    console.log(`stdout: ${stdout}`);
                    console.log(`stderr: ${stderr}`);

                    const videoUrl = `http://localhost:3000/public/course/${sanitizedFilename}/index.m3u8`;
                    return res.json({
                        message: "Video converted to HLS format",
                        videoUrl: videoUrl,
                    });
                });
                */
               const ffmpeg = spawn(ffmpegPath,ffmpegArgs)
               ffmpeg.stdout.on('data', (data) => {
                console.log(`stdout: ${data}`);
              });
              
              ffmpeg.stderr.on('data', (data) => {
                console.error(`stderr: ${data}`);
              });
              ffmpeg.on('close', (code) => {
                if (code === 0) {
                  console.log('ffmpeg process completed successfully');
                } else {
                  console.error(`ffmpeg process exited with code ${code}`);
                }
              });
              const videoUrl = `http://localhost:3000/public/course/${sanitizedFilename}/index.m3u8`;
              return res.json({
                  message: "Video converted to HLS format",
                  videoUrl: videoUrl,
              });
            } else {
                console.log('Cloudinary upload failed.');
                return res.status(500).send('File upload failed.');
            }
        })
        .catch((error) => {
            console.error('Error uploading file to Cloudinary:', error);
            return res.status(500).send('Internal server error.');
        });
};

export const getFile = (req, res) => {
    res.render('upload');
};
