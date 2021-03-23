import ffmpy
import ffmpeg
import os
from ffmpy import FFmpeg

ff = FFmpeg(
   inputs={'pic\%d.jpg': None},
   outputs={'video2.mp4': None}
)
ff.run()