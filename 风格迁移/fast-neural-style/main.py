# coding:utf8

import torch as t
import torchvision as tv
import torchnet as tnt

from torch.utils import data

from PackedVGG import Vgg19
from transformer_net import TransformerNet
import utils
from torch.nn import functional as F
import tqdm

from transformer_style3 import TransformerNet2

mean = [0.485, 0.456, 0.406]
std = [0.229, 0.224, 0.225]


class Config(object):
    # General Args
    use_gpu = True
    model_path = 'checkpoints/0_style1.pth' # pretrain model path (for resume training or test)
    
    # Train Args
    image_size = 256 # image crop_size for training
    batch_size = 1
    data_root = 'contect_picture' # dataset root：$data_root/coco/a.jpg
    num_workers = 4 # dataloader num of workers
    
    lr = 1e-3
    epoches = 2 # total epoch to train
    content_weight = 1e5 # weight of content_loss  
    style_weight = 1e10 # weight of style_loss

    style_path= 'style.jpg' # style image path
    env = 'neural-style' # visdom env
    plot_every = 10 # visualize in visdom for every 10 batch

    debug_file = '/tmp/debugnn' # touch $debug_fie to interrupt and enter ipdb 

    # Test Args
    content_path = 'content2.jpg' # input file to do style transfer [for test]
    result_path = 'output.png' # style transfer result [for test]


def train(**kwargs):
    opt = Config()
    for k_, v_ in kwargs.items():
        setattr(opt, k_, v_)
    
    device=t.device('cuda') if opt.use_gpu else t.device('cpu')

    # Data loading
    transfroms = tv.transforms.Compose([
        tv.transforms.Resize(opt.image_size),
        tv.transforms.CenterCrop(opt.image_size),
        tv.transforms.ToTensor(),
        tv.transforms.Lambda(lambda x: x * 255)
    ])
    dataset = tv.datasets.ImageFolder(opt.data_root, transfroms)
    dataloader = data.DataLoader(dataset, opt.batch_size)

    # style transformer network
    transformer = TransformerNet()
    if opt.model_path == 'checkpoints/3_style.pth':
        style_model = TransformerNet2().eval()
    else:
        style_model = TransformerNet().eval()
    style_model.load_state_dict(t.load(opt.model_path, map_location=lambda _s, _: _s))
    transformer.to(device)

    # Vgg19 for Perceptual Loss
    vgg = Vgg19().eval()
    vgg.to(device)
    for param in vgg.parameters():
        param.requires_grad = False

    # Optimizer
    optimizer = t.optim.Adam(transformer.parameters(), opt.lr)

    # Get style image
    style = utils.get_style_data(opt.style_path)
    style = style.to(device)


    # gram matrix for style image
    with t.no_grad():
        features_style = vgg(style)
        gram_style = [utils.gram_matrix(y) for y in features_style]

    # Loss
    print('style ID:')
    j=input()
    for epoch in range(opt.epoches):
        for ii, (x, _) in tqdm.tqdm(enumerate(dataloader)):

            # Train
            optimizer.zero_grad()
            x = x.to(device)
            y = transformer(x)
            y = utils.normalize_batch(y)
            x = utils.normalize_batch(x)
            features_y = vgg(y)
            features_x = vgg(x)

            # content loss
            content_loss = opt.content_weight * F.mse_loss(features_y.relu2_2, features_x.relu2_2)

            # style loss
            style_loss = 0.
            for ft_y, gm_s in zip(features_y, gram_style):
                gram_y = utils.gram_matrix(ft_y)
                style_loss += F.mse_loss(gram_y, gm_s.expand_as(gram_y))
            style_loss *= opt.style_weight

            total_loss = content_loss + style_loss
            total_loss.backward()
            optimizer.step()

            if (ii + 1) % opt.plot_every == 0:
                print(total_loss)
        t.save(transformer.state_dict(), 'checkpoints/%s'%(epoch)+'_style%s'%(j)+'.pth')

@t.no_grad()
def stylize(**kwargs):
    """
    perform style transfer
    """
    opt = Config()

    for k_, v_ in kwargs.items():
        setattr(opt, k_, v_)
    device=t.device('cuda') if opt.use_gpu else t.device('cpu')

    # input image preprocess
    content_image = tv.datasets.folder.default_loader(opt.content_path)
    content_transform = tv.transforms.Compose([
        tv.transforms.ToTensor(),
        tv.transforms.Lambda(lambda x: x.mul(255))
    ])
    content_image = content_transform(content_image)
    content_image = content_image.unsqueeze(0).to(device).detach()

    # model setup
    style_model = TransformerNet()
    style_model.load_state_dict(t.load(opt.model_path, map_location=lambda _s, _: _s))
    style_model.to(device)

    # style transfer and save output
    output = style_model(content_image)
    output_data = output.cpu().data[0]
    tv.utils.save_image(((output_data / 255)).clamp(min=0, max=1), opt.result_path)


if __name__ == '__main__':
    stylize()