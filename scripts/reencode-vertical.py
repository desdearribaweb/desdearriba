import av
from fractions import Fraction

SRC = '/home/user/desdearriba/public/videos/hero.mp4'
DST = 'hero-fixed.mp4'
W, H = 1080, 1920

src = av.open(SRC)
vs = src.streams.video[0]
vs.thread_type = 'AUTO'
fps = Fraction(vs.average_rate)

out = av.open(DST, 'w')
st = out.add_stream('libx264', rate=fps)
st.width, st.height = W, H
st.pix_fmt = 'yuv420p'
st.options = {'crf': '27', 'preset': 'faster', 'profile': 'high'}

n = 0
for frame in src.decode(video=0):
    f = frame.reformat(width=W, height=H, format='yuv420p')
    # conservar el timing del original: si no, la duracion sale en cero
    f.pts = frame.pts
    f.time_base = frame.time_base
    for pkt in st.encode(f):
        out.mux(pkt)
    n += 1

for pkt in st.encode():
    out.mux(pkt)

out.close(); src.close()
print(f"{n} frames")
