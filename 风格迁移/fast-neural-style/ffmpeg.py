from ffmpy import FFmpeg
vedio=r'video.mp4'
ff = FFmpeg(
   inputs={vedio: None},
   outputs={'video\%d.jpg': None}
)
ff.run()






