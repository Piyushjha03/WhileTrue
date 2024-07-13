import { v4 as uuid } from "uuid";
import { exec } from "child_process";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { uploadFolderToS3 } from "./aws.controller.js";
import { Chapter } from "../model/chapters/chapters.model.js";

export const videoController = async (req, res) => {
  const lessonId = uuid();
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const outputPath = path.join(__dirname, `../uploads/${lessonId}`);
  const videoUrl = path.resolve(__dirname, `../temp/${req.file.originalname}`);
  const ffmpegCommand = `ffmpeg -hide_banner -y -i "${videoUrl}" \
    -vf "scale=w=640:h=360:force_original_aspect_ratio=decrease,pad=640:360:(ow-iw)/2:(oh-ih)/2" -c:a aac -ar 48000 -c:v h264 -profile:v main -crf 20 -sc_threshold 0 -g 48 -keyint_min 48 -hls_time 4 -hls_playlist_type vod -b:v 800k -maxrate 856k -bufsize 1200k -b:a 96k "${outputPath}/360p_%03d.ts" "${outputPath}/360p.m3u8" \
    -vf "scale=w=848:h=480:force_original_aspect_ratio=decrease,pad=848:480:(ow-iw)/2:(oh-ih)/2" -c:a aac -ar 48000 -c:v h264 -profile:v main -crf 20 -sc_threshold 0 -g 48 -keyint_min 48 -hls_time 4 -hls_playlist_type vod -b:v 1400k -maxrate 1498k -bufsize 2100k -b:a 128k "${outputPath}/480p_%03d.ts" "${outputPath}/480p.m3u8" \
    -vf "scale=w=1280:h=720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2" -c:a aac -ar 48000 -c:v h264 -profile:v main -crf 20 -sc_threshold 0 -g 48 -keyint_min 48 -hls_time 4 -hls_playlist_type vod -b:v 2800k -maxrate 2996k -bufsize 4200k -b:a 128k "${outputPath}/720p_%03d.ts" "${outputPath}/720p.m3u8" \
    -vf "scale=w=1920:h=1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" -c:a aac -ar 48000 -c:v h264 -profile:v main -crf 20 -sc_threshold 0 -g 48 -keyint_min 48 -hls_time 4 -hls_playlist_type vod -b:v 5000k -maxrate 5350k -bufsize 7500k -b:a 192k "${outputPath}/1080p_%03d.ts" "${outputPath}/1080p.m3u8"`;
  try {
    await fs.mkdir(outputPath, { recursive: true });
  } catch (error) {
    console.error(`Failed to create output directory: ${error}`);
    await deleteFiles(outputPath, videoUrl);
    await Chapter.findByIdAndUpdate(req.body.chapterID, {
      videoStatus: "cancelled",
    });
    return res.status(500).json({
      error: `Failed to create output directory: ${error.message}`,
      uploaded: "failed",
    });
  }

  exec(ffmpegCommand, async (error, stdout, stderr) => {
    if (error) {
      await deleteFiles(outputPath, videoUrl);

      await Chapter.findByIdAndUpdate(req.body.chapterID, {
        videoStatus: "cancelled",
      });

      console.error(`FFmpeg exec error: ${error}`);
      return res.status(500).json({
        error: `Conversion failed: ${error.message}`,
        uploaded: "failed",
      });
    }
    if (stderr) {
      console.error(`FFmpeg stderr: ${stderr}`);
    }
    console.log(`FFmpeg stdout: ${stdout}`);

    const mainM3u8Content = `#EXTM3U
    #EXT-X-VERSION:3
    #EXT-X-STREAM-INF:BANDWIDTH=800000,RESOLUTION=640x360
    360p.m3u8
    #EXT-X-STREAM-INF:BANDWIDTH=1400000,RESOLUTION=848x480
    480p.m3u8
    #EXT-X-STREAM-INF:BANDWIDTH=2800000,RESOLUTION=1280x720
    720p.m3u8
    #EXT-X-STREAM-INF:BANDWIDTH=5000000,RESOLUTION=1920x1080
    1080p.m3u8`;

    try {
      await fs.writeFile(path.join(outputPath, "main.m3u8"), mainM3u8Content);
    } catch (error) {
      await deleteFiles(outputPath, videoUrl);

      console.error(`Failed to write main.m3u8 file: ${error}`);
      await Chapter.findByIdAndUpdate(req.body.chapterID, {
        videoStatus: "cancelled",
      });
      return res.status(500).json({
        error: `Failed to write main.m3u8 file: ${error.message}`,
        uploaded: "failed",
      });
    }

    try {
      await uploadFolderToS3({
        localFolder: outputPath,
        remoteFolder: lessonId,
      });
    } catch (error) {
      await deleteFiles(outputPath, videoUrl);

      console.error(`Failed to upload folder to S3: ${error}`);
      await Chapter.findByIdAndUpdate(req.body.chapterID, {
        videoStatus: "cancelled",
      });
      return res.status(500).json({
        error: `Failed to upload folder to S3: ${error.message}`,
        uploaded: "failed",
      });
    }

    await deleteFiles(outputPath, videoUrl);

    try {
      const c = await Chapter.findOne({ _id: req.body.chapterID });
      if (!c) {
        await deleteFiles(outputPath, videoUrl);

        await Chapter.findByIdAndUpdate(req.body.chapterID, {
          videoStatus: "cancelled",
        });
        return res
          .status(404)
          .json({ error: "Chapter not found", uploaded: "failed" });
      }
      c.videoLink = `${lessonId}/main.m3u8`;
      await c.save();
    } catch (error) {
      await deleteFiles(outputPath, videoUrl);

      console.error(`Failed to save chapter: ${error}`);
      await Chapter.findByIdAndUpdate(req.body.chapterID, {
        videoStatus: "cancelled",
      });
      return res.status(500).json({
        error: `Failed to save chapter: ${error.message}`,
        uploaded: "failed",
      });
    }

    await Chapter.findByIdAndUpdate(req.body.chapterID, {
      videoStatus: "uploaded",
    });
    res.json({
      message: "Video Uploaded Successfully",
      videoUrl: `${lessonId}/main.m3u8`,
      lessonId,
      uploaded: "success",
    });
  });
};

async function deleteFiles(outputPath, videoUrl) {
  try {
    await fs.rm(outputPath, { recursive: true, force: true });
    await fs.rm(videoUrl, { force: true });
  } catch (error) {
    console.error(`Failed to clean up local files: ${error}`);
    // Do not return an error response here; cleanup failure is not critical to the main process
  }
}
