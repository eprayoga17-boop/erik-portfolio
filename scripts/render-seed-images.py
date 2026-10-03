import pymupdf as fitz, json, io, os
from PIL import Image
S=1.25
FULL=None
P={'milagros':([18,19,20,21,22,23],22,FULL),'neauvia':([8],8,(0.532,0.02,0.99,0.975)),'mie-umi':([28,29],29,FULL),
'scoobeauty':([24,25],25,FULL),'deyn':([6,7],7,FULL),'illumia-face':([26,27],27,FULL),'masace':([16,17],16,FULL),
'bmj-physiotherapy':([32],32,(0.47,0.0,1.0,0.93)),'superfood':([9],9,FULL),'kimaya':([10,11],11,FULL),'ega-wellness':([12,13],13,FULL),
'cotton-spring':([14],14,(0.44,0.12,0.995,1.0)),'lenicc-eyewear':([15],15,(0.548,0,1,1)),'fuchsia-beauty':([30,31],31,FULL),
'pinnacle-automotive':([33],33,(0.458,0.035,0.977,0.99)),'oligio':([34],34,(0.495,0.025,0.995,0.985)),'dental-1728':([35],35,(0.452,0.025,0.985,0.99)),
'medical-surgical-dermatology':([36],36,(0.452,0.025,0.99,0.99)),'kotty':([37],37,(0.383,0,1,1)),'oye-oye-pangena':([38],38,FULL),
'betterlife-parentcraft':([39],39,FULL),'angel-eye-ascend':([40],40,FULL),'one-wellness-eu-yan-sang':([41],41,FULL),
'rsia-kendangsari':([43],43,(0.395,0,1,1)),'negkom-posters':([44],44,(0.322,0.03,0.99,0.975)),'cokotsss':([45],45,(0.43,0.03,0.995,0.945)),'meda':([46],46,FULL),'motion-reel':([47],47,FULL)}
d=fitz.open('/mnt/user-data/uploads/Erik_PortFolio_2025.pdf')
out={}
root='/home/claude/erik-portfolio/public'
for slug,(pages,cov,box) in P.items():
  os.makedirs(f'{root}/seed/{slug}',exist_ok=True)
  for f in os.listdir(f'{root}/seed/{slug}'): os.remove(f'{root}/seed/{slug}/{f}')
  imgs=[]
  for i,pg in enumerate(pages):
    pix=d[pg-1].get_pixmap(matrix=fitz.Matrix(S,S))
    im=Image.open(io.BytesIO(pix.tobytes('png'))).convert('RGB')
    fn=f'/seed/{slug}/{i+1:02d}.webp'
    im.save(root+fn,'WEBP',quality=82,method=6)
    imgs.append([im.width,im.height])
    if pg==cov:
      W,H=im.size
      c=im if box is None else im.crop((round(W*box[0]),round(H*box[1]),round(W*box[2]),round(H*box[3])))
      if slug=='negkom-posters':
        from PIL import ImageDraw
        ImageDraw.Draw(c).rectangle((0,0,14,int(c.height*0.2)),fill='white')
      c.thumbnail((1800,1800))
      c.save(f'{root}/seed/{slug}/cover.webp','WEBP',quality=82,method=6)
      cover=[c.width,c.height]
  out[slug]={'images':imgs,'cover':cover}
json.dump(out,open('seedimgs2.json','w'),indent=1)
